import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import {
  fetchAllDomesticProperties,
  fetchAllGlobalProjectGroups,
  PROPERTY_TYPES,
  type GlobalProjectGroup,
} from '../config/backend';
import { extractSearchCriteria } from '../services/searchProperties';
import { PropertyCard, type PropertyCardData } from './PropertyCard';
import { PropertySlider } from './PropertySlider';

interface PropertyListingsProps {
  category: 'international' | 'domestic';
  onPropertyInterest: (propertyName: string) => void;
}

const SAVOIR_SITE_URL = 'https://savoirproperties.com/';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const resolvePropertyUrl = (property: PropertyCardData) => {
  if (property.detailUrl) {
    return property.detailUrl;
  }

  if (property.websiteUrl && property.websiteUrl !== SAVOIR_SITE_URL) {
    return property.websiteUrl;
  }

  const slug = property.detailSlug ?? slugify(property.name);
  const path = property.category === 'international' ? `global-project/${slug}` : `property/${slug}`;
  return `${SAVOIR_SITE_URL}${path}`;
};

const categoryMeta = {
  international: {
    title: 'International Projects',
    eyebrow: 'Global Portfolio',
    description:
      'Live global projects pulled from the developer backend, organized by market so buyers can explore each country with clarity.',
    searchPlaceholder: 'Search by project name, country, community, or developer',
    allLabel: 'All Markets',
    statsLabel: 'Markets',
    itemsLabel: 'Projects',
  },
  domestic: {
    title: 'Domestic Properties',
    eyebrow: 'UAE Portfolio',
    description:
      'Live UAE property listings pulled from the developer backend with search and filters for studios, apartments, villas, townhouses, penthouses, rent, buy, ready, and off-plan.',
    searchPlaceholder: 'Search studio, villa, townhouse, apartment, Dubai Marina, Business Bay, buy, rent...',
    allLabel: 'All Listings',
    statsLabel: 'Filters',
    itemsLabel: 'Properties',
  },
} as const;

const domesticTypeChips = [
  { label: 'All Types', value: 'all' },
  { label: 'Studio', value: 'studio' },
  { label: 'Apartment', value: PROPERTY_TYPES.apartment },
  { label: 'Villa', value: PROPERTY_TYPES.villa },
  { label: 'Townhouse', value: PROPERTY_TYPES.townhouse },
  { label: 'Penthouse', value: PROPERTY_TYPES.penthouse },
  { label: 'Duplex', value: PROPERTY_TYPES.duplex },
  { label: 'Office', value: PROPERTY_TYPES.office },
] as const;

const filterGlobalGroups = (groups: GlobalProjectGroup[], query: string, selectedCountry: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  return groups
    .filter((group) => selectedCountry === 'all' || group.slug === selectedCountry)
    .map((group) => {
      if (!normalizedQuery) {
        return group;
      }

      const filteredProperties = group.properties.filter((property) => {
        const haystack = [property.name, property.location, property.developer, property.summary, group.country]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      });

      const groupMatches =
        group.country.toLowerCase().includes(normalizedQuery) ||
        (group.description ?? '').toLowerCase().includes(normalizedQuery);

      return groupMatches ? group : { ...group, properties: filteredProperties };
    })
    .filter((group) => group.properties.length > 0);
};

export function PropertyListings({ category, onPropertyInterest }: PropertyListingsProps) {
  const [globalGroups, setGlobalGroups] = useState<GlobalProjectGroup[]>([]);
  const [domesticProperties, setDomesticProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<'all' | 'buy' | 'rent'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'ready' | 'off-plan'>('all');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const meta = categoryMeta[category];

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      if (category === 'international') {
        try {
          const groups = await fetchAllGlobalProjectGroups({
            excludeCountries: ['united arab emirates'],
          });
          setGlobalGroups(groups);
        } catch (err) {
          console.error('Failed to fetch global projects:', err);
          setError('Unable to load international projects from backend.');
          setGlobalGroups([]);
        } finally {
          setLoading(false);
        }
        return;
      }

      try {
        const properties = await fetchAllDomesticProperties();
        setDomesticProperties(properties);
      } catch (err) {
        console.error('Failed to fetch domestic properties:', err);
        setError('Unable to load domestic properties from backend.');
        setDomesticProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category]);

  useEffect(() => {
    setSearchQuery('');
    setSelectedGroup('all');
    setSelectedType('all');
    setSelectedPurpose('all');
    setSelectedStatus('all');
  }, [category]);

  const filteredGlobalGroups = useMemo(
    () => filterGlobalGroups(globalGroups, deferredSearchQuery, selectedGroup),
    [deferredSearchQuery, globalGroups, selectedGroup]
  );

  const filteredDomesticProperties = useMemo(() => {
    const criteria = extractSearchCriteria(deferredSearchQuery);
    const normalizedQuery = deferredSearchQuery.trim().toLowerCase();

    return domesticProperties.filter((property) => {
      const haystack = [property.name, property.location, property.developer, property.summary]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (normalizedQuery && !haystack.includes(normalizedQuery)) {
        const hasStructuredMatch =
          (criteria.location && property.location.toLowerCase().includes(criteria.location)) ||
          (criteria.propertyType &&
            (criteria.propertyType === 'AP' && criteria.bedrooms === 0
              ? property.propertyType === 'AP' && property.bedrooms === 0
              : property.propertyType === criteria.propertyType)) ||
          (criteria.purpose && property.purpose === criteria.purpose) ||
          (criteria.status &&
            ((criteria.status === 'ready' && property.status?.toLowerCase() === 'ready') ||
              (criteria.status === 'off-plan' && property.status?.toLowerCase() === 'off-plan'))) ||
          (typeof criteria.bedrooms === 'number' && property.bedrooms === criteria.bedrooms);

        if (!hasStructuredMatch) {
          return false;
        }
      }

      if (selectedType !== 'all') {
        if (selectedType === 'studio') {
          if (!(property.propertyType === PROPERTY_TYPES.apartment && property.bedrooms === 0)) {
            return false;
          }
        } else if (property.propertyType !== selectedType) {
          return false;
        }
      }

      if (selectedPurpose !== 'all' && property.purpose !== selectedPurpose) {
        return false;
      }

      if (selectedStatus !== 'all') {
        const normalizedStatus = property.status?.toLowerCase();
        if (selectedStatus === 'ready' && normalizedStatus !== 'ready') {
          return false;
        }
        if (selectedStatus === 'off-plan' && normalizedStatus !== 'off-plan') {
          return false;
        }
      }

      if (criteria.location && !property.location.toLowerCase().includes(criteria.location)) {
        return false;
      }

      if (typeof criteria.bedrooms === 'number' && property.bedrooms !== criteria.bedrooms) {
        return false;
      }

      if (criteria.propertyType) {
        const matchesStudio = criteria.propertyType === 'AP' && criteria.bedrooms === 0;
        if (matchesStudio) {
          if (!(property.propertyType === 'AP' && property.bedrooms === 0)) {
            return false;
          }
        } else if (property.propertyType !== criteria.propertyType) {
          return false;
        }
      }

      if (criteria.purpose && property.purpose !== criteria.purpose) {
        return false;
      }

      if (criteria.status) {
        const normalizedStatus = property.status?.toLowerCase();
        if (criteria.status === 'ready' && normalizedStatus !== 'ready') {
          return false;
        }
        if (criteria.status === 'off-plan' && normalizedStatus !== 'off-plan') {
          return false;
        }
      }

      return true;
    });
  }, [deferredSearchQuery, domesticProperties, selectedPurpose, selectedStatus, selectedType]);

  const totalInternationalProjects = filteredGlobalGroups.reduce((total, group) => total + group.properties.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#0a0a0a] px-4 pb-16 pt-24 md:px-6 md:pb-24 md:pt-32 lg:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:mb-16"
        >
          <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#C9A961]">{meta.eyebrow}</p>
          <h1 className="mb-4 px-4 text-3xl font-extralight tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
            {meta.title}
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-white/65 md:text-base">{meta.description}</p>
        </motion.div>

        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 rounded-[28px] border border-[#C9A961]/15 bg-[#111111] p-5 md:p-6"
          >
            <div className="mb-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={meta.searchPlaceholder}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#C9A961]/45"
                />
              </div>

              <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                <div>
                  <span className="block text-[11px] uppercase tracking-[0.25em] text-white/35">{meta.statsLabel}</span>
                  <span className="font-medium text-white">
                    {category === 'international' ? filteredGlobalGroups.length : 3}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-[0.25em] text-white/35">{meta.itemsLabel}</span>
                  <span className="font-medium text-white">
                    {category === 'international' ? totalInternationalProjects : filteredDomesticProperties.length}
                  </span>
                </div>
              </div>
            </div>

            {category === 'international' ? (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedGroup('all')}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-colors ${
                    selectedGroup === 'all'
                      ? 'bg-[#C9A961] text-black'
                      : 'border border-white/10 bg-white/5 text-white/70 hover:border-[#C9A961]/30 hover:text-white'
                  }`}
                >
                  {meta.allLabel}
                </button>
                {globalGroups.map((group) => (
                  <button
                    key={group.slug}
                    onClick={() => setSelectedGroup(group.slug)}
                    className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-colors ${
                      selectedGroup === group.slug
                        ? 'bg-[#C9A961] text-black'
                        : 'border border-white/10 bg-white/5 text-white/70 hover:border-[#C9A961]/30 hover:text-white'
                    }`}
                  >
                    {group.country}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {domesticTypeChips.map((chip) => (
                    <button
                      key={chip.value}
                      onClick={() => setSelectedType(chip.value)}
                      className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-colors ${
                        selectedType === chip.value
                          ? 'bg-[#C9A961] text-black'
                          : 'border border-white/10 bg-white/5 text-white/70 hover:border-[#C9A961]/30 hover:text-white'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['all', 'buy', 'rent'] as const).map((purpose) => (
                    <button
                      key={purpose}
                      onClick={() => setSelectedPurpose(purpose)}
                      className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-colors ${
                        selectedPurpose === purpose
                          ? 'bg-[#C9A961] text-black'
                          : 'border border-white/10 bg-white/5 text-white/70 hover:border-[#C9A961]/30 hover:text-white'
                      }`}
                    >
                      {purpose === 'all' ? 'All Purposes' : purpose}
                    </button>
                  ))}

                  {(['all', 'ready', 'off-plan'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-colors ${
                        selectedStatus === status
                          ? 'bg-[#C9A961] text-black'
                          : 'border border-white/10 bg-white/5 text-white/70 hover:border-[#C9A961]/30 hover:text-white'
                      }`}
                    >
                      {status === 'all' ? 'All Status' : status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-[#C9A961]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm" />
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="mx-auto mb-8 max-w-xl rounded-3xl border border-[#C9A961]/20 bg-white/10 p-5 text-center backdrop-blur-xl">
                <p className="mb-1 text-red-300">{error}</p>
              </div>
            )}

            {category === 'international' ? (
              filteredGlobalGroups.length > 0 ? (
                <div className="space-y-10">
                  {filteredGlobalGroups.map((group, index) => (
                    <motion.section
                      key={group.slug}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.06 }}
                      className="overflow-hidden rounded-[32px] border border-white/10 bg-[#111111]"
                    >
                      <div className="grid gap-6 border-b border-white/8 p-5 md:grid-cols-[320px_minmax(0,1fr)] md:p-6">
                        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                          {group.image ? (
                            <img src={group.image} alt={group.country} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex min-h-[220px] items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#101010] px-6 text-center text-white/40">
                              {group.country}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="mb-2 text-xs uppercase tracking-[0.32em] text-[#C9A961]">Global Market</p>
                            <h2 className="mb-3 text-2xl font-light tracking-tight text-white md:text-3xl">{group.country}</h2>
                            <p className="max-w-3xl text-sm leading-7 text-white/65 md:text-base">
                              {group.description || `Explore curated opportunities across ${group.country}.`}
                            </p>
                          </div>

                          <div className="mt-6 flex flex-wrap gap-3">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                              <span className="block text-[11px] uppercase tracking-[0.25em] text-white/35">Projects</span>
                              <span className="text-lg font-medium text-white">{group.properties.length}</span>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                              <span className="block text-[11px] uppercase tracking-[0.25em] text-white/35">Focus</span>
                              <span className="text-lg font-medium text-white">International Buyers</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 md:p-6">
                        <PropertySlider
                          properties={group.properties}
                          getPropertyUrl={resolvePropertyUrl}
                          onPropertyInterest={onPropertyInterest}
                        />
                      </div>
                    </motion.section>
                  ))}
                </div>
              ) : (
                <div className="rounded-[28px] border border-white/10 bg-[#111111] p-10 text-center text-white/60">
                  No international projects matched your search right now.
                </div>
              )
            ) : filteredDomesticProperties.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredDomesticProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.25) }}
                  >
                    <PropertyCard
                      property={property}
                      propertyUrl={resolvePropertyUrl(property)}
                      onPropertyInterest={onPropertyInterest}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="rounded-[28px] border border-white/10 bg-[#111111] p-10 text-center text-white/60">
                No domestic properties matched your search right now.
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
