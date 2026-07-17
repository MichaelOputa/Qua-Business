import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const projects = [
  {
    title: 'SwiftMove Logistics Platform',
    category: 'Web App · Logistics',
    year: '2026',
    description:
      'A full-featured logistics platform with real-time shipment tracking, fleet management dashboard, and automated dispatch workflows that cut delivery delays by 40%.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Real-time'],
    image:
      'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'from-blue-600 to-cyan-500',
    link: '#',
  },
  {
    title: 'MarketHub eCommerce Store',
    category: 'eCommerce · Retail',
    year: '2026',
    description:
      'A high-conversion online store with product catalog, secure checkout, inventory management, and integrated payment gateways — lifting sales 3x in 6 months.',
    tech: ['Next.js', 'Stripe', 'Tailwind', 'SEO'],
    image:
      'https://images.pexels.com/photos/5632370/pexels-photo-5632370.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'from-emerald-600 to-teal-500',
    link: '#',
  },
  {
    title: 'ProLine Production Dashboard',
    category: 'Dashboard · Analytics',
    year: '2025',
    description:
      'An enterprise-grade production monitoring dashboard with live KPIs, shift reporting, machine utilization metrics, and alert management for a manufacturing client.',
    tech: ['React', 'D3.js', 'WebSockets', 'Enterprise'],
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'from-orange-600 to-amber-500',
    link: '#',
  },
  {
    title: 'NourishCart Grocery Platform',
    category: 'eCommerce · Food Retail',
    year: '2025',
    description:
      'A fast online grocery platform with smart filters, loyalty points, scheduled delivery slots, and WhatsApp order notifications for a local supermarket chain.',
    tech: ['React', 'Supabase', 'WhatsApp API', 'PWA'],
    image:
      'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'from-green-600 to-lime-500',
    link: '#',
  },
  {
    title: 'FreightPro Cargo Tracker',
    category: 'Web App · Freight',
    year: '2025',
    description:
      'A cargo and freight management system enabling clients to book shipments, track containers in real time, and generate customs documentation automatically.',
    tech: ['Vue.js', 'Express', 'MongoDB', 'Maps API'],
    image:
      'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'from-sky-600 to-blue-500',
    link: '#',
  },
  {
    title: 'FactoryPulse Operations Hub',
    category: 'Dashboard · Operations',
    year: '2024',
    description:
      'A centralized operations hub for manufacturing plants — tracking output targets, downtime events, quality checks, and supply chain status in one view.',
    tech: ['React', 'TypeScript', 'GraphQL', 'Real-time'],
    image:
      'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'from-slate-600 to-gray-500',
    link: '#',
  },
];

function TimelineItem({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Card */}
      <div className="flex-1 w-full">
        <div
          className={`group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100 hover:shadow-2xl hover:shadow-blue-100/60 transition-all duration-500 ${
            visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-25 group-hover:opacity-40 transition-opacity duration-500 z-10`}
            />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 shadow-sm">
                {project.category}
              </span>
            </div>
            <div className="absolute top-4 right-4 z-20">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-sm text-white">
                {project.year}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-cyan-600 transition-colors"
            >
              <ExternalLink size={15} />
              View Project Details
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Timeline node */}
      <div className="hidden md:flex items-center justify-center w-12 h-12 flex-shrink-0 relative z-10">
        <div
          className={`w-5 h-5 rounded-full bg-gradient-to-br ${project.accent} ring-4 ring-white shadow-lg transition-transform duration-500 ${
            visible ? 'scale-100' : 'scale-0'
          }`}
        />
      </div>

      {/* Spacer for layout balance */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-blue-400" />
            Our Work
            <span className="w-8 h-px bg-blue-400" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Projects We've{' '}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Shipped
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            A timeline of the digital products we've designed and built — from
            logistics platforms to eCommerce stores and operations dashboards.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-cyan-300 -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {projects.map((project, i) => (
              <TimelineItem key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-slate-500 mb-5 text-lg">Ready to add your project to our timeline?</p>
          <a
            href={waLink(WA_MESSAGES.buildWebsite)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-500 text-white font-bold px-9 py-4 rounded-full shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-cyan-200/60 hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Your Project
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
