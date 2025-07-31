// Components/Card.js
export const Card = ({ children, className = "", onClick, ...props }) => {
  return (
    <div
      className={`rounded-lg border shadow-sm ${className}`} // Eliminamos bg-white de aquí
      onClick={onClick}
      {...props}
      style={{
        ...(onClick ? { cursor: "pointer" } : {}),
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
    <div className={`p-6 ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
};
