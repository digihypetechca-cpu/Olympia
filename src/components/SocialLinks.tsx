import {COMPANY_INFO} from '../config/emailConfig';

interface SocialLinksProps {
  variant?: 'dark' | 'light';
  showHandles?: boolean;
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.6V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7.6v3h2.7v8h3.2z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="w-4 h-4 fill-none stroke-current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
    </svg>
  );
}

export function SocialLinks({variant = 'dark', showHandles = false}: SocialLinksProps) {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return <FacebookIcon />;
      case 'Instagram':
        return <InstagramIcon />;
      default:
        return <LinkedInIcon />;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {COMPANY_INFO.socialLinks.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Olympia Electric Ltd. on ${social.platform} (${social.handle})`}
          title={`${social.platform}: ${social.handle}`}
          className={`inline-flex items-center gap-2 rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            showHandles ? 'px-3.5 py-2 text-xs font-semibold' : 'w-10 h-10 justify-center'
          } ${
            variant === 'dark'
              ? 'bg-white/10 text-slate-200 hover:bg-[#EA580C] hover:text-white border border-white/15 hover:border-[#EA580C]'
              : 'bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-white border border-slate-200 hover:border-[#0A1628]'
          }`}
        >
          {getIcon(social.platform)}
          {showHandles && (
            <span className="whitespace-nowrap">
              {social.platform} <span className="opacity-75 font-normal">{social.handle}</span>
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
