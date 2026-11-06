import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { 
  Mail, 
  Plus, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Edit3, 
  Printer, 
  Send,
  AlertCircle
} from 'lucide-react';
import { LetterApprovalStatus } from '../types';

export const LettersPage: React.FC = () => {
  const { letters, currentUser, approveLetter, recordLetterSubmission } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | LetterApprovalStatus>('all');

  const totalCount = letters.length;
  const draftCount = letters.filter(l => l.approvalStatus === 'draft').length;
  const pendingCount = letters.filter(l => l.approvalStatus === 'pending_approval').length;
  const approvedCount = letters.filter(l => l.approvalStatus === 'approved').length;
  const submittedCount = letters.filter(l => l.approvalStatus === 'submission_recorded').length;

  const filteredLetters = letters.filter(l => {
    const matchesSearch = 
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.clientName.toLowerCase().includes(search.toLowerCase()) ||
      l.creditorName.toLowerCase().includes(search.toLowerCase()) ||
      l.bureau.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && l.approvalStatus === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Letter Studio</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Prepare, personalize, review, and manage dispute correspondence with required human approval.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/letters/editor')}
          className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-sage" />
          <span>+ New Dispute Letter</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <StatCard
          label="Total Letters"
          value={totalCount}
          subtitle="In document registry"
          icon={<Mail className="w-4 h-4" />}
        />
        <StatCard
          label="Drafts"
          value={draftCount}
          subtitle="Work in progress"
          icon={<Edit3 className="w-4 h-4 text-secondaryText" />}
        />
        <StatCard
          label="Pending Approval"
          value={pendingCount}
          subtitle="Requires compliance sign-off"
          icon={<AlertCircle className="w-4 h-4 text-[#C45738]" />}
        />
        <StatCard
          label="Approved"
          value={approvedCount}
          subtitle="Ready for postal dispatch"
          icon={<CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />}
        />
        <StatCard
          label="Dispatched"
          value={submittedCount}
          subtitle="Submission recorded"
          icon={<Send className="w-4 h-4 text-[#2B6E96]" />}
        />
      </div>

      {/* Letters Table Card */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
        
        {/* Filters and Search */}
        <div className="p-4 border-b border-borderLine flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FCFCFB]">
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Letters', count: totalCount },
              { id: 'pending_approval', label: 'Pending Approval', count: pendingCount },
              { id: 'approved', label: 'Approved', count: approvedCount },
              { id: 'submission_recorded', label: 'Dispatched', count: submittedCount },
              { id: 'draft', label: 'Drafts', count: draftCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-secondaryText hover:text-navy hover:bg-warm'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  statusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-warm text-secondaryText'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-secondaryText absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by client, creditor, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBF9] text-secondaryText uppercase text-[10px] tracking-wider border-b border-borderLine">
              <tr>
                <th className="py-3 px-5 font-semibold">Letter ID</th>
                <th className="py-3 px-4 font-semibold">Client</th>
                <th className="py-3 px-4 font-semibold">Target Bureau</th>
                <th className="py-3 px-4 font-semibold">Template Applied</th>
                <th className="py-3 px-4 font-semibold">Creditor / Account</th>
                <th className="py-3 px-4 font-semibold">Round</th>
                <th className="py-3 px-4 font-semibold">Approval Status</th>
                <th className="py-3 px-5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderLine">
              {filteredLetters.map(letter => (
                <tr
                  key={letter.id}
                  onClick={() => navigate(`/app/letters/${letter.id}/editor`)}
                  className="hover:bg-warm/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-5 font-mono text-secondaryText">
                    {letter.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-navy">
                    {letter.clientName}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-navy">
                    {letter.bureau}
                  </td>
                  <td className="py-3.5 px-4 text-secondaryText truncate max-w-[180px]">
                    {letter.templateTitle}
                  </td>
                  <td className="py-3.5 px-4 text-navy">
                    <span className="font-medium">{letter.creditorName}</span>
                    <span className="text-[10px] text-secondaryText block font-mono">{letter.accountReferenceMasked}</span>
                  </td>
                  <td className="py-3.5 px-4 text-navy">
                    Round {letter.disputeRound}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      size="sm"
                      variant={
                        letter.approvalStatus === 'approved' 
                          ? 'success' 
                          : letter.approvalStatus === 'pending_approval' 
                            ? 'pending' 
                            : letter.approvalStatus === 'submission_recorded'
                              ? 'navy'
                              : 'default'
                      }
                    >
                      {letter.approvalStatus.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                      {currentUser.role === 'admin' && letter.approvalStatus === 'pending_approval' && (
                        <button
                          onClick={() => approveLetter(letter.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#2E7D5B] hover:bg-[#25684B] rounded"
                        >
                          Approve
                        </button>
                      )}

                      {letter.approvalStatus === 'approved' && (
                        <button
                          onClick={() => recordLetterSubmission(letter.id, 'USPS-MOCK-9400')}
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-navy hover:bg-navy-light rounded"
                        >
                          Record Dispatch
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/app/letters/${letter.id}/editor`)}
                        className="px-2 py-1 text-xs text-navy hover:bg-warm rounded border border-borderLine"
                      >
                        Open Editor
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

