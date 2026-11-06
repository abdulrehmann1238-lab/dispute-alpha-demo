import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { CreateDisputeModal } from '../components/modals/CreateDisputeModal';
import { 
  Scale, 
  Plus, 
  Search, 
  Kanban, 
  Table as TableIcon, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Dispute, DisputeStatus } from '../types';

export const DisputesPage: React.FC = () => {
  const { disputes, updateDisputeStatus } = useApp();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState('');
  const [bureauFilter, setBureauFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Metrics
  const totalCount = disputes.length;
  const draftCount = disputes.filter(d => d.status === 'draft').length;
  const underReviewCount = disputes.filter(d => d.status === 'under_review').length;
  const approvedCount = disputes.filter(d => d.status === 'approved').length;
  const submittedCount = disputes.filter(d => d.status === 'submitted').length;
  const responseCount = disputes.filter(d => d.status === 'response_received').length;
  const followUpCount = disputes.filter(d => d.status === 'follow_up_required').length;

  const filteredDisputes = disputes.filter(d => {
    const matchesSearch = 
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.clientName.toLowerCase().includes(search.toLowerCase()) ||
      d.creditorName.toLowerCase().includes(search.toLowerCase()) ||
      d.disputeCategory.toLowerCase().includes(search.toLowerCase());

    if (bureauFilter === 'all') return matchesSearch;
    return matchesSearch && d.bureau === bureauFilter;
  });

  const kanbanColumns: { id: DisputeStatus; label: string; count: number; color: string }[] = [
    { id: 'draft', label: 'Draft', count: draftCount, color: 'border-secondaryText/40' },
    { id: 'under_review', label: 'Under Review', count: underReviewCount, color: 'border-[#C45738]' },
    { id: 'approved', label: 'Approved', count: approvedCount, color: 'border-[#3B7A57]' },
    { id: 'submitted', label: 'Submitted', count: submittedCount, color: 'border-[#2B6E96]' },
    { id: 'response_received', label: 'Response Received', count: responseCount, color: 'border-[#B87A28]' },
    { id: 'follow_up_required', label: 'Follow-up Required', count: followUpCount, color: 'border-[#BD3838]' },
    { id: 'closed', label: 'Closed', count: disputes.filter(d => d.status === 'closed').length, color: 'border-sage' },
  ];

  const getNextStatus = (current: DisputeStatus): DisputeStatus | null => {
    switch (current) {
      case 'draft': return 'under_review';
      case 'under_review': return 'approved';
      case 'approved': return 'submitted';
      case 'submitted': return 'response_received';
      case 'response_received': return 'closed';
      case 'follow_up_required': return 'draft';
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <CreateDisputeModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Dispute Center</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Organize dispute rounds, monitor progress, and manage every follow-up.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-sage" />
          <span>+ Create Dispute</span>
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3 bg-surface rounded-xl border border-borderLine shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Total</span>
          <div className="text-xl font-bold text-navy mt-0.5">{totalCount}</div>
        </div>
        <div className="p-3 bg-surface rounded-xl border border-borderLine shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Draft</span>
          <div className="text-xl font-bold text-navy mt-0.5">{draftCount}</div>
        </div>
        <div className="p-3 bg-surface rounded-xl border border-borderLine shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C45738]">Under Review</span>
          <div className="text-xl font-bold text-[#C45738] mt-0.5">{underReviewCount}</div>
        </div>
        <div className="p-3 bg-surface rounded-xl border border-borderLine shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B7A57]">Approved</span>
          <div className="text-xl font-bold text-[#3B7A57] mt-0.5">{approvedCount}</div>
        </div>
        <div className="p-3 bg-surface rounded-xl border border-borderLine shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B6E96]">Submitted</span>
          <div className="text-xl font-bold text-[#2B6E96] mt-0.5">{submittedCount}</div>
        </div>
        <div className="p-3 bg-surface rounded-xl border border-borderLine shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B87A28]">Responses</span>
          <div className="text-xl font-bold text-[#B87A28] mt-0.5">{responseCount}</div>
        </div>
        <div className="p-3 bg-surface rounded-xl border border-borderLine shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#BD3838]">Follow-ups</span>
          <div className="text-xl font-bold text-[#BD3838] mt-0.5">{followUpCount}</div>
        </div>
      </div>

      {/* Controls Bar: Search, Bureau Filter, View Toggle */}
      <div className="p-4 bg-surface rounded-xl border border-borderLine shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-secondaryText absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search disputes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          {/* Bureau Filter */}
          <select
            value={bureauFilter}
            onChange={(e) => setBureauFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-borderLine rounded-lg bg-surface text-navy focus:outline-none focus:ring-1 focus:ring-sage"
          >
            <option value="all">All Bureaus</option>
            <option value="Equifax">Equifax</option>
            <option value="Experian">Experian</option>
            <option value="TransUnion">TransUnion</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="inline-flex rounded-lg bg-warm/60 p-1 border border-borderLine self-start sm:self-auto">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
              viewMode === 'kanban' 
                ? 'bg-surface text-navy shadow-subtle' 
                : 'text-secondaryText hover:text-navy'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban View</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
              viewMode === 'table' 
                ? 'bg-surface text-navy shadow-subtle' 
                : 'text-secondaryText hover:text-navy'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1400px]">
            {kanbanColumns.map(col => {
              const colDisputes = filteredDisputes.filter(d => d.status === col.id);
              return (
                <div 
                  key={col.id}
                  className="w-80 flex-shrink-0 bg-warm/40 rounded-xl p-3 border border-borderLine flex flex-col max-h-[750px]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 px-1 border-b border-borderLine mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-navy">
                      {col.label}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface border border-borderLine text-secondaryText">
                      {colDisputes.length}
                    </span>
                  </div>

                  {/* Cards List */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {colDisputes.map(d => {
                      const nextStatus = getNextStatus(d.status);
                      return (
                        <div
                          key={d.id}
                          onClick={() => navigate(`/app/disputes/${d.id}`)}
                          className="bg-surface rounded-xl p-3.5 border border-borderLine shadow-subtle hover:border-sage hover:shadow-card cursor-pointer transition-all space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-mono text-[10px] text-secondaryText">{d.id}</span>
                              <h4 className="text-xs font-semibold text-navy leading-snug">{d.creditorName}</h4>
                              <p className="text-[11px] text-secondaryText">{d.clientName}</p>
                            </div>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-warm text-navy uppercase">
                              {d.bureau}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-secondaryText pt-1 border-t border-borderLine/70">
                            <span>Round {d.currentRound}</span>
                            <span className="font-medium text-navy">{d.disputeCategory}</span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-secondaryText">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-secondaryText" />
                              {d.dueDate}
                            </span>
                            <span className="truncate max-w-[120px]">{d.assignedStaffName}</span>
                          </div>

                          {/* Interactive Move Control */}
                          {nextStatus && (
                            <div className="pt-2 border-t border-borderLine/70 flex justify-end">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateDisputeStatus(d.id, nextStatus);
                                }}
                                className="px-2 py-1 text-[10px] font-semibold text-navy hover:bg-warm rounded border border-borderLine flex items-center gap-1"
                                title={`Advance status to ${nextStatus.replace('_', ' ')}`}
                              >
                                <span>Advance to {nextStatus.replace('_', ' ')}</span>
                                <ArrowRight className="w-3 h-3 text-sage-dark" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {colDisputes.length === 0 && (
                      <div className="py-8 text-center text-xs text-secondaryText/70 italic">
                        No disputes in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF9] text-secondaryText uppercase text-[10px] tracking-wider border-b border-borderLine">
                <tr>
                  <th className="py-3 px-5 font-semibold">Dispute ID</th>
                  <th className="py-3 px-4 font-semibold">Client</th>
                  <th className="py-3 px-4 font-semibold">Bureau</th>
                  <th className="py-3 px-4 font-semibold">Creditor</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Round</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Due Date</th>
                  <th className="py-3 px-5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderLine">
                {filteredDisputes.map(d => (
                  <tr
                    key={d.id}
                    onClick={() => navigate(`/app/disputes/${d.id}`)}
                    className="hover:bg-warm/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-5 font-mono text-secondaryText">
                      {d.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-navy">
                      {d.clientName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-navy">{d.bureau}</span>
                    </td>
                    <td className="py-3 px-4 text-navy">
                      {d.creditorName}
                    </td>
                    <td className="py-3 px-4 text-secondaryText">
                      {d.disputeCategory}
                    </td>
                    <td className="py-3 px-4 text-navy">
                      Round {d.currentRound}
                    </td>
                    <td className="py-3 px-4">
                      <Badge size="sm" variant="sage">
                        {d.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-secondaryText">
                      {d.dueDate}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/disputes/${d.id}`);
                        }}
                        className="px-2.5 py-1 text-xs font-medium text-navy hover:bg-warm rounded border border-borderLine"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

