import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section ref={sectionRef} className="relative h-[150vh] w-full bg-black" style={{ position: 'relative' }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ position: 'sticky' }}>
        {/* Background Image with Zoom */}
        <motion.div 
          style={{ scale }}
          className="absolute inset-[-10%] will-change-transform"
          transition={{ type: "spring", stiffness: 40, damping: 40 }}
        >
          <img
            src="https://images.unsplash.com/photo-1566908829550-e6551b00979b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlJTIwZGF5fGVufDF8fHx8MTc3MzgyMTY3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        </motion.div>

        {/* iOS-style Frosted Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none" />

        {/* Header - iOS Glass Style */}
        <motion.header 
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-6 mt-6"
        >
          <div className="inline-block backdrop-blur-[40px] bg-white/10 border border-white/20 rounded-[22px] px-6 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_1px_rgba(255,255,255,0.3)_inset]">
            <div className="text-white text-xl tracking-[0.25em] font-light">NORDICUS</div>
          </div>
        </motion.header>

        {/* Hero Content with iOS Liquid Glass Card */}
        <motion.div 
          style={{ opacity }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 -mt-16"
        >
          {/* iOS Liquid Glass Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative backdrop-blur-[60px] bg-white/10 border border-white/25 rounded-[48px] p-14 md:p-20 shadow-[0_20px_80px_rgba(0,0,0,0.3),0_0_1px_rgba(255,255,255,0.5)_inset,0_1px_0_rgba(255,255,255,0.3)_inset] max-w-6xl overflow-hidden"
            style={{
              boxShadow: '0 20px 80px rgba(0, 0, 0, 0.3), inset 0 0 1px rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* iOS Glass Shine Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-[48px] pointer-events-none">
              {/* Top Shine */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/[0.05]" />
              
              {/* Animated Shimmer - iOS Style */}
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  width: '200%',
                }}
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-white text-4xl md:text-6xl lg:text-7xl max-w-5xl leading-tight font-light"
              style={{
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              Making the world more
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent font-normal">
                like your dreams.
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-white/80 text-base md:text-lg mt-8 max-w-2xl font-light"
              style={{
                textShadow: '0 1px 10px rgba(0,0,0,0.2)',
              }}
            >
              Transforming visions into architectural masterpieces
            </motion.p>

            {/* iOS-style Floating Glass Elements */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1],
              }}
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full backdrop-blur-[30px] bg-white/15 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)]"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1],
              }}
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full backdrop-blur-[30px] bg-white/15 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)]"
            />
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 10, 0],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1],
              }}
              className="absolute top-1/4 -right-4 w-20 h-20 rounded-full backdrop-blur-[30px] bg-white/12 border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)]"
            />
          </motion.div>
        </motion.div>

        {/* iOS-style Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }}
            className="backdrop-blur-[40px] bg-white/10 border border-white/20 rounded-full p-3 shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_1px_rgba(255,255,255,0.3)_inset]"
          >
            <ChevronDown className="text-white/90 w-6 h-6" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}