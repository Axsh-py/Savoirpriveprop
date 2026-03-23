import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyCard, type PropertyCardData } from './PropertyCard';

interface PropertySliderProps {
  properties: PropertyCardData[];
  getPropertyUrl: (property: PropertyCardData) => string;
  onPropertyInterest: (propertyName: string) => void;
}

export function PropertySlider({ properties, getPropertyUrl, onPropertyInterest }: PropertySliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) {
      return;
    }

    const scrollAmount = 320;
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="my-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-white/60">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
        </span>
        {properties.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="rounded-lg border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 text-white/70" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="rounded-lg border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 text-white/70" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {properties.map((property) => (
          <div key={property.id} className="w-[300px] flex-shrink-0">
            <PropertyCard
              property={property}
              propertyUrl={getPropertyUrl(property)}
              onPropertyInterest={onPropertyInterest}
            />
          </div>
        ))}
      </div>

      {properties.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {properties.map((property) => (
            <div key={property.id} className="h-1.5 w-8 rounded-full bg-white/15" />
          ))}
        </div>
      )}
    </div>
  );
}
