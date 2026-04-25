import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Background gradient shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-50 rounded-full opacity-60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-100 rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="animate-fade-in mb-8">
          <img
            src="/Qua_Business.jpeg"
            alt="QUA Business"
            className="w-64 md:w-80 mx-auto object-contain drop-shadow-xl"
          />
        </div>

        {/* Headline */}
        <h1 className="animate-slide-up text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
          Turning Business Into{' '}
          <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
            Real Hustle
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-slide-up animation-delay-200 text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
          Helping businesses grow, scale, and dominate online — from digital presence to sales strategy, we've got you covered.
        </p>

        {/* CTA Buttons */}
        <div className="animate-slide-up animation-delay-400 flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-800 to-blue-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#services"
            className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-700 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Our Services
          </a>
        </div>

        {/* Stats strip */}
        <div className="animate-slide-up animation-delay-600 mt-16 grid grid-cols-3 gap-8 md:gap-16">
          {[
            { number: '500+', label: 'Clients Served' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '5+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} />
      </a>
    </section>
  );
}
