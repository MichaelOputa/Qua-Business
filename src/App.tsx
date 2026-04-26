import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import WhyUs from './components/WhyUs';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <WhyUs />
      <Pricing />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
