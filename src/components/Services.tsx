import { useState, useEffect } from 'react';

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  details: {
    overview: string;
    process: string[];
    deliverables: string[];
    pricing: string;
  };
};

const services: Service[] = [
  {
    id: 'website-design',
    title: 'Website Design & Development',
    description: 'Custom-built websites that blend stunning visuals with seamless functionality to elevate your online presence.',
    image: 'https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Responsive Design', 'Fast Loading', 'SEO Friendly', 'Modern UI'],
    details: {
      overview:
        'We build fully custom websites from the ground up, tailored to your brand and business goals. Every site is crafted with performance, accessibility, and conversion in mind — ensuring visitors not only stay but take action.',
      process: [
        'Discovery & requirements gathering',
        'Wireframing and design mockups',
        'Development and content integration',
        'Testing across devices and browsers',
        'Launch and post-launch support',
      ],
      deliverables: [
        'Custom-designed website (up to 10 pages)',
        'Mobile-responsive layout',
        'CMS integration for self-editing',
        'Basic on-page SEO setup',
        '30 days of post-launch support',
      ],
      pricing: 'Projects start at $2,500 — final pricing depends on scope and complexity.',
    },
  },
  {
    id: 'branding-identity',
    title: 'Branding & Identity',
    description: 'Craft a memorable brand identity that resonates with your audience and sets you apart from the competition.',
    image: 'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
    details: {
      overview:
        'Your brand is more than a logo — it is the feeling people get when they interact with your business. We help you define that feeling and translate it into a cohesive visual and verbal identity that builds trust and recognition.',
      process: [
        'Brand audit and competitor research',
        'Strategy workshop and positioning',
        'Logo and visual identity exploration',
        'Refinement and brand guidelines',
        'Final asset delivery',
      ],
      deliverables: [
        'Primary logo and variations',
        'Color palette and typography system',
        'Brand guidelines document (PDF)',
        'Social media profile kit',
        'Business card and letterhead templates',
      ],
      pricing: 'Brand identity packages start at $1,800.',
    },
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Eye-catching visual content that communicates your message and captivates your audience across every platform.',
    image: 'https://images.pexels.com/photos/16313664/pexels-photo-16313664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Print Design', 'Digital Graphics', 'Illustrations', 'Marketing Materials'],
    details: {
      overview:
        'From brochures to digital banners, we create visually striking designs that communicate clearly and leave a lasting impression. Every piece is crafted to align with your brand and resonate with your target audience.',
      process: [
        'Brief and creative direction',
        'Concept development',
        'Design and iteration rounds',
        'Final artwork preparation',
        'Print-ready or digital delivery',
      ],
      deliverables: [
        'Custom graphic assets',
        'Print-ready files (CMYK, bleed)',
        'Web-optimized exports',
        'Source files included',
        '2 rounds of revisions',
      ],
      pricing: 'Hourly rate: $75/hr — or project-based quotes available.',
    },
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Compelling content that tells your story, engages your audience, and drives meaningful conversions.',
    image: 'https://images.pexels.com/photos/37033778/pexels-photo-37033778.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Video Production', 'Photography', 'Copywriting', 'Content Strategy'],
    details: {
      overview:
        'Great content is the bridge between your brand and your audience. We produce video, photography, and written content that captures attention, builds connection, and moves people to action.',
      process: [
        'Content strategy and planning',
        'Pre-production and scripting',
        'Production (filming / photography / writing)',
        'Post-production and editing',
        'Delivery and distribution guidance',
      ],
      deliverables: [
        'Professionally edited video(s)',
        'High-resolution photo set',
        'SEO-optimized copy',
        'Social media cut-downs',
        'Content calendar template',
      ],
      pricing: 'Packages start at $1,200 — custom quotes based on scope.',
    },
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    description: 'Strategic social media management that builds your community and amplifies your brand voice online.',
    image: 'https://images.pexels.com/photos/32944547/pexels-photo-32944547.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Content Scheduling', 'Community Engagement', 'Analytics Reports', 'Platform Strategy'],
    details: {
      overview:
        'We take the guesswork out of social media. From content planning to community engagement, we manage your presence across platforms so you can focus on running your business while your audience grows.',
      process: [
        'Audit of current social presence',
        'Platform strategy and content pillars',
        'Content creation and scheduling',
        'Community management and engagement',
        'Monthly performance reporting',
      ],
      deliverables: [
        '12–20 posts per month',
        'Custom graphics and captions',
        'Hashtag and trend research',
        'Monthly analytics report',
        'Community engagement (comments & DMs)',
      ],
      pricing: 'Monthly retainer starting at $900/month.',
    },
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Data-driven marketing campaigns that reach the right audience at the right time for maximum ROI.',
    image: 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['PPC Advertising', 'Email Marketing', 'Campaign Management', 'Conversion Optimization'],
    details: {
      overview:
        'We create and manage digital marketing campaigns that are measurable, scalable, and built around your business objectives. Every dollar spent is tracked and optimized for the best possible return.',
      process: [
        'Goal setting and audience research',
        'Campaign strategy and budget allocation',
        'Creative development and launch',
        'Ongoing optimization and A/B testing',
        'Reporting and strategy refinement',
      ],
      deliverables: [
        'Campaign setup across platforms',
        'Ad creative (copy and visuals)',
        'Landing page optimization',
        'Conversion tracking implementation',
        'Bi-weekly performance reports',
      ],
      pricing: 'Management fee starts at $1,000/month plus ad spend.',
    },
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Boost your search rankings and organic traffic with proven SEO strategies tailored to your business.',
    image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Keyword Research', 'On-Page SEO', 'Technical Audit', 'Link Building'],
    details: {
      overview:
        'Search engine optimization is a long-term investment that compounds over time. We use proven, white-hat techniques to improve your visibility in search results and drive qualified organic traffic to your site.',
      process: [
        'Comprehensive SEO audit',
        'Keyword and competitor research',
        'On-page and technical optimization',
        'Content recommendations and link building',
        'Monthly rank tracking and reporting',
      ],
      deliverables: [
        'Full technical SEO audit report',
        'Keyword strategy document',
        'On-page optimization (up to 20 pages)',
        'Monthly ranking and traffic report',
        'Link building outreach campaign',
      ],
      pricing: 'SEO packages start at $750/month.',
    },
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Intuitive, user-centered designs that create delightful experiences and drive engagement on every screen.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
    details: {
      overview:
        'We design digital products that people love to use. By combining user research, thoughtful interaction design, and polished visual design, we create experiences that are both beautiful and effortless.',
      process: [
        'User research and persona development',
        'Information architecture and user flows',
        'Wireframing and interactive prototyping',
        'Usability testing and iteration',
        'Final design handoff to developers',
      ],
      deliverables: [
        'User research summary and personas',
        'Clickable Figma prototype',
        'Design system and component library',
        'Developer handoff documentation',
        '2 rounds of usability testing',
      ],
      pricing: 'UX/UI projects start at $3,000.',
    },
  },
  {
    id: 'business-consultation',
    title: 'Business Consultation',
    description: 'Strategic guidance to help you navigate the digital landscape and achieve sustainable growth.',
    image: 'https://images.pexels.com/photos/36765719/pexels-photo-36765719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Strategy Planning', 'Market Analysis', 'Growth Consulting', 'Digital Transformation'],
    details: {
      overview:
        'Whether you are launching a new venture or scaling an existing one, we provide strategic guidance rooted in real-world experience. We help you make informed decisions about technology, marketing, and growth.',
      process: [
        'Business assessment and goal setting',
        'Market and competitive analysis',
        'Strategy development and roadmapping',
        'Implementation guidance and prioritization',
        'Quarterly review and course correction',
      ],
      deliverables: [
        'Business strategy document',
        'Market analysis report',
        '12-month action roadmap',
        'KPI dashboard setup recommendations',
        '2 follow-up consultation sessions',
      ],
      pricing: 'Consultation packages start at $500/session.',
    },
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  return (
    <section id="services" className="py-24 bg-neutral-50">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
            What We Offer
          </span>
          <h2 className="mt-3 text-4xl font-bold text-neutral-900 sm:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            We provide a comprehensive suite of creative and digital services to help your business thrive in the modern landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onMouseEnter={() => setActiveId(service.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                <h3 className="absolute bottom-4 left-5 right-5 text-xl font-bold text-white">
                  {service.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-neutral-600 leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-neutral-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className={`mt-6 w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeId === service.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  Learn More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
              <h3 className="absolute bottom-5 left-6 right-6 text-2xl font-bold text-white">
                {selectedService.title}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-neutral-700 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                aria-label="Close details"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div>
                <h4 className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-3">
                  Overview
                </h4>
                <p className="text-neutral-700 leading-relaxed">
                  {selectedService.details.overview}
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-3">
                  Our Process
                </h4>
                <ol className="space-y-3">
                  {selectedService.details.process.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-neutral-700 leading-relaxed pt-0.5">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-3">
                  What You Get
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.details.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-neutral-700">
                      <svg className="flex-shrink-0 w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h4 className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-1">
                  Pricing
                </h4>
                <p className="text-neutral-800 font-medium">
                  {selectedService.details.pricing}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="mt-6 w-full py-3 rounded-lg font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
