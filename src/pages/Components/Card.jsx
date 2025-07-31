export const Card = ({ 
  children, 
  className = "", 
  onClick, // Añadimos la prop onClick
  ...props // Capturamos cualquier otra prop adicional
}) => {
  return (
    <div 
      className={`rounded-lg border bg-white shadow-sm ${className}`}
      onClick={onClick} // Pasamos el evento
      {...props} // Pasamos cualquier otra prop al div
      style={{ 
        ...(onClick ? { cursor: "pointer" } : {}), // Cambiamos el cursor si es clickeable
      }}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ 
  children, 
  className = "", 
  onClick, 
  ...props 
}) => {
  return (
    <div 
      className={`p-6 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};