import type { Property } from '../components/PropertyCard';
import { formatBackendProperty, PROPERTY_TYPE_ALIASES, searchPropertiesAPI } from '../config/backend';

export interface SearchCriteria {
  bedrooms?: number;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  status?: string;
  purpose?: 'buy' | 'rent';
}

export async function searchProperties(query: string, file?: File | null): Promise<Property[]> {
  try {
    const criteria = extractSearchCriteria(query);

    let visualSearchData = null;
    if (file) {
      visualSearchData = await handleVisualSearch(file);
      console.log('Visual search placeholder:', visualSearchData);
    }

    try {
      const backendProperties = await searchPropertiesAPI({
        propertyType: criteria.propertyType,
        bedrooms: criteria.bedrooms,
        location: criteria.location,
        minPrice: criteria.minPrice,
        maxPrice: criteria.maxPrice,
        status: criteria.status,
        purpose: criteria.purpose,
      });

      if (backendProperties.length > 0) {
        return backendProperties.map(formatBackendProperty);
      }
    } catch (err) {
      console.error('Backend property search failed, using mock data instead:', err);
    }

    return mockPropertySearch(criteria);
  } catch (error) {
    console.error('Error searching properties:', error);
    return [];
  }
}

export function extractSearchCriteria(query: string): SearchCriteria {
  const criteria: SearchCriteria = {};
  const lowerQuery = query.toLowerCase();

  const bedroomMatch = lowerQuery.match(/(\d+)\s*(bedroom|bedrooms|br|bhk)/i);
  if (bedroomMatch) {
    criteria.bedrooms = parseInt(bedroomMatch[1], 10);
  }

  if (lowerQuery.includes('studio')) {
    criteria.bedrooms = 0;
    if (!criteria.propertyType) {
      criteria.propertyType = 'AP';
    }
  }

  const locations = [
    'dubai marina',
    'downtown dubai',
    'downtown',
    'palm jumeirah',
    'jvc',
    'jumeirah village circle',
    'business bay',
    'dubai hills estate',
    'dubai hills',
    'jbr',
  ];

  for (const location of locations) {
    if (lowerQuery.includes(location)) {
      criteria.location = location;
      break;
    }
  }

  for (const [alias, typeCode] of Object.entries(PROPERTY_TYPE_ALIASES)) {
    if (lowerQuery.includes(alias)) {
      criteria.propertyType = typeCode;
      break;
    }
  }

  const rangeMatch = lowerQuery.match(/between\s+(\d+(?:\.\d+)?)\s*(m|million|k|thousand)\s+and\s+(\d+(?:\.\d+)?)\s*(m|million|k|thousand)/i);
  if (rangeMatch) {
    criteria.minPrice = parsePrice(rangeMatch[1], rangeMatch[2]);
    criteria.maxPrice = parsePrice(rangeMatch[3], rangeMatch[4]);
  } else {
    const priceMatch = lowerQuery.match(/(\d+(?:\.\d+)?)\s*(m|million|k|thousand)/i);
    if (priceMatch) {
      criteria.maxPrice = parsePrice(priceMatch[1], priceMatch[2]);
    }
  }

  if (lowerQuery.includes('off-plan') || lowerQuery.includes('off plan')) {
    criteria.status = 'off-plan';
  } else if (lowerQuery.includes('ready')) {
    criteria.status = 'ready';
  }

  if (lowerQuery.includes('rent') || lowerQuery.includes('for rent')) {
    criteria.purpose = 'rent';
  } else if (
    lowerQuery.includes('buy') ||
    lowerQuery.includes('purchase') ||
    lowerQuery.includes('for sale')
  ) {
    criteria.purpose = 'buy';
  }

  return criteria;
}

async function handleVisualSearch(file: File) {
  return { fileName: file.name, type: file.type, size: file.size };
}

function parsePrice(value: string, unit: string) {
  const parsed = parseFloat(value);
  const normalizedUnit = unit.toLowerCase();

  if (normalizedUnit === 'm' || normalizedUnit === 'million') {
    return parsed * 1_000_000;
  }

  if (normalizedUnit === 'k' || normalizedUnit === 'thousand') {
    return parsed * 1_000;
  }

  return parsed;
}

function mockPropertySearch(criteria: SearchCriteria): Property[] {
  const allProperties: (Property & { typeCode?: string; purpose?: 'buy' | 'rent' })[] = [
    {
      id: '1',
      name: 'Luxury 2BR Apartment',
      location: 'Dubai Marina',
      price: 'AED 2,450,000',
      bedrooms: 2,
      bathrooms: 3,
      area: '1,340 sqft',
      developer: 'Emaar Properties',
      status: 'Ready',
      roi: '7.2%',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      websiteUrl: 'https://dev.savoirproperties.com/project/lamtara-1',
      detailUrl: 'https://dev.savoirproperties.com/project/lamtara-1',
      category: 'international',
      typeCode: 'AP',
      purpose: 'buy',
      summary: 'A refined marina-side apartment tailored for investors and end users looking for premium waterfront living.',
    },
    {
      id: '2',
      name: 'Premium 3BR Villa',
      location: 'Dubai Hills Estate',
      price: 'AED 4,200,000',
      bedrooms: 3,
      bathrooms: 4,
      area: '2,850 sqft',
      developer: 'Emaar Properties',
      status: 'Off-Plan',
      roi: '8.1%',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      websiteUrl: 'https://dev.savoirproperties.com/project/dubai-hills-villa',
      detailUrl: 'https://dev.savoirproperties.com/project/dubai-hills-villa',
      category: 'international',
      typeCode: 'VI',
      purpose: 'buy',
      summary: 'A family-sized villa in one of the citys strongest end-user communities with long-term growth appeal.',
    },
    {
      id: '3',
      name: 'Modern 1BR Apartment',
      location: 'Business Bay',
      price: 'AED 1,150,000',
      bedrooms: 1,
      bathrooms: 1,
      area: '720 sqft',
      developer: 'Damac Properties',
      status: 'Ready',
      roi: '9.3%',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      websiteUrl: 'https://dev.savoirproperties.com/project/business-bay-apartment',
      detailUrl: 'https://dev.savoirproperties.com/project/business-bay-apartment',
      category: 'international',
      typeCode: 'AP',
      purpose: 'buy',
      summary: 'A compact high-yield apartment option positioned in a central business district with strong rental demand.',
    },
    {
      id: '4',
      name: 'Elegant 2BR Townhouse',
      location: 'JVC',
      price: 'AED 1,850,000',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,520 sqft',
      developer: 'Nakheel',
      status: 'Ready',
      roi: '8.5%',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      websiteUrl: 'https://dev.savoirproperties.com/project/jvc-townhouse',
      detailUrl: 'https://dev.savoirproperties.com/project/jvc-townhouse',
      category: 'international',
      typeCode: 'TH',
      purpose: 'buy',
      summary: 'A practical townhouse option offering spacious layouts and strong value for family-focused buyers.',
    },
    {
      id: '5',
      name: 'Spacious 2BR Apartment for Rent',
      location: 'Dubai Marina',
      price: 'AED 95,000/year',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200 sqft',
      developer: 'Emaar Properties',
      status: 'Ready',
      roi: '7.9%',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      websiteUrl: 'https://dev.savoirproperties.com/project/dubai-marina-rent-apartment',
      detailUrl: 'https://dev.savoirproperties.com/project/dubai-marina-rent-apartment',
      category: 'international',
      typeCode: 'AP',
      purpose: 'rent',
      summary: 'A well-positioned marina rental home with practical layouts and strong tenant appeal.',
    },
    {
      id: '6',
      name: 'Luxury 3BR Penthouse for Rent',
      location: 'Downtown Dubai',
      price: 'AED 180,000/year',
      bedrooms: 3,
      bathrooms: 3,
      area: '2,100 sqft',
      developer: 'Emaar Properties',
      status: 'Ready',
      roi: '8.2%',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      websiteUrl: 'https://dev.savoirproperties.com/project/downtown-penthouse-rent',
      detailUrl: 'https://dev.savoirproperties.com/project/downtown-penthouse-rent',
      category: 'international',
      typeCode: 'PH',
      purpose: 'rent',
      summary: 'A premium penthouse rental with landmark access, city views, and a fully elevated urban living experience.',
    },
    {
      id: '7',
      name: 'Cozy 1BR Apartment for Rent',
      location: 'Business Bay',
      price: 'AED 55,000/year',
      bedrooms: 1,
      bathrooms: 1,
      area: '650 sqft',
      developer: 'Damac Properties',
      status: 'Ready',
      roi: '8.8%',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      websiteUrl: 'https://dev.savoirproperties.com/project/business-bay-rent-1br',
      detailUrl: 'https://dev.savoirproperties.com/project/business-bay-rent-1br',
      category: 'international',
      typeCode: 'AP',
      purpose: 'rent',
      summary: 'A compact rental unit suited for professionals who want location efficiency and strong city connectivity.',
    },
  ];

  return allProperties.filter((property) => {
    if (criteria.bedrooms !== undefined && property.bedrooms !== criteria.bedrooms) {
      return false;
    }

    if (criteria.location && !property.location.toLowerCase().includes(criteria.location)) {
      return false;
    }

    if (criteria.propertyType && property.typeCode !== criteria.propertyType) {
      return false;
    }

    if (criteria.status && property.status?.toLowerCase() !== criteria.status.toLowerCase()) {
      return false;
    }

    if (criteria.purpose && property.purpose !== criteria.purpose) {
      return false;
    }

    return true;
  });
}
