import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const cards = [
  {
    id: 'about',
    type: 'about',
    title: 'Architecture should speak of its time and place, but yearn for timelessness',
    subtitle: '— ABOUT US',
    description: 'We create innovative, modern architectural designs that blend luxury, functionality and timeless aesthetics. Every structure is meticulously planned to harmonize with its surroundings while delivering exceptional quality and sophistication.',
    image: 'https://images.unsplash.com/photo-1759393176547-3e5053cd63df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBob3VzZSUyMGlsbGFzJTIwcGFuZWxzfGVufDF8fHx8MTc3MzgxNzYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 1,
    type: 'project',
    title: 'Boxing Edge House',
    description: 'A striking modern structure defined by bold teal panels and clean vertical lines. The curved glass corner adds lightness and elegance to the sharp, sculptural form.',
    image: 'https://images.unsplash.com/photo-1768333222210-e23d51cf6255?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFsJTIwbW9kZXJuJTIwaG91c2UlMjBjb2FzdGFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MzgxNzYzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    type: 'project',
    title: 'White Cloud Residence',
    description: 'Geometric angles and dynamic lines define this modern façade, blending rhythm and complexity in a sculptural silhouette.',
    image: 'https://images.unsplash.com/photo-1771337746263-2dd49f877a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGdlb21ldHJpYyUyMG1vZGVybiUyMGJ1aWxkaW5nJTIwZmFjYWRlfGVufDF8fHx8MTc3MzgxNzYzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    type: 'project',
    title: 'Norway Mountain',
    description: 'Bold rhythmic balconies form a dramatic 3D pattern—each unit projecting with purpose and precision.',
    image: 'https://images.unsplash.com/photo-1749063238388-10811b49fbc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBtb3VudGFpbiUyMGNhYmluJTIwbm9yd2F5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MzgxNzYzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    type: 'project',
    title: 'Concrete House',
    description: 'A floating glass structure with a unique wave-shaped roof and panoramic window forms that catch the light in every detail.',
    image: 'https://images.unsplash.com/photo-1631733510584-17158d29eedd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMGdsYXNzJTIwaG91c2UlMjBldmVuaW5nJTIwbGlnaHRzfGVufDF8fHx8MTc3MzgxNzYzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'stories',
    type: 'stories',
    title: 'Customer stories',
    description: 'Each day we create practical solutions that amplify everyday life. Our clients range from the public sector to private businesses.',
    stories: [
      {
        id: 1,
        title: 'Arlurel Tower',
        tags: ['Oslo', 'Finance', 'Innovation'],
        description: 'Arlurel Tower blends futuristic form with refined elegance. Its staggered silhouette and textured facade create a bold statement in modern urban architecture.',
        image: 'https://images.unsplash.com/photo-1764530926838-90e6bb05a346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0b3dlciUyMGJ1aWxkaW5nJTIwbmlnaHQlMjBjaXR5fGVufDF8fHx8MTc3MzgxNzYzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: 2,
        title: 'Niimph apartments',
        tags: ['Amsterdam', 'New York', 'Helsinki'],
        description: 'Contemporary living meets bold architectural expression. Niimph Apartments redefine urban housing with sculptural geometry, playful repetition, and site-responsive design.',
        image: 'https://images.unsplash.com/photo-1635933036183-d1f250072745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcGFydG1lbnRzJTIwdXJiYW4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczODE3NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: 3,
        title: 'ES16',
        tags: ['Oslo', 'Munich', 'Tech'],
        description: 'A modern take on mid-century sculptural furniture steel form library knowledge—merging everyday spaces with timeless craftsmanship and precision.',
        image: 'https://images.unsplash.com/photo-1680141160969-5ce82a1970b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBob3VzZSUyMG1vZGVybiUyMGFyY2hpdGVjdHVyZSUyMHRyZWVzfGVufDF8fHx8MTc3MzgxNzYzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: 4,
        title: 'Stokverk',
        tags: ['Aurora', 'Barcelona', 'Innovation'],
        description: 'Stokverk embodies the marriage of form and function. A dynamic architectural composition with a fresh, contemporary edge—rooted in culture, designed for the future.',
        image: 'https://images.unsplash.com/photo-1761059725052-9fe3d153c065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBhcmNoaXRlY3R1cmUlMjBzdW5zZXQlMjBtb2Rlcm4lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzM4MTc2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
    ],
  },
];

function Card({ card, index }: { card: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  if (card.type === 'about') {
    return (
      <div ref={cardRef} className="h-screen flex items-center justify-center sticky top-0" style={{ zIndex: index }}>
        <motion.div
          style={{ scale, y, opacity }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full mx-8 p-12 md:p-16 overflow-hidden animate-card-entrance"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div style={{ y: textY, opacity }} className="flex-1">
              <div className="text-sm text-neutral-500 tracking-widest mb-4 animate-fade-in-up animate-delay-200">{card.subtitle}</div>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight animate-fade-in-up animate-delay-300">{card.title}</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed animate-fade-in-up animate-delay-400">{card.description}</p>
              <div className="flex gap-4 mb-8 animate-fade-in-up animate-delay-500">
                <button className="bg-black text-white px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-neutral-800 transition-all hover:scale-105">
                  ABOUT US
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-black text-black px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-black hover:text-white transition-all hover:scale-105">
                  CONTACT
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex -space-x-3 animate-fade-in-up animate-delay-600">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white animate-float" style={{ animationDelay: '0s' }} />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white animate-float" style={{ animationDelay: '0.2s' }} />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white animate-float" style={{ animationDelay: '0.4s' }} />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white animate-float" style={{ animationDelay: '0.6s' }} />
              </div>
            </motion.div>
            <motion.div style={{ y: imageY, opacity }} className="flex-1">
              <img
                src={card.image}
                alt="Modern architecture"
                className="w-full h-80 object-cover rounded-2xl hover:scale-105 transition-transform duration-700 animate-scale-in animate-delay-400"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (card.type === 'project') {
    return (
      <div ref={cardRef} className="relative h-screen flex items-center justify-center sticky top-0" style={{ zIndex: index }}>
        <motion.div
          style={{ scale, y, opacity }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="relative w-full max-w-6xl mx-8 h-[600px] rounded-3xl overflow-hidden shadow-2xl animate-card-entrance"
        >
          {/* Background Image with Parallax */}
          <motion.div 
            style={{ y: imageY, opacity }}
            className="absolute inset-0 will-change-transform"
          >
            <img 
              src={card.image} 
              alt={card.title} 
              className="w-full h-[120%] object-cover transition-transform duration-700 hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          </motion.div>

          {/* Content with Parallax */}
          <motion.div 
            style={{ y: textY, opacity }}
            className="relative z-10 h-full flex flex-col justify-center p-12"
          >
            <div className="max-w-xl">
              <h2 className="text-white text-5xl md:text-6xl mb-6 animate-fade-in-up animate-delay-200">{card.title}</h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8 animate-fade-in-up animate-delay-400">{card.description}</p>
              <div className="flex gap-4 animate-fade-in-up animate-delay-600">
                <button className="bg-white text-black px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-white/90 transition-all hover:scale-105 animate-pulse-glow">
                  EXPLORE SOLUTIONS
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-full text-sm hover:bg-white hover:text-black transition-all hover:scale-105">
                  HOW?
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (card.type === 'stories') {
    return (
      <div ref={cardRef} className="min-h-screen flex items-center justify-center sticky top-0 py-20" style={{ zIndex: index }}>
        <motion.div
          style={{ scale, y, opacity }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="bg-neutral-100 rounded-3xl shadow-2xl max-w-7xl w-full mx-8 p-12 overflow-hidden animate-card-entrance"
        >
          <motion.div style={{ y: textY, opacity }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <div>
                <h2 className="text-5xl mb-4 animate-fade-in-up animate-delay-200">{card.title}</h2>
                <p className="text-neutral-600 max-w-3xl animate-fade-in-up animate-delay-300">{card.description}</p>
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-neutral-800 transition-all hover:scale-105 whitespace-nowrap animate-fade-in-left animate-delay-400">
                READ MORE
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {card.stories.map((story: any, idx: number) => {
              const storyOpacity = useTransform(scrollYProgress, [0.3, 0.6, 1], [0, 0.5, 1]);
              const storyY = useTransform(scrollYProgress, [0, 1], [30 * (idx + 1), -10 * (idx + 1)]);
              
              return (
                <motion.div
                  key={story.id}
                  style={{ 
                    y: storyY,
                    opacity: storyOpacity,
                  }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15, delay: idx * 0.1 }}
                  className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer animate-scale-in"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity group-hover:opacity-90" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8 transition-transform group-hover:translate-y-[-4px]">
                    <div>
                      <h3 className="text-white text-3xl mb-4 transition-all group-hover:scale-105">{story.title}</h3>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {story.tags.map((tag: string, tagIdx: number) => (
                          <span
                            key={tag}
                            className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/30 hover:bg-white/30 transition-all animate-fade-in"
                            style={{ animationDelay: `${(idx * 0.15) + (tagIdx * 0.05)}s` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{story.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}

export function StackingCards() {
  return (
    <div className="relative bg-neutral-100">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} index={index} />
      ))}
    </div>
  );
}