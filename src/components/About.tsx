import { useEffect, useRef } from 'react';
import { Target, Zap, Globe } from 'lucide-react';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-10');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="opacity-0 translate-y-10 transition-all duration-700 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: image/visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl rotate-3 opacity-10" />
            <div className="relative bg-gradient-to-br from-blue-800 to-blue-500 rounded-3xl p-12 text-white text-center shadow-2xl">
              <img
                src="/Qua_Business.jpeg"
                alt="QUA Business"
                className="w-48 mx-auto object-contain mb-6"
              />
              <p className="text-blue-100 text-sm font-medium tracking-widest uppercase">
                Since 2026
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
                {[
                  { n: '500+', l: 'Clients' },
                  { n: '16', l: 'Services' },
                  { n: '98%', l: 'Satisfaction' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-extrabold">{s.n}</div>
                    <div className="text-xs text-blue-200">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              We Are QUA{' '}
              <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
                Business
              </span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              QUA Business was founded with a single mission: to help entrepreneurs and growing companies unlock their full potential online. We believe every business — no matter the size — deserves a powerful digital presence.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              From startups to established brands, we provide end-to-end digital solutions that drive real, measurable results. We don't just build websites or manage social media — we build growth engines tailored to your unique goals.
            </p>
            <div className="space-y-4">
              {[
                { Icon: Target, title: 'Mission-Driven', desc: 'Every strategy we build is aligned with your specific business goals.' },
                { Icon: Zap, title: 'Fast Execution', desc: 'We move fast without sacrificing quality — because timing matters in business.' },
                { Icon: Globe, title: 'Digital-First', desc: 'We live and breathe digital, staying ahead of trends so you don\'t have to.' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{title}</div>
                    <div className="text-sm text-gray-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
