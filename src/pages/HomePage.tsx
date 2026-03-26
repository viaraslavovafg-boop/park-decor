import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Vision from '../components/Vision';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen">
      <Header isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <main>
        <Hero onMenuClick={handleMenuToggle} />
        <Gallery />
        <About />
        <Vision />
        <Services />
        <Projects />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
