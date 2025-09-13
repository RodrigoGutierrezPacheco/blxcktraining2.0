import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Play } from 'lucide-react'; // Logo temporal

const GlobalNotification = ({
  isVisible = false,
  type = 'success', // 'success', 'error', 'warning', 'info'
  title = '',
  message = '',
  duration = 5000, // Duración en milisegundos
  position = 'top-right', // 'top-right', 'center'
  onClose = () => {},
  showProgressBar = true,
  showCloseButton = true,
  autoClose = true
}) => {
  const [isOpen, setIsOpen] = useState(isVisible);
  const [progress, setProgress] = useState(100);
  const progressRef = useRef(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  // Configuración de tipos de notificación
  const notificationConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-900',
      iconColor: 'text-green-600',
      progressColor: 'bg-green-600'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-900',
      iconColor: 'text-red-600',
      progressColor: 'bg-red-600'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-900',
      iconColor: 'text-yellow-600',
      progressColor: 'bg-yellow-600'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-900',
      iconColor: 'text-blue-600',
      progressColor: 'bg-blue-600'
    }
  };

  const config = notificationConfig[type];
  const IconComponent = config.icon;

  // Manejar la visibilidad
  useEffect(() => {
    setIsOpen(isVisible);
    if (isVisible) {
      setProgress(100);
      startProgressTimer();
    }
  }, [isVisible]);

  // Iniciar el timer de progreso
  const startProgressTimer = () => {
    if (!autoClose || !showProgressBar) return;

    const startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const progressPercent = (remaining / duration) * 100;
      
      setProgress(progressPercent);
      
      if (remaining <= 0) {
        handleClose();
      }
    };

    intervalRef.current = setInterval(updateProgress, 50);
  };

  // Limpiar timers
  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Manejar el cierre
  const handleClose = () => {
    clearTimers();
    setIsOpen(false);
    onClose();
  };

  // Auto cerrar después de la duración
  useEffect(() => {
    if (isVisible && autoClose) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => clearTimers();
  }, [isVisible, duration, autoClose]);

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => clearTimers();
  }, []);

  if (!isOpen) return null;

  // Renderizar según la posición
  if (position === 'center') {
    return (
      <>
        {/* Backdrop con blur */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          {/* Notificación centrada */}
          <div className={`relative w-full max-w-md ${config.bgColor} ${config.borderColor} border rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95 duration-300`}>
            {/* Barra de progreso */}
            {showProgressBar && autoClose && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-lg overflow-hidden">
                <div
                  ref={progressRef}
                  className={`h-full ${config.progressColor} transition-all ease-linear`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Header con logo y botón cerrar */}
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                {/* Logo temporal */}
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className={`text-sm font-medium ${config.textColor}`}>
                    {title || (type === 'success' ? 'Éxito' : type === 'error' ? 'Error' : type === 'warning' ? 'Advertencia' : 'Información')}
                  </h3>
                </div>
              </div>
              
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className={`p-1 rounded-full hover:bg-black/10 transition-colors ${config.textColor}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mensaje */}
            {message && (
              <div className="px-4 pb-4">
                <div className="flex items-start gap-3">
                  <IconComponent className={`w-5 h-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />
                  <p className={`text-sm ${config.textColor}`}>{message}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Renderizar en esquina superior derecha
  return (
    <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-right-full duration-300">
      <div className={`relative w-full max-w-sm ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg`}>
        {/* Barra de progreso */}
        {showProgressBar && autoClose && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-lg overflow-hidden">
            <div
              ref={progressRef}
              className={`h-full ${config.progressColor} transition-all ease-linear`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Contenido */}
        <div className="p-4">
          {/* Header con logo y botón cerrar */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              {/* Logo temporal */}
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <Play className="w-3 h-3 text-white" />
              </div>
              <h3 className={`text-sm font-medium ${config.textColor}`}>
                {title || (type === 'success' ? 'Éxito' : type === 'error' ? 'Error' : type === 'warning' ? 'Advertencia' : 'Información')}
              </h3>
            </div>
            
            {showCloseButton && (
              <button
                onClick={handleClose}
                className={`p-1 rounded-full hover:bg-black/10 transition-colors ${config.textColor}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mensaje */}
          {message && (
            <div className="flex items-start gap-2">
              <IconComponent className={`w-4 h-4 ${config.iconColor} mt-0.5 flex-shrink-0`} />
              <p className={`text-xs ${config.textColor}`}>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalNotification;
