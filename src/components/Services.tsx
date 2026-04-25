import { useEffect, useRef } from 'react';
import {
  Globe,
  Settings,
  Search,
  MessageCircle,
  ShoppingCart,
  Share2,
  BarChart2,
  Palette,
  Star,
  TrendingUp,
  Megaphone,
  Building2,
  HeartHandshake,
  LineChart,
  Lightbulb,
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Creation',
    description:
      'We build modern, fast, and fully responsive websites that represent your brand professionally and convert visitors into customers.',
    tag: 'Core',
  },
  {
    icon: Settings,
    title: 'Website Management',
    description:
      'Ongoing updates, maintenance, and real-time performance monitoring — so your site always runs at peak performance.',
    tag: 'Core',
  },
  {
    icon: Search,
    title: 'Online Visibility Setup',
    description:
      'SEO fundamentals, Google presence setup, and discoverability strategies to ensure the right people find your business.',
    tag: 'Growth',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Business Setup',
    description:
      'Professional WhatsApp Business profile configured for your brand — with catalog, quick replies, and branded messaging.',
    tag: 'Communication',
  },
  {
    icon: ShoppingCart,
    title: 'WhatsApp Sales Optimization',
    description:
      'Automated replies, product catalogs, and proven conversion strategies to turn chats into closed deals.',
    tag: 'Sales',
  },
  {
    icon: Share2,
    title: 'Social Media Setup',
    description:
      'Account creation, profile optimization, and brand consistency across all major social platforms.',
    tag: 'Branding',
  },
  {
    icon: BarChart2,
    title: 'Social Media Management',
    description:
      'Consistent content posting, audience engagement, and growth strategies to build a loyal following.',
    tag: 'Growth',
  },
  {
    icon: Palette,
    title: 'Content Creation (Basic)',
    description:
      'Eye-catching graphics, compelling captions, and brand-aligned posts designed to stop the scroll.',
    tag: 'Creative',
  },
  {
    icon: Star,
    title: 'Offer & Promotion Setup',
    description:
      'Crafting irresistible offers and promotional campaigns that attract customers and drive revenue.',
    tag: 'Sales',
  },
  {
    icon: TrendingUp,
    title: 'Traffic Generation (Basic)',
    description:
      'Organic traffic strategies, keyword targeting, and audience growth tactics to bring the right visitors to you.',
    tag: 'Growth',
  },
  {
    icon: Megaphone,
    title: 'Ads Management',
    description:
      'Paid advertising setup and optimization across Facebook, Instagram, and Google to maximize your ROI.',
    tag: 'Optional',
  },
  {
    icon: Palette,
    title: 'Branding & Visual Design',
    description:
      'Consistent logo usage, brand identity refinement, and visual guidelines that make your business unforgettable.',
    tag: 'Branding',
  },
  {
    icon: Building2,
    title: 'Business Profile Optimization',
    description:
      'Optimizing your Google Business Profile and online listings to rank higher and attract local customers.',
    tag: 'Core',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Engagement Support',
    description:
      'Building systems for responding, retaining, and delighting customers at every touchpoint.',
    tag: 'Retention',
  },
  {
    icon: LineChart,
    title: 'Performance Tracking & Reporting',
    description:
      'Analytics dashboards and monthly reports that show exactly what\'s working and where to invest next.',
    tag: 'Analytics',
  },
  {
    icon: Lightbulb,
    title: 'Business Growth Strategy',
    description:
      'One-on-one consulting and tailored scaling strategies built specifically for your goals and market.',
    tag: 'Advisory',
  },
];

const tagColors: Record<string, string> = {
  Core: 'bg-blue-100 text-blue-700',
  Growth: 'bg-emerald-100 text-emerald-700',
  Communication: 'bg-sky-100 text-sky-700',
  Sales: 'bg-orange-100 text-orange-700',
  Branding: 'bg-rose-100 text-rose-700',
  Creative: 'bg-amber-100 text-amber-700',
  Optional: 'bg-gray-100 text-gray-600',
  Retention: 'bg-teal-100 text-teal-700',
  Analytics: 'bg-cyan-100 text-cyan-700',
  Advisory: 'bg-blue-100 text-blue-700',
};

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
      className="opacity-0 translate-y-8 transition-all duration-500 group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 cursor-default"
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
          <Icon size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-base font-bold text-gray-900">{service.title}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[service.tag]}`}>
              {service.tag}
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Complete Digital Business{' '}
            <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything your business needs to thrive online — under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
