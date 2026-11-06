import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  X, 
  Users, 
  FileSearch, 
  Scale, 
  FileText, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('dispute_alpha_banner_dismissed') === 'true';
  });
  const navigate = useNavigate();
  const { switchRole } = useApp();

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('dispute_alpha_banner_dismissed', 'true');
  };

  const shortcuts = [
    {
      title: 'Explore Client Management',
      icon: Users,
      onClick: () => navigate('/app/clients'),
    },
    {
      title: 'Review a Credit Report',
      icon: FileSearch,
      onClick: () => navigate('/app/reports/REP-EQ-8492'),
    },
    {
      title: 'Open Dispute Center',
      icon: Scale,
      onClick: () => navigate('/app/disputes'),
    },
    {
      title: 'Create a Dispute Letter',
      icon: FileText,
      onClick: () => navigate('/app/letters/editor'),
    },
    {
      title: 'Explore the Client Portal',
      icon: ExternalLink,
      onClick: () => {
        switchRole('client');
        navigate('/client');
      },
    },
  ];

  return (
    <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-white rounded-xl p-5 mb-6 shadow-floating border border-navy-soft relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex items-start justify-between relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sage/30 text-sage-soft text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-sage" />
            <span>Interactive Demo Tour</span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Welcome to Dispute Alpha
          </h2>
          <p className="text-sm text-white/80 mt-1 leading-relaxed">
            Explore a complete credit dispute management workspace, from client onboarding and automated credit report discrepancy flagging to strict human-approved dispute letters and bureau response tracking.
          </p>
        </div>

        <button
          onClick={handleDismiss}
          className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          title="Dismiss welcome guide"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Guided Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-4 relative z-10">
        {shortcuts.map((sc, idx) => {
          const Icon = sc.icon;
          return (
            <button
              key={idx}
              onClick={sc.onClick}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all duration-150 group"
            >
              <div className="p-1.5 rounded-md bg-white/10 text-sage-soft group-hover:text-white flex-shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-white/90 group-hover:text-white line-clamp-1">
                {sc.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

