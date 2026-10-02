import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Clipboard, CreditCard, ExternalLink, Loader2, ShieldCheck } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { useSearchParams } from "@/lib/router-hooks";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageTransition } from "@/components/motion/PageTransition";
import { verifiedServices } from "@/data/business";
import { formatMoney } from "@/lib/money";

const serviceOptions = verifiedServices.map((service) => ({ id: service.slug, title: service.title, packages: service.packages }));

const DEFAULT_SETTINGS = {
  timezone: "America/New_York",
  slotTimes: ["09:00", "11:30", "14:00", "16:00"],
  weeklyHours: {
    "0": { open: "09:00", close: "17:00" },
    "1": { open: "09:00", close: "17:00" },
    "2": { open: "09:00", close: "17:00" },
    "3": { open: "09:00", close: "17:00" },
    "4": { open: "09:00", close: "17:00" },
    "5": { open: "09:00", close: "17:00" },
    "6": null,
  },
};

type BookingSettings = typeof DEFAULT_SETTINGS & { minAdvanceHours?: number; maxDaysAhead?: number };
type PaymentMethod = { id: string; provider: "stripe" | "payment_link"; name: string; description: string; checkoutUrl: string | null };
type CreatedBooking = { id?: string; portalUrl?: string; checkoutUrl?: string | null; paymentUrl?: string | null; service: string; date: string; time: string; timezone: string; currency: string; depositCents: number; paymentRequired: boolean; paymentMethod: string | null };

type PortalBooking = {
  id: string; name: string; email: string; phone: string; service: string; packageId: string; bookingDate: string; bookingTime: string; timezone: string; location: string; guestCount: string; notes: string; status: string; paymentStatus: string; paymentMethodId: string | null; paymentProvider: string | null; currency: string; depositCents: number; totalCents: number; balanceCents: number; paymentExpiresAt: string | null; createdAt: string;
};

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const paymentResult = searchParams.get("payment") ?? "";
  const [portal, setPortal] = useState<PortalBooking | null>(null);
  const [portalMethods, setPortalMethods] = useState<PaymentMethod[]>([]);
  const [settings, setSettings] = useState<BookingSettings>(DEFAULT_SETTINGS);
  const [date, setDate] = useState(() => addDays(new Date(), 2));
  const [slots, setSlots] = useState<Array<{ time: string; available: boolean }>>([]);
  const [paymentRequired, setPaymentRequired] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentCurrency, setPaymentCurrency] = useState("USD");
  const [depositCents, setDepositCents] = useState(10000);
  const [defaultMethodId, setDefaultMethodId] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [payingBalance, setPayingBalance] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [createdBooking, setCreatedBooking] = useState<CreatedBooking | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "weddings", packageId: "pkg-wedding-signature", location: "", guestCount: "", notes: "", paymentMethodId: "", website_hp: "" });

  const selectedService = useMemo(() => serviceOptions.find((service) => service.id === form.service) ?? serviceOptions[0], [form.service]);

  const loadPortal = useCallback(async () => {
    if (!token && !paymentResult) return;
    // Exchanges the emailed token for a short-lived, HttpOnly-cookie-bound
    // portal session. On success, immediately strip the token from the
    // visible URL so it doesn't linger in browser history, screenshots, or
    // shared links — the cookie carries the session from here on. When
    // there's no token (e.g. returning from a balance-payment redirect),
    // the request relies entirely on the existing session cookie.
    const response = await fetch(token ? `/api/booking-portal?token=${encodeURIComponent(token)}` : "/api/booking-portal", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    setPortal(data.booking ?? null);
    setPortalMethods(data.paymentMethods ?? []);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("token")) {
        url.searchParams.delete("token");
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      }
    }
  }, [token, paymentResult]);

  useEffect(() => {
    fetch("/api/booking-settings", { headers: { Accept: "application/json" } })
      .then((response) => response.json())
      .then((data) => { if (data.settings) setSettings(data.settings); })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    setLoadingPayments(true);
    fetch("/api/payment-methods", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setPaymentRequired(data.paymentRequired !== false);
        setPaymentCurrency(data.currency || "USD");
        setDepositCents(Number(data.depositCents || 0));
        setDefaultMethodId(data.defaultMethodId || "");
        setPaymentMethods(data.methods || []);
        if (data.defaultMethodId) setForm((current) => ({ ...current, paymentMethodId: current.paymentMethodId || data.defaultMethodId }));
      })
      .catch(() => undefined)
      .finally(() => setLoadingPayments(false));
  }, []);

  useEffect(() => {
    if (!token && !paymentResult) return;
    loadPortal().catch(() => undefined);
  }, [token, paymentResult, loadPortal]);

  useEffect(() => {
    const load = async () => {
      setLoadingSlots(true); setSelectedTime("");
      try {
        const response = await fetch(`/api/booking-availability?date=${encodeURIComponent(date)}`, { cache: "no-store" });
        const data = await response.json(); setSlots(data.slots ?? []);
      } catch { setSlots([]); } finally { setLoadingSlots(false); }
    };
    load();
  }, [date]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedTime) { setStatus("Choose an available time first."); return; }
    if (paymentRequired && !form.paymentMethodId) { setStatus("Choose a payment method to continue."); return; }
    setSubmitting(true); setStatus("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, date, time: selectedTime }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Booking could not be created.");
      const created: CreatedBooking = { ...data.booking, id: data.bookingId, portalUrl: data.portalUrl, checkoutUrl: data.checkoutUrl, paymentUrl: data.paymentUrl };
      setCreatedBooking(created);
      setForm((current) => ({ ...current, name: "", email: "", phone: "", location: "", guestCount: "", notes: "" }));
      if (data.checkoutUrl) window.location.assign(data.checkoutUrl);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Booking could not be created.");
    } finally { setSubmitting(false); }
  };

  const cancelBooking = async () => {
    if (!portal) return;
    // Authenticated by the portal session cookie set during loadPortal(); no
    // token is sent in the request body.
    const response = await fetch("/api/booking-portal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "cancel" }) });
    const data = await response.json();
    if (response.ok) setPortal(data.booking); else setStatus(data.error || "Unable to cancel this booking.");
  };

  const payBalance = async () => {
    if (!portal || portal.balanceCents <= 0) return;
    setPayingBalance(true); setStatus("");
    try {
      const method = portalMethods.find((item) => item.id === portal.paymentMethodId) ?? portalMethods[0];
      const response = await fetch("/api/payment-balance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paymentMethodId: method?.id }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Unable to start balance payment.");
      if (data.checkoutUrl || data.paymentUrl) window.location.assign(data.checkoutUrl || data.paymentUrl);
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to start balance payment."); } finally { setPayingBalance(false); }
  };

  if (portal) {
    const paymentLabel = portal.paymentStatus === "paid" ? "Paid in full" : portal.paymentStatus === "partially_paid" ? "Deposit received" : "Payment pending";
    return (
      <PageTransition>
        <SEOHead title="Your Booking | RBONSU PHOTOGRAPHY" description="Private RBONSU Photography client booking portal." canonicalPath="/booking" />
        <div className="min-h-screen bg-[#FAF8F5] py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B]">Private client portal</p>
            <h1 className="font-serif text-5xl sm:text-6xl mt-3 text-[#191817]">Welcome, {String(portal.name).split(" ")[0]}.</h1>
            <div className="mt-10 bg-white border border-[#E5DED6] p-7 sm:p-10">
              <div className="flex items-center gap-3 text-sm text-[#5E5247]"><CheckCircle2 className="w-5 h-5" /> <span>{portal.status === "confirmed" ? "Booking confirmed" : portal.status === "cancelled" ? "Booking cancelled" : portal.status === "pending_payment" ? "Booking awaiting payment" : "Booking received"}</span></div>
              <h2 className="font-serif text-3xl mt-7 text-[#191817]">{portal.service}</h2>
              <p className="mt-2 text-[#6B625B]">{portal.bookingDate} · {portal.bookingTime} · {portal.timezone}</p>
              {portal.location && <p className="mt-2 text-sm text-[#6B625B]">Location: {portal.location}</p>}
              <div className="grid sm:grid-cols-3 gap-5 mt-9">
                <Summary label="Status" value={portal.status} />
                <Summary label="Payment" value={paymentLabel} />
                <Summary label="Balance" value={formatMoney(portal.balanceCents, portal.currency)} />
              </div>
              {portal.status === "pending_payment" && portal.paymentExpiresAt && <p className="mt-6 text-xs text-[#8C7A6B]">Payment reservation expires at {new Date(portal.paymentExpiresAt).toLocaleString()}.</p>}
              {portal.balanceCents > 0 && portal.status !== "cancelled" && portal.status !== "expired" && <button type="button" disabled={payingBalance} onClick={payBalance} className="mt-8 inline-flex w-full min-h-12 items-center justify-center gap-2 bg-[#191817] text-[#FAF8F5] uppercase tracking-widest text-xs disabled:opacity-50">{payingBalance ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />} Pay {formatMoney(portal.balanceCents, portal.currency)}</button>}
              {portal.status !== "cancelled" && portal.status !== "expired" && <button type="button" onClick={cancelBooking} className="mt-3 inline-flex items-center justify-center w-full min-h-12 border border-[#191817] text-[#191817] uppercase tracking-widest text-xs hover:bg-[#191817] hover:text-white transition-colors">Cancel booking</button>}
              {paymentResult === "success" && <div className="mt-4 bg-[#F1F6EF] border border-[#CDDCC8] p-4 text-sm text-[#466046]">Payment returned successfully. Payment confirmation may take a moment; refresh to see the updated status.</div>}
              {paymentResult === "cancelled" && <div className="mt-4 bg-[#FBF2EE] border border-[#E4CFC7] p-4 text-sm text-[#7D3E2A]">Payment was cancelled. Your booking remains in the portal while its payment window is still active.</div>}
              <div className="mt-4 flex gap-3"><button type="button" onClick={() => loadPortal().catch(() => undefined)} className="flex-1 border border-[#D8D0C8] px-4 py-3 text-xs uppercase tracking-widest">Refresh status</button></div>
              {status && <p className="mt-4 text-sm text-red-700">{status}</p>}
            </div>
            <div className="mt-5 flex flex-wrap gap-3"><Link to="/work" className="inline-flex items-center border border-[#D8D0C8] px-5 py-3 text-xs uppercase tracking-widest">View portfolio <ArrowRight className="w-4 h-4 ml-2" /></Link><a href={`/api/calendar/${encodeURIComponent(String(portal.id))}`} className="inline-flex items-center border border-[#D8D0C8] px-5 py-3 text-xs uppercase tracking-widest">Add to calendar <CalendarDays className="w-4 h-4 ml-2" /></a></div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (createdBooking) {
    return (
      <PageTransition>
        <SEOHead title="Booking Created | RBONSU PHOTOGRAPHY" description="Your RBONSU Photography booking has been created." canonicalPath="/booking" />
        <div className="min-h-screen bg-[#FAF8F5] py-20 sm:py-28">
          <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-[#191817] text-white flex items-center justify-center"><CheckCircle2 className="w-7 h-7" /></div>
            <p className="mt-7 text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B]">Booking created</p>
            <h1 className="font-serif text-5xl sm:text-6xl mt-3 text-[#191817]">Your date is being held.</h1>
            <p className="mt-5 text-[#5E5247] leading-relaxed">Complete the payment step to secure the reservation. You can also use your private portal to review the booking later.</p>
            <div className="mt-10 bg-white border border-[#E5DED6] p-7 text-left grid sm:grid-cols-2 gap-5"><Summary label="Service" value={createdBooking.service} /><Summary label="Date" value={createdBooking.date} /><Summary label="Time" value={`${createdBooking.time} ${createdBooking.timezone}`} /><Summary label="Deposit" value={createdBooking.paymentRequired ? formatMoney(createdBooking.depositCents, createdBooking.currency) : "Not required"} /></div>
            {createdBooking.checkoutUrl || createdBooking.paymentUrl ? <a href={createdBooking.checkoutUrl || createdBooking.paymentUrl || "#"} className="mt-8 w-full inline-flex min-h-14 items-center justify-center gap-2 bg-[#191817] text-[#FAF8F5] uppercase tracking-[0.16em] text-xs font-medium">Pay deposit <CreditCard className="w-4 h-4" /></a> : <div className="mt-8 border border-[#CDDCC8] bg-[#F1F6EF] p-5 text-left text-sm text-[#466046] flex gap-3"><ShieldCheck className="w-5 h-5 shrink-0" />No online payment is required right now. The studio can confirm the request from the admin dashboard.</div>}
            {createdBooking.paymentUrl && !createdBooking.checkoutUrl && <p className="mt-3 text-xs text-[#8C7A6B] flex items-center justify-center gap-2"><ExternalLink className="w-3.5 h-3.5" /> You'll be taken to the payment provider's page.</p>}
            {createdBooking.portalUrl && <div className="mt-5"><a href={createdBooking.portalUrl} className="inline-flex items-center text-xs uppercase tracking-widest font-medium">Open your booking portal <ArrowRight className="w-4 h-4 ml-2" /></a></div>}
            <button type="button" className="mt-5 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest border border-[#D8D0C8] px-5 py-3" onClick={() => navigator.clipboard?.writeText(`${createdBooking.date} ${createdBooking.time} ${createdBooking.timezone}`)}><Clipboard className="w-4 h-4" /> Copy booking time</button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const selectedPaymentMethod = paymentMethods.find((method) => method.id === form.paymentMethodId) ?? paymentMethods.find((method) => method.id === defaultMethodId);
  return (
    <PageTransition>
      <SEOHead title="Book a Session | RBONSU PHOTOGRAPHY" description="Reserve a photography session with RBONSU Photography." canonicalPath="/booking" />
      <div className="min-h-screen bg-[#FAF8F5] py-14 sm:py-24"><div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-12"><p className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] mb-4">Studio Reservations</p><h1 className="font-serif text-5xl sm:text-7xl leading-none text-[#191817]">Reserve your date.</h1><p className="mt-6 text-[#5E5247] text-lg leading-relaxed">Select a photography service, choose an available studio slot, and complete the booking step securely online.</p></div>
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8">
          <form onSubmit={submit} className="bg-white border border-[#E5DED6] p-6 sm:p-9 space-y-7">
            <section><Step n="01" title="Your details" /><div className="grid sm:grid-cols-2 gap-4"><Field label="Full name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required /><Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required /><Field label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} /><Field label="Location / venue" value={form.location} onChange={(value) => setForm({ ...form, location: value })} /></div></section>
            <section><Step n="02" title="Service" /><label className="block text-xs uppercase tracking-wider text-[#6B625B] mb-3">Photography service<select value={form.service} onChange={(event) => { const service = serviceOptions.find((item) => item.id === event.target.value)!; setForm({ ...form, service: service.id, packageId: service.packages[0]?.id ?? "" }); }} className="mt-2 w-full border border-[#D8D0C8] bg-[#FAF8F5] px-4 py-3">{serviceOptions.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}</select></label><label className="block text-xs uppercase tracking-wider text-[#6B625B]">Collection / package<select value={form.packageId} onChange={(event) => setForm({ ...form, packageId: event.target.value })} className="mt-2 w-full border border-[#D8D0C8] bg-[#FAF8F5] px-4 py-3">{selectedService.packages.map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.name}</option>)}</select></label></section>
            <section><Step n="03" title="Date & time" /><label className="block text-xs uppercase tracking-wider text-[#6B625B]">Preferred date<input type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full border border-[#D8D0C8] bg-[#FAF8F5] px-4 py-3" required /></label><div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">{loadingSlots ? <div className="col-span-full flex items-center gap-2 text-sm text-[#6B625B]"><Loader2 className="w-4 h-4 animate-spin" /> Checking availability…</div> : slots.map((slot) => <button type="button" key={slot.time} disabled={!slot.available} onClick={() => setSelectedTime(slot.time)} className={`min-h-11 border px-3 py-3 text-sm transition-colors ${selectedTime === slot.time ? "border-[#191817] bg-[#191817] text-white" : slot.available ? "border-[#D8D0C8] bg-white hover:border-[#191817]" : "border-[#E9E4DF] text-[#B5ACA4] line-through"}`}>{slot.time}</button>)} {!loadingSlots && slots.length === 0 && <p className="col-span-full text-sm text-[#8C7A6B]">No slots are available for this date. Choose another date.</p>}</div><p className="mt-2 text-xs text-[#8C7A6B]">{settings.timezone} · availability is live.</p></section>
            {paymentRequired && <section><Step n="04" title="Payment" />{loadingPayments ? <div className="flex gap-2 text-sm text-[#6B625B]"><Loader2 className="w-4 h-4 animate-spin" /> Loading payment methods…</div> : paymentMethods.length === 0 ? <div className="border border-[#E4CFC7] bg-[#FBF2EE] p-4 text-sm text-[#7D3E2A]">Online payment is currently unavailable. Please use the Contact page to request this booking.</div> : <div className="grid gap-3">{paymentMethods.map((method) => <label key={method.id} className={`flex items-start gap-3 border p-4 cursor-pointer transition-colors ${form.paymentMethodId === method.id ? "border-[#191817] bg-[#FAF8F5]" : "border-[#D8D0C8]"}`}><input type="radio" name="paymentMethodId" value={method.id} checked={form.paymentMethodId === method.id} onChange={() => setForm({ ...form, paymentMethodId: method.id })} className="mt-1" /><span><strong className="block text-sm text-[#191817]">{method.name}</strong><span className="block mt-1 text-xs text-[#6B625B]">{method.description || (method.provider === "stripe" ? "Secure hosted card checkout." : "Continue to the payment provider.")}</span></span></label>)}</div>}{selectedPaymentMethod && <p className="mt-4 text-sm text-[#5E5247]">Deposit due now: <strong>{formatMoney(depositCents, paymentCurrency)}</strong></p>}<p className="mt-2 flex items-center gap-2 text-xs text-[#8C7A6B]"><ShieldCheck className="w-4 h-4" /> Card details are handled by the payment provider, not stored by this website.</p></section>}
            <section><Step n={paymentRequired ? "05" : "04"} title="Final details" /><div className="grid sm:grid-cols-2 gap-4"><Field label="Guest count" value={form.guestCount} onChange={(value) => setForm({ ...form, guestCount: value })} /><div /><label className="sm:col-span-2 block text-xs uppercase tracking-wider text-[#6B625B]">Notes<textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows={5} className="mt-2 w-full border border-[#D8D0C8] bg-[#FAF8F5] px-4 py-3" placeholder="Tell us about the session, venue, or anything you want us to know." /></label></div><div className="hidden" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website_hp} onChange={(event) => setForm({ ...form, website_hp: event.target.value })} /></label></div></section>
            {status && <div className="bg-[#FBF2EE] border border-[#E4CFC7] text-[#7D3E2A] px-4 py-3 text-sm">{status}</div>}
            <button type="submit" disabled={submitting || (paymentRequired && !paymentMethods.length)} className="w-full min-h-14 bg-[#191817] text-[#FAF8F5] uppercase tracking-[0.16em] text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50">{submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : paymentRequired ? <CreditCard className="w-4 h-4" /> : <CalendarDays className="w-4 h-4" />} {submitting ? "Creating booking…" : paymentRequired ? `Reserve & pay ${formatMoney(depositCents, paymentCurrency)}` : "Request this time"}</button>
          </form>
          <aside className="space-y-6"><div className="bg-[#191817] text-[#FAF8F5] p-7 sm:p-9"><span className="text-[10px] uppercase tracking-[0.25em] text-[#A69280]">Booking notes</span><h2 className="font-serif text-3xl mt-4">A calm, simple first step.</h2><div className="mt-7 space-y-4 text-sm text-[#D8D3CA] leading-relaxed"><p>Choose a service and time that works for you. When online payment is enabled, the selected deposit is collected securely before the reservation is confirmed.</p><p>Need something outside the listed times? Use the Contact page to request a custom schedule.</p></div></div><div className="bg-[#F4F1EB] border border-[#ECE7DD] p-7"><span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B]">Current studio hours</span><div className="mt-5 space-y-2 text-sm">{Object.entries(settings.weeklyHours).map(([day, hours]) => <div key={day} className="flex justify-between gap-4 border-b border-[#E2DBD2] pb-2 last:border-0"><span>{dayName(Number(day))}</span><span className="text-[#6B625B]">{hours ? `${hours.open}–${hours.close}` : "Closed"}</span></div>)}</div></div></aside>
        </div>
      </div></div>
    </PageTransition>
  );
};

function Field({ label, value, onChange, required = false, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) { return <label className="block text-xs uppercase tracking-wider text-[#6B625B]">{label}{required && <span className="text-[#8C7A6B]"> *</span>}<input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full border border-[#D8D0C8] bg-[#FAF8F5] px-4 py-3" /></label>; }
function Step({ n, title }: { n: string; title: string }) { return <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#ECE7DD]"><span className="text-[10px] tracking-[0.18em] text-[#8C7A6B]">{n}</span><h2 className="font-serif text-2xl text-[#191817]">{title}</h2></div>; }
function Summary({ label, value }: { label: string; value: string }) { return <div><span className="block text-[10px] uppercase tracking-[0.18em] text-[#8C7A6B] mb-1">{label}</span><span className="text-sm text-[#191817] break-words">{value}</span></div>; }

function addDays(date: Date, days: number) { const value = new Date(date); value.setDate(value.getDate() + days); return value.toISOString().slice(0, 10); }
function dayName(day: number) { return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day] ?? "Day"; }
