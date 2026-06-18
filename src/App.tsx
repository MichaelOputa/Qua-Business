import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProfilePage from './components/ProfilePage';
import { AuthProvider } from './context/AuthContext';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <WhyUs />
      <Pricing />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<><Navbar /><ProfilePage /></>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}