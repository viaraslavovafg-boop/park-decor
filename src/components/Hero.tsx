interface HeroProps {
  onMenuClick: () => void;
}

export default function Hero({ onMenuClick: _onMenuClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative isolate min-h-screen overflow-hidden bg-[#f4f1ea] px-5 pb-10 pt-28 sm:px-8 md:px-12 md:pt-36 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_24%_18%,rgba(255,255,255,.96),transparent_38%),radial-gradient(ellipse_at_73%_35%,rgba(222,230,217,.5),transparent_36%),linear-gradient(120deg,#eeece4_0%,#faf9f4_48%,#e8e7de_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-[15%] h-[27rem] w-[27rem] rounded-full bg-[#dce5db]/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-[8%] h-[25rem] w-[25rem] rounded-full bg-[#d6d2c7]/45 blur-3xl" />

      <svg aria-hidden="true" viewBox="0 0 340 280" fill="none" className="pointer-events-none absolute -right-8 top-12 h-72 w-80 rotate-[8deg] text-[#5b7868]/50 sm:right-2 sm:h-96 sm:w-[28rem]">
        <path d="M25 260C104 188 175 138 317 24" stroke="currentColor" strokeWidth="2" />
        <path d="M93 204C71 178 54 170 33 168C43 191 59 208 88 218M119 181C103 154 90 144 69 141C76 164 91 183 113 194M148 155C135 129 123 117 103 114C109 137 122 155 143 168M177 130C165 105 154 94 135 89C139 113 151 131 171 143M206 105C195 81 185 68 168 63C170 87 181 105 200 117M235 80C225 58 216 46 200 39C201 62 211 80 229 92M264 55C255 35 247 23 232 17C231 39 240 56 258 67M87 221C104 193 120 183 143 181C132 203 115 220 91 232M117 195C134 169 150 159 172 157C163 178 147 195 123 207M147 169C163 145 178 135 200 132C192 154 177 170 153 181M176 144C191 122 205 111 226 108C219 129 205 145 182 156M205 118C219 98 232 87 252 84C246 104 233 120 211 130M234 93C247 75 260 65 279 61C274 81 261 96 240 106" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      </svg>

      <a href="#hero" id="hero-logo" className="absolute left-5 top-5 z-10 cursor-pointer sm:left-8 sm:top-8 md:left-12 lg:left-16" aria-label="Go to top">
        <img src="/сандвич_Icon_mobile.png" alt="Menu" className="h-16 w-auto transition-transform duration-500 hover:scale-105 md:h-20" />
      </a>

      <div className="relative mx-auto flex min-h-[calc(100vh-9rem)] max-w-7xl flex-col justify-between gap-12">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center pb-3 text-center">
          <div className="hero-logo-reveal">
            <img src="/Logo_web.png" alt="Park Decor" className="mx-auto mb-9 w-full max-w-[260px] drop-shadow-[0_12px_20px_rgba(44,61,50,.08)] sm:max-w-[330px] md:max-w-[390px]" />
          </div>

          <div className="hero-copy-reveal max-w-md">
            <p className="text-[1.45rem] font-light leading-[1.35] tracking-[-0.03em] text-[#25342e] sm:text-3xl md:text-[2rem]" style={{ fontFamily: 'Georgia, serif' }}>
              Ландшафтни решения,
              <br />
              създадени с визия и грижа.
            </p>
          </div>

          <div className="hero-cta-reveal mt-8">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const y = contactSection.getBoundingClientRect().top + window.pageYOffset - 110;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="inline-block text-lg font-light text-black underline decoration-[#6a8775] decoration-1 underline-offset-8 transition-all duration-300 hover:text-[#4a5f52] sm:text-xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Свържете се с нас
            </a>
          </div>
        </div>

        <div className="grid gap-10 border-t border-[#66766a]/25 pb-2 pt-7 md:grid-cols-2 md:gap-16 md:pt-8">
          <div className="space-y-0 text-left" style={{ fontFamily: 'Georgia, serif' }}>
            {['Частни имоти', 'Хотелски и жилищни комплекси', 'Публични пространства'].map((item) => (
              <p key={item} className="border-b border-[#66766a]/20 py-3 text-base font-light text-[#29372f] sm:text-lg">{item}</p>
            ))}
          </div>
          <div className="flex flex-col justify-end text-left md:pl-8" style={{ fontFamily: 'Georgia, serif' }}>
            <p className="max-w-sm text-base font-light leading-relaxed text-[#29372f] sm:text-lg">Бутиков бранд с над 30 години опит в ландшафтната архитектура</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroLogoReveal { from { opacity: 0; transform: translateY(24px) scale(.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes heroCopyReveal { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .hero-logo-reveal { animation: heroLogoReveal 900ms cubic-bezier(.16,1,.3,1) both; }
        .hero-copy-reveal { animation: heroCopyReveal 700ms 220ms cubic-bezier(.16,1,.3,1) both; }
        .hero-cta-reveal { animation: heroCopyReveal 700ms 360ms cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .hero-logo-reveal, .hero-copy-reveal, .hero-cta-reveal { animation: none; } }
      `}</style>
    </section>
  );
}
