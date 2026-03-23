import type { Property } from '../components/PropertyCard';

const BACKEND_BASE_URL = 'https://cms.savoirproperties.com/api';
const PROJECT_BASE_URL = 'https://dev.savoirproperties.com';

export const PROPERTY_TYPES = {
  apartment: 'AP',
  villa: 'VI',
  townhouse: 'TH',
  penthouse: 'PH',
  duplex: 'DX',
  office: 'OF',
  studio: 'AP',
} as const;

export const PROPERTY_TYPE_ALIASES: Record<string, string> = {
  apartment: PROPERTY_TYPES.apartment,
  apartments: PROPERTY_TYPES.apartment,
  flat: PROPERTY_TYPES.apartment,
  flats: PROPERTY_TYPES.apartment,
  studio: PROPERTY_TYPES.studio,
  villa: PROPERTY_TYPES.villa,
  villas: PROPERTY_TYPES.villa,
  townhouse: PROPERTY_TYPES.townhouse,
  townhouses: PROPERTY_TYPES.townhouse,
  penthouse: PROPERTY_TYPES.penthouse,
  penthouses: PROPERTY_TYPES.penthouse,
  duplex: PROPERTY_TYPES.duplex,
  duplexes: PROPERTY_TYPES.duplex,
  office: PROPERTY_TYPES.office,
  offices: PROPERTY_TYPES.office,
};

export interface BackendSearchParams {
  propertyType?: string;
  bedrooms?: number;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  purpose?: 'buy' | 'rent';
}

export interface GlobalCountry {
  name: string;
  image?: string;
}

export interface GlobalProjectGroup {
  country: string;
  slug: string;
  image?: string;
  description?: string;
  properties: Property[];
}

export interface DomesticPropertyGroup {
  community: string;
  slug: string;
  city: string;
  properties: Property[];
}

const completionStatusMap: Record<string, string> = {
  ready: 'completed',
  completed: 'completed',
  'off-plan': 'off_plan',
  off_plan: 'off_plan',
};

const purposeMap: Record<'buy' | 'rent', string> = {
  buy: 'RS',
  rent: 'RR',
};

const formatCountryName = (value: string) =>
  value
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const toCountrySlug = (value: string) => value.trim().toLowerCase();

const buildAreaLabel = (areaValue: unknown) => {
  if (typeof areaValue === 'number' && areaValue > 0) {
    return `${areaValue.toLocaleString('en-US')} sqft`;
  }

  if (typeof areaValue === 'string' && areaValue.trim()) {
    return areaValue;
  }

  return '--';
};

export async function searchPropertiesAPI(params: BackendSearchParams): Promise<any[]> {
  const result = await fetchSearchResults(params);

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  if (Array.isArray(result?.properties)) {
    return result.properties;
  }

  return [];
}

export async function fetchSearchResults(params: BackendSearchParams & { page?: number }) {
  const query = new URLSearchParams();
  query.set('page', String(params.page ?? 1));
  query.set('sort_field', 'price');
  query.set('sort_order', 'asc');

  const body = {
    query: params.location ? [params.location] : [],
    offering_type: params.purpose ? purposeMap[params.purpose] : 'RS',
    completion_status: params.status ? completionStatusMap[params.status] ?? null : null,
    type: params.propertyType ?? null,
    bedroom: typeof params.bedrooms === 'number' ? params.bedrooms : null,
    bathroom: null,
    min_price: params.minPrice ?? null,
    max_price: params.maxPrice ?? null,
  };

  const response = await fetch(`${BACKEND_BASE_URL}/search?${query.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Search API failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchHomeData() {
  const response = await fetch(`${BACKEND_BASE_URL}/home`);

  if (!response.ok) {
    throw new Error(`Home API failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchGlobalCountries(): Promise<GlobalCountry[]> {
  const homeData = await fetchHomeData();
  return Array.isArray(homeData?.countries) ? homeData.countries : [];
}

export async function fetchGlobalProjectByCountry(countrySlug: string): Promise<GlobalProjectGroup> {
  const response = await fetch(`${BACKEND_BASE_URL}/global-project/${encodeURIComponent(countrySlug)}`);

  if (!response.ok) {
    throw new Error(`Global project API failed for ${countrySlug} with status ${response.status}`);
  }

  const result = await response.json();
  const project = result?.project ?? {};
  const similarProperties = Array.isArray(result?.similar_properties) ? result.similar_properties : [];
  const country = project?.name ?? countrySlug;

  return {
    country: formatCountryName(country),
    slug: toCountrySlug(country),
    image: project?.image,
    description: project?.description,
    properties: similarProperties.map((property: any) =>
      formatGlobalProjectProperty(property, {
        country,
        description: project?.description,
      })
    ),
  };
}

export async function fetchAllGlobalProjectGroups(options?: { excludeCountries?: string[] }) {
  const countries = await fetchGlobalCountries();
  const excluded = new Set((options?.excludeCountries ?? []).map((country) => toCountrySlug(country)));
  const selectedCountries = countries.filter((country) => !excluded.has(toCountrySlug(country.name)));

  const groups = await Promise.all(
    selectedCountries.map(async (country) => {
      try {
        const group = await fetchGlobalProjectByCountry(country.name);
        return {
          ...group,
          image: group.image ?? country.image,
        };
      } catch (error) {
        console.error(`Unable to load global projects for ${country.name}:`, error);
        return null;
      }
    })
  );

  return groups.filter((group): group is GlobalProjectGroup => Boolean(group && group.properties.length > 0));
}

export async function fetchDomesticPropertyGroups(options?: { pagesPerPurpose?: number }) {
  const pagesPerPurpose = options?.pagesPerPurpose ?? 3;
  const offeringPurposes: Array<'buy' | 'rent'> = ['buy', 'rent'];

  const responses = await Promise.all(
    offeringPurposes.flatMap((purpose) =>
      Array.from({ length: pagesPerPurpose }, (_, index) =>
        fetchSearchResults({
          page: index + 1,
          purpose,
        }).catch((error) => {
          console.error(`Unable to load domestic ${purpose} page ${index + 1}:`, error);
          return null;
        })
      )
    )
  );

  const rawProperties = responses.flatMap((response) => (Array.isArray(response?.data) ? response.data : []));
  const domesticProperties = rawProperties
    .filter((property) => {
      const city = String(property.city ?? '').toLowerCase();
      const currency = String(property.currency ?? '').toUpperCase();
      return currency === 'AED' || city.includes('dubai') || city.includes('abu dhabi') || city.includes('uae');
    })
    .map((property) => formatDomesticProperty(property));

  const grouped = new Map<string, DomesticPropertyGroup>();

  for (const property of domesticProperties) {
    const community = property.location.split('|')[0]?.trim() || 'Dubai';
    const slug = community.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const current = grouped.get(slug);

    if (current) {
      current.properties.push(property);
      continue;
    }

    grouped.set(slug, {
      community,
      slug,
      city: 'United Arab Emirates',
      properties: [property],
    });
  }

  return Array.from(grouped.values()).sort((left, right) => right.properties.length - left.properties.length);
}

export async function fetchAllDomesticProperties() {
  const purposes: Array<'buy' | 'rent'> = ['buy', 'rent'];

  const results = await Promise.all(
    purposes.map(async (purpose) => {
      const firstPage = await fetchSearchResults({ page: 1, purpose });
      const totalPages = Number(firstPage?.total_pages ?? 1);
      const remainingPages =
        totalPages > 1
          ? await Promise.all(
              Array.from({ length: totalPages - 1 }, (_, index) =>
                fetchSearchResults({
                  page: index + 2,
                  purpose,
                }).catch((error) => {
                  console.error(`Unable to load domestic ${purpose} page ${index + 2}:`, error);
                  return null;
                })
              )
            )
          : [];

      return [firstPage, ...remainingPages];
    })
  );

  const rawProperties = results.flatMap((pages) => pages.flatMap((page) => (Array.isArray(page?.data) ? page.data : [])));
  const seen = new Set<string>();

  return rawProperties
    .filter((property) => {
      const city = String(property.city ?? '').toLowerCase();
      const currency = String(property.currency ?? '').toUpperCase();
      return currency === 'AED' || city.includes('dubai') || city.includes('abu dhabi') || city.includes('uae');
    })
    .filter((property) => {
      const id = String(property.id ?? property.slug ?? '');
      if (!id || seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    })
    .map((property) => formatDomesticProperty(property));
}

export function buildProjectUrl(slug?: string) {
  return slug ? `${PROJECT_BASE_URL}/project/${slug}` : PROJECT_BASE_URL;
}

export function formatBackendProperty(property: any): Property {
  const rawPrice = property.price;
  const currency = property.currency ?? 'AED';
  const numericPrice =
    typeof rawPrice === 'number'
      ? `${currency} ${rawPrice.toLocaleString('en-US')}`
      : property.price_formatted ?? property.price ?? '';

  const status =
    property.completion_status === 'completed'
      ? 'Ready'
      : property.completion_status === 'off_plan'
        ? 'Off-Plan'
        : property.completion_status ?? property.status ?? '';

  const imageUrl =
    (typeof property.photo === 'string' ? property.photo : undefined) ??
    property.photo?.url ??
    property.thumbnail_url ??
    property.image_url ??
    property.image ??
    property.featured_image ??
    '';

  const location = [property.community, property.sub_community, property.location]
    .filter(Boolean)
    .join(' | ');

  const areaValue = property.bua ?? property.size ?? property.area ?? 0;
  const category = String(property.category ?? '').toLowerCase() === 'domestic' ? 'domestic' : 'international';

  return {
    id: String(property.id ?? property.reference ?? property.slug ?? ''),
    name: property.title_en ?? property.title ?? property.name ?? 'Property',
    location: location || 'Prime Location',
    price: numericPrice,
    bedrooms: Number(property.bedroom ?? property.bedrooms ?? property.beds ?? 0),
    bathrooms: Number(property.bathroom ?? property.bathrooms ?? property.baths ?? 0),
    area: buildAreaLabel(areaValue),
    image: imageUrl,
    websiteUrl: buildProjectUrl(property.slug),
    detailUrl: buildProjectUrl(property.slug),
    category,
    developer: property.developer_name ?? property.developer ?? 'Savoir Prive Properties',
    status,
    roi: property.roi ? String(property.roi) : '',
    summary: property.description ?? property.short_description ?? '',
    ctaLabel: 'View Details',
    propertyType: property.property_type ?? property.type ?? '',
    purpose: property.offering_type === 'RR' ? 'rent' : 'buy',
  };
}

export function formatDomesticProperty(property: any): Property {
  const formatted = formatBackendProperty(property);
  const location = [property.community, property.sub_community, property.city]
    .filter(Boolean)
    .join(' | ');

  return {
    ...formatted,
    category: 'domestic',
    location: location || formatted.location,
    summary:
      property.title_details ??
      property.description ??
      `A live UAE listing in ${property.community ?? property.city ?? 'Dubai'} sourced directly from the developer backend.`,
    ctaLabel: 'View More',
    propertyType: property.property_type ?? formatted.propertyType ?? '',
    purpose: property.offering_type === 'RR' ? 'rent' : 'buy',
  };
}

export function formatGlobalProjectProperty(
  property: any,
  context: { country: string; description?: string }
): Property {
  const location = [property.community, property.sub_community ?? property.subcommunity, formatCountryName(context.country)]
    .filter(Boolean)
    .join(' | ');

  const advisor = property.user?.name;
  const rawPrice = typeof property.price === 'number' ? property.price.toLocaleString('en-US') : property.price;
  const currency = property.currency ?? 'EUR';

  return {
    id: String(property.id ?? property.slug ?? property.title_en ?? property.title ?? ''),
    name: property.title_en ?? property.title ?? 'Global Project',
    location,
    price: rawPrice ? `${currency} ${rawPrice}` : currency,
    bedrooms: Number(property.bedroom ?? property.bedrooms ?? 0),
    bathrooms: Number(property.bathroom ?? property.bathrooms ?? 0),
    area: buildAreaLabel(property.bua ?? property.size ?? property.area),
    image: property.photo ?? property.image ?? '',
    websiteUrl: buildProjectUrl(property.slug),
    detailUrl: buildProjectUrl(property.slug),
    detailSlug: property.slug,
    category: 'international',
    developer: advisor || 'Savoir Global Desk',
    status: property.completion_status ?? property.status ?? '',
    roi: property.roi ? String(property.roi) : '',
    summary: context.description ?? '',
    ctaLabel: 'View More',
    propertyType: property.property_type ?? '',
    purpose: property.offering_type === 'RR' ? 'rent' : 'buy',
  };
}
