import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Clock, 
  Scale, 
  FileSearch,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onSeeHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSeeHowItWorks }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F7F8F6]">
      {/* Subtle Atmospheric Animated CSS/SVG Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Subtle geometric financial grid lines */}
        <svg className="absolute w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#172D3D" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Slowly floating paper-like soft silhouettes with delicate rotation */}
        <div 
          className="absolute -top-24 -left-24 w-96 h-96 bg-sage-light/40 rounded-[40px] transform rotate-12 blur-3xl animate-pulse" 
          style={{ animationDuration: '12s' }}
        />
        <div 
          className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-[#EAEFEA]/60 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '15s' }}
        />
        <div 
          className="absolute -bottom-20 left-1/3 w-80 h-80 bg-warm/70 rounded-[60px] transform -rotate-6 blur-2xl opacity-60" 
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-borderLine shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-sage" />
              <span className="text-xs font-medium text-navy tracking-tight">
                Built for organized, transparent credit repair operations
              </span>
            </div>

            {/* Headline with DM Serif Display */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif text-navy font-normal tracking-tight leading-[1.08]">
              Every dispute. <br />
              <span className="italic text-navy-soft">One intelligent workspace.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-secondaryText leading-relaxed max-w-xl">
              Manage clients, review credit reports, organize disputes, and track every bureau response through one secure, streamlined platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => navigate('/app/dashboard')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-navy hover:bg-navy-light rounded-xl shadow-card hover:shadow-floating transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4 text-sage group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onSeeHowItWorks}
                className="px-6 py-3.5 text-sm font-semibold text-navy bg-surface hover:bg-warm border border-borderLine rounded-xl shadow-subtle transition-all text-center"
              >
                See How It Works
              </button>
            </div>

            {/* Operational Value Indicators */}
            <div className="pt-6 border-t border-borderLine/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl font-semibold text-navy">100%</p>
                <p className="text-xs text-secondaryText mt-0.5">Human Approval</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-navy">3 Bureaus</p>
                <p className="text-xs text-secondaryText mt-0.5">Unified Discrepancies</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-navy">30-Day</p>
                <p className="text-xs text-secondaryText mt-0.5">Statutory Tracking</p>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Application Preview Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Preview Board Window */}
              <div className="bg-surface rounded-2xl border border-borderLine shadow-floating p-5 sm:p-6 transition-all">
                
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 border-b border-borderLine">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-borderLine" />
                    <span className="w-3 h-3 rounded-full bg-borderLine" />
                    <span className="w-3 h-3 rounded-full bg-borderLine" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-secondaryText ml-2">
                      DISPUTE ALPHA • CASE DSP-1042
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sage-light text-navy">
                    Active Round 1
                  </span>
                </div>

                {/* Simulated Dispute Content */}
                <div className="pt-4 space-y-4">
                  {/* Account overview mini card */}
                  <div className="p-3.5 rounded-xl bg-warm/50 border border-borderLine flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-navy">Metro Collection Group</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-secondaryText font-mono">
                          •••• 9921
                        </span>
                      </div>
                      <p className="text-[11px] text-secondaryText mt-0.5">
                        Client: Jordan Hayes • Reported Balance: $840
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-[#C45738] bg-[#FDF2EE] px-2 py-0.5 rounded border border-[#F9D7CB]">
                      Settled In 2024
                    </span>
                  </div>

                  {/* Tri-bureau status bar */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-lg border border-borderLine bg-[#FCFCFB] text-center">
                      <p className="text-[10px] font-bold text-secondaryText">EQUIFAX</p>
                      <p className="text-xs font-semibold text-navy mt-0.5">Flagged</p>
                    </div>
                    <div className="p-2.5 rounded-lg border border-borderLine bg-[#FCFCFB] text-center">
                      <p className="text-[10px] font-bold text-secondaryText">EXPERIAN</p>
                      <p className="text-xs font-semibold text-navy mt-0.5">Under Review</p>
                    </div>
                    <div className="p-2.5 rounded-lg border border-borderLine bg-[#FCFCFB] text-center">
                      <p className="text-[10px] font-bold text-secondaryText">TRANSUNION</p>
                      <p className="text-xs font-semibold text-[#2E7D5B] mt-0.5">Not Reported</p>
                    </div>
                  </div>

                  {/* Letter approval notice banner */}
                  <div className="p-3 rounded-lg bg-sage-light/60 border border-sage/30 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sage-dark flex-shrink-0" />
                    <div className="text-[11px] text-navy">
                      <span className="font-semibold">Compliance Approval Record:</span> Signed by Alex Vance (Admin) on Oct 18, 2026.
                    </div>
                  </div>

                  {/* Activity Mini Timeline */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs font-medium text-navy">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-secondaryText" />
                        Dispute Timeline
                      </span>
                      <span className="text-[11px] text-secondaryText">30-Day Window Active</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-secondaryText">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Certified postal dispatch recorded</span>
                      <span className="ml-auto text-[10px] font-mono">14:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element 1: Mini Score Card */}
              <div className="hidden sm:block absolute -top-5 -right-5 bg-surface rounded-xl p-3.5 border border-borderLine shadow-card animate-in fade-in duration-700">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Resolved Accounts</p>
                    <p className="text-sm font-bold text-navy">+4 Tradelines Corrected</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2: Human Sign-off Seal */}
              <div className="hidden sm:block absolute -bottom-5 -left-5 bg-surface rounded-xl p-3 border border-borderLine shadow-card animate-in fade-in duration-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sage-dark" />
                  <span className="text-[11px] font-semibold text-navy">Human Approval Required</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

