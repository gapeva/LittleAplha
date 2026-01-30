// QA FIX: Use relative path. The proxy in vite.config.js will handle the rest.
const API_URL = "/api";

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const fullUrl = `${API_URL}${endpoint}`;
  console.log(`[API CALL] ${options.method || 'GET'} ${fullUrl}`); 

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const text = await response.text();
      let errorMessage = `Error ${response.status}`;
      try {
        const json = JSON.parse(text);
        errorMessage = json.detail || errorMessage;
      } catch (e) {
        if (text) errorMessage = text;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error("[API ERROR]", error);
    throw error;
  }
};