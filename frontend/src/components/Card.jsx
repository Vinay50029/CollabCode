import * as React from 'react';

export function Card({ children, className = '', hover = false, glass = false }) {
  const baseStyles = 'rounded-2xl border border-gray-800 p-6';
  const glassStyles = glass ? 'bg-white/5 backdrop-blur-xl' : 'bg-gray-900/50';
  const hoverStyles = hover ? 'hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer' : '';

  return (
    <div className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
