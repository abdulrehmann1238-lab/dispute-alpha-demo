import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutDashboard, Users, Scale, FileText, CheckCircle2 } from 'lucide-react';

export const PreviewSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="preview" className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-borderLine">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-sage-dark mb-2">
            Interactive Product Tour
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-navy font-normal tracking-tight">
            See the workspace in action.
          </h2>
          <p className="text-sm text-secondaryText mt-3">
            An ultra-responsive interface configured to give operators immediate oversight and control.
          </p>
          
          <div className="mt-6">
            <button
              onClick={() => navigate('/app/dashboard')}
              className="px-6 py-3 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-xl shadow-card transition-all inline-flex items-center gap-2 group"
            >
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-4 h-4 text-sage group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Realistic Dashboard Preview Frame */}
        <div 
          onClick={() => navigate('/app/dashboard')}
          className="cursor-pointer group relative bg-surface rounded-2xl border border-borderLine shadow-floating overflow-hidden transition-all duration-300 hover:border-sage/60"
        >
          {/* Mock Window Header */}
          <div className="bg-[#FCFCFB] border-b border-borderLine px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-borderLine group-hover:bg-red-400/80 transition-colors" />
              <span className="w-3 h-3 rounded-full bg-borderLine group-hover:bg-amber-400/80 transition-colors" />
              <span className="w-3 h-3 rounded-full bg-borderLine group-hover:bg-emerald-400/80 transition-colors" />
              <span className="text-[11px] font-mono text-secondaryText ml-2">
                dispute-alpha.demo/app/dashboard
              </span>
            </div>
            <span className="text-xs font-semibold text-sage-dark flex items-center gap-1 group-hover:underline">
              <span>Click anywhere to launch live app</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Internal Dashboard Mock UI Structure */}
          <div className="grid grid-cols-12 min-h-[460px] bg-[#FAFBF9]">
            {/* Mock Mini Sidebar */}
            <div className="hidden md:block col-span-3 bg-surface border-r border-borderLine p-4 space-y-4">
              <div className="h-6 w-24 bg-navy/10 rounded mb-6" />
              <div className="space-y-2">
                <div className="h-7 rounded bg-sage-light flex items-center px-2 gap-2 text-xs font-semibold text-navy">
                  <LayoutDashboard className="w-3.5 h-3.5 text-sage-dark" />
                  <span>Dashboard</span>
                </div>
                <div className="h-7 rounded hover:bg-warm flex items-center px-2 gap-2 text-xs text-secondaryText">
                  <Users className="w-3.5 h-3.5" />
                  <span>Clients</span>
                </div>
                <div className="h-7 rounded hover:bg-warm flex items-center px-2 gap-2 text-xs text-secondaryText">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Disputes</span>
                </div>
                <div className="h-7 rounded hover:bg-warm flex items-center px-2 gap-2 text-xs text-secondaryText">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Letter Studio</span>
                </div>
              </div>
            </div>

            {/* Mock Dashboard Body */}
            <div className="col-span-12 md:col-span-9 p-6 space-y-6">
              {/* Header metrics row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 bg-surface rounded-xl border border-borderLine shadow-subtle">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Active Clients</p>
                  <p className="text-xl font-bold text-navy mt-1">186</p>
                </div>
                <div className="p-3.5 bg-surface rounded-xl border border-borderLine shadow-subtle">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Active Disputes</p>
                  <p className="text-xl font-bold text-navy mt-1">432</p>
                </div>
                <div className="p-3.5 bg-surface rounded-xl border border-borderLine shadow-subtle">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Pending Review</p>
                  <p className="text-xl font-bold text-[#C45738] mt-1">18</p>
                </div>
                <div className="p-3.5 bg-surface rounded-xl border border-borderLine shadow-subtle">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Bureau Deadlines</p>
                  <p className="text-xl font-bold text-[#B87A28] mt-1">12</p>
                </div>
              </div>

              {/* Mock Content Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface rounded-xl p-4 border border-borderLine space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-borderLine">
                    <span className="text-xs font-semibold text-navy">Pending Letter Approvals</span>
                    <span className="text-[10px] text-sage-dark font-medium">3 waiting</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-warm/50 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-navy">Jordan Hayes (Experian)</div>
                        <div className="text-[11px] text-secondaryText">Summit Auto Finance • Late Verification</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#FEF7EC] text-[#B87A28]">
                        Needs Sign-off
                      </span>
                    </div>
                    <div className="p-2 rounded bg-warm/50 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-navy">Lucas Bennett (Experian)</div>
                        <div className="text-[11px] text-secondaryText">Pinnacle Servicing • Duplicate</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#FEF7EC] text-[#B87A28]">
                        Needs Sign-off
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-xl p-4 border border-borderLine space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-borderLine">
                    <span className="text-xs font-semibold text-navy">Recent Bureau Responses</span>
                    <span className="text-[10px] text-secondaryText">Last 24h</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-warm/50 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-navy">Marcus Vance (Experian)</div>
                        <div className="text-[11px] text-[#2E7D5B]">Late payment notation corrected</div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                    </div>
                    <div className="p-2 rounded bg-warm/50 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-navy">Julian Castillo (TransUnion)</div>
                        <div className="text-[11px] text-[#2E7D5B]">Collection tradeline deleted</div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-navy/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-semibold shadow-floating flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <span>Launch Live Interactive Application</span>
              <ArrowRight className="w-4 h-4 text-sage" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

