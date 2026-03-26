import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useImage } from '../hooks/useImage';

function ServiceIcon({ imageKey, alt, fallback }: { imageKey: string; alt: string; fallback: string }) {
  const { url } = useImage(imageKey, fallback);
  return <img src={url} alt={alt} className="mx-auto w-20 h-20 lg:w-24 lg:h-24" />;
}

export default function Services() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 });

  const services = [
    {
      title: 'Проектиране',
      details: [
        'Идейни проекти',
        '3D визуализации',
        'Технически чертежи',
        'Работни проекти'
      ],
      icon: <ServiceIcon imageKey="service_design" alt="Проектиране" fallback="/икони-37.png" />,
    },
    {
      title: 'Изграждане',
      details: [
        'Частни імоти',
        'Хотелски и жилищні комплекси',
        'Публични пространства'
      ],
      icon: <ServiceIcon imageKey="service_construction" alt="Изграждане" fallback="/икони-34.png" />,
    },
    {
      title: 'Поддръжка',
      details: [
        'Поддръжка на частни дворове',
        'Публични пространства',
        'Интериорни пространства'
      ],
      icon: <ServiceIcon imageKey="service_landscaping" alt="Поддръжка" fallback="/икони-35.png" />,
    },
    {
      title: 'Поливни системи',
      details: [
        'Проектиране',
        'Изграждане',
        'Ремонт'
      ],
      icon: <ServiceIcon imageKey="service_maintenance" alt="Поливни системи" fallback="/икони-36.png" />,
    },
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-gray-100 scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            ref={titleRef}
            className={`flex items-start justify-between mb-12 lg:mb-20 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-lg md:text-xl font-normal text-gray-400">04 / 10</p>
            <h2 className="text-3xl lg:text-5xl font-light text-gray-800 text-center flex-1">
              Нашите услуги
            </h2>
          </div>

          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white p-8 lg:p-10 transition-all duration-700 group hover:shadow-2xl hover:-translate-y-2 cursor-default ${
                  cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: cardsVisible ? `${index * 150}ms` : '0ms' }}
              >
                <div className="mb-8 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {service.icon}
                </div>
                <h3 className="text-2xl lg:text-3xl font-light mb-6 text-gray-800 text-center transition-colors duration-300 group-hover:text-[#4a5f52]">
                  {service.title}
                </h3>
                <div className="border-l-2 border-gray-800 pl-4 space-y-2 group-hover:border-[#4a5f52] transition-colors duration-300">
                  {service.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className="text-gray-700 text-sm lg:text-base leading-relaxed transition-all duration-300 group-hover:translate-x-1"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
