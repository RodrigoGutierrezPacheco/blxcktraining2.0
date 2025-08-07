export const Button = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  hidden = false,
  disabled = false,
  children, 
  ...props 
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantClasses = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
  }

  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    default: "h-10 py-2 px-4",
    lg: "h-11 px-8",
  }

  const cursorClass = disabled ? "cursor-not-allowed" : "cursor-pointer"

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${cursorClass} ${className} ${
    hidden ? "invisible" : ""
  }`

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}