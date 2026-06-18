import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'SwiftMove Logistics',
    category: 'Logistics & Shipping',
    description:
      'A full-featured logistics platform with real-time shipment tracking, fleet management dashboard, and automated dispatch workflows.',
    tags: ['Web App', 'Dashboard', 'Real-time'],
    image:
      'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'from-blue-600 to-cyan-500',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'MarketHub eCommerce',
    category: 'eCommerce & Retail',
    description:
      'A high-conversion online store with product catalog, secure checkout, inventory management, and integrated payment gateways.',
    tags: ['eCommerce', 'Mobile-First', 'SEO'],
    image:
      'https://images.pexels.com/photos/5632370/pexels-photo-5632370.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'from-emerald-600 to-teal-500',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'ProLine Production Dashboard',
    category: 'Manufacturing & Analytics',
    description:
      'An enterprise-grade production monitoring dashboard with live KPIs, shift reporting, machine utilization metrics, and alert management.',
    tags: ['Dashboard', 'Analytics', 'Enterprise'],
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'from-orange-600 to-amber-500',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'NourishCart Grocery Store',
    category: 'eCommerce & Food Retail',
    description:
      'A fast and intuitive online grocery platform with smart filters, loyalty points, scheduled delivery slots, and WhatsApp order notifications.',
    tags: ['eCommerce', 'WhatsApp', 'Delivery'],
    image:
      'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'from-green-600 to-lime-500',
    badge: 'bg-green-100 text-green-700',
  },
  {
    title: 'FreightPro Cargo Tracker',
    category: 'Logistics & Freight',
    description:
      'A cargo and freight management system enabling clients to book shipments, track containers in real time, and generate customs documentation.',
    tags: ['Web App', 'Tracking', 'Logistics'],
    image:
      'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'from-sky-600 to-blue-500',
    badge: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'FactoryPulse Operations Hub',
    category: 'Production & Operations',
    description:
      'A centralized operations hub for manufacturing plants — tracking output targets, downtime events, quality checks, and supply chain status.',
    tags: ['Dashboard', 'Operations', 'Real-time'],
    image:
      'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'from-slate-600 to-gray-500',
    badge: 'bg-slate-100 text-slate-700',
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-600 group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-default"
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20 group-hover:opacity-30 transition-opacity duration-300 z-10`}
        />
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <img
          src={project.image}
          alt={project.title}
          onLoad={() => setImgLoaded(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm bg-white/80 text-gray-700 shadow-sm`}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${project.badge}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold group-hover:gap-3 transition-all duration-200">
          <ExternalLink size={15} />
          <span>View Project Details</span>
          <ArrowRight
            size={14}
            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-6');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className="opacity-0 translate-y-6 transition-all duration-700 text-center mb-16"
        >
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Websites We've{' '}
            <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
              Built
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From logistics platforms to eCommerce stores and production dashboards — here's a snapshot of the digital experiences we've crafted for our clients.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-500 mb-5 text-base">
            Ready to add your business to our portfolio?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-800 to-blue-500 text-white font-semibold px-9 py-4 rounded-full shadow-lg hover:shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Your Project
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
