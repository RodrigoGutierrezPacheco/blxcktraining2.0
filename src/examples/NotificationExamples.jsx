import { useNotification } from '../context/NotificationContext';

// Ejemplo de uso del sistema de notificaciones
const NotificationExamples = () => {
  const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCenteredSuccess,
    showCenteredError,
    showCenteredWarning,
    showCenteredInfo,
    showNotification
  } = useNotification();

  const handleExamples = () => {
    // Ejemplos de notificaciones en esquina superior derecha
    showSuccess('Operación completada exitosamente');
    showError('Error al guardar los datos');
    showWarning('Verifica la información ingresada');
    showInfo('Nueva actualización disponible');

    // Ejemplos de notificaciones centradas
    showCenteredSuccess('¡Rutina creada exitosamente!');
    showCenteredError('Error crítico: No se pudo conectar al servidor');
    showCenteredWarning('¿Estás seguro de que quieres eliminar esta rutina?');
    showCenteredInfo('Sesión expirará en 5 minutos');

    // Ejemplo personalizado
    showNotification({
      type: 'success',
      title: 'Rutina Guardada',
      message: 'Tu rutina personalizada ha sido guardada correctamente.',
      duration: 3000,
      position: 'top-right',
      showProgressBar: true,
      showCloseButton: true,
      autoClose: true
    });

    // Ejemplo de notificación sin auto-cerrar
    showNotification({
      type: 'error',
      title: 'Error de Validación',
      message: 'Por favor, corrige los errores antes de continuar.',
      duration: 0,
      position: 'center',
      showProgressBar: false,
      showCloseButton: true,
      autoClose: false
    });
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Ejemplos de Notificaciones</h2>
      <button
        onClick={handleExamples}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Mostrar Ejemplos
      </button>
    </div>
  );
};

export default NotificationExamples;
