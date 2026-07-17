import { useEffect, useRef, useState } from 'react';
import { Check, Zap, Crown, Rocket, Video, Palette, Sparkles } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const subscriptionPlans = [
  {
    name: 'Starter',
    icon: Zap,
    price: '₦25,000',
    period: '/month',
    description: 'Perfect for small businesses getting online.',
    features: [
      '1 Service (Social Media OR Content)',
      'Basic Content Creation (4 posts/month)',
      'Social Media Setup & Optimization',
      'Monthly Performance Report',
      'WhatsApp Support',
    ],
    highlight: false,
    cta: WA_MESSAGES.pricing,
  },
  {
    name: 'Growth',
    icon: Rocket,
    price: '₦75,000',
    period: '/month',
    description: 'For brands ready to scale their digital presence.',
    features: [
      'Up to 2 Services Combined',
      'Social Media Management (12 posts/month)',
      'Content Creation (photos + short video)',
      'Basic SEO Optimization',
      'Monthly Strategy Call',
      'Priority WhatsApp Support',
    ],
    highlight: true,
    cta: WA_MESSAGES.pricing,
  },
  {
    name: 'Premium',
    icon: Crown,
    price: '₦150,000+',
    period: '/month',
    description: 'Full-stack digital growth on autopilot.',
    features: [
      'Up to 4 Services Combined',
      'Daily Social Media Management',
      'Advanced Content Creation',
      'SEO + Digital Marketing + Ads',
      'Bi-weekly Strategy Calls',
      'Dedicated Account Manager',
    ],
    highlight: false,
    cta: WA_MESSAGES.pricing,
  },
];

const brandingSubscription = {
  name: 'Weekly Flyer Subscription',
  icon: Palette,
  price: '₦50,000',
  period: '/month',
  description: 'Consistent, professional flyer designs every single week.',
  features: [
    '4 Flyer Designs per month (1/week)',
    'Social media-ready dimensions',
    '2 revisions per design',
    'Brand-consistent templates',
    '48-hour turnaround per design',
    'Source files included',
  ],
};

const videoPackages = [
  {
    name: 'Essential Video',
    price: '₦300,000',
    description: 'Single high-quality promotional video.',
    features: [
      '1 Promotional Video (up to 60 sec)',
      'Professional Editing & Color Grading',
      'Background Music & Voiceover',
      '1 Round of Revisions',
      '1080p HD Delivery',
      '5-Day Turnaround',
    ],
  },
  {
    name: 'Professional Video',
    price: '₦600,000',
    description: 'Multi-video package for a full campaign.',
    features: [
      '3 Promotional Videos (60–90 sec each)',
      'Professional Editing & Color Grading',
      'Motion Graphics & Subtitles',
      '2 Rounds of Revisions per Video',
      '4K UHD Delivery',
      '10-Day Turnaround',
      'Social Media Cut Versions',
    ],
    highlight: true,
  },
  {
    name: 'Cinematic Video',
    price: '₦1,000,000',
    description: 'Premium cinematic production for flagship brands.',
    features: [
      '5+ Promotional Videos (up to 2 min)',
      'Cinematic Production Crew',
      'Advanced Motion Graphics & VFX',
      'Unlimited Revisions',
      '4K UHD Delivery + Raw Footage',
      '21-Day Turnaround',
      'Multi-Platform Cut Versions',
      'Brand Storytelling Strategy',
    ],
  },
];

const contentPricing = [
  { label: 'Basic Content (4 posts/month)', price: '₦25,000' },
  { label: 'Standard Content (12 posts/month)', price: '₦50,000' },
  { label: 'Premium Content (daily + video)', price: '₦100,000' },
  { label: 'Short-Form Video (Reels/TikTok)', price: '₦40,000 – ₦80,000' },
  { label: 'Product Photography (per session)', price: '₦30,000 – ₦60,000' },
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

function SubscriptionCard({ plan }: { plan: (typeof subscriptionPlans)[0] }) {
  const Icon = plan.icon;
  return (
    <div
      className={`relative h-full rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
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
      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      <p className={`text-sm mb-5 ${plan.highlight ? 'text-blue-100' : 'text-slate-500'}`}>
        {plan.description}
      </p>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-extrabold">{plan.price}</span>
        <span className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
          {plan.period}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
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
        href={waLink(plan.cta)}
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center font-bold py-3 rounded-full transition-all duration-300 ${
          plan.highlight
            ? 'bg-white text-blue-700 hover:bg-cyan-50'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        Get Started
      </a>
    </div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<'subscription' | 'video' | 'branding'>('subscription');

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
            Subscription{' '}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Flexible monthly subscriptions that grow with your business. No hidden fees,
            cancel anytime.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'subscription', label: 'Subscriptions', icon: Sparkles },
            { id: 'video', label: 'Video Production', icon: Video },
            { id: 'branding', label: 'Branding & Content', icon: Palette },
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setBilling(tab.id as typeof billing)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  billing === tab.id
                    ? 'bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <TabIcon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Subscription plans */}
        {billing === 'subscription' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {subscriptionPlans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100}>
                <SubscriptionCard plan={plan} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Video production packages */}
        {billing === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {videoPackages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <div
                  className={`relative h-full rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                    pkg.highlight
                      ? 'bg-gradient-to-br from-slate-900 to-blue-900 text-white shadow-2xl ring-2 ring-cyan-400'
                      : 'bg-white text-slate-900 border border-slate-100 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-300 text-slate-950 text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wider">
                      Best Value
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                    pkg.highlight ? 'bg-white/20' : 'bg-blue-50'
                  }`}>
                    <Video size={24} className={pkg.highlight ? 'text-cyan-300' : 'text-blue-600'} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className={`text-sm mb-5 ${pkg.highlight ? 'text-blue-200' : 'text-slate-500'}`}>
                    {pkg.description}
                  </p>
                  <div className="text-4xl font-extrabold mb-1">{pkg.price}</div>
                  <div className={`text-xs mb-6 ${pkg.highlight ? 'text-blue-300' : 'text-slate-400'} uppercase tracking-wider`}>
                    One-time project
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check
                          size={18}
                          className={`flex-shrink-0 mt-0.5 ${pkg.highlight ? 'text-cyan-300' : 'text-blue-600'}`}
                        />
                        <span className={pkg.highlight ? 'text-blue-50' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(WA_MESSAGES.video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center font-bold py-3 rounded-full transition-all duration-300 ${
                      pkg.highlight
                        ? 'bg-white text-slate-900 hover:bg-cyan-50'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    Enquire Now
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Branding subscription & content pricing */}
        {billing === 'branding' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Branding subscription */}
            <Reveal>
              <div className="relative h-full rounded-3xl p-8 bg-gradient-to-br from-purple-700 to-blue-700 text-white shadow-2xl overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Palette size={24} className="text-cyan-200" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full">
                      Subscription
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{brandingSubscription.name}</h3>
                  <p className="text-blue-100 text-sm mb-5">{brandingSubscription.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold">{brandingSubscription.price}</span>
                    <span className="text-blue-200 text-sm">{brandingSubscription.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {brandingSubscription.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check size={18} className="flex-shrink-0 mt-0.5 text-cyan-300" />
                        <span className="text-blue-50">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(WA_MESSAGES.branding)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center font-bold py-3 rounded-full bg-white text-blue-700 hover:bg-cyan-50 transition-colors"
                  >
                    Subscribe Now
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Content creation pricing */}
            <Reveal delay={100}>
              <div className="h-full rounded-3xl p-8 bg-white border border-slate-100 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Sparkles size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Content Creation</h3>
                    <p className="text-sm text-slate-500">Flexible content pricing</p>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  {contentPricing.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      <span className="font-bold text-blue-600 whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={waLink("Hello Qua Business, I'd like to know more about your Content Creation pricing and packages.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center font-bold py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  Enquire on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        )}

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
