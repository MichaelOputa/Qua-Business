import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image — shown directly, no color overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Digital business growth"
          className={`h-full w-full object-cover transition-transform duration-[2000ms] ease-out ${
            mounted ? 'scale-100' : 'scale-110'
          } ${scrolled ? 'scale-105' : ''}`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto pt-24 pb-16">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-1.5 mb-8 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <Sparkles size={14} className="text-[#5ec8fa]" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
            Digital Growth Studio
          </span>
        </div>

        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-700 delay-75 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#2563eb]/30 blur-2xl rounded-full" />
            <img
              src="/Qua_Business.jpeg"
              alt="QUA Business"
              className="relative w-28 h-28 md:w-32 md:h-32 mx-auto object-cover rounded-2xl shadow-2xl ring-1 ring-white/20"
            />
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight transition-all duration-700 delay-150 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Turning Business Into{' '}
          <span className="relative inline-block">
            <span className="text-[#5ec8fa]">
              Real Hustle
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#5ec8fa]/60 rounded-full" />
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg md:text-xl text-slate-300/90 max-w-2xl mb-10 leading-relaxed transition-all duration-700 delay-250 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          We help brands grow, scale, and dominate online — from stunning websites
          and bold branding to results-driven digital marketing.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-350 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href={waLink(WA_MESSAGES.buildWebsite)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 bg-white text-[#0a1230] font-bold px-8 py-4 rounded-full shadow-lg shadow-black/20 hover:bg-slate-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Build Your Website
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
          <button
            onClick={scrollToServices}
            className="flex items-center justify-center gap-2 border-2 border-white/15 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/5 hover:border-white/25 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore Services
          </button>
        </div>

        {/* Stats */}
        <div
          className={`mt-16 grid grid-cols-3 gap-6 md:gap-16 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {[
            { number: '500+', label: 'Projects Delivered' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '16+', label: 'Service Offerings' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-white">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-slate-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to services"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
}