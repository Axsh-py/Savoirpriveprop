import { motion } from 'motion/react';
import { ExternalLink, Home, MapPin, Maximize, Bed, Bath } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPropertiesByCategory, isApiConfigured, type Property } from '../services/api';

interface PropertyListingsProps {
  category: 'international' | 'domestic';
  onPropertyInterest: (propertyName: string) => void;
}

// Demo/Fallback Data
const getDemoProperties = (category: 'international' | 'domestic'): Property[] => {
  if (category === 'international') {
    return [
      {
        id: '1',
        name: 'Dubai Marina Penthouse',
        location: 'Dubai Marina, UAE',
        price: 'AED 12,500,000',
        bedrooms: 4,
        bathrooms: 5,
        area: '5,200 sq ft',
        image: 'https://images.unsplash.com/photo-1770273886464-54794e10e845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGx1eHVyeSUyMHBlbnRob3VzZSUyMGludGVyaW9ufGVufDF8fHx8MTc3MzgzMjg0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        websiteUrl: 'https://savoirproperties.com/',
        category: 'international',
      },
      {
        id: '2',
        name: 'Palm Jumeirah Villa',
        location: 'Palm Jumeirah, Dubai',
        price: 'AED 28,000,000',
        bedrooms: 6,
        bathrooms: 7,
        area: '8,500 sq ft',
        image: 'https://images.unsplash.com/photo-1757439402115-c3c496fe81ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMGV4dGVyaW9yJTIwcG9vbHxlbnwxfHx8fDE3NzM3MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        websiteUrl: 'https://savoirproperties.com/',
        category: 'international',
      },
      {
        id: '3',
        name: 'Downtown Dubai Residence',
        location: 'Downtown Dubai, UAE',
        price: 'AED 8,750,000',
        bedrooms: 3,
        bathrooms: 4,
        area: '3,800 sq ft',
        image: 'https://images.unsplash.com/photo-1771090904152-264a71f4fb57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBjaXR5JTIwdmlld3xlbnwxfHx8fDE3NzM4MDQ3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        websiteUrl: 'https://savoirproperties.com/',
        category: 'international',
      },
    ];
  } else {
    return [
      {
        id: '4',
        name: 'Elegant Garden Estate',
        location: 'Premium Locality',
        price: '₹8,50,00,000',
        bedrooms: 5,
        bathrooms: 6,
        area: '6,500 sq ft',
        image: 'https://images.unsplash.com/photo-1731101681114-2748fe0f8709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaG91c2UlMjBnYXJkZW58ZW58MXx8fHwxNzczODMyODQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        websiteUrl: 'https://savoirproperties.com/',
        category: 'domestic',
      },
      {
        id: '5',
        name: 'Modern Villa Retreat',
        location: 'Exclusive Community',
        price: '₹12,75,00,000',
        bedrooms: 4,
        bathrooms: 5,
        area: '5,800 sq ft',
        image: 'https://images.unsplash.com/photo-1757439402115-c3c496fe81ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMGV4dGVyaW9yJTIwcG9vbHxlbnwxfHx8fDE3NzM3MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        websiteUrl: 'https://savoirproperties.com/',
        category: 'domestic',
      },
      {
        id: '6',
        name: 'Luxury Apartment Suite',
        location: 'City Center',
        price: '₹5,25,00,000',
        bedrooms: 3,
        bathrooms: 3,
        area: '3,200 sq ft',
        image: 'https://images.unsplash.com/photo-1771090904152-264a71f4fb57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBjaXR5JTIwdmlld3xlbnwxfHx8fDE3NzM4MDQ3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        websiteUrl: 'https://savoirproperties.com/',
        category: 'domestic',
      },
    ];
  }
};

export function PropertyListings({ category, onPropertyInterest }: PropertyListingsProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const title = category === 'international' ? 'International Properties' : 'Domestic Properties';

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      
      // Check if API is configured
      if (!isApiConfigured()) {
        // Use demo data if API is not configured
        console.log('API not configured, using demo properties');
        setProperties(getDemoProperties(category));
        setLoading(false);
        return;
      }

      try {
        const fetchedProperties = await getPropertiesByCategory(category);
        setProperties(fetchedProperties);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError('Unable to load properties from backend.');
        
        // Fallback to demo data if API fails
        setProperties(getDemoProperties(category));
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [category]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 px-4 md:px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent mx-auto mb-8" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 tracking-tight font-extralight px-4">
            {title}
          </h1>
          <p className="text-white/50 text-xs md:text-sm tracking-[0.2em] uppercase">
            Curated Luxury Living
          </p>
        </motion.div>

        {/* Property Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              {/* Loading spinner with glass effect */}
              <div className="w-16 h-16 border-4 border-white/20 border-t-[#C9A961] rounded-full animate-spin" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full backdrop-blur-sm" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-md mx-auto">
              <p className="text-red-400 mb-4">{error}</p>
              <p className="text-white/60 text-sm">Showing demo properties</p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative bg-white/10 backdrop-blur-2xl overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/20"
              >
                {/* Property Image - Large Top Section */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Info Icon - Top Right - Glass Effect */}
                  <a
                    href={property.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 text-white" strokeWidth={2} />
                  </a>
                </div>

                {/* Glass Content Section */}
                <div className="bg-white/90 backdrop-blur-xl p-6 md:p-7 border-t border-white/40">
                  {/* Property Name & Location */}
                  <div className="mb-5">
                    <h3 className="text-gray-900 text-xl md:text-2xl mb-1.5 font-semibold tracking-tight line-clamp-1">
                      {property.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" strokeWidth={2} />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                  </div>

                  {/* Stats Row - Three Columns with Glass Dividers */}
                  <div className="grid grid-cols-3 gap-3 mb-5 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/60 shadow-inner">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Bed className="w-4 h-4 text-[#C9A961]" strokeWidth={2} />
                        <span className="text-gray-900 font-semibold text-base">{property.bedrooms}</span>
                      </div>
                      <div className="text-gray-600 text-xs uppercase tracking-wide font-medium">Bedrooms</div>
                    </div>
                    
                    <div className="text-center border-l border-r border-gray-300/50">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Bath className="w-4 h-4 text-[#C9A961]" strokeWidth={2} />
                        <span className="text-gray-900 font-semibold text-base">{property.bathrooms}</span>
                      </div>
                      <div className="text-gray-600 text-xs uppercase tracking-wide font-medium">Bathrooms</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Maximize className="w-4 h-4 text-[#C9A961]" strokeWidth={2} />
                      </div>
                      <div className="text-gray-900 font-semibold text-xs">{property.area}</div>
                    </div>
                  </div>

                  {/* Price & CTA Row */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="bg-gradient-to-br from-[#C9A961]/20 to-[#C9A961]/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#C9A961]/30 shadow-lg">
                      <div className="text-gray-700 text-xs mb-0.5 uppercase tracking-widest font-semibold">Price</div>
                      <div className="text-[#C9A961] text-xl md:text-2xl font-bold tracking-tight">
                        {property.price}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        console.log('🔥 BUTTON CLICKED!', property.name);
                        onPropertyInterest(property.name);
                      }}
                      className="relative overflow-hidden group/btn cursor-pointer"
                    >
                      {/* Luxury gold gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A961] via-[#B8985A] to-[#C9A961] rounded-2xl shadow-xl pointer-events-none" />
                      
                      {/* Hover shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-2xl pointer-events-none" />
                      
                      {/* Button content */}
                      <span className="relative z-10 flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 text-white text-sm font-bold whitespace-nowrap tracking-wide pointer-events-none drop-shadow-md">
                        Get in touch
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  {/* View Details Link - Premium Glass Effect */}
                  <a
                    href={property.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link relative block overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl rounded-2xl py-3.5 border border-white/70 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-[#C9A961]/40">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A961]/5 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-500" />
                      <div className="relative text-center text-gray-800 group-hover/link:text-[#C9A961] text-sm font-bold tracking-wide transition-colors duration-300 flex items-center justify-center gap-2">
                        <span>View full details</span>
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Glass Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-3xl" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}