import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from '@/lib/router-hooks';
import {
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Phone,
  Clock,
  ArrowUpRight,
  Copy,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PageTransition } from '../components/motion/PageTransition';
import { businessInfo } from '../data/business';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  investmentTier?: string;
  message?: string;
  general?: string;
}

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') || 'weddings';
  const packageParam = searchParams.get('package') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceParam,
    packageTier: packageParam,
    eventDate: '',
    locationVenue: '',
    guestCount: '',
    investmentTier: 'not-sure',
    scopePreference: 'Signature Wedding Collection',
    message: '',
    website_hp: '', // Anti-spam honeypot (must stay empty)
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [confirmedInquiryId, setConfirmedInquiryId] = useState('');
  const [copied, setCopied] = useState(false);

  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const errorBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
    if (packageParam) {
      setFormData((prev) => ({ ...prev, packageTier: packageParam }));
    }
  }, [serviceParam, packageParam]);

  useEffect(() => {
    if (status === 'success' && successHeadingRef.current) {
      successHeadingRef.current.focus();
    } else if (status === 'error' && errorBannerRef.current) {
      errorBannerRef.current.focus();
    }
  }, [status]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanMessage = formData.message.trim();
    const cleanGuestCount = formData.guestCount.trim();

    if (!cleanName) {
      newErrors.name = 'Please provide your full name.';
    } else if (cleanName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    } else if (cleanName.length > 120) {
      newErrors.name = 'Name must be 120 characters or fewer.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(cleanEmail)) {
      newErrors.email = 'Please provide a valid email address.';
    } else if (cleanEmail.length > 255) {
      newErrors.email = 'Email address is too long.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service category.';
    }

    if (cleanGuestCount.length > 32) {
      newErrors.general = 'Guest count is too long.';
    }

    if (!cleanMessage) {
      newErrors.message = 'Please share a brief note about your vision, date, or event.';
    } else if (cleanMessage.length < 5) {
      newErrors.message = 'Please provide a few more details (minimum 5 characters).';
    } else if (cleanMessage.length > 4000) {
      newErrors.message = 'Message must be under 4,000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanGuestCount = formData.guestCount.trim();

    // Prevent duplicate submissions
    if (status === 'submitting') return;

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setServerErrorMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          eventDate: formData.eventDate.trim(),
          locationVenue: formData.locationVenue.trim(),
          guestCount: cleanGuestCount,
          investmentTier: formData.investmentTier,
          scopePreference: formData.scopePreference,
          message: formData.message.trim(),
          website_hp: formData.website_hp,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setConfirmedInquiryId(data.inquiryId || 'CONFIRMED');
        setStatus('success');
      } else {
        const errorMsg =
          data.error ||
          'Something went wrong while sending your inquiry. Please try again or contact us directly by email or phone.';
        setServerErrorMessage(errorMsg);
        if (data.validationErrors) {
          setErrors((prev) => ({ ...prev, ...data.validationErrors }));
        }
        setStatus('error');
      }
    } catch (networkError) {
      console.error('[ContactForm] Network or fetch failure:', networkError);
      setServerErrorMessage(
        'Unable to reach the studio submission server. Please check your connection or contact us directly via email or telephone.'
      );
      setStatus('error');
    }
  };

  const generateCleanSummaryText = () => {
    return `RBONSU Photography Commission Inquiry
----------------------------------------
Name: ${formData.name.trim()}
Email: ${formData.email.trim()}
Phone: ${formData.phone.trim() || 'Not provided'}
Service: ${formData.service}
Scope: ${formData.scopePreference}
Preferred Date: ${formData.eventDate.trim() || 'Flexible / To be discussed'}
Location / Venue: ${formData.locationVenue.trim() || 'To be confirmed'}
Guest Count: ${formData.guestCount.trim() || 'To be confirmed'}
Investment: ${formData.investmentTier}

Vision & Details:
${formData.message.trim()}`;
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(generateCleanSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  const getDirectMailtoHref = () => {
    const subject = encodeURIComponent(
      `Photography Commission Inquiry: ${formData.name || 'Client'} — ${formData.service || 'Commission'}`
    );
    const body = encodeURIComponent(generateCleanSummaryText());
    return `mailto:${businessInfo.inquiriesEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <PageTransition>
      <SEOHead
        title="Inquiries & Date Reservations | RBONSU PHOTOGRAPHY"
        description="Check availability and request an authentic commission proposal for your wedding date, portrait session, or editorial campaign with RBONSU Photography."
        canonicalPath="/contact"
      />

      <div className="py-12 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="max-w-4xl mb-16 sm:mb-24">
            <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#5E5247]" />
              <span>Studio Reservations & Inquiries</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#191817] font-normal tracking-tight leading-[1.04] mb-6">
              Start A Conversation
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#5E5247] font-light leading-relaxed max-w-2xl">
              We accept a limited number of commissions each season to ensure uncompromising artistic
              focus for every client. Tell us about your celebration or portrait sitting below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Studio Information Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#F4F1EB] border border-[#ECE7DD] p-8 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block mb-2">
                    Studio Notice
                  </span>
                  <p className="font-serif text-lg text-[#191817] leading-relaxed">
                    {businessInfo.studioNotice}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#ECE7DD] space-y-4 text-xs">
                  <div className="flex items-start space-x-3 text-[#191817]">
                    <Mail className="w-4 h-4 text-[#8C7A6B] mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[#8C7A6B] uppercase tracking-wider text-[10px]">
                        Email Direct
                      </span>
                      <a
                        href={`mailto:${businessInfo.inquiriesEmail}`}
                        className="font-medium hover:underline text-sm text-[#191817]"
                      >
                        {businessInfo.inquiriesEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-[#191817]">
                    <Phone className="w-4 h-4 text-[#8C7A6B] mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[#8C7A6B] uppercase tracking-wider text-[10px]">
                        Studio Telephone
                      </span>
                      <a
                        href={businessInfo.phoneTel || 'tel:+15712656674'}
                        className="font-medium hover:underline text-sm text-[#191817]"
                        aria-label={`Call studio at ${businessInfo.phone}`}
                      >
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-[#191817]">
                    <MapPin className="w-4 h-4 text-[#8C7A6B] mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[#8C7A6B] uppercase tracking-wider text-[10px]">
                        Base Location
                      </span>
                      <span className="text-sm">{businessInfo.location}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-[#191817]">
                    <Clock className="w-4 h-4 text-[#8C7A6B] mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[#8C7A6B] uppercase tracking-wider text-[10px]">
                        Studio Hours
                      </span>
                      <span className="text-sm">{businessInfo.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Studio Workflow */}
              <div className="bg-[#FAF8F5] border border-[#ECE7DD] p-8 space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block">
                  Studio Workflow
                </span>
                <div className="space-y-3 text-xs text-[#5E5247] leading-relaxed">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#191817] font-semibold">1.</span>
                    <p>We review your date, location, and brief within 24–48 business hours.</p>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#191817] font-semibold">2.</span>
                    <p>You receive our tailored investment guide and available collection tiers.</p>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#191817] font-semibold">3.</span>
                    <p>We connect via call or consultation to finalize logistics and reserve your date.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Inquiry Form */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#ECE7DD] p-8 sm:p-12 shadow-sm">
              {status === 'success' ? (
                <div
                  id="inquiry-success-message"
                  className="py-6 space-y-6"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-14 h-14 rounded-full bg-[#191817] text-[#FAF8F5] flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-[#FAF8F5]" />
                  </div>

                  <div>
                    <h2
                      ref={successHeadingRef}
                      tabIndex={-1}
                      className="font-serif text-3xl text-[#191817] font-normal mb-2 focus:outline-none"
                    >
                      Inquiry Received
                    </h2>
                    <p className="font-sans text-sm text-[#5E5247] font-light leading-relaxed">
                      Thank you, <strong className="text-[#191817] font-medium">{formData.name}</strong>.
                      Your commission inquiry has been securely stored in our studio system. Richmond will
                      review your celebration details and respond with availability.
                    </p>
                    {confirmedInquiryId && (
                      <p className="text-xs font-mono text-[#8C7A6B] mt-2">
                        Reference Number: <span className="text-[#191817]">{confirmedInquiryId}</span>
                      </p>
                    )}
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#FAF8F5] border border-[#ECE7DD] p-5 text-xs text-[#5E5247] space-y-2.5">
                    <div className="flex justify-between items-center pb-2 border-b border-[#ECE7DD]">
                      <span className="uppercase tracking-widest text-[10px] text-[#8C7A6B] font-medium">
                        Submitted Details
                      </span>
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center space-x-1 p-2 -m-2 min-h-11 text-[#191817] hover:underline cursor-pointer"
                        aria-label="Copy summary to clipboard"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                      </button>
                    </div>
                    <p>
                      <strong>Service:</strong> {formData.service} ({formData.scopePreference})
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email}
                      {formData.phone ? ` • ${formData.phone}` : ''}
                    </p>
                    <p>
                      <strong>Date / Location:</strong> {formData.eventDate || 'Flexible'} /{' '}
                      {formData.locationVenue || 'To be decided'}
                    </p>
                    <p>
                      <strong>Guest Count:</strong> {formData.guestCount || 'To be confirmed'} ·{' '}
                      <strong>Investment:</strong>{' '}
                      {formData.investmentTier === '3k-5k' ? '$3k–$5k' : formData.investmentTier === '5k-8k' ? '$5k–$8k' : formData.investmentTier === '8k-plus' ? '$8k+' : formData.investmentTier === 'custom' ? 'Custom scope' : 'Not sure yet'}
                    </p>
                    <p className="line-clamp-3 text-[#7A6E63] italic">"{formData.message}"</p>
                  </div>

                  {/* Secondary Direct Options */}
                  <div className="pt-4 border-t border-[#ECE7DD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs text-[#8C7A6B]">
                      <span>Prefer email directly? </span>
                      <a
                        href={getDirectMailtoHref()}
                        className="text-[#191817] underline hover:text-[#5E5247]"
                      >
                        {businessInfo.inquiriesEmail}
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle');
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          service: 'weddings',
                          packageTier: '',
                          eventDate: '',
                          locationVenue: '',
                          guestCount: '',
                          investmentTier: 'not-sure',
                          scopePreference: 'Signature Wedding Collection',
                          message: '',
                          website_hp: '',
                        });
                      }}
                      className="font-sans text-xs uppercase tracking-[0.14em] font-medium py-3 px-5 bg-[#FAF8F5] border border-[#ECE7DD] text-[#191817] hover:border-[#191817] transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Anti-Spam Honeypot Field (Invisible to human visitors) */}
                  <div
                    style={{
                      opacity: 0,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: 0,
                      width: 0,
                      zIndex: -1,
                      overflow: 'hidden',
                    }}
                    aria-hidden="true"
                  >
                    <label htmlFor="website_hp">Leave this field blank</label>
                    <input
                      type="text"
                      id="website_hp"
                      name="website_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_hp}
                      onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                    />
                  </div>

                  {/* Server Error Alert Banner */}
                  {status === 'error' && (
                    <div
                      ref={errorBannerRef}
                      tabIndex={-1}
                      className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm space-y-2 focus:outline-none"
                      role="alert"
                    >
                      <div className="flex items-start space-x-2 font-medium">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{serverErrorMessage}</span>
                      </div>
                      <div className="pt-2 border-t border-red-200/60 flex flex-wrap gap-3">
                        <a
                          href={getDirectMailtoHref()}
                          className="font-medium underline hover:text-red-900"
                        >
                          Send via Email ({businessInfo.inquiriesEmail})
                        </a>
                        <span>•</span>
                        <a
                          href={businessInfo.phoneTel || 'tel:+15712656674'}
                          className="font-medium underline hover:text-red-900"
                          aria-label={`Call studio at ${businessInfo.phone}`}
                        >
                          Call Studio ({businessInfo.phone})
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="inquiry-name"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                        disabled={status === 'submitting'}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Alexis & Brandon"
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border ${
                          errors.name ? 'border-red-500' : 'border-[#ECE7DD]'
                        } text-sm text-[#191817] placeholder-[#BCB6AA] focus:border-[#191817] focus:outline-none transition-colors disabled:opacity-60`}
                      />
                      {errors.name && (
                        <p id="inquiry-name-error" className="text-red-600 text-xs mt-1.5 flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="inquiry-email"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                        disabled={status === 'submitting'}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="alexis@example.com"
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border ${
                          errors.email ? 'border-red-500' : 'border-[#ECE7DD]'
                        } text-sm text-[#191817] placeholder-[#BCB6AA] focus:border-[#191817] focus:outline-none transition-colors disabled:opacity-60`}
                      />
                      {errors.email && (
                        <p id="inquiry-email-error" className="text-red-600 text-xs mt-1.5 flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        disabled={status === 'submitting'}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(571) 000-0000"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DD] text-sm text-[#191817] placeholder-[#BCB6AA] focus:border-[#191817] focus:outline-none transition-colors disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-service"
                        className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                      >
                        Service Category *
                      </label>
                      <select
                        id="inquiry-service"
                        required
                        aria-required="true"
                        disabled={status === 'submitting'}
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DD] text-sm text-[#191817] focus:border-[#191817] focus:outline-none transition-colors cursor-pointer disabled:opacity-60"
                      >
                        <option value="weddings">Weddings & Destination Nuptials</option>
                        <option value="portraits">Studio Portraits & Editorial</option>
                        <option value="maternity-family">Maternity & Family Milestones</option>
                        <option value="commercial">Commercial Campaigns & Lookbooks</option>
                        <option value="other">Other Bespoke Commission</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="inquiry-date"
                        className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                      >
                        Preferred Date / Season
                      </label>
                      <input
                        type="text"
                        id="inquiry-date"
                        disabled={status === 'submitting'}
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        placeholder="e.g. October 2026 or Spring 2027"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DD] text-sm text-[#191817] placeholder-[#BCB6AA] focus:border-[#191817] focus:outline-none transition-colors disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-venue"
                        className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                      >
                        Location / Venue
                      </label>
                      <input
                        type="text"
                        id="inquiry-venue"
                        disabled={status === 'submitting'}
                        value={formData.locationVenue}
                        onChange={(e) =>
                          setFormData({ ...formData, locationVenue: e.target.value })
                        }
                        placeholder="e.g. King Street, Alexandria. VA or Destination"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DD] text-sm text-[#191817] placeholder-[#BCB6AA] focus:border-[#191817] focus:outline-none transition-colors disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="inquiry-guests"
                        className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                      >
                        Estimated Guest Count
                      </label>
                      <input
                        type="text"
                        id="inquiry-guests"
                        inputMode="numeric"
                        disabled={status === 'submitting'}
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        placeholder="e.g. 150"
                        maxLength={32}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DD] text-sm text-[#191817] placeholder-[#BCB6AA] focus:border-[#191817] focus:outline-none transition-colors disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-investment"
                        className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                      >
                        Investment Range
                      </label>
                      <select
                        id="inquiry-investment"
                        disabled={status === 'submitting'}
                        value={formData.investmentTier}
                        onChange={(e) => setFormData({ ...formData, investmentTier: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DD] text-sm text-[#191817] focus:border-[#191817] focus:outline-none transition-colors cursor-pointer disabled:opacity-60"
                      >
                        <option value="not-sure">I’m not sure yet</option>
                        <option value="3k-5k">$3,000–$5,000</option>
                        <option value="5k-8k">$5,000–$8,000</option>
                        <option value="8k-plus">$8,000+</option>
                        <option value="custom">Custom / multi-day scope</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-scope"
                      className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                    >
                      Anticipated Scope / Collection
                    </label>
                    <select
                      id="inquiry-scope"
                      disabled={status === 'submitting'}
                      value={formData.scopePreference}
                      onChange={(e) => setFormData({ ...formData, scopePreference: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DD] text-sm text-[#191817] focus:border-[#191817] focus:outline-none transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <option value="Classic Wedding Collection">Classic Wedding Collection</option>
                      <option value="Signature Wedding Collection">Signature Wedding Collection</option>
                      <option value="Destination / Multi-Day Nuptials">Destination / Multi-Day Nuptials</option>
                      <option value="Studio Portrait Sitting">Studio Portrait Sitting</option>
                      <option value="Editorial Session / Campaign">Editorial Session / Brand Campaign</option>
                      <option value="Heirloom Family / Maternity">Heirloom Family / Maternity</option>
                      <option value="Bespoke Production">Custom / Other Scope</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#191817] mb-2"
                    >
                      Your Story & Vision *
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={5}
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                      disabled={status === 'submitting'}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Please share any details about your celebration or sitting, style preferences, or specific questions..."
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border ${
                        errors.message ? 'border-red-500' : 'border-[#ECE7DD]'
                      } text-sm text-[#191817] placeholder-[#BCB6AA] focus:border-[#191817] focus:outline-none transition-colors resize-y disabled:opacity-60`}
                    />
                    {errors.message && (
                      <p id="inquiry-message-error" className="text-red-600 text-xs mt-1.5 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="font-sans text-[11px] text-[#8C7A6B]">
                      * Required fields. Submissions are securely delivered to RBONSU Photography.
                    </span>

                    <button
                      type="submit"
                      id="inquiry-submit-btn"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center font-sans text-xs uppercase tracking-[0.16em] font-medium py-4 px-8 bg-[#191817] text-[#FAF8F5] hover:bg-[#2F2C29] transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed min-w-[220px]"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#FAF8F5]" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Studio Inquiry</span>
                          <ArrowUpRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
