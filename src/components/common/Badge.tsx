import React from 'react';

export type BadgeVariant = 
  | 'default'
  | 'success'
  | 'pending'
  | 'attention'
  | 'error'
  | 'info'
  | 'navy'
  | 'sage';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-warm text-navy-light border-borderLine',
    success: 'bg-[#EEF7F2] text-[#2E7D5B] border-[#D1EBDD]',
    pending: 'bg-[#FEF7EC] text-[#B87A28] border-[#FBE3C5]',
    attention: 'bg-[#FDF2EE] text-[#C45738] border-[#F9D7CB]',
    error: 'bg-[#FDECEC] text-[#BD3838] border-[#F7CDCD]',
    info: 'bg-[#EDF5FA] text-[#2B6E96] border-[#CFE5F2]',
    navy: 'bg-navy-light/10 text-navy border-navy-light/20',
    sage: 'bg-sage-light text-navy border-sage/30',
  };

  const dotColors: Record<BadgeVariant, string> = {
    default: 'bg-secondaryText',
    success: 'bg-[#2E7D5B]',
    pending: 'bg-[#B87A28]',
    attention: 'bg-[#C45738]',
    error: 'bg-[#BD3838]',
    info: 'bg-[#2B6E96]',
    navy: 'bg-navy',
    sage: 'bg-sage',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 leading-tight',
    md: 'text-xs px-2.5 py-1 leading-normal',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};

