import {useEffect, useRef, useState, type FormEvent} from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import {
  COMPANY_INFO,
  SERVICE_TYPE_OPTIONS,
  type ServiceTypeOption,
} from '../config/emailConfig';
import {
  buildMailtoFallbackUrl,
  submitAppointmentRequest,
  type AppointmentRequestData,
  type PreferredTimeOption,
} from '../services/emailService';
import {SocialLinks} from './SocialLinks';

interface BookingSectionProps {
  selectedService?: ServiceTypeOption;
}

type FormErrors = Partial<Record<keyof AppointmentRequestData, string>>;

const INITIAL_FORM_DATA: AppointmentRequestData = {
  fullName: '',
  email: '',
  phone: '',
  serviceType: 'Residential Electrical',
  preferredDate: '',
  preferredTime: 'Flexible',
  projectAddress: '',
  message: '',
  consent: false,
};

function validateForm(data: AppointmentRequestData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const digitCount = data.phone.replace(/\D/g, '').length;
  if (!data.phone.trim() || digitCount < 7) {
    errors.phone = 'Please enter a valid phone number (at least 7 digits).';
  }

  if (!data.serviceType) {
    errors.serviceType = 'Please select a service type.';
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Please briefly describe your electrical needs (at least 10 characters).';
  }

  if (!data.consent) {
    errors.consent = 'Please confirm that we may contact you regarding your service request.';
  }

  return errors;
}

export function BookingSection({selectedService}: BookingSectionProps) {
  const [formData, setFormData] = useState<AppointmentRequestData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isSubmittingRef = useRef(false);

  const todayIso = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        serviceType: selectedService,
      }));
    }
  }, [selectedService]);

  const updateField = <K extends keyof AppointmentRequestData>(
    field: K,
    value: AppointmentRequestData[K],
  ) => {
    setFormData((prev) => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors((prev) => {
        const next = {...prev};
        delete next[field];
        return next;
      });
    }
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmittingRef.current || status === 'submitting') {
      return;
    }

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(`booking-${firstErrorField}`);
      el?.focus();
      return;
    }

    isSubmittingRef.current = true;
    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitAppointmentRequest(formData);
      setStatus('success');
      setErrors({});
    } catch (err) {
      setStatus('error');
      const msg =
        err instanceof Error
          ? err.message
          : 'We could not send your request automatically right now. Please try again or contact us directly.';
      setErrorMessage(msg);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleReset = () => {
    setFormData({
      ...INITIAL_FORM_DATA,
      serviceType: selectedService || 'Residential Electrical',
    });
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section
      id="booking"
      className="bg-slate-50 border-t border-slate-200 py-14 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg grid grid-cols-1 lg:grid-cols-12 bg-white">
          {/* Dark Navy Left Conversion Rail */}
          <div className="lg:col-span-5 bg-[#071426] text-white p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-sky-300 tracking-wide mb-2">
                Book Electrical Service
              </p>
              <h2
                className="font-display font-bold text-white tracking-tight leading-tight mb-3"
                style={{
                  fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)',
                  textWrap: 'balance',
                }}
              >
                Let&apos;s Get Your Electrical Project Started
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-7">
                Tell us what you need. Our team will get in touch to discuss your electrical
                service request.
              </p>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div>
                  <p className="font-display font-bold text-lg text-white">{COMPANY_INFO.name}</p>
                  <p className="text-sm text-slate-300">
                    {COMPANY_INFO.contactPerson} · {COMPANY_INFO.contactRole}
                  </p>
                </div>

                <div className="space-y-2.5 text-sm">
                  <a
                    href={COMPANY_INFO.phoneHref}
                    className="flex items-center gap-3 text-slate-100 hover:text-sky-300 transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#F97316] shrink-0" aria-hidden="true" />
                    <span className="font-semibold">{COMPANY_INFO.phone}</span>
                  </a>

                  <a
                    href={COMPANY_INFO.altPhoneHref}
                    className="flex items-center gap-3 text-slate-300 hover:text-sky-300 transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    <span>Alt: {COMPANY_INFO.altPhone}</span>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="flex items-center gap-3 text-slate-100 hover:text-sky-300 transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                    <span>{COMPANY_INFO.email}</span>
                  </a>

                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                    <span>{COMPANY_INFO.shortLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs font-semibold text-slate-400 mb-3">
                Connect with @olympiaelectricltd
              </p>
              <SocialLinks variant="dark" />
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 p-6 sm:p-9">
            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="py-10 text-center max-w-md mx-auto"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">
                  Appointment Request Sent
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-7">
                  Thank you! Your appointment request has been received. We&apos;ll be in touch
                  soon.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#0A1628] hover:bg-[#14294A] rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                  <a
                    href={COMPANY_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>Call {COMPANY_INFO.phone}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {status === 'error' && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-semibold">Unable to send request automatically</p>
                        <p className="text-red-800 mt-1">{errorMessage}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pl-8">
                      <a
                        href={buildMailtoFallbackUrl(formData)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#D9480F] hover:bg-[#C2410C] rounded-md transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Send via Your Email App</span>
                      </a>
                      <a
                        href={COMPANY_INFO.phoneHref}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors tabular-nums"
                      >
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Call {COMPANY_INFO.phone}</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. Full Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="booking-fullName"
                      className="block text-sm font-semibold text-slate-800 mb-1"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="booking-fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane MacLeod"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#0284C7] focus:ring-sky-200'
                      }`}
                    />
                    {errors.fullName && (
                      <p id="error-fullName" className="mt-1 text-xs font-medium text-red-600">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* 2. Email Address */}
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-sm font-semibold text-slate-800 mb-1"
                    >
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="booking-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#0284C7] focus:ring-sky-200'
                      }`}
                    />
                    {errors.email && (
                      <p id="error-email" className="mt-1 text-xs font-medium text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* 3. Phone Number */}
                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-sm font-semibold text-slate-800 mb-1"
                    >
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="(902) 555-0123"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 tabular-nums ${
                        errors.phone
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#0284C7] focus:ring-sky-200'
                      }`}
                    />
                    {errors.phone && (
                      <p id="error-phone" className="mt-1 text-xs font-medium text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* 4. Service Type */}
                  <div>
                    <label
                      htmlFor="booking-serviceType"
                      className="block text-sm font-semibold text-slate-800 mb-1"
                    >
                      Service Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="booking-serviceType"
                      name="serviceType"
                      required
                      value={formData.serviceType}
                      onChange={(e) =>
                        updateField('serviceType', e.target.value as ServiceTypeOption)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-sky-200"
                    >
                      {SERVICE_TYPE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 5. Preferred Appointment Date */}
                  <div>
                    <label
                      htmlFor="booking-preferredDate"
                      className="block text-sm font-semibold text-slate-800 mb-1"
                    >
                      Preferred Appointment Date
                    </label>
                    <input
                      id="booking-preferredDate"
                      name="preferredDate"
                      type="date"
                      min={todayIso}
                      value={formData.preferredDate}
                      onChange={(e) => updateField('preferredDate', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />
                  </div>

                  {/* 6. Preferred Time */}
                  <div>
                    <label
                      htmlFor="booking-preferredTime"
                      className="block text-sm font-semibold text-slate-800 mb-1"
                    >
                      Preferred Time
                    </label>
                    <select
                      id="booking-preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) =>
                        updateField('preferredTime', e.target.value as PreferredTimeOption)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-sky-200"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  {/* 7. Project Address (optional) */}
                  <div>
                    <label
                      htmlFor="booking-projectAddress"
                      className="block text-sm font-semibold text-slate-800 mb-1"
                    >
                      Project Address <span className="font-normal text-slate-500">(optional)</span>
                    </label>
                    <input
                      id="booking-projectAddress"
                      name="projectAddress"
                      type="text"
                      autoComplete="street-address"
                      placeholder="Street & community in PEI"
                      value={formData.projectAddress}
                      onChange={(e) => updateField('projectAddress', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />
                  </div>

                  {/* 8. Message / Describe Your Electrical Needs */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="booking-message"
                      className="block text-sm font-semibold text-slate-800 mb-1"
                    >
                      Describe Your Electrical Needs <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="booking-message"
                      name="message"
                      rows={3}
                      required
                      placeholder="Tell us about the electrical work, issue, or installation you need help with..."
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                        errors.message
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#0284C7] focus:ring-sky-200'
                      }`}
                    />
                    {errors.message && (
                      <p id="error-message" className="mt-1 text-xs font-medium text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* 9. Consent Checkbox */}
                  <div className="sm:col-span-2">
                    <div className="flex items-start gap-2.5">
                      <input
                        id="booking-consent"
                        name="consent"
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => updateField('consent', e.target.checked)}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? 'error-consent' : undefined}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#D9480F] focus:ring-[#0284C7] cursor-pointer"
                      />
                      <label
                        htmlFor="booking-consent"
                        className="text-sm text-slate-700 leading-snug cursor-pointer"
                      >
                        I agree to be contacted regarding my service request.{' '}
                        <span className="text-red-600">*</span>
                      </label>
                    </div>
                    {errors.consent && (
                      <p id="error-consent" className="mt-1 text-xs font-medium text-red-600">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold tracking-wider uppercase text-white bg-[#D9480F] hover:bg-[#C2410C] disabled:opacity-65 disabled:cursor-not-allowed rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>SUBMIT APPOINTMENT REQUEST</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
