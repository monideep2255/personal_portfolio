// API configuration for different environments
const getApiBaseUrl = () => {
  // Always use /api for both development and production on Replit
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to construct API URLs
export const apiUrl = (path: string) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};