import React from "react";

const Spinner = ({
  containerClassName = "",
  spinnerClassName = "",
  size = "md",
  color = "gray",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 border-[3px]",
    md: "h-16 w-16 border-t-2 border-b-2",
    lg: "h-24 w-24 border-t-4 border-b-4",
    xl: "h-32 w-32 border-t-4 border-b-4",
  };

  const colorClasses = {
    gray: "border-gray-200 border-t-gray-900",
    blue: "border-blue-200 border-t-blue-600",
    red: "border-red-200 border-t-red-600",
    green: "border-green-200 border-t-green-600",
    purple: "border-purple-200 border-t-purple-600",
    indigo: "border-indigo-200 border-t-indigo-600",
    pink: "border-pink-200 border-t-pink-600",
    white: "border-gray-200 border-t-white",
  };

  return (
    <div className={`flex justify-center items-center ${containerClassName}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${spinnerClassName}`}
      ></div>
    </div>
  );
};

export default Spinner;