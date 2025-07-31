export const Badge = ({ children, variant = "default", className = "" }) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variantClasses = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return <div className={classes}>{children}</div>
}
