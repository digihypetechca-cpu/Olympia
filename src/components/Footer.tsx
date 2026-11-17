import {Mail, Phone, Zap} from 'lucide-react';
import {COMPANY_INFO} from '../config/emailConfig';
import {SocialLinks} from './SocialLinks';

const QUICK_LINKS = [
  {label: 'Home', href: '#home'},
  {label: 'About', href: '#about'},
  {label: 'Services', href: '#services'},
  {label: 'Contact', href: '#contact'},
] as const;

export function Footer() {
  const handleLinkClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <footer className="bg-[#050C17] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/15">
          {/* Brand Summary + Social Icons Only */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2.5 text-white font-display font-bold text-lg tracking-tight">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#EA580C] text-white shrink-0">
                <Zap className="w-4 h-4 fill-current" aria-hidden="true" />
              </span>
              <span className="text-white">{COMPANY_INFO.name}</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed max-w-sm">
              Professional Electrical Contracting Across Prince Edward Island.
            </p>
            <div>
              <SocialLinks />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="font-display font-semibold text-sm text-white mb-3">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-white/90 hover:text-sky-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-4">
            <h3 className="font-display font-semibold text-sm text-white mb-3">Contact</h3>
            <div className="space-y-2.5 text-sm">
              <div>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 text-white hover:text-sky-300 transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                  <span className="text-white">{COMPANY_INFO.phone}</span>
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="inline-flex items-center gap-2.5 text-white hover:text-sky-300 transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                  <span className="text-white">{COMPANY_INFO.email}</span>
                </a>
              </div>
              <p className="text-white/85 text-xs pt-0.5">{COMPANY_INFO.shortLocation}</p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/85">
          <p>© 2026 Olympia Electric Ltd. All Rights Reserved.</p>
          <p>Serving Kings, Prince &amp; Queens Counties, PEI</p>
        </div>
      </div>
    </footer>
  );
}
