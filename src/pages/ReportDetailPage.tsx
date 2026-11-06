import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { FlagDiscrepancyModal } from '../components/modals/FlagDiscrepancyModal';
import { 
  ArrowLeft, 
  Download, 
  ShieldAlert, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Scale, 
  Mail,
  Building,
  Info
} from 'lucide-react';
import { CreditAccount } from '../types';

export const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports, updateAccountStatus, showToast } = useApp();

  const report = reports.find(r => r.id === id) || reports[0];
  const [selectedAccount, setSelectedAccount] = useState<CreditAccount | null>(null);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [accountToFlag, setAccountToFlag] = useState<CreditAccount | null>(null);

  if (!report) {
    return (
      <div className="p-8 text-center text-xs text-secondaryText">
        Report record not found.
      </div>
    );
  }

  const handleDownloadSample = () => {
    showToast('Simulated download: TriBureau_Disclosure_Oct2026.pdf', 'info');
  };

  const handleMarkAsReviewed = (acc: CreditAccount) => {
    updateAccountStatus(report.id, acc.id, 'clean');
    if (selectedAccount?.id === acc.id) {
      setSelectedAccount({ ...acc, reviewStatus: 'clean' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Flag Discrepancy Modal */}
      {accountToFlag && (
        <FlagDiscrepancyModal
          isOpen={isFlagModalOpen}
          onClose={() => {
            setIsFlagModalOpen(false);
            setAccountToFlag(null);
          }}
          reportId={report.id}
          accountId={accountToFlag.id}
          creditorName={accountToFlag.creditorName}
        />
      )}

      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/app/reports')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-secondaryText hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Reports Directory</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-surface rounded-xl border border-borderLine p-6 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-semibold text-navy">
                {report.bureau} Report Review
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy text-white">
                {report.bureau}
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-warm text-secondaryText">
                {report.id}
              </span>
            </div>
            <p className="text-xs text-secondaryText mt-1">
              Client: <span className="font-semibold text-navy">{report.clientName}</span> ({report.clientId}) • Report Date: {report.reportDate} • Ingested: {report.importDate}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleDownloadSample}
              className="px-3 py-1.5 text-xs font-medium text-navy bg-warm hover:bg-warm/80 rounded-lg border border-borderLine transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-secondaryText" />
              <span>Download Sample PDF</span>
            </button>
          </div>
        </div>

        {/* Profile Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-borderLine text-center">
          <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Total Accounts</span>
            <div className="text-xl font-bold text-navy mt-0.5">{report.summary.totalAccounts}</div>
          </div>
          <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Open Accounts</span>
            <div className="text-xl font-bold text-navy mt-0.5">{report.summary.openAccounts}</div>
          </div>
          <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Closed Accounts</span>
            <div className="text-xl font-bold text-navy mt-0.5">{report.summary.closedAccounts}</div>
          </div>
          <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Negative Accounts</span>
            <div className="text-xl font-bold text-[#C45738] mt-0.5">{report.summary.negativeAccounts}</div>
          </div>
          <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Collections</span>
            <div className="text-xl font-bold text-[#BD3838] mt-0.5">{report.summary.collections}</div>
          </div>
          <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Public Records</span>
            <div className="text-xl font-bold text-navy mt-0.5">{report.summary.publicRecords}</div>
          </div>
        </div>
      </div>

      {/* Account Review Table */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
        <div className="p-4 border-b border-borderLine flex items-center justify-between bg-[#FCFCFB]">
          <div>
            <h3 className="text-sm font-semibold text-navy">Tradeline Account Review</h3>
            <p className="text-xs text-secondaryText">Click any account row to open deep drawer audit & discrepancy controls</p>
          </div>
          <span className="text-xs text-secondaryText">
            {report.accounts.length} Reported Accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBF9] text-secondaryText uppercase text-[10px] tracking-wider border-b border-borderLine">
              <tr>
                <th className="py-3 px-5 font-semibold">Creditor / Furnisher</th>
                <th className="py-3 px-4 font-semibold">Account Type</th>
                <th className="py-3 px-4 font-semibold">Payment Status</th>
                <th className="py-3 px-4 font-semibold">Balance</th>
                <th className="py-3 px-4 font-semibold">Date Opened</th>
                <th className="py-3 px-4 font-semibold">Review Status</th>
                <th className="py-3 px-5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderLine">
              {report.accounts.map((acc) => (
                <tr
                  key={acc.id}
                  onClick={() => setSelectedAccount(acc)}
                  className={`hover:bg-warm/40 cursor-pointer transition-colors ${
                    selectedAccount?.id === acc.id ? 'bg-sage-light/30' : ''
                  }`}
                >
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-navy">{acc.creditorName}</div>
                    <div className="text-[11px] font-mono text-secondaryText">{acc.accountNumberMasked}</div>
                  </td>
                  <td className="py-3.5 px-4 text-navy">
                    {acc.accountType}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 ${
                      acc.paymentStatus.includes('Late') || acc.paymentStatus.includes('Collection')
                        ? 'text-[#C45738] font-semibold'
                        : 'text-[#2E7D5B]'
                    }`}>
                      {acc.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-navy">
                    ${acc.reportedBalance.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-secondaryText">
                    {acc.dateOpened}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      size="sm"
                      variant={
                        acc.reviewStatus === 'clean' 
                          ? 'success' 
                          : acc.reviewStatus === 'flagged' 
                            ? 'attention' 
                            : 'info'
                      }
                    >
                      {acc.reviewStatus.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAccount(acc);
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-navy hover:bg-warm rounded border border-borderLine"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Detail Side Drawer (Section 9 PRD) */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedAccount(null)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-surface shadow-floating border-l border-borderLine p-6 overflow-y-auto space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-borderLine">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Account Details</span>
                  <h3 className="text-lg font-semibold text-navy mt-0.5">{selectedAccount.creditorName}</h3>
                  <p className="text-xs text-secondaryText font-mono">{selectedAccount.accountNumberMasked}</p>
                </div>
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="p-1 rounded-lg text-secondaryText hover:text-navy hover:bg-warm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Account Quick Facts */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
                  <span className="text-[10px] text-secondaryText block uppercase">Reported Balance</span>
                  <span className="text-base font-semibold text-navy">${selectedAccount.reportedBalance.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
                  <span className="text-[10px] text-secondaryText block uppercase">Account Type</span>
                  <span className="text-base font-semibold text-navy">{selectedAccount.accountType}</span>
                </div>
                <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
                  <span className="text-[10px] text-secondaryText block uppercase">Date Opened</span>
                  <span className="text-xs font-semibold text-navy">{selectedAccount.dateOpened}</span>
                </div>
                <div className="p-3 bg-warm/40 rounded-lg border border-borderLine">
                  <span className="text-[10px] text-secondaryText block uppercase">Last Activity</span>
                  <span className="text-xs font-semibold text-navy">{selectedAccount.lastUpdated}</span>
                </div>
              </div>

              {/* Payment History Summary */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-navy">Payment History Summary</span>
                <p className="text-xs text-secondaryText p-3 bg-background rounded-lg border border-borderLine leading-relaxed">
                  {selectedAccount.historySummary}
                </p>
              </div>

              {/* Potential Discrepancies List on this account */}
              <div className="space-y-3 pt-2 border-t border-borderLine">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-navy">Flagged Discrepancies</span>
                  <button
                    onClick={() => {
                      setAccountToFlag(selectedAccount);
                      setIsFlagModalOpen(true);
                    }}
                    className="text-xs font-semibold text-sage-dark hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Flag Issue</span>
                  </button>
                </div>

                {selectedAccount.discrepancies.length > 0 ? (
                  <div className="space-y-2">
                    {selectedAccount.discrepancies.map(disc => (
                      <div key={disc.id} className="p-3 rounded-lg bg-[#FDF2EE] border border-[#F9D7CB] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#C45738]">{disc.category}</span>
                          <span className="text-[10px] text-secondaryText">{disc.reviewStatus}</span>
                        </div>
                        <p className="text-xs text-navy">{disc.description}</p>
                        {disc.evidenceNotes && (
                          <p className="text-[11px] text-secondaryText italic">
                            Evidence: {disc.evidenceNotes}
                          </p>
                        )}
                        <p className="text-[10px] text-secondaryText pt-1">
                          Flagged by {disc.assignedStaff} on {disc.flaggedAt}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-secondaryText py-2 italic">
                    No discrepancies currently flagged for this account.
                  </p>
                )}
              </div>

              {/* Operational Action Controls (Section 9 PRD) */}
              <div className="pt-4 border-t border-borderLine space-y-2.5">
                <h4 className="text-xs font-semibold text-navy uppercase tracking-wider">Investigative Actions</h4>
                
                <button
                  onClick={() => {
                    setAccountToFlag(selectedAccount);
                    setIsFlagModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-navy bg-warm hover:bg-warm/80 rounded-lg border border-borderLine transition-colors flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-[#C45738]" />
                  <span>Flag Potential Discrepancy</span>
                </button>

                <button
                  onClick={() => handleMarkAsReviewed(selectedAccount)}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-navy bg-surface hover:bg-warm rounded-lg border border-borderLine transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                  <span>Mark Account as Clean / Reviewed</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedAccount(null);
                    navigate('/app/letters/editor');
                  }}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-sage" />
                  <span>Create Dispute Draft in Letter Studio</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

