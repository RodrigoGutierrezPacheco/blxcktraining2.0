const API_BASE_URL = import.meta.env.VITE_API_URL;

// Función para decodificar el token JWT y obtener la expiración
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Interceptor de API que maneja la expiración del token
const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('tokenBlck');
  
  // Verificar si el token está expirado
  if (token && isTokenExpired(token)) {
    console.warn('Token expired, logging out user');
    // Limpiar el localStorage y redirigir al login
    localStorage.removeItem('userBlck');
    localStorage.removeItem('tokenBlck');
    localStorage.removeItem('userTypeBlck');
    
    // Redirigir a la página de login
    window.location.href = '/login';
    return;
  }

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...defaultOptions,
      ...options,
    });

    // Si recibimos un 401, el token es inválido o ha expirado
    if (response.status === 401) {
      console.warn('Unauthorized access, token may be expired');
      // Limpiar el localStorage y redirigir al login
      localStorage.removeItem('userBlck');
      localStorage.removeItem('tokenBlck');
      localStorage.removeItem('userTypeBlck');
      
      // Redirigir a la página de login
      window.location.href = '/login';
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Función helper para hacer llamadas GET
export const apiGet = async (url, options = {}) => {
  const response = await apiCall(url, { ...options, method: 'GET' });
  return response ? response.json() : null;
};

// Función helper para hacer llamadas POST
export const apiPost = async (url, data, options = {}) => {
  const response = await apiCall(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response ? response.json() : null;
};

// Función helper para hacer llamadas PUT
export const apiPut = async (url, data, options = {}) => {
  const response = await apiCall(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response ? response.json() : null;
};

// Función helper para hacer llamadas PATCH
export const apiPatch = async (url, data, options = {}) => {
  const response = await apiCall(url, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return response ? response.json() : null;
};

// Función helper para hacer llamadas DELETE
export const apiDelete = async (url, options = {}) => {
  const response = await apiCall(url, { ...options, method: 'DELETE' });
  return response ? response.ok : false;
};

export { API_BASE_URL, isTokenExpired };
