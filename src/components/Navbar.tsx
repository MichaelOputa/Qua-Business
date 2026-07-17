import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const links = [
  { label: 'Home', href: 'home' },
  { label: 'Services', href: 'services' },
  { label: 'About', href: 'about' },
  { label: 'Portfolio', href: 'portfolio' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.href)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (section: string) => {
    setOpen(false);
    const target = document.getElementById(section);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md shadow-lg shadow-black/10 py-3 border-b border-white/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNav('home')} className="flex items-center gap-3">
          <img
            src="/Qua_Business.jpeg"
            alt="QUA Business"
            className="h-10 w-10 object-cover rounded-xl ring-1 ring-white/20"
          />
          <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
            QUA<span className="text-cyan-400">Business</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                active === l.href ? 'text-cyan-300' : 'text-blue-100/90 hover:text-white'
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${
                  active === l.href ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'
                }`}
              />
            </button>
          ))}
          <a
            href={waLink(WA_MESSAGES.buildWebsite)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-cyan-400/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <MessageCircle size={15} />
            Build Your Website
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white hover:text-cyan-300 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-white/10 shadow-xl">
          <nav className="flex flex-col px-6 py-4 gap-2">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className={`text-left py-2.5 text-base font-medium transition-colors ${
                  active === l.href ? 'text-cyan-300' : 'text-blue-100 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
            <a
              href={waLink(WA_MESSAGES.buildWebsite)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm px-5 py-3 rounded-full"
            >
              <MessageCircle size={16} />
              Build Your Website
            </a>
            <a
              href={waLink(WA_MESSAGES.quote)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-sm px-5 py-3 rounded-full"
            >
              Request a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
