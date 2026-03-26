import { useNavigate, useLocation } from 'react-router-dom';
import { smoothScrollToSection } from '../utils/smoothScroll';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Кои сме ние?', href: 'about', isRoute: false },
    { label: 'Нашите услуги', href: 'services', isRoute: false },
    { label: 'Галерия', href: 'gallery', isRoute: false },
    { label: 'Проектиране', href: '/design', isRoute: true },
    { label: 'Контакт', href: 'contact', isRoute: false },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute: boolean) => {
    e.preventDefault();
    if (isRoute) {
      if (location.pathname !== href) {
        navigate(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => smoothScrollToSection(href), 100);
      } else {
        smoothScrollToSection(href);
      }
    }
  };

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center justify-center space-x-8">
        {navItems.map((item, index) => (
          <li
            key={index}
            className="animate-slide-down"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <a
              href={item.isRoute ? item.href : `#${item.href}`}
              onClick={(e) => handleClick(e, item.href, item.isRoute)}
              className="relative text-gray-700 text-base font-light tracking-wide hover:text-[#3d9970] transition-all duration-300 group hover:scale-110 inline-block"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3d9970] transition-all duration-300 group-hover:w-full"
                    style={{ bottom: '-0.5rem' }}></span>
              <span className="absolute inset-0 bg-[#3d9970]/5 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </a>
          </li>
        ))}
      </ul>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.6s ease-out backwards;
        }
      `}</style>
    </nav>
  );
}
