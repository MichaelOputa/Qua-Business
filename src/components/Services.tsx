import { useState } from 'react';

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
};

const services: Service[] = [
  {
    id: 'website-design',
    title: 'Website Design & Development',
    description: 'Custom-built websites that blend stunning visuals with seamless functionality to elevate your online presence.',
    image: 'https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Responsive Design', 'Fast Loading', 'SEO Friendly', 'Modern UI'],
  },
  {
    id: 'branding-identity',
    title: 'Branding & Identity',
    description: 'Craft a memorable brand identity that resonates with your audience and sets you apart from the competition.',
    image: 'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Eye-catching visual content that communicates your message and captivates your audience across every platform.',
    image: 'https://images.pexels.com/photos/16313664/pexels-photo-16313664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Print Design', 'Digital Graphics', 'Illustrations', 'Marketing Materials'],
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Compelling content that tells your story, engages your audience, and drives meaningful conversions.',
    image: 'https://images.pexels.com/photos/37033778/pexels-photo-37033778.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Video Production', 'Photography', 'Copywriting', 'Content Strategy'],
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    description: 'Strategic social media management that builds your community and amplifies your brand voice online.',
    image: 'https://images.pexels.com/photos/32944547/pexels-photo-32944547.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Content Scheduling', 'Community Engagement', 'Analytics Reports', 'Platform Strategy'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Data-driven marketing campaigns that reach the right audience at the right time for maximum ROI.',
    image: 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['PPC Advertising', 'Email Marketing', 'Campaign Management', 'Conversion Optimization'],
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Boost your search rankings and organic traffic with proven SEO strategies tailored to your business.',
    image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Keyword Research', 'On-Page SEO', 'Technical Audit', 'Link Building'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Intuitive, user-centered designs that create delightful experiences and drive engagement on every screen.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
  },
  {
    id: 'business-consultation',
    title: 'Business Consultation',
    description: 'Strategic guidance to help you navigate the digital landscape and achieve sustainable growth.',
    image: 'https://images.pexels.com/photos/36765719/pexels-photo-36765719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Strategy Planning', 'Market Analysis', 'Growth Consulting', 'Digital Transformation'],
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 bg-neutral-50">
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
    </section>
  );
}
