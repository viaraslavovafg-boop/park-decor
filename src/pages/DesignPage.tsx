import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useImage, useImages } from '../hooks/useImage';
import { useDesignContent } from '../hooks/useDesignContent';

export default function DesignPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { ref: project1Ref, isVisible: project1Visible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: project2Ref, isVisible: project2Visible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: project3Ref, isVisible: project3Visible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: project4Ref, isVisible: project4Visible } = useScrollAnimation({ threshold: 0.2 });

  const { content: project1Content } = useDesignContent(1);
  const { content: project2Content } = useDesignContent(2);
  const { content: project3Content } = useDesignContent(3);
  const { content: project4Content } = useDesignContent(4);

  // Load all design project images
  const { url: introBanner } = useImage('design_intro_banner', '');
  const { url: project1Main } = useImage('design_project_1_main', '');
  const { url: project2Large } = useImage('design_project_2_large', '');
  const { url: project2Top } = useImage('design_project_2_top', '');
  const { url: project2Bottom } = useImage('design_project_2_bottom', '');
  const { url: project3Img1 } = useImage('design_project_3_img1', '');
  const { url: project3Img2 } = useImage('design_project_3_img2', '');
  const { url: project3Img3 } = useImage('design_project_3_img3', '');
  const { url: project3Img4 } = useImage('design_project_3_img4', '');
  const { url: project4Large } = useImage('design_project_4_large', '');
  const { url: project4TopRight } = useImage('design_project_4_top_right', '');
  const { url: project4MidRight } = useImage('design_project_4_mid_right', '');
  const { url: project4BottomLeft } = useImage('design_project_4_bottom_left', '');
  const { url: project4BottomCenter } = useImage('design_project_4_bottom_center', '');
  const { url: project4BottomRight } = useImage('design_project_4_bottom_right', '');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <nav className="hidden lg:block py-3">
          <div className="flex items-center justify-center space-x-8 relative" style={{ paddingRight: '120px' }}>
            <a
              href="/"
              onClick={handleLogoClick}
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <img
                src="/сандвич_Icon_mobile.png"
                alt="Park Decor"
                className="h-10 object-contain"
              />
            </a>
            <ul className="flex items-center space-x-8">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('about');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="relative text-gray-700 text-base font-light tracking-wide hover:text-[#3d9970] transition-colors duration-300 group"
                >
                  Кои сме ние?
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3d9970] transition-all duration-300 group-hover:w-full" style={{ bottom: '-0.5rem' }}></span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('services');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="relative text-gray-700 text-base font-light tracking-wide hover:text-[#3d9970] transition-colors duration-300 group"
                >
                  Нашите услуги
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3d9970] transition-all duration-300 group-hover:w-full" style={{ bottom: '-0.5rem' }}></span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('gallery');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="relative text-gray-700 text-base font-light tracking-wide hover:text-[#3d9970] transition-colors duration-300 group"
                >
                  Галерия
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3d9970] transition-all duration-300 group-hover:w-full" style={{ bottom: '-0.5rem' }}></span>
                </a>
              </li>
              <li>
                <a
                  href="/design"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="relative text-gray-700 text-base font-light tracking-wide hover:text-[#3d9970] transition-colors duration-300 group"
                >
                  Проектиране
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3d9970] transition-all duration-300 group-hover:w-full" style={{ bottom: '-0.5rem' }}></span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="relative text-gray-700 text-base font-light tracking-wide hover:text-[#3d9970] transition-colors duration-300 group"
                >
                  Контакт
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3d9970] transition-all duration-300 group-hover:w-full" style={{ bottom: '-0.5rem' }}></span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Header isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <main>
        <section className="bg-[#E8E8E8] min-h-screen pt-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="pt-4 lg:pt-6">
              <div className="flex justify-center mb-12 lg:mb-16">
                <img
                  src="/Logo_web.png"
                  alt="Park Decor"
                  className="h-40 lg:h-56 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="w-full mb-12 lg:mb-16 lg:hidden">
            <div className="w-full bg-gray-100 overflow-hidden" style={{ aspectRatio: '16/5' }}>
              {introBanner && (
                <img
                  src={introBanner}
                  alt="Intro banner"
                  className="w-full h-full max-w-full max-h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="container mx-auto px-6 lg:px-0">
            <div className="pb-16 lg:pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-4 max-w-5xl mx-auto lg:max-w-none lg:items-center">
                <div className="space-y-12 lg:space-y-14 lg:pl-4">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-light text-black mb-6 lg:mb-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      Нашите услуги
                    </h2>
                    <ul className="space-y-3 lg:space-y-4">
                      <li className="text-lg lg:text-xl font-light text-black" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Проектиране
                      </li>
                      <li className="text-lg lg:text-xl font-light text-black" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Изграждане
                      </li>
                      <li className="text-lg lg:text-xl font-light text-black" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Поддръжка
                      </li>
                      <li className="text-lg lg:text-xl font-light text-black" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Поливни системи
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl lg:text-4xl font-light text-black mb-6 lg:mb-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      Кои сме ние?
                    </h2>
                    <div className="space-y-3 lg:space-y-4">
                      <p className="text-lg lg:text-xl font-light text-black" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Бутиков бранд
                      </p>
                      <p className="text-lg lg:text-xl font-light text-black" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        с над 30 години опит
                      </p>
                      <p className="text-lg lg:text-xl font-light text-black" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        в ландшафтната архитектура
                      </p>
                      <p className="text-lg lg:text-xl font-light text-black mt-5" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Екип от професионалисти
                      </p>
                      <p className="text-lg lg:text-xl font-light text-black mt-5" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Широко портфолио с
                      </p>
                      <p className="text-lg lg:text-xl font-light text-black" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        реализирани проекти
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block" style={{ marginLeft: '20px' }}>
                  <div className="bg-gray-100 overflow-hidden" style={{ width: 'calc(68.75vw)', aspectRatio: '16/10.125' }}>
                    {introBanner && (
                      <img
                        src={introBanner}
                        alt="Intro banner"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#E8E8E8]">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-0">
            <div className="lg:col-span-2 w-full bg-gray-400 hidden lg:block overflow-hidden" style={{ aspectRatio: '16/10' }}>
              {project1Main && (
                <img
                  src={project1Main}
                  alt="Проект 1"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div
              ref={project1Ref}
              className={`lg:col-span-1 px-6 lg:px-8 xl:px-12 py-16 lg:py-20 flex flex-col justify-start transition-all duration-700 ${
                project1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="max-w-full overflow-hidden">
                <div className="flex items-start justify-between mb-8 lg:mb-16 gap-4">
                  <h2 className="text-4xl lg:text-5xl font-light text-black break-words" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {project1Content?.title || 'ПРОЕКТ 1'}
                  </h2>
                  <span className="text-xl lg:text-2xl font-light text-black whitespace-nowrap flex-shrink-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    01 / 04
                  </span>
                </div>

                <div className="w-screen lg:hidden mb-8 -mx-6" style={{ aspectRatio: '16/10' }}>
                  <div className="w-full h-full bg-gray-400 overflow-hidden">
                    {project1Main && (
                      <img
                        src={project1Main}
                        alt="Проект 1"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="max-w-full">
                  <p className="text-base lg:text-lg font-light text-black leading-relaxed break-words" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                    {project1Content?.description || 'Модерно жилище с минималистична градина'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#E8E8E8] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 200 Q 200 100, 300 200 T 500 200" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="5s" repeatCount="indefinite"
                  values="M100 200 Q 200 100, 300 200 T 500 200;
                          M100 200 Q 200 160, 300 200 T 500 200;
                          M100 200 Q 200 100, 300 200 T 500 200"/>
              </path>
              <path d="M200 300 Q 300 200, 400 300 T 600 300" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="6s" repeatCount="indefinite"
                  values="M200 300 Q 300 200, 400 300 T 600 300;
                          M200 300 Q 300 260, 400 300 T 600 300;
                          M200 300 Q 300 200, 400 300 T 600 300"/>
              </path>
              <path d="M150 400 Q 250 300, 350 400 T 550 400" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="7s" repeatCount="indefinite"
                  values="M150 400 Q 250 300, 350 400 T 550 400;
                          M150 400 Q 250 360, 350 400 T 550 400;
                          M150 400 Q 250 300, 350 400 T 550 400"/>
              </path>
              <path d="M800 150 Q 900 50, 1000 150 T 1200 150" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="8s" repeatCount="indefinite"
                  values="M800 150 Q 900 50, 1000 150 T 1200 150;
                          M800 150 Q 900 110, 1000 150 T 1200 150;
                          M800 150 Q 900 50, 1000 150 T 1200 150"/>
              </path>
              <path d="M900 250 Q 1000 150, 1100 250 T 1300 250" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="9s" repeatCount="indefinite"
                  values="M900 250 Q 1000 150, 1100 250 T 1300 250;
                          M900 250 Q 1000 210, 1100 250 T 1300 250;
                          M900 250 Q 1000 150, 1100 250 T 1300 250"/>
              </path>
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 relative">
            <div
              ref={project2Ref}
              className={`lg:col-span-1 px-6 lg:px-8 xl:px-12 py-16 lg:py-20 flex flex-col justify-start lg:order-1 transition-all duration-700 ${
                project2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="max-w-full overflow-hidden">
                <div className="mb-8 lg:mb-16">
                  <div className="flex items-start justify-between mb-8 gap-4">
                    <h2 className="text-4xl lg:text-5xl font-light text-black break-words" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {project2Content?.title || 'ПРОЕКТ 2'}
                    </h2>
                    <span className="text-xl lg:text-2xl font-light text-black whitespace-nowrap flex-shrink-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      02 / 04
                    </span>
                  </div>

                  <div className="w-screen lg:hidden -mx-6">
                    <div className="bg-gray-400 overflow-hidden" style={{ aspectRatio: '16/10' }}>
                      {project2Large && (
                        <img
                          src={project2Large}
                          alt="Проект 2"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="max-w-full">
                  <p className="text-base lg:text-lg font-light text-black leading-relaxed break-words" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                    {project2Content?.description || 'Луксозен хотелски комплекс с тропически дизайн'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 hidden lg:flex lg:flex-col gap-4 lg:gap-6 px-6 lg:px-0 py-8 lg:py-12 lg:pt-16 lg:order-2 lg:self-start">
              <div className="grid grid-cols-2 gap-4 lg:gap-6" style={{ height: '280px' }}>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project2Large && (
                    <img
                      src={project2Large}
                      alt="Проект 2 - Large"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project2Top && (
                    <img
                      src={project2Top}
                      alt="Проект 2 - Top"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:gap-6" style={{ height: '280px' }}>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project2Large && (
                    <img
                      src={project2Large}
                      alt="Проект 2 - Large 2"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project2Bottom && (
                    <img
                      src={project2Bottom}
                      alt="Проект 2 - Bottom"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#E8E8E8] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 200 Q 200 100, 300 200 T 500 200" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="5s" repeatCount="indefinite"
                  values="M100 200 Q 200 100, 300 200 T 500 200;
                          M100 200 Q 200 160, 300 200 T 500 200;
                          M100 200 Q 200 100, 300 200 T 500 200"/>
              </path>
              <path d="M200 300 Q 300 200, 400 300 T 600 300" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="6s" repeatCount="indefinite"
                  values="M200 300 Q 300 200, 400 300 T 600 300;
                          M200 300 Q 300 260, 400 300 T 600 300;
                          M200 300 Q 300 200, 400 300 T 600 300"/>
              </path>
              <path d="M150 400 Q 250 300, 350 400 T 550 400" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="7s" repeatCount="indefinite"
                  values="M150 400 Q 250 300, 350 400 T 550 400;
                          M150 400 Q 250 360, 350 400 T 550 400;
                          M150 400 Q 250 300, 350 400 T 550 400"/>
              </path>
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 relative">
            <div className="lg:col-span-2 hidden lg:flex lg:flex-col gap-4 lg:gap-6 px-6 lg:pl-0 lg:pr-6 py-12 lg:py-16 lg:self-start">
              <div className="grid grid-cols-2 gap-4 lg:gap-6" style={{ height: '280px' }}>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project3Img1 && (
                    <img
                      src={project3Img1}
                      alt="Проект 3 - Image 1"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project3Img2 && (
                    <img
                      src={project3Img2}
                      alt="Проект 3 - Image 2"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:gap-6" style={{ height: '280px' }}>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project3Img3 && (
                    <img
                      src={project3Img3}
                      alt="Проект 3 - Image 3"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project3Img4 && (
                    <img
                      src={project3Img4}
                      alt="Проект 3 - Image 4"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            <div
              ref={project3Ref}
              className={`lg:col-span-1 px-6 lg:px-8 xl:px-12 py-16 lg:py-20 flex flex-col justify-start lg:order-none transition-all duration-700 ${
                project3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="max-w-full overflow-hidden">
                <div className="mb-8 lg:mb-14">
                  <div className="flex items-start justify-between mb-8 gap-4">
                    <h2 className="text-4xl lg:text-5xl font-light text-black break-words" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {project3Content?.title || 'ПРОЕКТ 3'}
                    </h2>
                    <span className="text-xl lg:text-2xl font-light text-black whitespace-nowrap flex-shrink-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      03 / 04
                    </span>
                  </div>

                  <div className="w-screen lg:hidden -mx-6">
                    <div className="grid grid-cols-2 grid-rows-2 gap-0">
                      <div className="bg-gray-400 overflow-hidden" style={{ aspectRatio: '1/1' }}>
                        {project3Img1 && (
                          <img
                            src={project3Img1}
                            alt="Проект 3 - Image 1"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="bg-gray-400 overflow-hidden" style={{ aspectRatio: '1/1' }}>
                        {project3Img2 && (
                          <img
                            src={project3Img2}
                            alt="Проект 3 - Image 2"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="bg-gray-400 overflow-hidden" style={{ aspectRatio: '1/1' }}>
                        {project3Img3 && (
                          <img
                            src={project3Img3}
                            alt="Проект 3 - Image 3"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="bg-gray-400 overflow-hidden" style={{ aspectRatio: '1/1' }}>
                        {project3Img4 && (
                          <img
                            src={project3Img4}
                            alt="Проект 3 - Image 4"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-full">
                  <p className="text-base lg:text-lg font-light text-black leading-relaxed break-words" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                    {project3Content?.description || 'Градски парк с интерактивни зони'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#E8E8E8] relative overflow-hidden pb-16 lg:pb-20">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 200 Q 200 100, 300 200 T 500 200" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="5s" repeatCount="indefinite"
                  values="M100 200 Q 200 100, 300 200 T 500 200;
                          M100 200 Q 200 160, 300 200 T 500 200;
                          M100 200 Q 200 100, 300 200 T 500 200"/>
              </path>
              <path d="M200 300 Q 300 200, 400 300 T 600 300" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="6s" repeatCount="indefinite"
                  values="M200 300 Q 300 200, 400 300 T 600 300;
                          M200 300 Q 300 260, 400 300 T 600 300;
                          M200 300 Q 300 200, 400 300 T 600 300"/>
              </path>
              <path d="M800 150 Q 900 50, 1000 150 T 1200 150" stroke="currentColor" strokeWidth="1" fill="none">
                <animate attributeName="d" dur="7s" repeatCount="indefinite"
                  values="M800 150 Q 900 50, 1000 150 T 1200 150;
                          M800 150 Q 900 110, 1000 150 T 1200 150;
                          M800 150 Q 900 50, 1000 150 T 1200 150"/>
              </path>
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:items-start relative">
            <div
              ref={project4Ref}
              className={`lg:col-span-1 px-6 lg:px-8 xl:px-12 py-16 lg:py-0 lg:pt-16 flex flex-col justify-start lg:order-1 transition-all duration-700 ${
                project4Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="max-w-full overflow-hidden">
                <div className="mb-8 lg:mb-14">
                  <div className="flex items-start justify-between mb-8 gap-4">
                    <h2 className="text-4xl lg:text-5xl font-light text-black break-words" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {project4Content?.title || 'ПРОЕКТ 4'}
                    </h2>
                    <span className="text-xl lg:text-2xl font-light text-black whitespace-nowrap flex-shrink-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      04 / 04
                    </span>
                  </div>

                  <div className="w-screen lg:hidden -mx-6">
                    <div className="bg-gray-400 overflow-hidden" style={{ aspectRatio: '16/10' }}>
                      {project4Large && (
                        <img
                          src={project4Large}
                          alt="Проект 4"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="max-w-full">
                  <p className="text-base lg:text-lg font-light text-black leading-relaxed break-words" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                    {project4Content?.description || 'Екологична вила със зелени тераси'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 hidden lg:flex lg:flex-col gap-4 lg:gap-6 px-6 lg:pl-6 lg:pr-0 lg:pt-16 lg:order-2 lg:self-start">
              <div className="grid grid-cols-3 gap-4 lg:gap-6" style={{ height: '280px' }}>
                <div className="col-span-2 bg-gray-400 overflow-hidden h-full">
                  {project4Large && (
                    <img
                      src={project4Large}
                      alt="Проект 4 - Large"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project4TopRight && (
                    <img
                      src={project4TopRight}
                      alt="Проект 4 - Top Right"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 lg:gap-6" style={{ height: '280px' }}>
                <div className="col-span-2 bg-gray-400 overflow-hidden h-full">
                  {project4BottomLeft && (
                    <img
                      src={project4BottomLeft}
                      alt="Проект 4 - Bottom Left"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project4MidRight && (
                    <img
                      src={project4MidRight}
                      alt="Проект 4 - Mid Right"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 lg:gap-6" style={{ height: '130px' }}>
                <div className="col-span-2 bg-gray-400 overflow-hidden h-full">
                  {project4BottomCenter && (
                    <img
                      src={project4BottomCenter}
                      alt="Проект 4 - Bottom Center"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-gray-400 overflow-hidden h-full">
                  {project4BottomRight && (
                    <img
                      src={project4BottomRight}
                      alt="Проект 4 - Bottom Right"
                      className="w-full h-full max-w-full max-h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
