import React, { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ImagePlus, Loader2, LogOut, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageTransition } from "@/components/motion/PageTransition";
import { GALLERY_CATEGORIES } from "@/types/gallery";
import type { GalleryImage, GalleryCategory } from "@/server/data/gallery";

const tabs = ["Overview", "Bookings", "Payments", "Gallery", "Availability", "Inquiries"] as const;
type Tab = typeof tabs[number];

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  packageId: string;
  bookingDate: string;
  bookingTime: string;
  timezone: string;
  location: string;
  guestCount: string;
  notes: string;
  status: "pending_payment" | "pending" | "confirmed" | "cancelled" | "expired";
  paymentStatus: "unpaid" | "paid" | "partially_paid" | "refunded";
  paymentMethodId: string | null;
  paymentProvider: string | null;
  currency: string;
  depositCents: number;
  totalCents: number;
  balanceCents: number;
  paymentExpiresAt: string | null;
};

type AvailabilityBlock = { id: number; starts_at: string; ends_at: string; reason: string; created_at: string };

type PaymentMethod = { id: string; provider: "stripe" | "payment_link"; name: string; description: string; checkoutUrl: string | null; enabled: boolean; };
type PaymentTransaction = { id: string; bookingId: string; paymentMethodId: string; provider: string; kind: "deposit" | "balance"; amountCents: number; currency: string; status: string; providerRef: string | null; checkoutUrl: string | null; createdAt: string; updatedAt: string; };
type PaymentSettings = { currency: string; paymentRequired: boolean; depositCents: number; paymentExpiryMinutes: number; defaultMethodId: string | null; };

type Settings = {
  timezone: string;
  slotMinutes: number;
  slotTimes: string[];
  minAdvanceHours: number;
  cancellationHours: number;
  maxDaysAhead: number;
  weeklyHours: Record<string, { open: string; close: string } | null>;
};

export const AdminPage: React.FC = () => {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaRequired, setMfaRequired] = useState(false);
  const [tab, setTab] = useState<Tab>("Overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings | null>(null);
  const [paymentTransactions, setPaymentTransactions] = useState<PaymentTransaction[]>([]);
  const [stripeConfigured, setStripeConfigured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [category, setCategory] = useState<GalleryCategory>("weddings");
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [syncingGallery, setSyncingGallery] = useState(false);
  const [selectedUploadFiles, setSelectedUploadFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadAll = async () => {
    setLoading(true); setError("");
    try {
      const [bookingResponse, galleryResponse, inquiryResponse, settingsResponse, availabilityResponse, paymentResponse] = await Promise.all([
        fetch("/api/admin-bookings", { cache: "no-store" }),
        fetch("/api/admin-gallery", { cache: "no-store" }),
        fetch("/api/admin-inquiries", { cache: "no-store" }),
        fetch("/api/booking-settings", { cache: "no-store" }),
        fetch("/api/admin-availability", { cache: "no-store" }),
        fetch("/api/admin-payments", { cache: "no-store" }),
      ]);
      if ([bookingResponse, galleryResponse, inquiryResponse, availabilityResponse, paymentResponse].some((response) => response.status === 401)) { setLogged(false); return; }
      const [bookingData, galleryData, inquiryData, settingsData, availabilityData, paymentData] = await Promise.all([
        bookingResponse.json(), galleryResponse.json(), inquiryResponse.json(), settingsResponse.json(), availabilityResponse.json(), paymentResponse.json(),
      ]);
      setBookings(bookingData.bookings ?? []);
      setGallery(galleryData.images ?? []);
      setInquiries(inquiryData.inquiries ?? []);
      setSettings(settingsData.settings ?? null);
      setBlocks(availabilityData.blocks ?? []);
      setPaymentMethods(paymentData.methods ?? []);
      setPaymentSettings(paymentData.settings ?? null);
      setPaymentTransactions(paymentData.transactions ?? []);
      setStripeConfigured(Boolean(paymentData.stripeConfigured));
      setLogged(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load dashboard.");
    } finally { setLoading(false); }
  };

  useEffect(() => { loadAll(); }, []);

  const login = async (event: React.FormEvent) => {
    event.preventDefault(); setError("");
    const response = await fetch("/api/admin-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, mfaCode: mfaCode || undefined }) });
    const data = await response.json();
    if (!response.ok) {
      if (data.mfaRequired) setMfaRequired(true);
      setError(data.error || "Login failed");
      return;
    }
    setToken(""); setMfaCode(""); setMfaRequired(false); await loadAll();
  };

  const updateBooking = async (id: string, patch: Record<string, unknown>) => {
    const response = await fetch("/api/admin-bookings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...patch }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not update booking"); return; }
    setNotice("Booking updated."); await loadAll();
  };

  const uploadFiles = async () => {
    if (!selectedUploadFiles.length) return;
    setUploading(true); setError(""); setNotice("");
    try {
      for (const file of selectedUploadFiles) {
        const optimized = await optimizeImage(file);
        const form = new FormData();
        form.append("file", optimized.file, optimized.file.name);
        form.append("category", category);
        form.append("title", optimized.title);
        form.append("alt", `${optimized.title} — RBONSU Photography`);
        form.append("isFeatured", String(featured));
        const response = await fetch("/api/admin-gallery", { method: "POST", body: form });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `Upload failed for ${file.name}`);
      }
      setNotice(`${selectedUploadFiles.length} image${selectedUploadFiles.length === 1 ? "" : "s"} published to ${category}.`);
      setSelectedUploadFiles([]); if (fileRef.current) fileRef.current.value = ""; await loadAll();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Upload failed.");
    } finally { setUploading(false); }
  };

  const syncGallery = async () => {
    setSyncingGallery(true);
    setError("");
    setNotice("");
    try {
      const form = new FormData();
      form.set("action", "sync");
      const response = await fetch("/api/admin-gallery", { method: "POST", body: form });
      const data = await response.json() as { success?: boolean; result?: { scanned?: number; added?: number; repaired?: number; unresolved?: Array<{ path: string; reason: string }> }; error?: string };
      if (!response.ok || !data.success) throw new Error(data.error || "Gallery sync failed.");
      const unresolvedCount = data.result?.unresolved?.length ?? 0;
      setNotice(`Storage sync complete: ${data.result?.scanned ?? 0} scanned, ${data.result?.added ?? 0} added, ${data.result?.repaired ?? 0} repaired${unresolvedCount ? `, ${unresolvedCount} unresolved` : ""}.`);
      await loadAll();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Gallery sync failed.");
    } finally {
      setSyncingGallery(false);
    }
  };

  const updateGallery = async (id: string, patch: Record<string, unknown>) => {
    const response = await fetch("/api/admin-gallery", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...patch }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not update image"); return; }
    await loadAll();
  };

  const deleteGallery = async (id: string) => {
    if (!window.confirm("Delete this image from the gallery and storage?")) return;
    const response = await fetch(`/api/admin-gallery?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not delete image"); return; }
    setNotice("Image deleted."); await loadAll();
  };

  const saveSettings = async () => {
    if (!settings) return;
    setError("");
    const response = await fetch("/api/booking-settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not save availability."); return; }
    setSettings(data.settings); setNotice("Availability settings saved.");
  };

  const addBlock = async (startsAt: string, endsAt: string, reason: string) => {
    const response = await fetch("/api/admin-availability", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ startsAt, endsAt, reason }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not block the time."); return; }
    setNotice("Availability block added.");
    await loadAll();
  };

  const deleteBlock = async (id: number) => {
    if (!window.confirm("Remove this availability block?")) return;
    const response = await fetch(`/api/admin-availability?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not remove the block."); return; }
    setNotice("Availability block removed.");
    await loadAll();
  };

  const updatePaymentSettings = async (next: PaymentSettings) => {
    const response = await fetch("/api/admin-payments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ target: "settings", ...next }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not save payment settings."); return; }
    setPaymentSettings(data.settings); setNotice("Payment settings saved."); await loadAll();
  };

  const updatePaymentMethod = async (id: string, patch: Record<string, unknown>) => {
    const response = await fetch("/api/admin-payments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ target: "method", id, ...patch }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not update payment method."); return; }
    setNotice("Payment method updated."); await loadAll();
  };

  const addPaymentLink = async (input: { name: string; description: string; checkoutUrl: string }) => {
    const response = await fetch("/api/admin-payments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ provider: "payment_link", ...input }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not add payment method."); return; }
    setNotice("Payment method added."); await loadAll();
  };

  const deletePaymentMethod = async (id: string) => {
    if (!window.confirm("Delete this payment method?")) return;
    const response = await fetch(`/api/admin-payments?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not delete payment method."); return; }
    setNotice("Payment method deleted."); await loadAll();
  };

  const logout = async () => { await fetch("/api/admin-logout", { method: "POST" }); setLogged(false); setBookings([]); setGallery([]); setInquiries([]); setBlocks([]); setPaymentMethods([]); setPaymentTransactions([]); };

  const upcoming = bookings.filter((booking) => booking.status !== "cancelled" && booking.bookingDate >= new Date().toISOString().slice(0, 10)).length;
  const pending = bookings.filter((booking) => booking.status === "pending" || booking.status === "pending_payment").length;

  if (!logged) {
    return <PageTransition><SEOHead title="Studio Admin | RBONSU PHOTOGRAPHY" description="Private RBONSU Photography studio administration." canonicalPath="/admin" /><div className="min-h-screen bg-[#F4F0EB] py-20 sm:py-28"><form onSubmit={login} className="max-w-md mx-auto px-7 py-9 bg-white border border-[#E1D9D0]"><p className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B]">Private studio</p><h1 className="font-serif text-4xl mt-3 text-[#191817]">Admin sign in</h1><p className="mt-3 text-sm leading-relaxed text-[#6B625B]">Use the dashboard credential configured for this deployment.</p><label className="block mt-8 text-xs uppercase tracking-wider text-[#5E5247]">Dashboard credential<input type="password" value={token} onChange={(event) => setToken(event.target.value)} className="mt-2 w-full border border-[#D8D0C8] bg-[#FAF8F5] p-3.5" autoComplete="current-password" /></label>{mfaRequired && <label className="block mt-5 text-xs uppercase tracking-wider text-[#5E5247]">Authenticator code<input type="text" inputMode="numeric" pattern="\d{6}" maxLength={6} value={mfaCode} onChange={(event) => setMfaCode(event.target.value.replace(/\D/g, "").slice(0, 6))} className="mt-2 w-full border border-[#D8D0C8] bg-[#FAF8F5] p-3.5 tracking-[0.3em]" autoComplete="one-time-code" placeholder="123456" /></label>}{error && <p className="mt-4 text-sm text-red-700">{error}</p>}<button className="mt-6 w-full min-h-12 bg-[#191817] text-white uppercase tracking-[0.16em] text-xs">Enter dashboard</button></form></div></PageTransition>;
  }

  return <PageTransition><SEOHead title="Studio Admin | RBONSU PHOTOGRAPHY" description="Private RBONSU Photography studio administration." canonicalPath="/admin" /><div className="min-h-screen bg-[#F4F0EB] py-10 sm:py-14"><div className="max-w-[1500px] mx-auto px-5 sm:px-8"><div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"><div><p className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B]">Studio operations</p><h1 className="font-serif text-5xl sm:text-6xl mt-2 text-[#191817]">Control room</h1><p className="mt-3 text-sm text-[#6B625B]">Bookings, gallery publishing, availability and inquiries in one place.</p></div><div className="flex gap-2"><button type="button" onClick={loadAll} className="border border-[#D8D0C8] bg-white px-4 py-3 text-xs uppercase tracking-wider flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Refresh</button><button type="button" onClick={logout} className="border border-[#D8D0C8] bg-white px-4 py-3 text-xs uppercase tracking-wider flex items-center gap-2"><LogOut className="w-4 h-4" /> Sign out</button></div></div>

    {(error || notice) && <div className={`mt-5 px-4 py-3 text-sm border ${error ? "bg-[#FBF2EE] text-[#7D3E2A] border-[#E4CFC7]" : "bg-[#F2F6F1] text-[#466046] border-[#D3E0D0]"}`}>{error || notice}</div>}

    <nav className="mt-8 flex gap-2 overflow-x-auto border-b border-[#D8D0C8]" aria-label="Admin sections">{tabs.map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={`shrink-0 px-4 py-3 text-xs uppercase tracking-[0.13em] border-b-2 ${tab === item ? "border-[#191817] text-[#191817]" : "border-transparent text-[#8C7A6B]"}`}>{item}</button>)}</nav>

    {loading ? <div className="py-24 flex items-center justify-center gap-3 text-[#6B625B]"><Loader2 className="animate-spin" /> Loading studio data…</div> : <div className="py-8">{tab === "Overview" && <Overview upcoming={upcoming} pending={pending} galleryCount={gallery.filter((item) => item.isPublished).length} inquiryCount={inquiries.length} paymentPending={bookings.filter((booking) => booking.paymentStatus !== "paid" && booking.status !== "cancelled").length} setTab={setTab} />}{tab === "Bookings" && <Bookings bookings={bookings} updateBooking={updateBooking} />} {tab === "Payments" && paymentSettings && <Payments methods={paymentMethods} settings={paymentSettings} transactions={paymentTransactions} stripeConfigured={stripeConfigured} updateSettings={updatePaymentSettings} updateMethod={updatePaymentMethod} addPaymentLink={addPaymentLink} deleteMethod={deletePaymentMethod} />}{tab === "Gallery" && <GalleryPanel gallery={gallery} category={category} setCategory={setCategory} featured={featured} setFeatured={setFeatured} files={selectedUploadFiles} setFiles={setSelectedUploadFiles} uploadFiles={uploadFiles} uploading={uploading} syncingGallery={syncingGallery} syncGallery={syncGallery} updateGallery={updateGallery} deleteGallery={deleteGallery} fileRef={fileRef} />}{tab === "Availability" && settings && <Availability settings={settings} setSettings={setSettings} saveSettings={saveSettings} blocks={blocks} addBlock={addBlock} deleteBlock={deleteBlock} />}{tab === "Inquiries" && <Inquiries inquiries={inquiries} />}</div>}
  </div></div></PageTransition>;
};

function Overview({ upcoming, pending, galleryCount, inquiryCount, paymentPending, setTab }: { upcoming: number; pending: number; galleryCount: number; inquiryCount: number; paymentPending: number; setTab: (tab: Tab) => void }) {
  const cards = [{ label: "Upcoming bookings", value: upcoming, tab: "Bookings" as Tab }, { label: "Pending decisions", value: pending, tab: "Bookings" as Tab }, { label: "Published photographs", value: galleryCount, tab: "Gallery" as Tab }, { label: "Client inquiries", value: inquiryCount, tab: "Inquiries" as Tab }, { label: "Payments awaiting completion", value: paymentPending, tab: "Payments" as Tab }];
  return <><div className="grid grid-cols-2 lg:grid-cols-5 gap-4">{cards.map((card) => <button key={card.label} type="button" onClick={() => setTab(card.tab)} className="text-left bg-white border border-[#E1D9D0] p-5 sm:p-6 hover:border-[#191817] transition-colors"><span className="text-[10px] uppercase tracking-[0.18em] text-[#8C7A6B]">{card.label}</span><strong className="block font-serif text-4xl mt-2 text-[#191817]">{card.value}</strong></button>)}</div><div className="mt-8 grid lg:grid-cols-2 gap-6"><div className="bg-[#191817] text-[#FAF8F5] p-7 sm:p-9"><span className="text-[10px] uppercase tracking-[0.22em] text-[#A69280]">Gallery publishing</span><h2 className="font-serif text-3xl sm:text-4xl mt-3">Upload once. Publish to the right category.</h2><p className="mt-4 text-sm text-[#D8D3CA] leading-relaxed">Choose Weddings, Engagement, Maternity, Family or another category, upload the latest work, and the public gallery automatically refreshes from Supabase.</p><button type="button" onClick={() => setTab("Gallery")} className="mt-7 inline-flex items-center gap-2 bg-[#FAF8F5] text-[#191817] px-5 py-3 text-xs uppercase tracking-widest">Open gallery manager <UploadCloud className="w-4 h-4" /></button></div><div className="bg-[#F8F5F1] border border-[#E1D9D0] p-7 sm:p-9"><span className="text-[10px] uppercase tracking-[0.22em] text-[#8C7A6B]">Booking operations</span><h2 className="font-serif text-3xl sm:text-4xl mt-3 text-[#191817]">Review every reservation before it becomes a calendar commitment.</h2><p className="mt-4 text-sm text-[#6B625B] leading-relaxed">Confirm, cancel or reschedule from the dashboard. Availability rules are shared with the public booking page.</p><button type="button" onClick={() => setTab("Bookings")} className="mt-7 inline-flex items-center gap-2 border border-[#191817] text-[#191817] px-5 py-3 text-xs uppercase tracking-widest">Manage bookings <CalendarDays className="w-4 h-4" /></button></div></div></>;
}

function Bookings({ bookings, updateBooking }: { bookings: Booking[]; updateBooking: (id: string, patch: Record<string, unknown>) => void }) {
  const [filter, setFilter] = useState("all");
  const visible = useMemo(() => filter === "all" ? bookings : bookings.filter((booking) => booking.status === filter), [filter, bookings]);
  const money = (cents: number, currency: string) => new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
  return <div>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
      <div><h2 className="font-serif text-3xl text-[#191817]">Bookings</h2><p className="text-sm text-[#6B625B] mt-1">Manage reservations, payment status and client changes.</p></div>
      <select value={filter} onChange={(event) => setFilter(event.target.value)} className="border border-[#D8D0C8] bg-white px-4 py-3 text-sm">
        <option value="all">All statuses</option><option value="pending_payment">Awaiting payment</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option><option value="expired">Expired</option>
      </select>
    </div>
    <div className="bg-white border border-[#E1D9D0] overflow-x-auto">
      <table className="w-full text-sm min-w-[1120px]"><thead className="bg-[#F8F5F1] text-left text-[10px] uppercase tracking-[0.14em] text-[#6B625B]"><tr><th className="p-4">Date</th><th className="p-4">Client</th><th className="p-4">Service</th><th className="p-4">Booking</th><th className="p-4">Payment</th><th className="p-4">Amount</th><th className="p-4">Actions</th></tr></thead>
      <tbody>{visible.map((booking) => <tr key={booking.id} className="border-t border-[#EEE9E3] align-top">
        <td className="p-4 whitespace-nowrap">{booking.bookingDate}<br /><span className="text-xs text-[#8C7A6B]">{booking.bookingTime} · {booking.timezone}</span></td>
        <td className="p-4">{booking.name}<br /><a className="text-xs text-[#8C7A6B] underline" href={`mailto:${booking.email}`}>{booking.email}</a>{booking.phone && <><br /><span className="text-xs text-[#8C7A6B]">{booking.phone}</span></>}</td>
        <td className="p-4">{booking.service}<br /><span className="text-xs text-[#8C7A6B]">{booking.packageId || "Custom"}</span></td>
        <td className="p-4"><span className="inline-flex px-2.5 py-1 bg-[#F4F1EB] uppercase text-[10px] tracking-wider">{booking.status.replace("_", " ")}</span></td>
        <td className="p-4"><span className="inline-flex px-2.5 py-1 border uppercase text-[10px] tracking-wider">{booking.paymentStatus.replace("_", " ")}</span><br /><span className="text-xs text-[#8C7A6B]">{booking.paymentProvider || "—"}</span></td>
        <td className="p-4 whitespace-nowrap">{money(booking.totalCents, booking.currency)}<br /><span className="text-xs text-[#8C7A6B]">Balance {money(booking.balanceCents, booking.currency)}</span></td>
        <td className="p-4"><div className="flex flex-col gap-2 min-w-[150px]">
          {booking.paymentStatus !== "paid" && <button type="button" onClick={() => { const ref = window.prompt("Optional payment/reference note"); updateBooking(booking.id, { paymentStatus: "paid", paymentReference: ref || "" }); }} className="border px-3 py-2 text-xs">Mark paid</button>}
          {booking.status !== "confirmed" && booking.status !== "cancelled" && <button type="button" onClick={() => updateBooking(booking.id, { status: "confirmed" })} className="border px-3 py-2 text-xs">Confirm</button>}
          {booking.status !== "cancelled" && <button type="button" onClick={() => updateBooking(booking.id, { status: "cancelled" })} className="border px-3 py-2 text-xs">Cancel</button>}
          <button type="button" onClick={() => { const value = window.prompt("Total booking amount", String(booking.totalCents / 100)); if (value !== null && Number.isFinite(Number(value)) && Number(value) >= 0) updateBooking(booking.id, { totalCents: Math.round(Number(value) * 100) }); }} className="border px-3 py-2 text-xs">Set total</button>
          <button type="button" onClick={() => { const date = window.prompt("New date (YYYY-MM-DD)", booking.bookingDate); const time = date ? window.prompt("New time (HH:MM)", booking.bookingTime) : null; if (date && time) updateBooking(booking.id, { bookingDate: date, bookingTime: time }); }} className="border px-3 py-2 text-xs">Reschedule</button>
        </div></td>
      </tr>)}{!visible.length && <tr><td colSpan={7} className="p-10 text-center text-[#8C7A6B]">No bookings in this view.</td></tr>}</tbody></table>
    </div>
  </div>;
}

function Payments({ methods, settings, transactions, stripeConfigured, updateSettings, updateMethod, addPaymentLink, deleteMethod }: { methods: PaymentMethod[]; settings: PaymentSettings; transactions: PaymentTransaction[]; stripeConfigured: boolean; updateSettings: (settings: PaymentSettings) => Promise<void>; updateMethod: (id: string, patch: Record<string, unknown>) => Promise<void>; addPaymentLink: (input: { name: string; description: string; checkoutUrl: string }) => Promise<void>; deleteMethod: (id: string) => Promise<void> }) {
  const [currency, setCurrency] = useState(settings.currency);
  const [required, setRequired] = useState(settings.paymentRequired);
  const [deposit, setDeposit] = useState(String(settings.depositCents / 100));
  const [expiry, setExpiry] = useState(String(settings.paymentExpiryMinutes));
  const [defaultMethodId, setDefaultMethodId] = useState(settings.defaultMethodId ?? "");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [editingMethodId, setEditingMethodId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCheckoutUrl, setEditCheckoutUrl] = useState("");

  useEffect(() => {
    setCurrency(settings.currency); setRequired(settings.paymentRequired); setDeposit(String(settings.depositCents / 100)); setExpiry(String(settings.paymentExpiryMinutes)); setDefaultMethodId(settings.defaultMethodId ?? "");
  }, [settings]);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    const amount = Number(deposit);
    const expiryMinutes = Number(expiry);
    if (!/^[A-Za-z]{3}$/.test(currency) || !Number.isFinite(amount) || amount < 0 || !Number.isFinite(expiryMinutes) || expiryMinutes < 30 || expiryMinutes > 1440) return;
    await updateSettings({ currency: currency.toUpperCase(), paymentRequired: required, depositCents: Math.round(amount * 100), paymentExpiryMinutes: Math.round(expiryMinutes), defaultMethodId: defaultMethodId || null });
  };

  const add = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !checkoutUrl.trim()) return;
    await addPaymentLink({ name: name.trim(), description: description.trim(), checkoutUrl: checkoutUrl.trim() });
    setName(""); setDescription(""); setCheckoutUrl("");
  };

  const beginEdit = (method: PaymentMethod) => {
    setEditingMethodId(method.id);
    setEditName(method.name);
    setEditDescription(method.description);
    setEditCheckoutUrl(method.checkoutUrl ?? "");
  };

  const saveEdit = async (method: PaymentMethod) => {
    if (!editName.trim()) return;
    await updateMethod(method.id, { name: editName.trim(), description: editDescription.trim(), checkoutUrl: editCheckoutUrl.trim() || null });
    setEditingMethodId(null);
  };

  return <div className="space-y-8">
    <div><h2 className="font-serif text-3xl text-[#191817]">Payments</h2><p className="text-sm text-[#6B625B] mt-1">Control which payment options customers see and how much is collected at booking.</p></div>

    <form onSubmit={save} className="bg-white border border-[#E1D9D0] p-6 sm:p-8">
      <div className="grid lg:grid-cols-4 gap-5">
        <label className="text-xs uppercase tracking-wider text-[#6B625B]">Currency<input value={currency} onChange={(event) => setCurrency(event.target.value.toUpperCase())} maxLength={3} className="mt-2 w-full border border-[#D8D0C8] p-3" placeholder="USD" /></label>
        <label className="text-xs uppercase tracking-wider text-[#6B625B]">Booking deposit<input type="number" step="0.01" min="0" value={deposit} onChange={(event) => setDeposit(event.target.value)} className="mt-2 w-full border border-[#D8D0C8] p-3" /></label>
        <label className="text-xs uppercase tracking-wider text-[#6B625B]">Payment window (minutes)<input type="number" min="30" max="1440" value={expiry} onChange={(event) => setExpiry(event.target.value)} className="mt-2 w-full border border-[#D8D0C8] p-3" /></label>
        <label className="text-xs uppercase tracking-wider text-[#6B625B]">Default method<select value={defaultMethodId} onChange={(event) => setDefaultMethodId(event.target.value)} className="mt-2 w-full border border-[#D8D0C8] bg-white p-3"><option value="">No default</option>{methods.map((method) => <option key={method.id} value={method.id}>{method.name}</option>)}</select></label>
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm text-[#191817]"><input type="checkbox" checked={required} onChange={(event) => setRequired(event.target.checked)} className="mt-1" /><span><strong>Require payment to secure a new booking.</strong><span className="block mt-1 text-xs text-[#6B625B]">When disabled, bookings are created as pending requests without a payment step.</span></span></label>
      <button className="mt-6 bg-[#191817] text-white px-5 py-3 text-xs uppercase tracking-widest">Save payment settings</button>
    </form>

    <div className="bg-[#191817] text-[#FAF8F5] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5"><div><span className="text-[10px] uppercase tracking-[0.2em] text-[#A69280]">Stripe</span><h3 className="font-serif text-3xl mt-2">Automatic card checkout</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#D8D3CA]">Stripe is connected with server-only credentials. Card details never pass through or get stored by this application.</p></div><span className={`inline-flex px-3 py-2 text-xs uppercase tracking-wider ${stripeConfigured ? "bg-[#EAF2E6] text-[#375A39]" : "bg-[#FBF2EE] text-[#7D3E2A]"}`}>{stripeConfigured ? "Configured" : "Not configured"}</span></div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3"><button type="button" disabled={!stripeConfigured && !(methods.find((method) => method.id === "pm_stripe")?.enabled ?? false)} onClick={() => updateMethod("pm_stripe", { enabled: !(methods.find((method) => method.id === "pm_stripe")?.enabled ?? false) })} className="border border-[#8C837A] px-4 py-3 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed">{methods.find((method) => method.id === "pm_stripe")?.enabled ? "Disable Stripe" : stripeConfigured ? "Enable Stripe" : "Configure secrets first"}</button><span className="text-xs text-[#C6C0B8] self-center">Keep STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in Cloudflare Worker secrets. They are never entered into the dashboard or stored in the database.</span></div>
    </div>

    <form onSubmit={add} className="bg-white border border-[#E1D9D0] p-6 sm:p-8">
      <div><span className="text-[10px] uppercase tracking-[0.18em] text-[#8C7A6B]">External payment link</span><h3 className="font-serif text-2xl mt-2">Add PayPal, Square or another hosted payment page</h3><p className="mt-2 text-sm text-[#6B625B]">Use a hosted payment URL supplied by the payment provider. The URL is public; credentials are not stored here.</p></div>
      <div className="mt-5 grid lg:grid-cols-3 gap-4"><input value={name} onChange={(event) => setName(event.target.value)} className="border border-[#D8D0C8] p-3" placeholder="Payment method name (e.g. PayPal)" required /><input value={description} onChange={(event) => setDescription(event.target.value)} className="border border-[#D8D0C8] p-3" placeholder="Description" /><input value={checkoutUrl} onChange={(event) => setCheckoutUrl(event.target.value)} className="border border-[#D8D0C8] p-3" placeholder="https://..." required /></div>
      <button className="mt-4 border border-[#191817] px-5 py-3 text-xs uppercase tracking-widest">Add payment method</button>
    </form>

    <div className="bg-white border border-[#E1D9D0] p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><div><h3 className="font-serif text-2xl">Customer-facing methods</h3><p className="mt-1 text-sm text-[#6B625B]">Only enabled methods that are configured correctly appear on the public booking form.</p></div></div><div className="mt-6 space-y-4">{methods.map((method) => editingMethodId === method.id ? <div key={method.id} className="border-t border-[#EEE9E3] pt-4 space-y-3"><div className="grid lg:grid-cols-3 gap-3"><input value={editName} onChange={(event) => setEditName(event.target.value)} className="border border-[#D8D0C8] p-3" placeholder="Method name" /><input value={editDescription} onChange={(event) => setEditDescription(event.target.value)} className="border border-[#D8D0C8] p-3" placeholder="Description" /><input value={editCheckoutUrl} onChange={(event) => setEditCheckoutUrl(event.target.value)} className="border border-[#D8D0C8] p-3" placeholder="https://..." disabled={method.provider === "stripe"} /></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => saveEdit(method)} className="bg-[#191817] text-white px-4 py-2 text-xs uppercase tracking-wider">Save</button><button type="button" onClick={() => setEditingMethodId(null)} className="border px-4 py-2 text-xs uppercase tracking-wider">Cancel</button></div></div> : <div key={method.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-t border-[#EEE9E3] pt-4"><div><p className="font-medium text-[#191817]">{method.name}</p><p className="text-xs text-[#8C7A6B]">{method.provider === "payment_link" ? "Hosted payment link" : "Automatic Stripe checkout"} · {method.enabled ? "Enabled" : "Disabled"}{defaultMethodId === method.id ? " · Default" : ""}{method.description ? ` · ${method.description}` : ""}</p>{method.checkoutUrl && <p className="text-xs text-[#8C7A6B] break-all mt-1">{method.checkoutUrl}</p>}</div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => updateMethod(method.id, { enabled: !method.enabled })} disabled={method.provider === "stripe" && !stripeConfigured && !method.enabled} className="border px-3 py-2 text-xs uppercase tracking-wider disabled:opacity-50">{method.enabled ? "Disable" : "Enable"}</button><button type="button" onClick={() => { setDefaultMethodId(method.id); }} className={`border px-3 py-2 text-xs uppercase tracking-wider ${defaultMethodId === method.id ? "bg-[#191817] text-white" : ""}`}>Set default</button>{method.provider === "payment_link" && <button type="button" onClick={() => beginEdit(method)} className="border px-3 py-2 text-xs uppercase tracking-wider">Edit</button>}{method.provider === "payment_link" && <button type="button" onClick={() => deleteMethod(method.id)} className="border px-3 py-2 text-xs uppercase tracking-wider">Delete</button>}</div></div>)}{methods.length === 0 && <p className="text-sm text-[#8C7A6B]">No payment methods created yet.</p>}</div></div>

    <div className="bg-white border border-[#E1D9D0] overflow-x-auto"><div className="p-6 sm:p-8 pb-4"><h3 className="font-serif text-2xl">Payment transactions</h3><p className="mt-1 text-sm text-[#6B625B]">Hosted checkout activity recorded by the application.</p></div><table className="w-full min-w-[900px] text-sm"><thead className="bg-[#F8F5F1] text-left text-[10px] uppercase tracking-wider"><tr><th className="p-4">Created</th><th className="p-4">Booking</th><th className="p-4">Provider</th><th className="p-4">Kind</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4">Provider ref</th></tr></thead><tbody>{transactions.map((transaction) => <tr key={transaction.id} className="border-t border-[#EEE9E3]"><td className="p-4 whitespace-nowrap">{transaction.createdAt.slice(0, 19).replace("T", " ")}</td><td className="p-4 font-mono text-xs">{transaction.bookingId}</td><td className="p-4">{transaction.provider}</td><td className="p-4">{transaction.kind}</td><td className="p-4">{new Intl.NumberFormat("en-US", { style: "currency", currency: transaction.currency }).format(transaction.amountCents / 100)}</td><td className="p-4">{transaction.status}</td><td className="p-4 font-mono text-xs break-all">{transaction.providerRef || "—"}</td></tr>)}{transactions.length === 0 && <tr><td colSpan={7} className="p-10 text-center text-[#8C7A6B]">No payment transactions yet.</td></tr>}</tbody></table></div>
  </div>;
}

type GalleryPanelProps = {
  gallery: Array<{ id: string; title: string; alt: string; category: string; publicUrl: string; width: number; height: number; isPublished: boolean; isFeatured: boolean; sortOrder: number }>;
  category: string;
  setCategory: (value: string) => void;
  featured: boolean;
  setFeatured: (value: boolean) => void;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  uploadFiles: () => Promise<void>;
  uploading: boolean;
  syncingGallery: boolean;
  syncGallery: () => Promise<void>;
  updateGallery: (id: string, patch: Record<string, unknown>) => Promise<void>;
  deleteGallery: (id: string) => Promise<void>;
  fileRef: React.RefObject<HTMLInputElement | null>;
};

function GalleryPanel({ gallery, category, setCategory, featured, setFeatured, files, setFiles, uploadFiles, uploading, syncingGallery, syncGallery, updateGallery, deleteGallery, fileRef }: GalleryPanelProps) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const cats = GALLERY_CATEGORIES;
  const visible = filter === "all" ? gallery : gallery.filter((item: GalleryImage) => item.category === filter);
  return <div className="space-y-8"><div><h2 className="font-serif text-3xl text-[#191817]">Gallery manager</h2><p className="text-sm text-[#6B625B] mt-1">Upload the latest work directly into the category where visitors will find it.</p></div><div className="bg-white border border-[#E1D9D0] p-6 sm:p-8 grid lg:grid-cols-[1fr_.8fr] gap-8"><div><div className="flex items-center justify-between gap-4"><div><span className="text-[10px] uppercase tracking-[0.18em] text-[#8C7A6B]">1. Choose category</span><h3 className="font-serif text-2xl mt-2">Where should these photographs live?</h3></div><ImagePlus className="w-6 h-6 text-[#8C7A6B]" /></div><select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-5 w-full border border-[#D8D0C8] bg-[#FAF8F5] p-3.5">{cats.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select><label className="mt-4 flex items-center gap-3 text-sm"><input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} /> Also use these images as featured work.</label></div><div><span className="text-[10px] uppercase tracking-[0.18em] text-[#8C7A6B]">2. Upload latest work</span><button type="button" onClick={syncGallery} disabled={syncingGallery} className="inline-flex items-center gap-2 min-h-10 px-4 border border-[#D8D3CA] bg-white text-xs uppercase tracking-[0.12em] disabled:opacity-50">{syncingGallery ? "Syncing…" : "Sync Supabase Storage"}</button>
          <label className="mt-3 flex min-h-[180px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#D8D0C8] bg-[#FAF8F5] p-6 text-center hover:border-[#191817]"><UploadCloud className="w-8 h-8 text-[#8C7A6B]" /><span className="mt-3 font-medium text-[#191817]">Choose photographs</span><span className="mt-1 text-xs text-[#6B625B]">JPEG, PNG or WebP · images are optimized before upload</span><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => setFiles(Array.from(event.target.files ?? []))} /></label>{files.length > 0 && <div className="mt-3 text-xs text-[#5E5247]">{files.length} file{files.length === 1 ? "" : "s"} selected.</div>}<button type="button" disabled={!files.length || uploading} onClick={uploadFiles} className="mt-4 w-full min-h-12 bg-[#191817] text-[#FAF8F5] uppercase tracking-widest text-xs disabled:opacity-50">{uploading ? "Uploading…" : "Publish to gallery"}</button></div></div><div><div className="flex flex-wrap gap-2 mb-5">{[{ id: "all", label: "All" }, ...cats].map((item) => <button key={item.id} type="button" onClick={() => setFilter(item.id as GalleryCategory | "all")} className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-wider ${filter === item.id ? "bg-[#191817] text-[#FAF8F5]" : "bg-[#EAE4DD] text-[#5E5247]"}`}>{item.label}</button>)}</div><div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">{visible.map((item: GalleryImage) => <article key={item.id} className="bg-white border border-[#E1D9D0] overflow-hidden"><div className="bg-[#ECE7DD]" style={{ aspectRatio: item.width > 0 && item.height > 0 ? `${item.width} / ${item.height}` : undefined }}><img src={item.publicUrl} alt={item.alt} loading="lazy" className="w-full h-full object-contain" /></div><div className="p-3"><p className="font-serif text-lg text-[#191817] truncate">{item.title}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-[#8C7A6B]">{item.category}</p><div className="mt-3 flex items-center justify-between gap-2"><button type="button" onClick={() => updateGallery(item.id, { isPublished: !item.isPublished })} className="text-[10px] uppercase tracking-wider border px-2 py-1.5">{item.isPublished ? "Unpublish" : "Publish"}</button><button type="button" onClick={() => updateGallery(item.id, { isFeatured: !item.isFeatured })} className={`text-[10px] uppercase tracking-wider border px-2 py-1.5 ${item.isFeatured ? "bg-[#191817] text-white" : ""}`}>Featured</button><button type="button" onClick={() => deleteGallery(item.id)} className="text-[10px] uppercase tracking-wider border px-2 py-1.5" aria-label={`Delete ${item.title}`}><Trash2 className="w-3.5 h-3.5" /></button></div></div></article>)}</div>{visible.length === 0 && <div className="border border-dashed border-[#D8D0C8] p-10 text-center text-[#8C7A6B]">No uploaded images in this category yet.</div>}</div></div>;
}

function Availability({ settings, setSettings, saveSettings, blocks, addBlock, deleteBlock }: { settings: Settings; setSettings: (settings: Settings) => void; saveSettings: () => void; blocks: AvailabilityBlock[]; addBlock: (startsAt: string, endsAt: string, reason: string) => Promise<void>; deleteBlock: (id: number) => Promise<void> }) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [reason, setReason] = useState("");
  const updateDay = (day: number, patch: Partial<{ open: string; close: string }>) => setSettings({ ...settings, weeklyHours: { ...settings.weeklyHours, [day]: settings.weeklyHours[String(day)] ? { ...settings.weeklyHours[String(day)]!, ...patch } : { open: "09:00", close: "17:00", ...patch } } });
  const toggleDay = (day: number, open: boolean) => setSettings({ ...settings, weeklyHours: { ...settings.weeklyHours, [day]: open ? { open: "09:00", close: "17:00" } : null } });
  const submitBlock = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!blockStart || !blockEnd) return;
    await addBlock(new Date(blockStart).toISOString(), new Date(blockEnd).toISOString(), reason.trim());
    setBlockStart(""); setBlockEnd(""); setReason("");
  };
  return <div><div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><div><h2 className="font-serif text-3xl text-[#191817]">Availability</h2><p className="text-sm text-[#6B625B] mt-1">Weekly hours and one-off blocked periods power the live booking calendar.</p></div><button type="button" onClick={saveSettings} className="bg-[#191817] text-white px-5 py-3 text-xs uppercase tracking-widest">Save weekly rules</button></div><div className="mt-6 bg-white border border-[#E1D9D0] p-6 sm:p-8"><div className="grid md:grid-cols-3 gap-4"><label className="text-xs uppercase tracking-wider text-[#6B625B]">Timezone<input value={settings.timezone} onChange={(event) => setSettings({ ...settings, timezone: event.target.value })} className="mt-2 w-full border border-[#D8D0C8] p-3" /></label><label className="text-xs uppercase tracking-wider text-[#6B625B]">Slot duration<input type="number" min={15} max={240} value={settings.slotMinutes} onChange={(event) => setSettings({ ...settings, slotMinutes: Number(event.target.value) })} className="mt-2 w-full border border-[#D8D0C8] p-3" /></label><label className="text-xs uppercase tracking-wider text-[#6B625B]">Max days ahead<input type="number" min={1} max={730} value={settings.maxDaysAhead} onChange={(event) => setSettings({ ...settings, maxDaysAhead: Number(event.target.value) })} className="mt-2 w-full border border-[#D8D0C8] p-3" /></label></div><label className="block mt-5 text-xs uppercase tracking-wider text-[#6B625B]">Bookable time slots<input value={settings.slotTimes.join(", ")} onChange={(event) => setSettings({ ...settings, slotTimes: event.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} className="mt-2 w-full border border-[#D8D0C8] p-3" /></label><div className="mt-7 space-y-3">{days.map((label, day) => { const hours = settings.weeklyHours[String(day)]; return <div key={label} className="grid grid-cols-[1fr_auto] sm:grid-cols-[160px_1fr_auto] items-center gap-3 border-t border-[#EEE9E3] pt-3"><span className="text-sm text-[#191817]">{label}</span>{hours ? <div className="grid grid-cols-2 gap-2"><input type="time" value={hours.open} onChange={(event) => updateDay(day, { open: event.target.value })} className="border border-[#D8D0C8] p-2.5" /><input type="time" value={hours.close} onChange={(event) => updateDay(day, { close: event.target.value })} className="border border-[#D8D0C8] p-2.5" /></div> : <span className="text-sm text-[#8C7A6B]">Closed</span>}<button type="button" onClick={() => toggleDay(day, !hours)} className="border border-[#D8D0C8] px-3 py-2 text-[10px] uppercase tracking-wider">{hours ? "Close" : "Open"}</button></div>; })}</div></div><div className="mt-6 bg-white border border-[#E1D9D0] p-6 sm:p-8"><div className="flex items-start justify-between gap-5"><div><span className="text-[10px] uppercase tracking-[0.18em] text-[#8C7A6B]">One-off closures</span><h3 className="font-serif text-2xl mt-2">Block holidays, shoots, travel or private dates.</h3><p className="mt-2 text-sm text-[#6B625B]">The public booking calendar will automatically hide slots that overlap a blocked period.</p></div></div><form onSubmit={submitBlock} className="mt-6 grid lg:grid-cols-[1fr_1fr_1.2fr_auto] gap-3 items-end"><label className="text-xs uppercase tracking-wider text-[#6B625B]">Starts<input type="datetime-local" value={blockStart} onChange={(event) => setBlockStart(event.target.value)} className="mt-2 w-full border border-[#D8D0C8] p-3" required /></label><label className="text-xs uppercase tracking-wider text-[#6B625B]">Ends<input type="datetime-local" value={blockEnd} onChange={(event) => setBlockEnd(event.target.value)} className="mt-2 w-full border border-[#D8D0C8] p-3" required /></label><label className="text-xs uppercase tracking-wider text-[#6B625B]">Reason<input value={reason} onChange={(event) => setReason(event.target.value)} className="mt-2 w-full border border-[#D8D0C8] p-3" placeholder="Wedding, travel, private event…" /></label><button className="min-h-12 bg-[#191817] text-white px-5 text-xs uppercase tracking-widest">Block time</button></form><div className="mt-6 space-y-3">{blocks.map((block) => <div key={block.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#EEE9E3] pt-4"><div><p className="text-sm text-[#191817]">{new Date(block.starts_at).toLocaleString()} → {new Date(block.ends_at).toLocaleString()}</p><p className="text-xs text-[#8C7A6B]">{block.reason || "Unavailable"}</p></div><button type="button" onClick={() => deleteBlock(block.id)} className="border px-3 py-2 text-xs uppercase tracking-wider">Remove</button></div>)}{!blocks.length && <p className="pt-4 text-sm text-[#8C7A6B]">No one-off closures are scheduled.</p>}</div></div></div>;
}

function Inquiries({ inquiries }: { inquiries: any[] }) {
  return <div><h2 className="font-serif text-3xl text-[#191817]">Inquiries</h2><p className="text-sm text-[#6B625B] mt-1">Latest client messages from the website inquiry form.</p><div className="mt-6 grid lg:grid-cols-2 gap-5">{inquiries.map((inquiry) => <article key={inquiry.id} className="bg-white border border-[#E1D9D0] p-6"><div className="flex justify-between gap-4"><div><h3 className="font-serif text-2xl text-[#191817]">{inquiry.name}</h3><a href={`mailto:${inquiry.email}`} className="text-sm text-[#8C7A6B] underline">{inquiry.email}</a></div><span className="text-[10px] uppercase tracking-wider text-[#8C7A6B]">{String(inquiry.createdAt).slice(0, 10)}</span></div><div className="mt-5 grid sm:grid-cols-2 gap-3 text-xs text-[#5E5247]"><span><strong>Service:</strong> {inquiry.service}</span><span><strong>Event:</strong> {inquiry.eventDate || "—"}</span><span><strong>Venue:</strong> {inquiry.locationVenue || "—"}</span><span><strong>Guests:</strong> {inquiry.guestCount || "—"}</span></div><p className="mt-5 pt-5 border-t border-[#EEE9E3] text-sm leading-relaxed text-[#5E5247] whitespace-pre-wrap">{inquiry.message}</p></article>)}{inquiries.length === 0 && <div className="lg:col-span-2 p-10 border border-dashed border-[#D8D0C8] text-center text-[#8C7A6B]">No inquiries yet.</div>}</div></div>;
}

async function optimizeImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const max = 2400;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Image processing is unavailable in this browser.");
  ctx.drawImage(bitmap, 0, 0, width, height);
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Could not encode image.")), "image/webp", 0.84));
  bitmap.close();
  const name = `${file.name.replace(/\.[^.]+$/, "")}.webp`;
  return { file: new File([blob], name, { type: "image/webp" }), title: file.name.replace(/\.[^.]+$/, ""), width, height };
}
