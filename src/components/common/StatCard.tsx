import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  trendLabel?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  isPositive,
  trendLabel,
  icon,
  subtitle,
  onClick,
  className = '',
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-surface rounded-xl border border-borderLine p-5 shadow-card transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-sage/60 hover:shadow-subtle' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-secondaryText">{label}</p>
        {icon && (
          <div className="p-2 rounded-lg bg-warm/70 text-navy-light">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <h4 className="text-2xl lg:text-3xl font-semibold text-navy tracking-tight">{value}</h4>
        {change && (
          <span className={`inline-flex items-center text-xs font-medium ${
            isPositive ? 'text-[#2E7D5B]' : 'text-[#BD3838]'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {change}
          </span>
        )}
      </div>

      {(trendLabel || subtitle) && (
        <p className="text-xs text-secondaryText mt-1.5 flex items-center gap-1.5">
          {subtitle && <span>{subtitle}</span>}
          {trendLabel && <span className="text-[11px] text-secondaryText/80">{trendLabel}</span>}
        </p>
      )}
    </div>
  );
};

