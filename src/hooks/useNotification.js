import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({
    isVisible: false,
    type: 'success',
    title: '',
    message: '',
    duration: 5000,
    position: 'top-right',
    showProgressBar: true,
    showCloseButton: true,
    autoClose: true
  });

  const showNotification = useCallback(({
    type = 'success',
    title = '',
    message = '',
    duration = 5000,
    position = 'top-right',
    showProgressBar = true,
    showCloseButton = true,
    autoClose = true
  } = {}) => {
    setNotification({
      isVisible: true,
      type,
      title,
      message,
      duration,
      position,
      showProgressBar,
      showCloseButton,
      autoClose
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  // Métodos de conveniencia
  const showSuccess = useCallback((message, title = 'Éxito', options = {}) => {
    showNotification({
      type: 'success',
      title,
      message,
      ...options
    });
  }, [showNotification]);

  const showError = useCallback((message, title = 'Error', options = {}) => {
    showNotification({
      type: 'error',
      title,
      message,
      ...options
    });
  }, [showNotification]);

  const showWarning = useCallback((message, title = 'Advertencia', options = {}) => {
    showNotification({
      type: 'warning',
      title,
      message,
      ...options
    });
  }, [showNotification]);

  const showInfo = useCallback((message, title = 'Información', options = {}) => {
    showNotification({
      type: 'info',
      title,
      message,
      ...options
    });
  }, [showNotification]);

  // Notificaciones centradas (para casos importantes)
  const showCenteredSuccess = useCallback((message, title = 'Éxito', options = {}) => {
    showNotification({
      type: 'success',
      title,
      message,
      position: 'center',
      duration: 4000,
      ...options
    });
  }, [showNotification]);

  const showCenteredError = useCallback((message, title = 'Error', options = {}) => {
    showNotification({
      type: 'error',
      title,
      message,
      position: 'center',
      duration: 6000,
      autoClose: false, // Los errores no se cierran automáticamente
      ...options
    });
  }, [showNotification]);

  const showCenteredWarning = useCallback((message, title = 'Advertencia', options = {}) => {
    showNotification({
      type: 'warning',
      title,
      message,
      position: 'center',
      duration: 5000,
      ...options
    });
  }, [showNotification]);

  const showCenteredInfo = useCallback((message, title = 'Información', options = {}) => {
    showNotification({
      type: 'info',
      title,
      message,
      position: 'center',
      duration: 4000,
      ...options
    });
  }, [showNotification]);

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCenteredSuccess,
    showCenteredError,
    showCenteredWarning,
    showCenteredInfo
  };
};
