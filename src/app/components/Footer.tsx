import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, Video } from 'lucide-react';
import logo from '../../assets/17294eefdfe0a6c8c9d366f4b8e71128f7424fa6.png';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#C9A961]/20 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Company Info Section */}
          <div className="space-y-6">
            <img 
              src={logo} 
              alt="Savoir Properties" 
              className="h-8 w-auto object-contain"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Savoir Properties is committed to delivering a high level of expertise, 
              customer service, and attention to details.
            </p>
            <a 
              href="https://savoirproperties.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#C9A961] text-sm hover:text-white transition-colors duration-300"
            >
              Read More →
            </a>
            
            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/5 border border-[#C9A961]/20 rounded-l px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A961] transition-colors"
                />
                <button className="bg-[#C9A961] hover:bg-[#b89851] px-6 py-2.5 text-black text-sm font-medium rounded-r transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 pt-2">
              <a 
                href="https://www.facebook.com/savoirproperties#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#C9A961] transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/savoirpriveproperties?igshid=MzRlODBiNWFlZA%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#C9A961] transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/savoirprive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#C9A961] transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@savoir_properties" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#C9A961] transition-colors duration-300"
              >
                <Video className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@SavoirPriveProperties" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#C9A961] transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Latest Listings Section */}
          <div>
            <h3 className="text-[#C9A961] text-sm tracking-[0.2em] uppercase mb-6">
              Latest Listings
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 group cursor-pointer">
                <div className="w-16 h-16 bg-[#C9A961]/10 rounded overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-[#C9A961]/20 to-transparent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm mb-1 group-hover:text-[#C9A961] transition-colors truncate">
                    Luxury Sky Villa
                  </h4>
                  <p className="text-[#C9A961] text-xs">50,000,000 AED</p>
                </div>
              </div>
              
              <div className="flex gap-3 group cursor-pointer">
                <div className="w-16 h-16 bg-[#C9A961]/10 rounded overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-[#C9A961]/20 to-transparent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm mb-1 group-hover:text-[#C9A961] transition-colors truncate">
                    Prime Waterfront Living
                  </h4>
                  <p className="text-[#C9A961] text-xs">91,581,000 AED</p>
                </div>
              </div>

              <div className="flex gap-3 group cursor-pointer">
                <div className="w-16 h-16 bg-[#C9A961]/10 rounded overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-[#C9A961]/20 to-transparent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm mb-1 group-hover:text-[#C9A961] transition-colors truncate">
                    Top-Tier Twin Villa
                  </h4>
                  <p className="text-[#C9A961] text-xs">7,300,000 AED</p>
                </div>
              </div>
            </div>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="text-[#C9A961] text-sm tracking-[0.2em] uppercase mb-6">
              Useful Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-[#C9A961] text-sm transition-colors duration-300">
                  Global Projects
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#C9A961] text-sm transition-colors duration-300">
                  List With Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#C9A961] text-sm transition-colors duration-300">
                  Real Estate Advisory
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#C9A961] text-sm transition-colors duration-300">
                  Property Management
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#C9A961] text-sm transition-colors duration-300">
                  Interior Design Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#C9A961] text-sm transition-colors duration-300">
                  Property Evaluation Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#C9A961] text-sm transition-colors duration-300">
                  Mortgage Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#C9A961] text-sm transition-colors duration-300">
                  Real Estate Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-[#C9A961] text-sm tracking-[0.2em] uppercase mb-6">
              Contact Us
            </h3>
            <div className="space-y-4 mb-8">
              <a 
                href="tel:+971505074686" 
                className="flex items-center gap-3 text-white/60 hover:text-[#C9A961] transition-colors duration-300 group"
              >
                <Phone className="w-4 h-4 text-[#C9A961]" />
                <span className="text-sm">+971505074686</span>
              </a>
              <a 
                href="mailto:info@savoirproperties.com" 
                className="flex items-center gap-3 text-white/60 hover:text-[#C9A961] transition-colors duration-300 group"
              >
                <Mail className="w-4 h-4 text-[#C9A961]" />
                <span className="text-sm">info@savoirproperties.com</span>
              </a>
            </div>

            {/* Partner Logos */}
            <div className="space-y-4 pt-4">
              <div className="text-white/40 text-xs tracking-wider uppercase mb-3">
                UNIQUE ESTATES
              </div>
              <div className="text-white/30 text-[10px] tracking-widest">
                LUXURY & EXECUTIVE PROPERTIES
              </div>
              <div className="pt-4">
                <div className="text-white/40 text-xs tracking-wider">
                  Realto Group
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#C9A961]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            2024 | Savoir Properties
          </p>
          <a 
            href="#" 
            className="text-white/40 hover:text-[#C9A961] text-xs transition-colors duration-300"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
