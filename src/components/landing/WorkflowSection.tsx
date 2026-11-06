import React from 'react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Client Onboarding',
      description: 'Collect intake details, digital authorizations, photo identification, and proof of address securely.',
    },
    {
      num: '02',
      title: 'Report Review',
      description: 'Ingest authorized tri-bureau report disclosures from Equifax, Experian, and TransUnion in unified format.',
    },
    {
      num: '03',
      title: 'Identify Potential Issues',
      description: 'Flag inaccurate balances, misreported late payments, and unverifiable tradelines for staff review.',
    },
    {
      num: '04',
      title: 'Prepare Disputes',
      description: 'Apply tailored letter templates with dynamic field mapping, account masking, and attached evidence files.',
    },
    {
      num: '05',
      title: 'Review & Approve',
      description: 'Strict administrative gatekeeping ensures every single letter receives authorized human sign-off before dispatch.',
    },
    {
      num: '06',
      title: 'Track Responses',
      description: 'Log bureau outcomes, statutory 30-day timeframes, Method of Verification escalations, and subsequent rounds.',
    },
  ];

  return (
    <section id="workflow" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-sage-dark mb-2">
            The Complete Operational Cycle
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-navy font-normal tracking-tight">
            From onboarding to resolution.
          </h2>
          <p className="text-sm sm:text-base text-secondaryText mt-3">
            A disciplined, transparent workflow structured to preserve accuracy, auditability, and client trust at every phase.
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-xl p-6 border border-borderLine shadow-subtle hover:border-sage/40 transition-all duration-200 relative group"
            >
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-mono text-2xl font-light text-navy/40 group-hover:text-sage-dark transition-colors">
                  {step.num}
                </span>
                <span className="w-2 h-2 rounded-full bg-borderLine group-hover:bg-sage transition-colors" />
              </div>

              <h3 className="text-base font-semibold text-navy">
                {step.title}
              </h3>
              
              <p className="text-xs text-secondaryText leading-relaxed mt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

