import {ArrowRight, Layers, MapPin, ShieldCheck, Users} from 'lucide-react';

interface WhyChooseUsSectionProps {
  onBookClick: () => void;
}

const BENEFITS = [
  {
    number: '01',
    title: 'Residential, Commercial & Industrial Expertise',
    description:
      'Versatile electrical contracting experience spanning family homes, commercial offices, retail spaces, and industrial facilities.',
    icon: Layers,
  },
  {
    number: '02',
    title: 'Customer-Focused Service',
    description:
      'Direct, attentive communication with clear scheduling, respectful worksites, and practical recommendations tailored to your needs.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Reliable Electrical Solutions',
    description:
      'Organized wiring, dependable troubleshooting, and clean installations built to support safe, everyday operation.',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Serving Communities Across PEI',
    description:
      'Locally operated in Charlottetown and serving homeowners, businesses, and facilities throughout Kings, Prince, and Queens counties.',
    icon: MapPin,
  },
] as const;

export function WhyChooseUsSection({onBookClick}: WhyChooseUsSectionProps) {
  return (
    <section id="why-choose-us" className="bg-[#071426] text-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-sky-300 tracking-wide mb-2">
              Why Choose Olympia Electric Ltd.
            </p>
            <h2
              className="font-display font-bold text-white tracking-tight leading-tight mb-4"
              style={{
                fontSize: 'clamp(1.875rem, 3vw, 2.4rem)',
                textWrap: 'balance',
              }}
            >
              Dependable Service. Professional Solutions.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Every electrical project demands careful planning, tidy workmanship, and a contractor
              you can reach when it matters.
            </p>

            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-wider uppercase text-white bg-[#D9480F] hover:bg-[#C2410C] rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Right 2x2 Benefit Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-[#0E203A] border border-white/10 rounded-xl p-6 transition-colors duration-200 hover:border-sky-400/45"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-400/25 text-sky-300 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 tabular-nums">
                      {benefit.number}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
