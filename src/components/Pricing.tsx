import { useEffect, useRef } from 'react';
import { Check, Zap, Rocket, Crown, Video, Palette, Megaphone, Film, Layers, Share2 } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const websitePlans = [
  {
    name: 'Starter',
    icon: Zap,
    setupFee: '₦18,000',
    monthly: '₦7,200',
    features: [
      'Professional business website',
      'Domain registration',
      'Website hosting',
      'Monthly website maintenance',
      'Product uploads and updates',
      'Google Business Profile registration',
      'Technical support',
    ],
    highlight: false,
  },
  {
    name: 'Growth',
    icon: Rocket,
    setupFee: '₦30,000',
    monthly: '₦16,200',
    features: [
      'Everything in the Starter plan',
      'Search Engine Optimization (SEO)',
      'Google Search Console setup',
      'Website performance monitoring',
      'Monthly website maintenance',
      'Product uploads and updates',
      'Google Business Profile registration',
      'Priority technical support',
    ],
    highlight: true,
  },
  {
    name: 'Premium',
    icon: Crown,
    setupFee: '₦70,000',
    monthly: '₦25,000',
    features: [
      'Custom website design',
      'Admin dashboard',
      'Online payment integration',
      'Full-year domain registration',
      'Premium hosting',
      'Advanced SEO',
      'Product and inventory management',
      'Analytics dashboard',
      'Contact forms',
      'Website security and backups',
      'Unlimited maintenance',
      'Priority technical support',
      'Business email setup',
      'Website management training',
    ],
    highlight: false,
  },
];

const creativeServices = [
  {
    icon: Megaphone,
    label: 'Commercial advertisements',
    description: 'Professional TV and online ad spots that put your product in front of the right audience.',
    image: 'https://images.pexels.com/photos/9703183/pexels-photo-9703183.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    waMessage: "Hello Qua Business, I'm interested in your Commercial Advertisements service. Please share more details and pricing.",
  },
  {
    icon: Film,
    label: 'Brand promotional videos',
    description: 'Cinematic videos that tell your brand story and connect emotionally with customers.',
    image: 'https://images.pexels.com/photos/17486300/pexels-photo-17486300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    waMessage: "Hello Qua Business, I'm interested in your Brand Promotional Videos service. Please share more details and pricing.",
  },
  {
    icon: Palette,
    label: 'Graphic design',
    description: 'Logos, flyers, brochures, and marketing materials designed to make your brand stand out.',
    image: 'https://images.pexels.com/photos/16313664/pexels-photo-16313664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    waMessage: "Hello Qua Business, I'm interested in your Graphic Design service. Please share more details and pricing.",
  },
  {
    icon: Share2,
    label: 'Social media creatives',
    description: 'Eye-catching posts, reels, and graphics that boost engagement across all your social platforms.',
    image: 'https://images.pexels.com/photos/6956303/pexels-photo-6956303.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    waMessage: "Hello Qua Business, I'm interested in your Social Media Creatives service. Please share more details and pricing.",
  },
  {
    icon: Layers,
    label: 'Motion graphics',
    description: 'Animated logos, explainer videos, and dynamic visuals that bring your message to life.',
    image: 'https://images.pexels.com/photos/8817542/pexels-photo-8817542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    waMessage: "Hello Qua Business, I'm interested in your Motion Graphics service. Please share more details and pricing.",
  },
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
      { threshold: 0.1 }
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

function WebsitePlanCard({ plan }: { plan: (typeof websitePlans)[0] }) {
  const Icon = plan.icon;
  return (
    <div
      className={`relative h-full flex flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        plan.highlight
          ? 'bg-gradient-to-br from-blue-700 to-cyan-600 text-white shadow-2xl shadow-blue-300/50 ring-2 ring-cyan-400'
          : 'bg-white text-slate-900 border border-slate-100 shadow-lg hover:shadow-xl'
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-300 text-slate-950 text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
        plan.highlight ? 'bg-white/20' : 'bg-blue-50'
      }`}>
        <Icon size={24} className={plan.highlight ? 'text-cyan-200' : 'text-blue-600'} />
      </div>
      <h3 className="text-xl font-bold mb-4">{plan.name}</h3>

      <div className="space-y-1 mb-6">
        <div className="flex items-baseline gap-2">
          <span className={`text-xs uppercase tracking-wider font-semibold ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
            Website Setup
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold">{plan.setupFee}</span>
          <span className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>one-time</span>
        </div>
        <div className={`flex items-baseline gap-1 pt-2 ${plan.highlight ? 'border-t border-white/20' : 'border-t border-slate-100'} mt-2`}>
          <span className="text-2xl font-extrabold">{plan.monthly}</span>
          <span className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>/month</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check
              size={18}
              className={`flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-cyan-300' : 'text-blue-600'}`}
            />
            <span className={plan.highlight ? 'text-blue-50' : 'text-slate-600'}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={waLink(WA_MESSAGES.pricing)}
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center font-bold py-3 rounded-full transition-all duration-300 ${
          plan.highlight
            ? 'bg-white text-blue-700 hover:bg-cyan-50'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        Choose This Plan
      </a>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-blue-400" />
            Simple Pricing
            <span className="w-8 h-px bg-blue-400" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Affordable Websites for{' '}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Growing Businesses
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            Many businesses operate without a professional website because traditional website
            development can be expensive. At Qua Business, we've changed that.
          </p>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            Instead of paying a huge amount upfront, you pay a one-time setup fee to launch your
            website and then a monthly subscription that covers hosting, maintenance, updates, and
            ongoing support.
          </p>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            This means your business stays online, secure, and up to date—without the stress of
            large maintenance costs.
          </p>
        </div>

        {/* Section subheading */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
            Choose the Package That's Right for You
          </h3>
        </div>

        {/* Website plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {websitePlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <WebsitePlanCard plan={plan} />
            </Reveal>
          ))}
        </div>

        {/* Other Digital Services */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-[0.25em] mb-4">
              <span className="w-8 h-px bg-blue-400" />
              More From Us
              <span className="w-8 h-px bg-blue-400" />
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Other Digital Services
            </h3>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              We also help businesses build a stronger brand with high-quality creative content.
            </p>
          </div>

          <Reveal>
            <div className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-800 to-cyan-700 text-white shadow-2xl overflow-hidden">
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Video size={24} className="text-cyan-200" />
                  </div>
                  <h4 className="text-2xl font-bold">Visual Content & Graphics</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                  {creativeServices.map((service) => {
                    const ServiceIcon = service.icon;
                    return (
                      <a
                        key={service.label}
                        href={waLink(service.waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-2xl bg-white/10 overflow-hidden hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-cyan-300/50"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.label}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                          <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <ServiceIcon size={18} className="text-cyan-200" />
                          </div>
                        </div>
                        <div className="p-5">
                          <h5 className="text-sm font-bold text-white mb-1.5">{service.label}</h5>
                          <p className="text-xs text-blue-100 leading-relaxed">{service.description}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <a
                  href={waLink(WA_MESSAGES.branding)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center font-bold py-3 px-10 rounded-full bg-white text-blue-700 hover:bg-cyan-50 transition-colors"
                >
                  Choose This Plan
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-700 to-cyan-500 rounded-3xl p-10 md:p-14 text-center text-white shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Need a Custom Package?</h3>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Every business is unique. Let's create a tailored plan that fits your exact needs and budget.
          </p>
          <a
            href={waLink(WA_MESSAGES.quote)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-10 py-4 rounded-full hover:bg-cyan-50 transition-colors shadow-lg"
          >
            Get a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
