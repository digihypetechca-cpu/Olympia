import {
  ArrowRight,
  Building2,
  Factory,
  Home,
  Lightbulb,
  SlidersHorizontal,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import commercialImage from '../assets/images/service_commercial_power_1794943238812.jpg';
import repairsImage from '../assets/images/service_electrical_repairs_1794943808275.jpg';
import industrialImage from '../assets/images/service_industrial_systems_1794943238722.jpg';
import lightingImage from '../assets/images/service_lighting_design_1794943809067.jpg';
import upgradeImage from '../assets/images/service_panel_upgrade_1794943809919.jpg';
import residentialImage from '../assets/images/service_residential_lighting_1794943238893.jpg';
import type {ServiceTypeOption} from '../config/emailConfig';
import {ResilientImage} from './ResilientImage';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  bookingOption: ServiceTypeOption;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Residential Electrical',
    description:
      'Home wiring, lighting installations, electrical upgrades, troubleshooting, and repairs.',
    bookingOption: 'Residential Electrical',
    icon: Home,
    image: residentialImage,
    imageAlt: 'Modern coastal home interior with warm recessed and pendant lighting',
  },
  {
    number: '02',
    title: 'Commercial Electrical',
    description:
      'Office electrical installations, lighting systems, maintenance, and electrical upgrades.',
    bookingOption: 'Commercial Electrical',
    icon: Building2,
    image: commercialImage,
    imageAlt: 'Modern commercial office space with architectural linear LED lighting and conduit',
  },
  {
    number: '03',
    title: 'Industrial Electrical',
    description:
      'Industrial electrical installations, equipment connections, and electrical systems.',
    bookingOption: 'Industrial Electrical',
    icon: Factory,
    image: industrialImage,
    imageAlt: 'Clean industrial electrical control room with switchgear and precision conduit runs',
  },
  {
    number: '04',
    title: 'Electrical Repairs & Troubleshooting',
    description: 'Professional diagnosis and solutions for electrical issues.',
    bookingOption: 'Electrical Repairs',
    icon: Wrench,
    image: repairsImage,
    imageAlt: 'Electrician using a digital multimeter to troubleshoot an electrical panel',
  },
  {
    number: '05',
    title: 'Lighting Installation',
    description: 'Indoor, outdoor, commercial, and energy-efficient lighting solutions.',
    bookingOption: 'Lighting Installation',
    icon: Lightbulb,
    image: lightingImage,
    imageAlt: 'Modern property illuminated at dusk with architectural indoor and outdoor LED lighting',
  },
  {
    number: '06',
    title: 'Electrical Upgrades',
    description: 'Electrical improvements, panel upgrades, and modernization.',
    bookingOption: 'Electrical Upgrades',
    icon: SlidersHorizontal,
    image: upgradeImage,
    imageAlt: 'Modern 200-amp electrical service panel with neat conduit and labeled circuits',
  },
];

interface ServicesSectionProps {
  onRequestService: (serviceType: ServiceTypeOption) => void;
}

export function ServicesSection({onRequestService}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="bg-slate-50 border-y border-slate-200/80 py-14 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0284C7] tracking-wide mb-2">
              Electrical Contracting Services
            </p>
            <h2
              className="font-display font-bold text-slate-900 tracking-tight leading-tight"
              style={{
                fontSize: 'clamp(1.875rem, 3vw, 2.5rem)',
                textWrap: 'balance',
              }}
            >
              Complete Electrical Solutions for Every Project
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
            Select any service below to request an appointment directly with our Charlottetown
            team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-sky-300"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      fallbackLabel={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#061020]/55 via-transparent to-transparent"
                    />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-lg bg-[#0A1628]/90 backdrop-blur-sm text-sky-400 border border-white/15 flex items-center justify-center">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold text-white/90 tabular-nums">
                        {service.number}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onRequestService(service.bookingOption)}
                    className="w-full inline-flex items-center justify-between text-sm font-semibold text-[#0284C7] group-hover:text-[#D9480F] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-sm py-0.5"
                  >
                    <span>Request Service</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
