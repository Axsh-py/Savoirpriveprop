import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PropertyListings } from './components/PropertyListings';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import logo from '../assets/17294eefdfe0a6c8c9d366f4b8e71128f7424fa6.png';

type PropertyCategory = 'international' | 'domestic' | null;

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePropertyInterest = (propertyName: string) => {
    console.log('🔔 Property Interest Clicked:', propertyName);
    setSelectedProperty(propertyName);
    setShowContactForm(true);
    console.log('✅ Contact Form State Set to TRUE');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Elegant Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#C9A961]/20"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 relative">
          {/* Logo Container - Centered or Left based on scroll */}
          <motion.div
            animate={{
              left: isScrolled ? '0' : '50%',
              transform: isScrolled ? 'translateX(0)' : 'translateX(-50%)',
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute top-1/2 -translate-y-1/2 flex items-center"
          >
            <motion.img
              src={logo}
              alt="Savoir Properties"
              className="h-8 md:h-10 w-auto object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {/* Home Button - Right Side */}
          {selectedCategory && (
            <div className="flex justify-end">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedCategory(null)}
                className="text-[#C9A961] hover:text-white transition-colors duration-500 text-xs tracking-[0.3em] uppercase border border-[#C9A961]/30 hover:border-[#C9A961] px-6 py-2.5 rounded-sm"
              >
                Home
              </motion.button>
            </div>
          )}
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          /* Premium Landing Page */
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-20 md:py-32"
          >
            <div className="max-w-6xl w-full">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-center mb-12 md:mb-20"
              >
                <div className="inline-block mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent mx-auto mb-8" />
                  <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 tracking-tight font-extralight px-4">
                    Discover Luxury
                    <br />
                    <span className="text-[#C9A961]">Real Estate</span>
                  </h1>
                  <p className="text-white/50 text-xs md:text-sm tracking-[0.2em] uppercase">
                    Exceptional Properties • Worldwide
                  </p>
                </div>
              </motion.div>

              {/* Category Selection */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {/* International Properties */}
                <motion.button
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  onClick={() => setSelectedCategory('international')}
                  className="group relative overflow-hidden bg-[#111111] border border-[#C9A961]/20 hover:border-[#C9A961] transition-all duration-700 rounded-sm"
                >
                  <div className="aspect-[3/4] md:aspect-[4/5] relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1770273886464-54794e10e845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGx1eHVyeSUyMHBlbnRob3VzZSUyMGludGVyaW9yfGVufDF8fHx8MTc3MzgzMjg0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="International Properties"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-10 text-center">
                    <div className="transform transition-transform duration-700 group-hover:translate-y-[-10px]">
                      <div className="h-px w-12 bg-[#C9A961] mx-auto mb-4 md:mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <h2 className="text-xl md:text-2xl lg:text-3xl text-white mb-2 md:mb-3 tracking-wide font-light">
                        INTERNATIONAL
                      </h2>
                      <p className="text-white/60 text-xs md:text-sm tracking-[0.2em] mb-4 md:mb-6 uppercase">
                        Dubai • UAE • Global
                      </p>
                      <div className="inline-flex items-center gap-2 md:gap-3 text-[#C9A961] text-xs tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700">
                        <span>VIEW PROPERTIES</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* Domestic Properties */}
                <motion.button
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  onClick={() => setSelectedCategory('domestic')}
                  className="group relative overflow-hidden bg-[#111111] border border-[#C9A961]/20 hover:border-[#C9A961] transition-all duration-700 rounded-sm"
                >
                  <div className="aspect-[3/4] md:aspect-[4/5] relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1731101681114-2748fe0f8709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaG91c2UlMjBnYXJkZW58ZW58MXx8fHwxNzczODMyODQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Domestic Properties"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-10 text-center">
                    <div className="transform transition-transform duration-700 group-hover:translate-y-[-10px]">
                      <div className="h-px w-12 bg-[#C9A961] mx-auto mb-4 md:mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <h2 className="text-xl md:text-2xl lg:text-3xl text-white mb-2 md:mb-3 tracking-wide font-light">
                        DOMESTIC
                      </h2>
                      <p className="text-white/60 text-xs md:text-sm tracking-[0.2em] mb-4 md:mb-6 uppercase">
                        Premium Local Estates
                      </p>
                      <div className="inline-flex items-center gap-2 md:gap-3 text-[#C9A961] text-xs tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700">
                        <span>VIEW PROPERTIES</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <PropertyListings
            key="listings"
            category={selectedCategory}
            onPropertyInterest={handlePropertyInterest}
          />
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
        propertyName={selectedProperty}
      />

      <Footer />
    </div>
  );
}
