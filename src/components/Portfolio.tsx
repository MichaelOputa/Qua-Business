import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const projects = [
  {
    title: 'Lady Sculptor Arts',
    category: 'Portfolio · Creative Arts',
    year: '2025',
    description:
      'A refined portfolio site for a sculptor and creative artist — showcasing a curated gallery of works with smooth reveal animations and a fully responsive, mobile-first layout.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    image:
      '/Lady Sculptor Arts Gallery.png',
    accent: 'from-orange-600 to-amber-500',
    link: 'https://lady-sculptor-arts.vercel.app/',
  },
  {
    title: 'Buyoo Marketplace',
    category: 'eCommerce · Multi-Vendor Platform',
    year: '2026',
    description:
      'A full-stack multi-role marketplace supporting Customers, Vendors, Brokers, and Custom Vendors — with a complete auth system, dashboards, and integrated Paystack payments.',
    tech: ['Next.js 14', 'Prisma', 'PostgreSQL', 'Paystack'],
    image:
      '/WhatsApp_Image_2026-07-01_at_00.05.18.jpeg',
    accent: 'from-blue-600 to-cyan-500',
    link: 'https://buyoo-marketplace.vercel.app/',
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
              target="_blank"
              rel="noopener noreferrer"
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