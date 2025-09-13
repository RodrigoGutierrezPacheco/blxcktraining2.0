# Sistema Global de Notificaciones

## Descripción
Sistema completo de notificaciones globales para mostrar mensajes de éxito, error, advertencia e información en toda la aplicación.

## Características
- ✅ Logo temporal (Play icon) - fácil de reemplazar
- ⏱️ Barra de progreso visual para mostrar tiempo restante
- ❌ Botón X para cerrar manualmente
- 📍 Posicionamiento: esquina superior derecha o centro de pantalla
- 🌫️ Blur de fondo cuando se muestra en centro
- 🎨 4 tipos de notificación con colores distintivos
- ⚙️ Configuración flexible de duración y comportamiento

## Tipos de Notificación

### 1. Success (Éxito)
- Color: Verde
- Icono: CheckCircle
- Uso: Operaciones exitosas

### 2. Error (Error)
- Color: Rojo
- Icono: AlertCircle
- Uso: Errores y fallos

### 3. Warning (Advertencia)
- Color: Amarillo
- Icono: AlertTriangle
- Uso: Advertencias y precauciones

### 4. Info (Información)
- Color: Azul
- Icono: Info
- Uso: Información general

## Posicionamiento

### Top-Right (Esquina Superior Derecha)
- Posición por defecto
- Ideal para notificaciones no críticas
- No bloquea el contenido principal

### Center (Centro de Pantalla)
- Con blur de fondo
- Ideal para notificaciones importantes
- Requiere interacción del usuario

## Uso Básico

```jsx
import { useNotification } from '../context/NotificationContext';

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  const handleSuccess = () => {
    showSuccess('Operación completada exitosamente');
  };

  const handleError = () => {
    showError('Error al guardar los datos');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Mostrar Éxito</button>
      <button onClick={handleError}>Mostrar Error</button>
    </div>
  );
};
```

## Uso Avanzado

```jsx
const { showNotification } = useNotification();

// Notificación personalizada
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

// Notificación centrada sin auto-cerrar
showNotification({
  type: 'error',
  title: 'Error Crítico',
  message: 'No se pudo conectar al servidor.',
  duration: 0,
  position: 'center',
  showProgressBar: false,
  showCloseButton: true,
  autoClose: false
});
```

## Métodos Disponibles

### Métodos Básicos
- `showSuccess(message, title, options)`
- `showError(message, title, options)`
- `showWarning(message, title, options)`
- `showInfo(message, title, options)`

### Métodos Centrados
- `showCenteredSuccess(message, title, options)`
- `showCenteredError(message, title, options)`
- `showCenteredWarning(message, title, options)`
- `showCenteredInfo(message, title, options)`

### Método Personalizado
- `showNotification(config)`

## Opciones de Configuración

```jsx
{
  type: 'success' | 'error' | 'warning' | 'info',
  title: 'string',
  message: 'string',
  duration: number, // milisegundos (0 = no auto-cerrar)
  position: 'top-right' | 'center',
  showProgressBar: boolean,
  showCloseButton: boolean,
  autoClose: boolean
}
```

## Personalización del Logo

Para cambiar el logo, edita el componente `GlobalNotification.jsx`:

```jsx
// Reemplaza esta línea:
import { Play } from 'lucide-react'; // Logo temporal

// Por tu logo personalizado:
import { TuLogoComponent } from './path/to/your/logo';

// Y actualiza el JSX:
<div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
  <TuLogoComponent className="w-4 h-4 text-white" />
</div>
```

## Ejemplos de Uso Común

### Formularios
```jsx
// Éxito al guardar
showSuccess('Formulario guardado exitosamente');

// Error de validación
showError('Por favor, completa todos los campos requeridos');

// Advertencia
showWarning('Los cambios no guardados se perderán');
```

### Operaciones CRUD
```jsx
// Crear
showCenteredSuccess('Registro creado exitosamente');

// Actualizar
showSuccess('Cambios guardados');

// Eliminar
showCenteredWarning('¿Estás seguro de que quieres eliminar este elemento?');

// Error
showCenteredError('No se pudo completar la operación');
```

### Autenticación
```jsx
// Login exitoso
showSuccess('Bienvenido de vuelta');

// Error de login
showError('Credenciales incorrectas');

// Sesión expirada
showCenteredWarning('Tu sesión ha expirado');
```

## Notas Técnicas

- El sistema usa `z-index: 100` para aparecer sobre otros elementos
- Las animaciones usan Tailwind CSS (`animate-in`, `fade-in-0`, etc.)
- El blur de fondo se aplica solo en posición `center`
- Las notificaciones se limpian automáticamente al desmontar el componente
- El progreso se actualiza cada 50ms para suavidad visual
