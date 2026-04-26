import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img src="/Qua_Business.jpeg" alt="QUA Business" className="h-10 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                scrolled ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity duration-200"
          >
            Get Started
          </a>
        </nav>

        <button
          className="md:hidden text-gray-800 hover:text-blue-600 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
