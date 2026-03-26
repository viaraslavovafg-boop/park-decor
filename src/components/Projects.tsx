import { Star } from 'lucide-react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useImages } from '../hooks/useImage';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { images: showcaseImages, loading } = useImages('project_showcase');

  const defaultProjects = [
    {
      image: 'https://images.pexels.com/photos/2287310/pexels-photo-2287310.jpeg',
      title: 'Хотел Harmony',
      description: 'Луксозен хотелски комплекс с изискан ландшафтен дизайн',
      rating: 4.9,
      client: 'Harmony Hotels Group',
      testimonial: 'Изключително професионална работа! Превърнаха нашата визия в реалност.',
    },
    {
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      title: 'Жилищен комплекс "Зелена градина"',
      description: 'Модерен жилищен комплекс със зелени пространства',
      rating: 4.8,
      client: 'Green Living Ltd.',
      testimonial: 'Невероятен екип! Създадоха оазис на спокойствие в града.',
    },
    {
      image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg',
      title: 'Централен градски парк',
      description: 'Реконструкция на обществено пространство',
      rating: 5.0,
      client: 'Столична община',
      testimonial: 'Проектът надмина всички очаквания. Паркът оживя по нов начин.',
    },
    {
      image: 'https://images.pexels.com/photos/917510/pexels-photo-917510.jpeg',
      title: 'Вила "Райски кът"',
      description: 'Частна резиденция с уникален ландшафтен дизайн',
      rating: 4.9,
      client: 'Частен клиент',
      testimonial: 'Мечтата ни се сбъдна! Всеки детайл е перфектно изпълнен.',
    },
    {
      image: 'https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg',
      title: 'Бизнес център "Европа"',
      description: 'Корпоративно озеленяване и външно пространство',
      rating: 4.7,
      client: 'Europa Business Park',
      testimonial: 'Професионализъм на най-високо ниво. Препоръчваме!',
    },
    {
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
      title: 'Ресторант "Градина"',
      description: 'Екстериорно озеленяване и терасно пространство',
      rating: 4.8,
      client: 'Garden Restaurant',
      testimonial: 'Клиентите не спират да се възхищават на градината!',
    },
  ];

  // Use database images if available
  const projects = showcaseImages.length > 0 && showcaseImages.some(img => img.url)
    ? showcaseImages.filter(img => img.url).map((img, index) => ({
        ...defaultProjects[index] || defaultProjects[0],
        image: img.url,
      }))
    : defaultProjects;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star size={16} stroke="#fbbf24" fill="none" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
            </div>
          </div>
        )}
        <span className="text-amber-400 font-semibold ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <section id="projects" className="py-16 lg:py-24 bg-gradient-to-br from-[#3d5a46] via-[#4a5f52] to-[#3d5a46] text-white relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={titleRef}
          className={`flex items-start justify-between mb-12 lg:mb-20 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-lg md:text-xl font-normal text-white/60">06 / 06</p>
          <h2 className="text-3xl lg:text-5xl font-light text-center flex-1">
            Нашите проекти
          </h2>
        </div>

        <div className="max-w-7xl mx-auto">
          <div
            ref={contentRef}
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 transition-all duration-700 delay-150 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative w-full overflow-hidden">
              <div className="relative h-[500px] lg:h-auto lg:aspect-[4/3] mx-auto max-w-full">
                <Swiper
                  modules={[Navigation, Pagination, EffectFade]}
                  navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                  }}
                  pagination={{
                    clickable: true,
                    el: '.swiper-pagination-custom',
                    bulletClass: 'swiper-pagination-bullet-custom',
                    bulletActiveClass: 'swiper-pagination-bullet-active-custom',
                  }}
                  effect="fade"
                  fadeEffect={{
                    crossFade: true
                  }}
                  loop={true}
                  speed={700}
                  onSwiper={setSwiperInstance}
                  className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                >
                  {projects.map((project, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full group">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full max-w-full max-h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 pointer-events-none"></div>

                        <div className="absolute bottom-0 left-0 right-0 pb-4 pt-3 px-4 lg:pb-8 lg:pt-4 lg:px-20">
                          <div className="mb-2">
                            {renderStars(project.rating)}
                          </div>
                          <h3 className="text-base lg:text-3xl font-light mb-1 lg:mb-2">
                            {project.title}
                          </h3>
                          <p className="text-white/90 text-xs lg:text-base mb-2 lg:mb-3">
                            {project.description}
                          </p>
                          <div className="border-l-2 border-green-400 pl-2 lg:pl-4 py-1 lg:py-2 bg-black/30 backdrop-blur-sm rounded-r">
                            <p className="text-white/80 italic text-xs lg:text-base">"{project.testimonial}"</p>
                            <p className="text-green-400 text-xs lg:text-sm mt-1 font-semibold">— {project.client}</p>
                          </div>
                        </div>

                        <div className="absolute top-3 lg:top-6 right-3 lg:right-6 z-10 bg-black/50 backdrop-blur-md px-2 lg:px-4 py-1 lg:py-2 rounded-full border border-white/20">
                          <span className="text-white text-xs lg:text-sm font-light">{index + 1} / {projects.length}</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  className="swiper-button-prev-custom absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 bg-black/60 hover:bg-white/30 hover:shadow-lg hover:shadow-green-400/50 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/30 group"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  className="swiper-button-next-custom absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 bg-black/60 hover:bg-white/30 hover:shadow-lg hover:shadow-green-400/50 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/30 group"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="swiper-pagination-custom flex justify-center space-x-3 mt-4 lg:mt-8"></div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4 lg:gap-6 h-fit">
              {projects.slice(0, 4).map((project, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => swiperInstance?.slideTo(index)}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full max-w-full max-h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500 pointer-events-none"></div>

                  <div className={`absolute inset-0 border-2 transition-all duration-500 rounded-xl pointer-events-none ${
                    hoveredProject === index
                      ? 'border-white/60 shadow-lg shadow-white/30'
                      : 'border-transparent'
                  }`}></div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 transform transition-all duration-500 pointer-events-none">
                    <div className="mb-1 lg:mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {renderStars(project.rating)}
                    </div>
                    <h4 className="text-xs lg:text-base font-light text-white group-hover:text-green-400 transition-colors duration-300">
                      {project.title}
                    </h4>
                  </div>

                  {hoveredProject === index && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center animate-pulse">
                        <div className="w-0 h-0 border-l-6 lg:border-l-8 border-l-white border-y-4 lg:border-y-6 border-y-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            ref={statsRef}
            className="mt-16 grid md:grid-cols-3 gap-8 text-center"
          >
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-700 group hover:shadow-2xl hover:shadow-green-400/20 hover:-translate-y-2 ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-4xl lg:text-5xl font-light text-green-400 mb-2 group-hover:scale-125 transition-transform duration-500">150+</div>
              <div className="text-white/80 text-sm lg:text-base">Завършени проекти</div>
            </div>
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-700 delay-100 group hover:shadow-2xl hover:shadow-green-400/20 hover:-translate-y-2 ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-4xl lg:text-5xl font-light text-green-400 mb-2 group-hover:scale-125 transition-transform duration-500">98%</div>
              <div className="text-white/80 text-sm lg:text-base">Доволни клиенти</div>
            </div>
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-700 delay-200 group hover:shadow-2xl hover:shadow-green-400/20 hover:-translate-y-2 ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-4xl lg:text-5xl font-light text-green-400 mb-2 group-hover:scale-125 transition-transform duration-500">15+</div>
              <div className="text-white/80 text-sm lg:text-base">Години опит</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet-custom {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          transition: all 0.5s;
          cursor: pointer;
        }
        .swiper-pagination-bullet-custom:hover {
          background: rgba(255, 255, 255, 0.5);
          width: 16px;
        }
        .swiper-pagination-bullet-active-custom {
          background: #4ade80;
          width: 48px;
          box-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
        }
      `}</style>
    </section>
  );
}
