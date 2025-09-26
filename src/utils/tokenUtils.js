// Función para verificar si el token ha expirado
export const isTokenExpired = (token) => {
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

// Función para manejar la expiración del token
export const handleTokenExpiration = () => {
  localStorage.removeItem('userBlck');
  localStorage.removeItem('tokenBlck');
  localStorage.removeItem('userTypeBlck');
  window.location.href = '/login';
};

// Función para hacer llamadas a la API con manejo automático de expiración de token
export const apiCallWithTokenCheck = async (url, options = {}, token) => {
  // Verificar si el token está expirado antes de hacer la llamada
  if (token && isTokenExpired(token)) {
    console.warn('Token expired, logging out user');
    handleTokenExpiration();
    throw new Error('Token expired');
  }

  const API_BASE_URL = import.meta.env.VITE_API_URL;
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
      handleTokenExpiration();
      throw new Error('Unauthorized access');
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
