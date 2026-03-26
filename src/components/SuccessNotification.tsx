import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessNotificationProps {
  show: boolean;
  onClose: () => void;
}

export default function SuccessNotification({ show, onClose }: SuccessNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto animate-successPop">
        <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-2xl shadow-2xl p-8 max-w-md mx-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-white rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-green-600 animate-checkmark" strokeWidth={2.5} />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Успешно изпратено!
            </h3>

            <p className="text-white/90 text-sm leading-relaxed">
              Вашето съобщение беше изпратено успешно. Ще се свържем с вас скоро.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
