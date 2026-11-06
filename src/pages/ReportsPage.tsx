import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { ImportReportModal } from '../components/modals/ImportReportModal';
import { 
  FileSearch, 
  Upload, 
  Building, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Bureau } from '../types';

export const ReportsPage: React.FC = () => {
  const { reports, clients } = useApp();
  const navigate = useNavigate();

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [bureauFilter, setBureauFilter] = useState<'all' | Bureau>('all');

  const totalReportsCount = reports.length;
  const equifaxCount = reports.filter(r => r.bureau === 'Equifax').length;
  const experianCount = reports.filter(r => r.bureau === 'Experian').length;
  const transunionCount = reports.filter(r => r.bureau === 'TransUnion').length;

  const filteredReports = bureauFilter === 'all' 
    ? reports 
    : reports.filter(r => r.bureau === bureauFilter);

  return (
    <div className="space-y-6">
      <ImportReportModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Credit Reports</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Tri-bureau disclosure analysis, tradeline parsing, and potential discrepancy investigation.
          </p>
        </div>

        <button
          onClick={() => setIsImportOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Upload className="w-3.5 h-3.5 text-sage" />
          <span>Import Report</span>
        </button>
      </div>

      {/* Three Bureau Source Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Equifax Panel */}
        <div 
          onClick={() => setBureauFilter('Equifax')}
          className={`p-5 rounded-xl border cursor-pointer transition-all ${
            bureauFilter === 'Equifax' 
              ? 'bg-surface border-navy ring-1 ring-navy shadow-card' 
              : 'bg-surface border-borderLine hover:border-sage/60 shadow-subtle'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-navy">Equifax Disclosure</span>
            <span className="w-2 h-2 rounded-full bg-sage" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-navy">{equifaxCount}</span>
            <span className="text-xs text-secondaryText">Reports Processed</span>
          </div>
          <p className="text-[11px] text-secondaryText mt-2">
            Automated dispute parsing for medical collections & revolving inquiries.
          </p>
        </div>

        {/* Experian Panel */}
        <div 
          onClick={() => setBureauFilter('Experian')}
          className={`p-5 rounded-xl border cursor-pointer transition-all ${
            bureauFilter === 'Experian' 
              ? 'bg-surface border-navy ring-1 ring-navy shadow-card' 
              : 'bg-surface border-borderLine hover:border-sage/60 shadow-subtle'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-navy">Experian Disclosure</span>
            <span className="w-2 h-2 rounded-full bg-sage" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-navy">{experianCount}</span>
            <span className="text-xs text-secondaryText">Reports Processed</span>
          </div>
          <p className="text-[11px] text-secondaryText mt-2">
            Late payment verification audit against direct banking payment records.
          </p>
        </div>

        {/* TransUnion Panel */}
        <div 
          onClick={() => setBureauFilter('TransUnion')}
          className={`p-5 rounded-xl border cursor-pointer transition-all ${
            bureauFilter === 'TransUnion' 
              ? 'bg-surface border-navy ring-1 ring-navy shadow-card' 
              : 'bg-surface border-borderLine hover:border-sage/60 shadow-subtle'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-navy">TransUnion Disclosure</span>
            <span className="w-2 h-2 rounded-full bg-sage" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-navy">{transunionCount}</span>
            <span className="text-xs text-secondaryText">Reports Processed</span>
          </div>
          <p className="text-[11px] text-secondaryText mt-2">
            Duplicate student loan servicing & unverified debt assignment tracking.
          </p>
        </div>

      </div>

      {/* Reports Listing Table */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
        <div className="p-4 border-b border-borderLine flex items-center justify-between bg-[#FCFCFB]">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-navy">Imported Credit Reports</h3>
            {bureauFilter !== 'all' && (
              <span className="text-[11px] font-semibold text-sage-dark bg-sage-light px-2 py-0.5 rounded">
                Filtered: {bureauFilter}
              </span>
            )}
          </div>

          {bureauFilter !== 'all' && (
            <button
              onClick={() => setBureauFilter('all')}
              className="text-xs text-secondaryText hover:text-navy underline"
            >
              Clear Bureau Filter
            </button>
          )}
        </div>

        <div className="divide-y divide-borderLine">
          {filteredReports.map((report) => {
            const flaggedCount = report.accounts.filter(a => a.reviewStatus === 'flagged').length;
            return (
              <div
                key={report.id}
                onClick={() => navigate(`/app/reports/${report.id}`)}
                className="p-4 sm:p-5 hover:bg-warm/40 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-warm border border-borderLine text-navy flex-shrink-0">
                    <Building className="w-5 h-5 text-navy-light" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-navy">{report.clientName}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-navy text-white">
                        {report.bureau}
                      </span>
                    </div>
                    <div className="text-xs text-secondaryText mt-1 flex flex-wrap items-center gap-3">
                      <span>Imported {report.importDate}</span>
                      <span>•</span>
                      <span>Source: {report.importSource}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="text-xs font-semibold text-navy">
                      {report.summary.totalAccounts} Tradelines
                    </div>
                    <div className="text-[11px] text-secondaryText mt-0.5">
                      {report.summary.negativeAccounts} negative • {flaggedCount} flagged
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/app/reports/${report.id}`);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-navy hover:bg-warm rounded-lg border border-borderLine flex items-center gap-1"
                  >
                    <span>Audit Accounts</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

