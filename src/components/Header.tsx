import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Navigation from './Navigation';
import { smoothScrollToSection } from '../utils/smoothScroll';

interface HeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

export default function Header({ isMenuOpen, onMenuToggle }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { label: 'Кои сме ние?', href: 'about', isRoute: false },
    { label: 'Нашите услуги', href: 'services', isRoute: false },
    { label: 'Галерия', href: 'gallery', isRoute: false },
    { label: 'Проектиране', href: '/design', isRoute: true },
    { label: 'Контакт', href: 'contact', isRoute: false },
  ];

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute: boolean) => {
    e.preventDefault();
    if (isRoute) {
      navigate(href);
      onMenuToggle();
    } else {
      smoothScrollToSection(href);
      onMenuToggle();
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-500 ${
        isScrolled ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4 lg:px-8 py-2">
          <div className="flex justify-between items-center lg:justify-start lg:space-x-16">
            <div className="flex items-center">
              <a href="/" onClick={handleLogoClick} className="group transition-all duration-300 hover:scale-110">
                <img
                  src="/сандвич_Icon_mobile.png"
                  alt="Park Decor"
                  className="h-16 w-auto transition-transform duration-500 group-hover:rotate-6"
                />
              </a>
            </div>

            <Navigation />

            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 text-[#3d9970] hover:bg-green-50 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="Menu"
            >
              <Menu size={28} strokeWidth={2} className="transition-transform duration-300" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{ backgroundColor: '#3d9970' }}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex justify-end items-center mb-16">
            <button
              onClick={onMenuToggle}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 group"
              aria-label="Close menu"
            >
              <X size={32} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center space-y-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.isRoute ? item.href : `#${item.href}`}
                onClick={(e) => handleMenuClick(e, item.href, item.isRoute)}
                className="text-white text-3xl font-light tracking-wide hover:translate-x-4 transition-all duration-300 relative group"
                style={{
                  animation: isMenuOpen ? `slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s both` : 'none',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-8 -ml-12"></span>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
