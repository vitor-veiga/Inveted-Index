import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const variantClasses = {
    primary:
      "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
    danger:
      "bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 flex justify-center items-center rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
        variantClasses[variant]
      } ${
        disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
