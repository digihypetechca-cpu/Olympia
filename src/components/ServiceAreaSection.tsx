import {MapPin} from 'lucide-react';
import {COMPANY_INFO} from '../config/emailConfig';

export function ServiceAreaSection() {
  return (
    <section id="service-area" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Coverage Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#0284C7] tracking-wide mb-2">
              Island-Wide Coverage
            </p>
            <h2
              className="font-display font-bold text-slate-900 tracking-tight leading-tight mb-3"
              style={{
                fontSize: 'clamp(1.875rem, 3vw, 2.4rem)',
                textWrap: 'balance',
              }}
            >
              Proudly Serving Prince Edward Island
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Olympia Electric Ltd. serves customers throughout Kings, Prince, and Queens counties.
            </p>

            {/* Counties */}
            <div className="border-t border-slate-200 pt-5 mb-5">
              <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-500 mb-2">
                Counties Served
              </h3>
              <p className="text-sm font-semibold text-slate-900">
                {COMPANY_INFO.counties.join('  ·  ')}
              </p>
            </div>

            {/* Clean Community Directory */}
            <div className="border-t border-slate-200 pt-5">
              <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-500 mb-3">
                Communities We Serve
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                {COMPANY_INFO.communities.map((community) => (
                  <li
                    key={community}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700"
                  >
                    <MapPin
                      className="w-4 h-4 text-[#D9480F] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{community}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Single Responsive Google Maps Embed */}
          <div className="lg:col-span-7">
            <div className="h-full min-h-[320px] lg:min-h-[390px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <iframe
                title="Olympia Electric Ltd. — Charlottetown & Prince Edward Island Service Area Map"
                src="https://maps.google.com/maps?q=Charlottetown,+Prince+Edward+Island,+Canada&t=&z=10&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[320px] lg:min-h-[390px] border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
