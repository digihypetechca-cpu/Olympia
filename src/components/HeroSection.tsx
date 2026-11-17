import {ArrowRight, MapPin, Phone, ShieldCheck, Zap} from 'lucide-react';
import heroImage from '../assets/images/hero_electrician_installation_1794943238221.jpg';
import {COMPANY_INFO} from '../config/emailConfig';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  onBookClick: () => void;
}

export function HeroSection({onBookClick}: HeroSectionProps) {
  return (
    <section id="home" className="relative bg-[#061020] text-white overflow-hidden">
      {/* Main Hero Canvas */}
      <div className="relative min-h-[500px] lg:min-h-[560px] flex items-center">
        <div className="absolute inset-0">
          <ResilientImage
            src={heroImage}
            alt="Licensed electrician inspecting and wiring a modern commercial electrical distribution panel"
            loading="eager"
            fallbackLabel="Olympia Electric Ltd. — Prince Edward Island"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#061020]/96 via-[#061020]/84 to-[#061020]/35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#061020] via-transparent to-[#061020]/35"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-sky-300 mb-3">
              Serving Kings, Prince &amp; Queens Counties
              <span className="mx-2 text-slate-400" aria-hidden="true">
                ·
              </span>
              <span className="text-slate-200">Charlottetown, PEI</span>
            </p>

            <h1
              className="font-display font-extrabold tracking-tight text-white leading-[1.06] mb-4"
              style={{
                fontSize: 'clamp(2.25rem, 4.3vw, 3.65rem)',
                textWrap: 'balance',
              }}
            >
              POWERING HOMES. BUSINESSES. COMMUNITIES.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl mb-7">
              Reliable electrical solutions for residential, commercial, and industrial projects
              across Prince Edward Island.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold tracking-wider uppercase text-white bg-[#D9480F] hover:bg-[#C2410C] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061020] focus-visible:ring-orange-400"
              >
                <span>BOOK A SERVICE</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href={COMPANY_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold tracking-wide text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061020] focus-visible:ring-sky-400"
              >
                <Phone className="w-4 h-4 text-sky-300" aria-hidden="true" />
                <span>CALL {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Anchored Trust & Coverage Bar */}
      <div className="relative z-10 bg-[#0B1B34] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-[#F97316] shrink-0" aria-hidden="true" />
              <span>Residential, Commercial &amp; Industrial Contracting</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
              <span>Serving Kings, Prince &amp; Queens Counties</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
              <span>
                Direct Line:{' '}
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="font-semibold text-white hover:text-sky-300 transition-colors tabular-nums"
                >
                  {COMPANY_INFO.phone}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
