interface HeroProps {
  onMenuClick: () => void;
}

export default function Hero({ onMenuClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen bg-[#e8e6e1] px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16 overflow-hidden">
      <a
        href="#hero"
        id="hero-logo"
        className="absolute top-6 left-4 md:top-8 md:left-8 lg:top-12 lg:left-16 cursor-pointer group z-10 animate-slide-in-left"
        aria-label="Go to top"
      >
        <img
          src="/сандвич_Icon_mobile.png"
          alt="Menu"
          className="h-28 md:h-[122px] lg:h-[152px] w-auto transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
        />
      </a>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 animate-zoom-in">
          <img
            src="/Logo_web.png"
            alt="Park Decor"
            className="w-full max-w-[210px] md:max-w-[314px] lg:max-w-[396px] mx-auto mb-6 transition-transform duration-700 hover:scale-105"
          />
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                const yOffset = -110;
                const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="inline-block text-lg md:text-xl lg:text-2xl font-light text-black underline hover:text-[#4a5f52] transition-all duration-300 animate-fade-in-cta relative group"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="relative z-10">Свържете се с нас</span>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#4a5f52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-6 text-sm md:text-base lg:text-lg px-4 md:px-0">
          <div className="space-y-2 md:space-y-3 text-left md:text-left animate-slide-in-left-delay" style={{ fontFamily: 'Georgia, serif', fontWeight: '300', lineHeight: '1.6' }}>
            <p className="animate-fade-in-1 hover:translate-x-2 transition-transform duration-300 cursor-default">/ частни имоти /</p>
            <p className="animate-fade-in-2 hover:translate-x-2 transition-transform duration-300 cursor-default">/ хотелски и жилищни комплекси /</p>
            <p className="animate-fade-in-3 hover:translate-x-2 transition-transform duration-300 cursor-default">/ публични пространства /</p>
          </div>

          <div className="space-y-2 md:space-y-3 text-left md:text-right animate-slide-in-right-delay" style={{ fontFamily: 'Georgia, serif', fontWeight: '300', lineHeight: '1.6' }}>
            <p className="animate-fade-in-1 hover:-translate-x-2 transition-transform duration-300 cursor-default">Бутиков бранд</p>
            <p className="animate-fade-in-2 hover:-translate-x-2 transition-transform duration-300 cursor-default">с над 30 години опит</p>
            <p className="animate-fade-in-3 hover:-translate-x-2 transition-transform duration-300 cursor-default">в ландшафтната архитектура</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out;
        }

        .animate-slide-in-left-delay {
          animation: slideInLeft 1s ease-out 0.3s backwards;
        }

        .animate-slide-in-right-delay {
          animation: slideInRight 1s ease-out 0.3s backwards;
        }

        .animate-zoom-in {
          animation: zoomIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-fade-in-1 {
          animation: fadeInUp 0.8s ease-out 0.6s backwards;
        }

        .animate-fade-in-2 {
          animation: fadeInUp 0.8s ease-out 0.8s backwards;
        }

        .animate-fade-in-3 {
          animation: fadeInUp 0.8s ease-out 1s backwards;
        }

        .animate-fade-in-cta {
          animation: fadeInUp 0.8s ease-out 1.2s backwards;
        }
      `}</style>
    </section>
  );
}
