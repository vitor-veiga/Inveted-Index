import type React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`bg-linear-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg ${className}`}
    >
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          <h3 className="text-2xl font-bold text-black">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
