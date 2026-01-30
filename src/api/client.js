// Automatically picks up the VITE_API_URL from .env or Vercel Environment Variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Try to parse error message, fallback to generic
      let errorMessage = 'Request failed';
      try {
        const error = await response.json();
        errorMessage = error.detail || errorMessage;
      } catch (e) {
        // If response isn't JSON (e.g., 500 error html)
        errorMessage = `Server Error: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // Re-throw to be handled by the component
    throw error;
  }
};
