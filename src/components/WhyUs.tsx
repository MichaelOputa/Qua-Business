import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const reasons = [
  { title: 'Results-Driven', desc: 'Every action we take is tied to measurable outcomes that grow your bottom line.' },
  { title: 'Affordable Pricing', desc: 'Premium quality services at prices that make sense for growing businesses.' },
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
      className="opacity-0 translate-y-6 transition-all duration-500 flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-100"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <CheckCircle size={22} className="text-blue-600 flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-bold text-gray-900 mb-1">{title}</div>
        <div className="text-sm text-gray-500 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Why QUA Business
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            The Smart Choice for{' '}
            <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
              Growing Brands
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We're not just a service provider — we're your growth partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <Card key={r.title} title={r.title} desc={r.desc} index={i} />
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-500 rounded-3xl p-10 md:p-14 text-center text-white shadow-xl">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Dominate Online?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Let's build something extraordinary together. Your growth story starts here.
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-blue-700 font-bold px-10 py-4 rounded-full hover:bg-blue-50 transition-colors duration-200 shadow-lg"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
}
