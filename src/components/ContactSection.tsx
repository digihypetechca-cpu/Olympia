import {ArrowRight, Mail, MapPin, Phone, UserCheck} from 'lucide-react';
import {COMPANY_INFO} from '../config/emailConfig';

interface ContactSectionProps {
  onBookClick: () => void;
}

export function ContactSection({onBookClick}: ContactSectionProps) {
  return (
    <section id="contact" className="bg-white border-t border-slate-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-[#0284C7] tracking-wide mb-1.5">
              Direct Contact
            </p>
            <h2
              className="font-display font-bold text-slate-900 tracking-tight leading-tight"
              style={{
                fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)',
                textWrap: 'balance',
              }}
            >
              Connect with {COMPANY_INFO.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onBookClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase text-white bg-[#D9480F] hover:bg-[#C2410C] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <span>BOOK AN APPOINTMENT</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Clean 4-Card Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-[#0A1628] text-sky-400 flex items-center justify-center mb-3.5">
              <UserCheck className="w-4 h-4" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Leadership</p>
            <p className="font-display font-bold text-slate-900 text-base">
              {COMPANY_INFO.contactPerson}
            </p>
            <p className="text-sm text-slate-600">{COMPANY_INFO.contactRole}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-[#0A1628] text-[#F97316] flex items-center justify-center mb-3.5">
              <Phone className="w-4 h-4" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Phone</p>
            <a
              href={COMPANY_INFO.phoneHref}
              className="block font-display font-bold text-slate-900 hover:text-[#D9480F] transition-colors text-base tabular-nums"
            >
              {COMPANY_INFO.phone}
            </a>
            <a
              href={COMPANY_INFO.altPhoneHref}
              className="block text-sm text-slate-600 hover:text-[#D9480F] transition-colors mt-0.5 tabular-nums"
            >
              Alt: {COMPANY_INFO.altPhone}
            </a>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-[#0A1628] text-sky-400 flex items-center justify-center mb-3.5">
              <Mail className="w-4 h-4" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Email</p>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="font-display font-bold text-slate-900 hover:text-[#D9480F] transition-colors text-sm sm:text-base break-all"
            >
              {COMPANY_INFO.email}
            </a>
            <p className="text-xs text-slate-500 mt-1">Direct project &amp; service inquiries</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-[#0A1628] text-sky-400 flex items-center justify-center mb-3.5">
              <MapPin className="w-4 h-4" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Location</p>
            <p className="font-display font-bold text-slate-900 text-base">
              {COMPANY_INFO.shortLocation}
            </p>
            <a
              href="#service-area"
              className="inline-block text-xs font-semibold text-[#0284C7] hover:text-[#D9480F] transition-colors mt-1"
            >
              View PEI Service Map →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
