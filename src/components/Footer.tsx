import { Globe, Camera, Send, Briefcase, Play, ArrowRight } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const quickLinks = [
  { label: 'Home', href: 'home' },
  { label: 'Services', href: 'services' },
  { label: 'About', href: 'about' },
  { label: 'Portfolio', href: 'portfolio' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'Contact', href: 'contact' },
];

const serviceLinks = [
  'Website Design & Development',
  'Branding & Identity Design',
  'Graphic Design',
  'Content Creation',
  'Social Media Management',
  'Digital Marketing',
];

const socials = [
  { Icon: Globe, href: '#', label: 'Website' },
  { Icon: Camera, href: '#', label: 'Instagram' },
  { Icon: Send, href: '#', label: 'Twitter' },
  { Icon: Briefcase, href: '#', label: 'LinkedIn' },
  { Icon: Play, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const handleNav = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Qua_Business_transparent.png"
                alt="QUA Business"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Turning business into real hustle. We help brands grow, scale, and dominate
              online with proven digital strategies.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2563eb] hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => handleNav(l.href)}
                    className="text-slate-400 text-sm hover:text-[#3b82f6] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => handleNav('services')}
                    className="text-slate-400 text-sm hover:text-[#3b82f6] transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>industriesqua@gmail.com</li>
              <li>+234 701 979 1950</li>
              <li>Nigeria</li>
            </ul>
            <a
              href={waLink(WA_MESSAGES.buildWebsite)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Build Your Website
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} QUA Business. All rights reserved.</p>
          <p>Turning Business Into Real Hustle</p>
          <a
            href="https://quaindustrieslimited.com.ng/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#3b82f6] transition-colors"
          >
            Powered by Qua Industries Limited
          </a>
        </div>
      </div>
    </footer>
  );
}