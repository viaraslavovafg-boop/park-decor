import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useImages } from '../hooks/useImage';

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { images: dbImages, loading } = useImages('carousel');

  // Use database images if available, otherwise fallback to default images
  const images = dbImages.length > 0 && dbImages.some(img => img.url)
    ? dbImages.filter(img => img.url).map(img => img.url)
    : [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1920',
      ];

  const totalImages = images.length;

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <section id="gallery" className="w-full bg-neutral-100 scroll-mt-20">
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
        <div className="absolute top-8 left-8 text-lg md:text-xl font-normal text-gray-400 z-10 tracking-wide animate-fade-in">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalImages).padStart(2, '0')}
        </div>

        <div className="relative w-full h-full overflow-hidden bg-neutral-300">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full max-w-full max-h-full object-cover"
              />
              <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                index === currentIndex ? 'opacity-0' : 'opacity-20'
              }`}></div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 z-10 rounded-full border border-white/20 hover:border-[#3d9970] hover:shadow-lg hover:shadow-[#3d9970]/30 group disabled:opacity-50"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8 md:w-12 md:h-12 text-[#3d9970] transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={3} />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 z-10 rounded-full border border-white/20 hover:border-[#3d9970] hover:shadow-lg hover:shadow-[#3d9970]/30 group disabled:opacity-50"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8 md:w-12 md:h-12 text-[#3d9970] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={3} />
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
