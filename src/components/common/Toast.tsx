import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
  };

  const borderMap = {
    success: 'border-emerald-200 bg-[#F4FAF6]',
    error: 'border-red-200 bg-[#FCF3F2]',
    warning: 'border-amber-200 bg-[#FEFAF2]',
    info: 'border-sky-200 bg-[#F2F8FC]',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-floating ${borderMap[toast.type]}`}>
        {iconMap[toast.type]}
        <div className="text-sm font-medium text-navy">
          {toast.message}
        </div>
      </div>
    </div>
  );
};

