import aboutPanelImage from '../assets/images/about_electrical_panel_1794943238676.jpg';
import {COMPANY_INFO} from '../config/emailConfig';
import {ResilientImage} from './ResilientImage';

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#0284C7] tracking-wide mb-2">
              About Olympia Electric Ltd.
            </p>

            <h2
              className="font-display font-bold text-slate-900 tracking-tight leading-tight mb-5"
              style={{
                fontSize: 'clamp(1.875rem, 3vw, 2.5rem)',
                textWrap: 'balance',
              }}
            >
              Your Trusted Electrical Partner on PEI
            </h2>

            <div className="space-y-3.5 text-base text-slate-600 leading-relaxed">
              <p>
                Headquartered in Charlottetown,{' '}
                <strong className="font-semibold text-slate-900">Olympia Electric Ltd.</strong>{' '}
                provides dependable electrical contracting across Prince Edward Island. Led by
                Vice President{' '}
                <strong className="font-semibold text-slate-900">
                  {COMPANY_INFO.contactPerson}
                </strong>
                , our team brings practical workmanship and attentive project coordination to every
                site.
              </p>
              <p>
                We deliver tailored{' '}
                <strong className="font-medium text-slate-800">
                  residential electrical solutions
                </strong>
                ,{' '}
                <strong className="font-medium text-slate-800">
                  commercial electrical installations
                </strong>
                , and{' '}
                <strong className="font-medium text-slate-800">
                  industrial electrical services
                </strong>
                —supporting homeowners, businesses, and facility operators throughout Kings, Prince,
                and Queens counties with responsive electrical project support.
              </p>
            </div>

            {/* Compact Sector Highlights */}
            <div className="mt-7 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-bold text-[#D9480F] tabular-nums">01</p>
                <p className="font-display font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                  Residential
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Home wiring &amp; upgrades
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0284C7] tabular-nums">02</p>
                <p className="font-display font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                  Commercial
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Offices &amp; retail fit-ups
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0A1628] tabular-nums">03</p>
                <p className="font-display font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                  Industrial
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Equipment &amp; power systems
                </p>
              </div>
            </div>
          </div>

          {/* Panel Craftsmanship Image Frame */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[300px] lg:min-h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <ResilientImage
                src={aboutPanelImage}
                alt="Electrician working neatly on wiring and circuit breakers inside an electrical panel"
                fallbackLabel="Precision Electrical Panel Workmanship"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061020]/85 via-[#061020]/40 to-transparent"
              />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs sm:text-sm text-white">
                <span className="font-semibold">
                  {COMPANY_INFO.contactPerson} · {COMPANY_INFO.contactRole}
                </span>
                <span className="text-sky-300 font-medium">Charlottetown, PEI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
