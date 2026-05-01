import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const pricingCategories = [
  {
    category: 'Website Services',
    icon: '🌐',
    description: 'Core Revenue Driver',
    services: [
      {
        name: 'Full Website Development',
        items: [
          { label: 'Basic Website (1–5 pages)', price: '₦150,000' },
          { label: 'Standard Business Website (5–10 pages)', price: '₦250,000' },
          {
            label: 'Premium Website (Advanced/eCommerce)',
            price: '₦350,000 – ₦500,000',
          },
        ],
        note: 'Payment Plan: 70% upfront, 30% on completion',
      },
      {
        name: 'Website Setup (Subsidized Entry)',
        items: [
          { label: 'Domain + Hosting + Basic Setup', price: '₦15,000 – ₦20,000' },
        ],
        note: 'Lead magnet offer',
      },
      {
        name: 'Monthly Website Subscription',
        items: [
          {
            label: 'Maintenance + Updates + Monitoring',
            price: '₦5,700/month',
          },
          {
            label: 'Advanced Care Plan',
            price: '₦15,000/month',
            highlight: true,
          },
        ],
        note: 'Advanced includes edits, speed optimization, backups',
      },
    ],
  },
  {
    category: 'Growth & Visibility Services',
    icon: '📈',
    description: '',
    services: [
      {
        name: 'Online Visibility Setup',
        items: [{ label: 'One-time setup', price: '₦25,000 – ₦50,000' }],
      },
      {
        name: 'Traffic Generation (Basic SEO)',
        items: [{ label: 'Monthly', price: '₦20,000 – ₦40,000' }],
      },
    ],
  },
  {
    category: 'WhatsApp Business Solutions',
    icon: '💬',
    description: '',
    services: [
      {
        name: 'WhatsApp Business Setup',
        items: [{ label: 'One-time', price: '₦10,000 – ₦20,000' }],
      },
      {
        name: 'WhatsApp Sales Optimization',
        items: [
          { label: 'One-time', price: '₦25,000 – ₦50,000' },
          {
            label: 'Optional Monthly Optimization',
            price: '₦15,000/month',
            highlight: true,
          },
        ],
      },
    ],
  },
  {
    category: 'Social Media Services',
    icon: '📱',
    description: '',
    services: [
      {
        name: 'Social Media Setup',
        items: [{ label: 'One-time', price: '₦15,000 – ₦30,000' }],
      },
      {
        name: 'Social Media Management',
        items: [
          { label: 'Basic (3 posts/week)', price: '₦40,000/month' },
          { label: 'Standard (daily + engagement)', price: '₦70,000/month' },
          {
            label: 'Premium (ads + strategy + content)',
            price: '₦120,000/month',
            highlight: true,
          },
        ],
      },
    ],
  },
  {
    category: 'Content & Branding',
    icon: '🎨',
    description: '',
    services: [
      {
        name: 'Content Creation (Basic)',
        items: [{ label: 'Monthly', price: '₦25,000 – ₦50,000' }],
      },
      {
        name: 'Branding & Visual Design',
        items: [{ label: 'One-time', price: '₦50,000 – ₦150,000' }],
      },
    ],
  },
  {
    category: 'Sales & Conversion',
    icon: '🎯',
    description: '',
    services: [
      {
        name: 'Offer & Promotion Setup',
        items: [{ label: 'Per campaign', price: '₦20,000 – ₦50,000' }],
      },
      {
        name: 'Ads Management',
        items: [
          { label: 'Setup Fee', price: '₦30,000 – ₦80,000' },
          {
            label: 'Monthly Management',
            price: '₦30,000 – ₦100,000',
            note: 'Excluding ad spend',
          },
        ],
      },
    ],
  },
  {
    category: 'Business Optimization & Analytics',
    icon: '📊',
    description: '',
    services: [
      {
        name: 'Business Profile Optimization',
        items: [{ label: 'One-time', price: '₦15,000 – ₦30,000' }],
      },
      {
        name: 'Performance Tracking & Reporting',
        items: [{ label: 'Monthly', price: '₦20,000 – ₦50,000' }],
      },
    ],
  },
  {
    category: 'Customer Retention & Growth',
    icon: '🤝',
    description: '',
    services: [
      {
        name: 'Customer Engagement Support',
        items: [{ label: 'Monthly', price: '₦20,000 – ₦60,000' }],
      },
      {
        name: 'Business Growth Strategy (Consulting)',
        items: [
          { label: 'Per session', price: '₦20,000 – ₦50,000' },
          {
            label: 'Monthly Advisory',
            price: '₦100,000+',
            highlight: true,
          },
        ],
      },
    ],
  },
];

function ServiceItem({
  item,
  index,
}: {
  item: { label: string; price: string; highlight?: boolean; note?: string };
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
          el.classList.remove('opacity-0', 'translate-y-4');
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-4 transition-all duration-500 flex items-start justify-between gap-4 p-4 rounded-lg ${
        item.highlight ? 'bg-blue-50 border-l-4 border-blue-600' : 'bg-gray-50'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 text-sm">{item.label}</div>
        {item.note && (
          <div className="text-xs text-gray-500 mt-1">({item.note})</div>
        )}
      </div>
      <div className="font-bold text-blue-600 whitespace-nowrap flex-shrink-0">
        {item.price}
      </div>
    </div>
  );
}

function ServiceBlock({
  service,
  categoryIndex,
  serviceIndex,
}: {
  service: (typeof pricingCategories[0]['services'])[0];
  categoryIndex: number;
  serviceIndex: number;
}) {
  const [expanded, setExpanded] = useState(true);
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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-6 transition-all duration-500 border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{
        transitionDelay: `${(categoryIndex * 2 + serviceIndex) * 60}ms`,
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-3 p-5 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 text-left">
          <h4 className="font-bold text-gray-900">{service.name}</h4>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 flex-shrink-0 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="px-5 py-4 bg-white border-t border-gray-100 space-y-2">
          {service.items.map((item, i) => (
            <ServiceItem key={item.label} item={item} index={i} />
          ))}
          {service.note && !service.items[0].note && (
            <div className="text-xs text-gray-500 italic mt-3 pt-3 border-t border-gray-200">
              💡 {service.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CategorySection({
  category,
  index,
}: {
  category: (typeof pricingCategories)[0];
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

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-500"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
          {category.description && (
            <p className="text-sm text-gray-500">{category.description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {category.services.map((service, i) => (
          <ServiceBlock
            key={service.name}
            service={service}
            categoryIndex={index}
            serviceIndex={i}
          />
        ))}
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Transparent Pricing
          </span>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            💰 QUA Business —{' '}
            <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
              Pricing & Payment Plans
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Flexible pricing for every service. Choose one-time projects or monthly retainers that grow with your business.
          </p>
        </div>

        <div className="space-y-12">
          {pricingCategories.map((category, i) => (
            <CategorySection key={category.category} category={category} index={i} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-500 rounded-2xl p-10 md:p-14 text-center text-white shadow-xl">
          <h3 className="text-3xl font-bold mb-3">Need a Custom Package?</h3>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Every business is unique. Let's create a tailored plan that fits your exact needs and budget.
          </p>
          <a
            href="https://wa.me/2347019791950"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-10 py-4 rounded-full hover:bg-blue-50 transition-colors duration-200 shadow-lg"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Get a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
