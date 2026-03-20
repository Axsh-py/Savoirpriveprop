import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-32">
      <motion.div
        style={{ y, opacity, scale }}
        className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full mx-4 p-12 md:p-16"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="text-sm text-neutral-500 tracking-widest mb-4">— ABOUT US</div>
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
              Architecture should speak of its time and place, but yearn for timelessness
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              We create innovative, modern architectural designs that blend luxury, functionality and timeless aesthetics. Every structure is meticulously planned to harmonize with its surroundings while delivering exceptional quality and sophistication.
            </p>
            <div className="flex gap-4 mb-8">
              <button className="bg-black text-white px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-neutral-800 transition-colors">
                ABOUT US
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-black text-black px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-black hover:text-white transition-colors">
                CONTACT
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white" />
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1759393176547-3e5053cd63df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBob3VzZSUyMGdsYXNzJTIwcGFuZWxzfGVufDF8fHx8MTc3MzgxNzYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern architecture"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}