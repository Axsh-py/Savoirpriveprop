import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

export function ProjectCard({ title, description, image, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [150, 0, 0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.85, 1, 1, 0.9]);

  return (
    <section ref={cardRef} className="relative min-h-screen flex items-center justify-center py-20">
      <motion.div
        style={{ y, opacity, scale }}
        className="relative w-full max-w-6xl mx-4 h-[600px] rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-12">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className="text-white text-5xl mb-6"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false }}
              className="text-white/90 text-lg leading-relaxed mb-8"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false }}
              className="flex gap-4"
            >
              <button className="bg-white text-black px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-white/90 transition-colors">
                EXPLORE SOLUTIONS
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-full text-sm hover:bg-white hover:text-black transition-colors">
                HOW?
              </button>
            </motion.div>
          </div>

          {/* Side Text */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <div className="text-white text-sm tracking-widest rotate-90 origin-center whitespace-nowrap opacity-60">
              PROJECT {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}