import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Vision() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="vision" className="relative bg-[#e8e6e1] px-4 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`flex items-start mb-12 md:mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-lg md:text-xl font-normal tracking-wide text-gray-400">
            03 / 10
          </span>
        </div>

        <h2
          className={`text-4xl md:text-5xl lg:text-6xl text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-700 delay-150 ${
            headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ fontFamily: 'Georgia, serif', fontWeight: '400', letterSpacing: '0.02em' }}
        >
          Нашата визия
        </h2>

        <div
          ref={textRef}
          className="max-w-4xl mx-auto"
        >
          <p
            className={`text-base md:text-lg lg:text-xl text-justify leading-relaxed transition-all duration-1000 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ fontFamily: 'Georgia, serif', fontWeight: '300', lineHeight: '1.8' }}
          >
            Като семеен бизнес с над 30 години традиция, предаден през две поколения, ние в Park Decor вярваме, че ландшафтната архитектура е изкуство, което съчетава природата с човешката визия. Нашата мисия е да създаваме пространства, които не само радват окото, но и обогатяват живота на хората, които ги обитават. Всеки проект е уникално пътешествие, в което слушаме желанията на клиентите и ги превръщаме в реалност с внимание към детайла, професионализъм и страст към природата. Стремим се да оставим след себе си не просто градини, а живи произведения на изкуството, които ще радват поколения напред.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-30">
          <svg
            viewBox="0 0 1200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto animate-wave"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 Q150,80 300,100 T600,100 T900,100 T1200,100"
              stroke="#000"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M0,120 Q150,100 300,120 T600,120 T900,120 T1200,120"
              stroke="#000"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M0,140 Q150,120 300,140 T600,140 T900,140 T1200,140"
              stroke="#000"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M50,110 Q200,90 350,110 T650,110 T950,110 T1200,110"
              stroke="#000"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M50,130 Q200,110 350,130 T650,130 T950,130 T1200,130"
              stroke="#000"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M50,150 Q200,130 350,150 T650,150 T950,150 T1200,150"
              stroke="#000"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-10px); }
        }
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
