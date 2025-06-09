// API configuration for different environments
const getApiBaseUrl = () => {
  // In production (Netlify), use Netlify Functions
  if (import.meta.env.PROD) {
    return '/.netlify/functions/api';
  }
  // In development, use local Express server
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to construct API URLs
export const apiUrl = (path: string) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};