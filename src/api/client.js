const API_URL = "http://127.0.0.1:8000/api";

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Detect if we are sending a File/Form (Login) or JSON (Signup)
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const fullUrl = `${API_URL}${endpoint}`;
  console.log(`[API Request] ${options.method || 'GET'} ${fullUrl}`); 

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Request failed';
      try {
        const error = await response.json();
        errorMessage = error.detail || errorMessage;
      } catch (e) {
        errorMessage = `Server Error: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error(`[API Error]`, error);
    throw error;
  }
};