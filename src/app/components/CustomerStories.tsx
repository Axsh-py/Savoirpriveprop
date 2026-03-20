import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export function CustomerStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  const stories = [
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
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={{ y, opacity }}
      className="relative min-h-screen py-32 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-5xl mb-4">Customer stories</h2>
            <p className="text-neutral-600 max-w-3xl">
              Each day we create practical solutions that amplify everyday life. Our clients range from the public sector to private businesses.
            </p>
          </div>
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-neutral-800 transition-colors">
            READ MORE
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false }}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div>
                  <h3 className="text-white text-3xl mb-4">{story.title}</h3>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {story.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}