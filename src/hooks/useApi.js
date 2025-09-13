import { useAuth } from '../context/useAuth';
import { useCallback } from 'react';

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

export const useApi = () => {
  const { logout } = useAuth();

  // Función para hacer llamadas a la API con manejo automático de expiración de token
  const apiCall = useCallback(async (url, options = {}) => {
    const token = localStorage.getItem('tokenBlck');
    
    // Verificar si el token está expirado antes de hacer la llamada
    if (token && isTokenExpired(token)) {
      console.warn('Token expired, logging out user');
      logout();
      throw new Error('Token expired');
    }

    const API_BASE_URL = 'http://localhost:8000';
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
        logout();
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
  }, [logout]);

  // Funciones helper para diferentes métodos HTTP
  const get = useCallback(async (url, options = {}) => {
    const response = await apiCall(url, { ...options, method: 'GET' });
    return response.json();
  }, [apiCall]);

  const post = useCallback(async (url, data, options = {}) => {
    const response = await apiCall(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }, [apiCall]);

  const put = useCallback(async (url, data, options = {}) => {
    const response = await apiCall(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  }, [apiCall]);

  const patch = useCallback(async (url, data, options = {}) => {
    const response = await apiCall(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.json();
  }, [apiCall]);

  const del = useCallback(async (url, options = {}) => {
    const response = await apiCall(url, { ...options, method: 'DELETE' });
    return response.ok;
  }, [apiCall]);

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    apiCall,
  };
};
