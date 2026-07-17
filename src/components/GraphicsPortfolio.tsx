import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const items = [
  {
    title: 'Summer Sale Flyer',
    category: 'Flyer Design',
    span: '',
    image:
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'High-conversion promotional flyer for a retail client.',
  },
  {
    title: 'FitGym Social Campaign',
    category: 'Social Creative',
    span: '',
    image:
      'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'A 14-day social media campaign that grew engagement by 320%.',
  },
  {
    title: 'Aurora Skincare — Visual Identity',
    category: 'Brand Identity',
    span: 'row-span-2',
    image:
      'https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Premium visual identity for a skincare brand — from logo to packaging mockups.',
  },
  {
    title: 'TechConf Event Poster',
    category: 'Marketing Material',
    span: '',
    image:
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Bold event poster design for a regional tech conference.',
  },
  {
    title: 'Bistro Menu & Flyers',
    category: 'Marketing Material',
    span: '',
    image:
      'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'A full menu design and seasonal flyer set for a local bistro.',
  },
  {
    title: 'Pulse Fitness — Social Creative',
    category: 'Social Creative',
    span: '',
    image:
      'https://images.pexels.com/photos/4498293/pexels-photo-4498293.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Scroll-stopping creatives for a fitness studio launch.',
  },
  {
    title: 'Luxe Realty Brand Kit',
    category: 'Brand Identity',
    span: 'row-span-2',
    image:
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Sophisticated brand kit — logo, business cards, letterheads, and social templates.',
  },
  {
    title: 'Festive Promo Flyer',
    category: 'Flyer Design',
    span: '',
    image:
      'https://images.pexels.com/photos/2607832/pexels-photo-2607832.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Vibrant festive season flyer for an eCommerce promo.',
  },
];

function MasonryCard({
  item,
  index,
}: {
  item: (typeof items)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 ${
        item.span
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      {!imgLoaded && <div className="absolute inset-0 bg-slate-100 animate-pulse" />}
      <img
        src={item.image}
        alt={item.title}
        onLoad={() => setImgLoaded(true)}
        className="w-full h-full min-h-[220px] object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Category badge */}
      <div className="absolute top-4 left-4">
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 shadow-sm">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="font-bold text-base md:text-lg mb-1">{item.title}</h3>
        <p className="text-sm text-blue-100/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function GraphicsPortfolio() {
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
    <section id="graphics" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-cyan-300 font-semibold text-sm uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-cyan-400" />
            Graphics &amp; Branding
            <span className="w-8 h-px bg-cyan-400" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">
            Branding &amp; Design{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-300 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-blue-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            A showcase of logos, flyers, social media creatives, and brand identity
            projects we've crafted for clients across industries.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4 md:gap-5">
          {items.map((item, i) => (
            <MasonryCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-blue-200/80 mb-5 text-lg">Want your brand to look this sharp?</p>
          <a
            href={waLink(WA_MESSAGES.branding)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold px-9 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-cyan-400/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Request Branding Services
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
