import React from 'react';
import { 
  Users, 
  FileSearch, 
  Scale, 
  Mail, 
  Calendar, 
  UserCheck 
} from 'lucide-react';

export const ProductOverview: React.FC = () => {
  const features = [
    {
      title: 'Client Management',
      description: 'Centralize client profiles, onboarding checklists, digital fee agreements, and identity documents in one structured hub.',
      icon: Users,
    },
    {
      title: 'Credit Report Review',
      description: 'Review tri-bureau disclosures side-by-side and systematically identify potential balance, payment, and status discrepancies.',
      icon: FileSearch,
    },
    {
      title: 'Dispute Management',
      description: 'Organize tradelines across multi-round escalation workflows with Kanban boards, statutory countdowns, and response tracking.',
      icon: Scale,
    },
    {
      title: 'Letter Automation',
      description: 'Generate dynamic dispute letters utilizing structured bureau directory data with mandatory human review before dispatch.',
      icon: Mail,
    },
    {
      title: 'Deadline Tracking',
      description: 'Stay ahead of 30-day FCRA statutory reinvestigation deadlines, scheduled follow-ups, and client milestone updates.',
      icon: Calendar,
    },
    {
      title: 'Team Collaboration',
      description: 'Assign tasks, partition client workloads, audit activity history, and maintain private internal staff operational notes.',
      icon: UserCheck,
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface border-y border-borderLine">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-sage-dark mb-2">
            Engineered For Excellence
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-navy font-normal tracking-tight">
            Everything your dispute operation needs.
          </h2>
          <p className="text-sm sm:text-base text-secondaryText mt-3">
            Designed specifically for credit repair firms and compliance-conscious specialists seeking structure, speed, and accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-background border border-borderLine hover:border-sage/50 hover:bg-surface shadow-subtle hover:shadow-card transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-surface group-hover:bg-sage-light border border-borderLine flex items-center justify-center text-navy group-hover:text-navy-light transition-all mb-4">
                  <Icon className="w-5 h-5 text-navy-light group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-base font-semibold text-navy group-hover:text-navy transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-secondaryText leading-relaxed mt-2">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

