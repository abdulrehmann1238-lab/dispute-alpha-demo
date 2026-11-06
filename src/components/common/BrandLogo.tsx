import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 'md', 
  showTagline = false,
  light = false 
}) => {
  const iconSizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }[size];

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Brand Icon: Architectural Shield with Alpha Precision Mark */}
      <div className={`${iconSizeClasses} rounded-lg flex items-center justify-center relative shadow-sm transition-transform duration-200 group-hover:scale-105 ${
        light 
          ? 'bg-surface text-navy border border-white/20' 
          : 'bg-navy text-surface border border-navy-light/40 shadow-navy/10'
      }`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5/6 h-5/6 text-sage"
        >
          <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" fill="currentColor" fillOpacity="0.12" />
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M8 14.5l4-8 4 8" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="9.5" y1="12" x2="14.5" y2="12" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-semibold tracking-tight ${textSizeClasses} ${light ? 'text-white' : 'text-navy'}`}>
            DISPUTE
          </span>
          <span className={`font-light tracking-widest text-xs uppercase px-1.5 py-0.5 rounded ${
            light ? 'bg-white/10 text-sage-soft' : 'bg-sage-light text-navy-light font-medium'
          }`}>
            ALPHA
          </span>
        </div>
        {showTagline && (
          <span className={`text-[11px] font-normal tracking-wide mt-0.5 ${light ? 'text-white/60' : 'text-secondaryText'}`}>
            Clarity in every dispute
          </span>
        )}
      </div>
    </div>
  );
};

