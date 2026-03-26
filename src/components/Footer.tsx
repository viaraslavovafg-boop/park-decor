import { Phone, Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#3d9970] text-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Logo */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/Logo_white_web.png"
              alt="Park Decor Logo"
              className="w-48 md:w-56 lg:w-72 h-auto"
            />
          </div>

          {/* Right side - Contact info */}
          <div className="space-y-6 md:space-y-7">
            {/* Phone */}
            <div className="flex items-center gap-4 group">
              <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors">
                <Phone className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <a
                href="tel:+359895761889"
                className="text-xl md:text-2xl lg:text-3xl font-light hover:text-white/80 transition-colors"
              >
                +359 89 576 1889
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 group">
              <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors">
                <Mail className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <a
                href="mailto:park.decor1@gmail.com"
                className="text-xl md:text-2xl lg:text-3xl font-light hover:text-white/80 transition-colors break-all"
              >
                park.decor1@gmail.com
              </a>
            </div>

            {/* Facebook */}
            <div className="flex items-center gap-4 group">
              <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors">
                <Facebook className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl font-light hover:text-white/80 transition-colors"
              >
                Последвай ни във Facebook
              </a>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-4 group">
              <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors">
                <Instagram className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl font-light hover:text-white/80 transition-colors"
              >
                Последвай ни в Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
