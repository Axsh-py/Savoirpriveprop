// API Configuration
const API_BASE_URL = ''; // Replace with your actual backend URL
// Example: 'https://api.savoirproperties.com' or 'https://your-backend.com/api'

// Check if API is configured
export const isApiConfigured = () => {
  return API_BASE_URL && API_BASE_URL !== '' && !API_BASE_URL.includes('YOUR_API');
};

// Property Interface (should match your backend response)
export interface Property {
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
}

// API Response Interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Fetch all properties
export async function getAllProperties(): Promise<Property[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add your API key if required
        // 'Authorization': 'Bearer YOUR_API_KEY',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Property[]> = await response.json();
    return result.data || result as any; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

// Fetch properties by category
export async function getPropertiesByCategory(
  category: 'international' | 'domestic'
): Promise<Property[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/properties?category=${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add your API key if required
        // 'Authorization': 'Bearer YOUR_API_KEY',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Property[]> = await response.json();
    return result.data || result as any; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error fetching properties by category:', error);
    throw error;
  }
}

// Fetch single property by ID
export async function getPropertyById(id: string): Promise<Property> {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Property> = await response.json();
    return result.data || result as any;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
}

// Submit contact form
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyName?: string;
}): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

/*
===========================================
BACKEND API INTEGRATION INSTRUCTIONS
===========================================

1. SETUP YOUR BACKEND URL:
   - Replace 'YOUR_API_BASE_URL_HERE' with your actual backend URL
   - Example: 'https://api.savoirproperties.com'
   - Example: 'https://your-backend.com/api'

2. EXPECTED API ENDPOINTS:

   A. Get All Properties:
      GET /properties
      Response: [
        {
          "id": "1",
          "name": "Dubai Marina Penthouse",
          "location": "Dubai Marina, UAE",
          "price": "AED 12,500,000",
          "bedrooms": 4,
          "bathrooms": 5,
          "area": "5,200 sq ft",
          "image": "https://...",
          "websiteUrl": "https://savoirproperties.com/",
          "category": "international"
        }
      ]

   B. Get Properties by Category:
      GET /properties?category=international
      GET /properties?category=domestic
      Response: Same as above, filtered by category

   C. Get Single Property:
      GET /properties/:id
      Response: Single property object

   D. Submit Contact Form:
      POST /contact
      Body: {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+91 9876543210",
        "message": "I'm interested in...",
        "propertyName": "Dubai Marina Penthouse"
      }

3. API AUTHENTICATION (if required):
   - Uncomment the 'Authorization' header in the functions above
   - Replace 'YOUR_API_KEY' with your actual API key
   - Ask your developer for the correct authentication method

4. CORS SETUP:
   - Make sure your backend allows requests from your frontend domain
   - Your developer needs to enable CORS headers:
     Access-Control-Allow-Origin: *
     Access-Control-Allow-Methods: GET, POST, PUT, DELETE
     Access-Control-Allow-Headers: Content-Type, Authorization

5. RESPONSE FORMAT:
   - If your backend returns data differently, adjust the response parsing
   - Current code expects: { data: [...] } or direct array
   - Modify the return statements in functions if needed

6. ERROR HANDLING:
   - All errors are logged to console
   - The UI will show error messages to users
   - Your developer should return proper HTTP status codes

7. TESTING:
   - Test with tools like Postman first
   - Check browser console for any errors
   - Verify CORS is properly configured

===========================================
*/