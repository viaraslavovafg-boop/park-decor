import { useState } from 'react';
import { X } from 'lucide-react';
import SuccessNotification from './SuccessNotification';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useImage } from '../hooks/useImage';

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: contentRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { url: viaraSlavovaPhoto } = useImage('team_viara_slavova', '');
  const { url: petkoSlavovPhoto } = useImage('team_petko_slavov', '');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    area: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Sending form data:', formData);
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      console.log('Response status:', response.status);

      const responseText = await response.text();
      console.log('Response body:', responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { error: responseText };
        }
        console.error('Server response error:', response.status, errorData);
        throw new Error(errorData.error || 'Failed to send email');
      }

      setSubmitStatus('success');
      setShowSuccessNotification(true);
      setIsModalOpen(false);

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          area: '',
          budget: '',
          timeline: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 500);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-6 lg:py-8 bg-[#E8E8E8] scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-4">
        <div
          ref={contentRef}
          className="max-w-6xl mx-auto"
        >
          <div className={`mb-4 lg:mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 mb-3 lg:mb-4">
              <img
                src="/Logo_web.png"
                alt="Park Decor"
                className="h-20 lg:h-24 transition-transform duration-500 hover:scale-110"
              />

              <h2 className="text-xl lg:text-2xl font-light text-black text-center lg:text-left">
                Проектиране / Свържете се с нас
              </h2>
            </div>

            <p className="text-sm lg:text-base mb-4 lg:mb-5 leading-relaxed text-black/80 max-w-2xl mx-auto text-center">
              Имате идея за вашия мечтан ландшафт? Ние сме готови да я превърнем в реалност.
              Свържете се с нас за безплатна консултация и оферта.
            </p>

            <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-6">
              <a
                href="tel:+359895761889"
                className="px-5 lg:px-6 py-2 bg-[#4a5f52] text-white rounded-lg text-sm lg:text-base font-light hover:bg-[#3d4f44] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
              >
                +359 89 576 1889
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 lg:px-6 py-2 bg-[#4a5f52] text-white rounded-lg text-sm lg:text-base font-light hover:bg-[#3d4f44] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
              >
                park.decor1@gmail.com
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className={`flex flex-col items-center transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="w-full aspect-square bg-gray-300 rounded-lg mb-2 overflow-hidden group">
                {viaraSlavovaPhoto ? (
                  <img
                    src={viaraSlavovaPhoto}
                    alt="ланд. арх. Вяра Славова"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : null}
              </div>
              <p className="text-black text-xs lg:text-sm font-light">
                ланд. арх. Вяра Славова
              </p>
            </div>

            <div className={`flex flex-col items-center transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="w-full aspect-square bg-gray-300 rounded-lg mb-2 overflow-hidden group">
                {petkoSlavovPhoto ? (
                  <img
                    src={petkoSlavovPhoto}
                    alt="ланд. арх. Петко Славов"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : null}
              </div>
              <p className="text-black text-xs lg:text-sm font-light">
                ланд. арх. Петко Славов
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between rounded-t-xl">
              <h3 className="text-xl lg:text-2xl font-light text-black">Заявка за проект</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 group hover:scale-110"
              >
                <X className="w-6 h-6 text-gray-600 group-hover:text-red-600 group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 lg:p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-black mb-1">
                    Име и Фамилия *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a5f52] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-light text-black mb-1">
                    Имейл *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a5f52] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-light text-black mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a5f52] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-light text-black mb-1">
                    Вид проект *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a5f52] focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Изберете...</option>
                    <option value="residential">Жилищен комплекс</option>
                    <option value="commercial">Търговски обект</option>
                    <option value="public">Обществено пространство</option>
                    <option value="private">Частна градина</option>
                    <option value="park">Парк</option>
                    <option value="other">Друго</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="area" className="block text-sm font-light text-black mb-1">
                    Площ на терена (кв.м)
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="напр. 500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a5f52] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-light text-black mb-1">
                    Бюджет
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a5f52] focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Изберете...</option>
                    <option value="under-10k">До 10,000 лв</option>
                    <option value="10k-25k">10,000 - 25,000 лв</option>
                    <option value="25k-50k">25,000 - 50,000 лв</option>
                    <option value="50k-100k">50,000 - 100,000 лв</option>
                    <option value="over-100k">Над 100,000 лв</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-light text-black mb-1">
                    Желан срок за реализация
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a5f52] focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Изберете...</option>
                    <option value="urgent">Спешно (до 1 месец)</option>
                    <option value="1-3months">1-3 месеца</option>
                    <option value="3-6months">3-6 месеца</option>
                    <option value="flexible">Гъвкав график</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light text-black mb-1">
                    Допълнителна информация
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Опишете вашата визия за проекта..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a5f52] focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-[#4a5f52] text-white rounded-lg font-light hover:bg-[#3d4f44] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group relative overflow-hidden"
                >
                  <span className="relative z-10">{isSubmitting ? 'Изпращане...' : 'Изпрати запитване'}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#3d4f44] to-[#4a5f52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    Възникна грешка. Моля, свържете се с нас директно на телефон или имейл.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <SuccessNotification
        show={showSuccessNotification}
        onClose={() => setShowSuccessNotification(false)}
      />

      <style>{`
        @keyframes fadeInOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in-overlay {
          animation: fadeInOverlay 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        input:focus, textarea:focus, select:focus {
          transform: scale(1.01);
        }
      `}</style>
    </section>
  );
}
