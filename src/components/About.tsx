import { useEffect, useRef } from 'react';
import { Target, Eye, Heart, Zap, Shield, Award, CheckCircle2 } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const coreValues = [
  { icon: Heart, title: 'Passion-Driven', desc: 'We treat every brand like our own — pouring genuine care into every pixel and word.' },
  { icon: Zap, title: 'Bold Execution', desc: 'We move fast and ship boldly — because great work delayed is opportunity lost.' },
  { icon: Shield, title: 'Integrity', desc: 'Transparent pricing, honest reporting, and promises we actually keep.' },
  { icon: Award, title: 'Excellence', desc: 'Premium quality on every deliverable — no corners cut, no detail overlooked.' },
];

const reasons = [
  'One-stop digital partner — no juggling multiple agencies',
  'Transparent, subscription-friendly pricing',
  'Measurable results, reported monthly',
  'Premium designs that build instant trust',
  'Fast turnaround without sacrificing quality',
  'Dedicated support that treats your business like our own',
];

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-8');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/60 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-blue-400" />
            About QUA Business
            <span className="w-8 h-px bg-blue-400" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            We Build Brands That{' '}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Last
            </span>
          </h2>
        </div>

        {/* Company overview */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl rotate-3 opacity-30 blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
              <img
                src="/qua_person.jpeg"
                alt="QUA Business team at work"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Since 2026</p>
                <p className="text-lg font-bold">Turning Business Into Real Hustle</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Company Overview
            </h3>
            <p className="text-slate-500 leading-relaxed mb-4">
              QUA Business is a digital growth studio founded on a single belief: every
              business — no matter the size — deserves a powerful, professional online
              presence. We exist to bridge the gap between ambition and execution for
              entrepreneurs and growing brands.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              From stunning websites and bold branding to results-driven marketing, we
              provide end-to-end digital solutions that drive real, measurable growth.
              We don't just build assets — we build growth engines tailored to your goals.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              {[
                { n: '500+', l: 'Projects' },
                { n: '98%', l: 'Satisfaction' },
                { n: '9', l: 'Services' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                    {s.n}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <Reveal delay={0}>
            <div className="relative h-full bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-10 text-white shadow-xl overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                  <Target size={26} className="text-cyan-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-blue-100 leading-relaxed">
                  To empower entrepreneurs and growing businesses with premium digital
                  solutions that transform their online presence into a measurable growth
                  engine — making world-class branding and technology accessible to all.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative h-full bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-10 text-white shadow-xl overflow-hidden">
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                  <Eye size={26} className="text-cyan-200" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-blue-50 leading-relaxed">
                  To become Africa's most trusted digital growth partner — a studio where
                  creativity meets strategy, and where every brand we touch leaves bolder,
                  smarter, and ready to dominate its market.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Core values */}
        <Reveal className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Our Core Values</h3>
            <p className="text-slate-500 max-w-xl mx-auto">The principles that guide every project we take on.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 100}>
                  <div className="group h-full bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{v.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>

        {/* Why choose us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-200 to-blue-200 rounded-3xl -rotate-3 opacity-30 blur-2xl" />
              <img
                src="/qua_people.jpeg"
                alt="Why choose QUA Business"
                className="relative rounded-3xl shadow-2xl ring-1 ring-slate-200 w-full h-[400px] object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Why Choose QUA Business?
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                We're not just a service provider — we're your growth partner. Here's
                what sets us apart from the rest.
              </p>
              <ul className="space-y-4">
                {reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <CheckCircle2 size={22} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{r}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-blue-700 to-cyan-500 text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Work With Us
                <span>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
