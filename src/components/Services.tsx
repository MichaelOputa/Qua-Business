import { useEffect, useRef } from 'react';
import { Globe, Palette, PenTool, Share2, Megaphone, Search, LayoutGrid as Layout, Lightbulb, Sparkles } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const services = [
  {
    icon: Globe,
    title: 'Website Design & Development',
    description:
      'Modern, fast, fully-responsive websites engineered to convert visitors into paying customers — from landing pages to eCommerce stores.',
    features: ['Responsive Design', 'Fast Performance', 'SEO-Ready', 'CMS Integration'],
  },
  {
    icon: Palette,
    title: 'Branding & Identity Design',
    description:
      'Distinctive brand identities — logos, color systems, typography, and guidelines that make your business instantly recognizable.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
  },
  {
    icon: PenTool,
    title: 'Graphic Design',
    description:
      'Eye-catching flyers, posters, social media creatives, and marketing collateral engineered to stop the scroll and drive action.',
    features: ['Flyers & Posters', 'Social Creatives', 'Print Design', 'Marketing Kits'],
  },
  {
    icon: Sparkles,
    title: 'Content Creation',
    description:
      'Scroll-stopping content — photography, short-form video, and copywriting that tells your story and builds an engaged audience.',
    features: ['Short-Form Video', 'Photography', 'Copywriting', 'Content Calendars'],
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description:
      'End-to-end management of your social presence — content scheduling, community engagement, and growth strategies that build loyalty.',
    features: ['Content Scheduling', 'Community Engagement', 'Growth Strategy', 'Monthly Reporting'],
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Data-driven ad campaigns across Facebook, Instagram, and Google — optimized to maximize ROI and scale your customer base.',
    features: ['Paid Ads', 'Email Marketing', 'Funnel Building', 'ROI Tracking'],
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description:
      'Rank higher on Google with technical SEO, keyword strategy, and content optimization that brings qualified organic traffic.',
    features: ['Technical SEO', 'Keyword Research', 'On-Page SEO', 'Local SEO'],
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description:
      'Intuitive, beautiful user experiences — wireframes, prototypes, and design systems that delight users and drive conversions.',
    features: ['Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
  },
  {
    icon: Lightbulb,
    title: 'Business Consultation',
    description:
      'One-on-one strategic consulting to identify growth opportunities, refine your offer, and build a roadmap to scale.',
    features: ['Growth Strategy', 'Market Positioning', 'Process Optimization', 'Advisory Sessions'],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-600 group relative bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1.5 hover:border-blue-200"
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      {/* Glow accent */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <Icon size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              0{index + 1}
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {service.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed mb-5">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors duration-300"
            >
              {feature}
            </span>
          ))}
        </div>

        <a
          href={waLink(`Hello Qua Business, I'd like to learn more about your ${service.title} service.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-cyan-600 transition-colors"
        >
          Enquire on WhatsApp
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-blue-400" />
            What We Offer
            <span className="w-8 h-px bg-blue-400" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Complete Digital Business{' '}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Nine specialized services under one roof — everything your brand needs
            to look sharp, get found, and grow online.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href={waLink(WA_MESSAGES.buildWebsite)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-500 text-white font-bold px-9 py-4 rounded-full shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-cyan-200/60 hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Your Project
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
