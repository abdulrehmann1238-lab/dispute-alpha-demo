import React from 'react';
import { ShieldCheck, Lock, UserCheck, History, EyeOff, FileCheck } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPoints = [
    {
      title: 'Role-Based Access Control',
      description: 'Isolate sensitive executive controls and financial configurations from standard dispute drafting personnel.',
      icon: Lock,
    },
    {
      title: 'Human Approval Enforcement',
      description: 'Zero automated dispatch. Every letter must be individually audited and signed off by authorized supervisors.',
      icon: UserCheck,
    },
    {
      title: 'Immutable Activity Logging',
      description: 'Chronological timeline of every action taken across reports, disputes, notes, and document uploads.',
      icon: History,
    },
    {
      title: 'Confidential Client Segregation',
      description: 'Clients access only their progress milestones and public correspondence without exposure to internal staff notes.',
      icon: EyeOff,
    },
    {
      title: 'Structured Document Handling',
      description: 'Categorized document repository ensuring government IDs, bank records, and dispute letters remain organized.',
      icon: FileCheck,
    },
    {
      title: 'Controlled Team Workloads',
      description: 'Transparent client assignments and task delegation to prevent operational oversights and missed deadlines.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface border-t border-borderLine">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Illustration of Protected Workspace */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-[#FAFBF9] rounded-2xl p-6 sm:p-8 border border-borderLine shadow-subtle relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-borderLine">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sage-dark" />
                  <span className="text-xs font-semibold text-navy">Protected Operational Domain</span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-sage-light text-navy px-2 py-0.5 rounded">
                  Active Controls
                </span>
              </div>

              <div className="mt-5 space-y-3 font-mono text-[11px] text-secondaryText">
                <div className="p-3 bg-surface rounded-lg border border-borderLine flex items-center justify-between">
                  <span>DISPUTE_DISPATCH_POLICY</span>
                  <span className="text-[#2E7D5B] font-semibold">ADMIN_SIGN_REQUIRED</span>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-borderLine flex items-center justify-between">
                  <span>CLIENT_NOTE_VISIBILITY</span>
                  <span className="text-[#2B6E96] font-semibold">INTERNAL_RESTRICTED</span>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-borderLine flex items-center justify-between">
                  <span>AUDIT_LOGGING_MODE</span>
                  <span className="text-navy font-semibold">CHRONOLOGICAL_RECORD</span>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-borderLine flex items-center justify-between">
                  <span>STAFF_PERMISSION_SCOPE</span>
                  <span className="text-[#B87A28] font-semibold">ROLE_ISOLATED</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-borderLine text-center">
                <p className="text-[11px] text-secondaryText/80">
                  Engineered with strict separation between client, staff, and administrative operations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Feature Grid */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-sage-dark mb-2">
                Operational Integrity
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif text-navy font-normal tracking-tight">
                Sensitive information deserves serious protection.
              </h2>
              <p className="text-sm text-secondaryText mt-3 max-w-xl leading-relaxed">
                Credit repair operations handle personal identifiers, financial statements, and bureau correspondence. Dispute Alpha establishes rigorous operational guardrails to maintain client privacy and audit readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {securityPoints.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-background border border-borderLine">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Icon className="w-4 h-4 text-sage-dark" />
                      <h4 className="text-xs font-semibold text-navy">{pt.title}</h4>
                    </div>
                    <p className="text-[11px] text-secondaryText leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

