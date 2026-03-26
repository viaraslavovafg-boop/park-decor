import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const { ref: contentRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="about" className="py-12 md:py-20 lg:py-32 bg-[#E8E5DD] relative overflow-hidden scroll-mt-20">
      <div className="absolute right-[-35px] lg:right-[90px] -top-[10px] bottom-[10px] w-[57%] opacity-40 pointer-events-none">
        <img
          src="/декоративен_елемент_-_section_за_нас.png"
          alt=""
          className="w-full h-full object-cover object-left scale-[1.21]"
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl relative">
          <div
            ref={contentRef}
            className="space-y-8 md:space-y-10 lg:space-y-12 relative z-10"
          >
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <p className="text-lg md:text-xl font-normal tracking-wide mb-4 md:mb-6 lg:mb-8 text-gray-400">02 / 10</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light mb-4 md:mb-6 lg:mb-8 text-gray-900 leading-tight">
                Кои сме ние?
              </h2>
              <div className="space-y-1 text-sm md:text-base text-gray-800 leading-relaxed font-light">
                <p className="hover:translate-x-2 transition-transform duration-300 cursor-default">/ частни имоти /</p>
                <p className="hover:translate-x-2 transition-transform duration-300 cursor-default">/ хотелски и жилищни комплекси /</p>
                <p className="hover:translate-x-2 transition-transform duration-300 cursor-default">/ публични пространства /</p>
              </div>
            </div>

            <div
              className={`transition-all duration-700 delay-150 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light mb-4 md:mb-5 lg:mb-6 text-gray-900">
                Кои сме ние?
              </h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-800 leading-relaxed font-light">
                <p className="font-normal hover:translate-x-2 transition-transform duration-300 cursor-default">Бутиков бранд</p>
                <p className="hover:translate-x-2 transition-transform duration-300 cursor-default">с над 30 години опит</p>
                <p className="hover:translate-x-2 transition-transform duration-300 cursor-default">в ландшафтната архитектура</p>
              </div>
              <div className="mt-4 md:mt-5 lg:mt-6 space-y-2 md:space-y-3 text-sm md:text-base text-gray-800 leading-relaxed font-light">
                <p className="hover:translate-x-2 transition-transform duration-300 cursor-default">Екип от професионалисти</p>
                <p className="mt-3 md:mt-4 hover:translate-x-2 transition-transform duration-300 cursor-default">Широко портфолио с</p>
                <p className="hover:translate-x-2 transition-transform duration-300 cursor-default">реализирани проекти</p>
              </div>
            </div>

            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light mb-4 md:mb-5 lg:mb-6 text-gray-900">
                Нашите услуги
              </h3>
              <ul className="space-y-2 md:space-y-3 text-gray-800 font-light text-sm md:text-base">
                <li className="hover:translate-x-2 transition-transform duration-300 cursor-default">Проектиране</li>
                <li className="hover:translate-x-2 transition-transform duration-300 cursor-default">Изграждане</li>
                <li className="hover:translate-x-2 transition-transform duration-300 cursor-default">Поддръжка</li>
                <li className="hover:translate-x-2 transition-transform duration-300 cursor-default">Поливни системи</li>
              </ul>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </section>
  );
}
