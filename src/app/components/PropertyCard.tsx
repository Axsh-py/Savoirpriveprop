import { Bath, Bed, Building2, ExternalLink, MapPin, Maximize2, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface PropertyCardData {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  websiteUrl: string;
  category: 'international' | 'domestic';
  summary?: string;
  highlights?: string[];
  ctaLabel?: string;
  detailSlug?: string;
  detailUrl?: string;
  developer?: string;
  status?: string;
  roi?: string;
  propertyType?: string;
  purpose?: 'buy' | 'rent';
}

export type Property = PropertyCardData;

interface PropertyCardProps {
  property: PropertyCardData;
  propertyUrl: string;
  onPropertyInterest: (propertyName: string) => void;
}

const getStatusLabel = (status?: string) => {
  const rawStatus = status?.trim().toLowerCase() ?? '';

  if (rawStatus === 'completed' || rawStatus === 'ready') {
    return 'Ready';
  }

  if (rawStatus === 'off_plan' || rawStatus === 'off-plan') {
    return 'Off-Plan';
  }

  return status?.trim() || null;
};

const getRoiLabel = (roi?: string) => {
  const normalized = roi?.trim();
  return normalized ? normalized : null;
};

const getSizeLabel = (area: string) => {
  const normalized = area?.trim();
  return normalized || '--';
};

export function PropertyCard({ property, propertyUrl, onPropertyInterest }: PropertyCardProps) {
  const statusLabel = getStatusLabel(property.status);
  const roiLabel = getRoiLabel(property.roi);
  const sizeLabel = getSizeLabel(property.area);

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      <div className="group relative h-40 overflow-hidden">
        <ImageWithFallback
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {(statusLabel || roiLabel) && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {statusLabel && (
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-neutral-800 backdrop-blur-sm">
                {statusLabel}
              </span>
            )}
            {roiLabel && (
              <span className="flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-[11px] font-medium text-white">
                <TrendingUp className="h-3 w-3" />
                {roiLabel}
              </span>
            )}
          </div>
        )}

        <a
          href={propertyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/55"
          aria-label={`Open ${property.name}`}
        >
          <ExternalLink className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="mb-1 line-clamp-2 text-base font-semibold text-neutral-900">{property.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <MapPin className="h-3.5 w-3.5 text-[#C4A574]" strokeWidth={2} />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        <div className="mb-3 text-lg font-semibold text-[#C4A574]">{property.price}</div>

        <div className="mb-3 flex items-center gap-3 border-b border-neutral-100 pb-3 text-xs text-neutral-600">
          <div className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5" />
            <span>{property.bedrooms || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" />
            <span>{property.bathrooms || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5" />
            <span>{sizeLabel}</span>
          </div>
        </div>

        {property.developer && (
          <div className="mb-3 flex items-center gap-1.5 border-b border-neutral-100 pb-3">
            <Building2 className="h-3.5 w-3.5 text-neutral-400" />
            <span className="line-clamp-1 text-xs text-neutral-600">{property.developer}</span>
          </div>
        )}

        {property.summary && <p className="mb-4 line-clamp-3 text-sm leading-6 text-neutral-600">{property.summary}</p>}

        <div className="grid gap-2">
          <button
            onClick={() => onPropertyInterest(property.name)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A961] to-[#8B7355] px-4 py-3 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-md"
          >
            Get in touch
          </button>

          <a
            href={propertyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-800 transition-all duration-300 hover:border-[#C4A574] hover:text-[#8B7355]"
          >
            <span>{property.ctaLabel ?? 'View Details'}</span>
            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
