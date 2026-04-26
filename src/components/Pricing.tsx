import { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const setupFees = [
  { service: 'Website Setup', price: '₦20k – ₦50k', desc: 'Professional website creation & deployment' },
  { service: 'WhatsApp Setup', price: '₦5k – ₦15k', desc: 'Business profile & automation' },
];

const monthlyPlans = [
  {
    name: 'Basic Plan',
    price: '₦5,000',
    color: 'from-emerald-600 to-emerald-500',
    badge: 'green',
    features: [
      'Website hosting & maintenance',
      'Minor website updates',
      'WhatsApp support channel',
      'Monthly performance report',
      'Email support',
    ],
  },
  {
    name: 'Growth Plan',
    price: '₦15,000',
    color: 'from-amber-600 to-amber-500',
    badge: 'amber',
    features: [
      'Everything in Basic',
      'Social media content posting (2x/week)',
      'Offer & promotion updates',
      'Growth optimization suggestions',
      'Priority email support',
      'Monthly strategy session',
    ],
    highlighted: true,
  },
  {
    name: 'Scale Plan',
    price: '₦30,000+',
    color: 'from-rose-600 to-rose-500',
    badge: 'rose',
    features: [
      'Everything in Growth',
      'Full social media management',
      'Ad campaign setup & optimization',
      'Weekly performance reviews',
      '24/7 priority support',
      'Dedicated account manager',
      'Custom growth strategies',
    ],
  },
];

function PlanCard({
  plan,
  index,
}: {
  plan: (typeof monthlyPlans)[0];
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
      className={`opacity-0 translate-y-8 transition-all duration-500 relative ${
        plan.highlighted ? 'md:scale-105 md:shadow-2xl' : ''
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div
        className={`bg-white rounded-2xl p-8 border ${
          plan.highlighted
            ? 'border-blue-200 shadow-xl'
            : 'border-gray-100 shadow-sm hover:shadow-lg'
        } transition-all duration-300 h-full flex flex-col hover:-translate-y-1`}
      >
        <div className="mb-6">
          <div
            className={`inline-block bg-gradient-to-r ${plan.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-4`}
          >
            {plan.name}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-gray-900">
              {plan.price}
            </span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                size={18}
                className={`flex-shrink-0 mt-0.5 ${
                  plan.highlighted ? 'text-blue-600' : 'text-emerald-600'
                }`}
              />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={`flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
            plan.highlighted
              ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white hover:opacity-90'
              : 'border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          Get Started
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}

function SetupFeeCard({
  item,
  index,
}: {
  item: (typeof setupFees)[0];
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
      className="opacity-0 translate-y-6 transition-all duration-500 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent mb-2">
        {item.price}
      </div>
      <div className="font-bold text-gray-900 mb-1">{item.service}</div>
      <div className="text-sm text-gray-500">{item.desc}</div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Simple, Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Affordable Plans for Every{' '}
            <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
              Stage
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Start small, scale big. Choose the plan that fits your business right now.
          </p>
        </div>

        {/* Setup Fees */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">One-Time Setup Fees</h3>
            <p className="text-gray-500">Get your business online with these subsidized setup costs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {setupFees.map((item, i) => (
              <SetupFeeCard key={item.service} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Monthly Plans */}
        <div>
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Subscription Plans</h3>
            <p className="text-gray-500">Flexible plans that grow with your business. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {monthlyPlans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        </div>

        {/* FAQ strip */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-10 md:p-14 text-center border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Questions About Pricing?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Every plan includes 24/7 WhatsApp support. We're here to help you succeed, not complicate things.
          </p>
          <a
            href="https://wa.me/2348000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
