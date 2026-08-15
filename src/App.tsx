import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import GraphicsPortfolio from './components/GraphicsPortfolio';
import Pricing from './components/Pricing';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  return (
    <div className="bg-white text-gray-900 antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <GraphicsPortfolio />
        <Pricing />
        <div className="min-h-screen bg-white">
      <WhyUs />
    </div>
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
