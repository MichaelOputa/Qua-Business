import { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const reasons = [
  { title: 'Results-Driven', desc: 'Every action we take is tied to measurable outcomes that grow your bottom line.' },
  { title: 'Affordable Pricing', desc: 'Premium quality services at subscription prices that make sense for growing businesses.' },
  { title: 'Growth-Focused', desc: 'We think beyond the task at hand — always keeping your long-term scale in mind.' },
  { title: 'One-Stop Solution', desc: 'No need to juggle multiple agencies. We handle everything digital under one roof.' },
  { title: 'Transparent Reporting', desc: 'Clear, honest monthly reports so you always know exactly where your investment goes.' },
  { title: 'Dedicated Support', desc: 'A responsive team that treats your business as if it were our own.' },
];

function Card({ title, desc, index }: { title: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-6');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-6 transition-all duration-500 flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-200"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <CheckCircle2 size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-bold text-slate-900 mb-1">{title}</div>
        <div className="text-sm text-slate-500 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-blue-400" />
            Why QUA Business
            <span className="w-8 h-px bg-blue-400" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            The Smart Choice for{' '}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Growing Brands
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We're not just a service provider — we're your growth partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <Card key={r.title} title={r.title} desc={r.desc} index={i} />
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-16 relative overflow-hidden bg-gradient-to-r from-blue-700 to-cyan-500 rounded-3xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-10 md:p-14 text-center md:text-left text-white">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Dominate Online?</h3>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto md:mx-0">
                Let's build something extraordinary together. Your growth story starts here.
              </p>
              <a
                href={waLink(WA_MESSAGES.buildWebsite)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-700 font-bold px-10 py-4 rounded-full hover:bg-cyan-50 transition-colors shadow-lg"
              >
                Start Your Journey
              </a>
            </div>

            <div className="relative h-64 md:h-full min-h-[280px]">
              <img
                src="/team-collaboration.jpg"
                alt="Team collaborating on a growth strategy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Fades the photo into the gradient so it reads as one cohesive panel */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-700/10 to-transparent md:bg-gradient-to-r md:from-blue-700/70 md:via-transparent md:to-transparent" />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-blue-700 to-transparent hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}