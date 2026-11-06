import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { RecordResponseModal } from '../components/modals/RecordResponseModal';
import { 
  ArrowLeft, 
  Scale, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  FileText, 
  Mail, 
  Building,
  RotateCcw,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const DisputeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    disputes, 
    addDisputeRound, 
    updateDisputeStatus,
    currentUser 
  } = useApp();

  const dispute = disputes.find(d => d.id === id) || disputes[0];
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [newRoundNotes, setNewRoundNotes] = useState('');
  const [showAddRoundForm, setShowAddRoundForm] = useState(false);

  if (!dispute) {
    return (
      <div className="p-8 text-center text-xs text-secondaryText">
        Dispute record not found.
      </div>
    );
  }

  const handleAddRound = (e: React.FormEvent) => {
    e.preventDefault();
    addDisputeRound(dispute.id, newRoundNotes || `Round ${dispute.currentRound + 1} escalation opened`);
    setNewRoundNotes('');
    setShowAddRoundForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Record Bureau Response Modal */}
      <RecordResponseModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        disputeId={dispute.id}
        defaultBureau={dispute.bureau}
        creditorName={dispute.creditorName}
      />

      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/app/disputes')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-secondaryText hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dispute Center</span>
        </button>
      </div>

      {/* Header Profile Card */}
      <div className="bg-surface rounded-xl border border-borderLine p-6 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm px-2.5 py-0.5 rounded bg-warm text-secondaryText">
                {dispute.id}
              </span>
              <h1 className="text-xl sm:text-2xl font-semibold text-navy">
                {dispute.creditorName}
              </h1>
              <Badge variant="sage">
                {dispute.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-secondaryText mt-2">
              <span>Client: <span className="font-semibold text-navy">{dispute.clientName}</span></span>
              <span>•</span>
              <span>Bureau: <span className="font-semibold text-navy">{dispute.bureau}</span></span>
              <span>•</span>
              <span>Category: <span className="font-medium text-navy">{dispute.disputeCategory}</span></span>
              <span>•</span>
              <span>Current Round: <span className="font-semibold text-navy">Round {dispute.currentRound}</span></span>
              <span>•</span>
              <span>Assigned: {dispute.assignedStaffName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setIsRecordModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-navy bg-warm hover:bg-warm/80 border border-borderLine rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-secondaryText" />
              <span>Record Bureau Response</span>
            </button>

            <button
              onClick={() => navigate('/app/letters/editor')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-sage" />
              <span>Letter Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Workflow Grid: Timeline & Dispute Rounds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Chronological Interactive Dispute Timeline */}
        <div className="lg:col-span-5 bg-surface rounded-xl border border-borderLine shadow-card p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-borderLine">
            <div>
              <h3 className="text-sm font-semibold text-navy">Dispute Progression Timeline</h3>
              <p className="text-xs text-secondaryText">Documented audit steps from draft to bureau conclusion</p>
            </div>
            <span className="text-[11px] font-mono text-secondaryText">AUDIT READY</span>
          </div>

          <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-borderLine">
            {dispute.timeline.map((step, idx) => (
              <div key={step.id || idx} className="relative pl-8 text-xs space-y-1">
                <span className={`absolute left-1.5 top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-surface flex items-center justify-center ${
                  step.status === 'completed' 
                    ? 'border-[#2E7D5B] text-[#2E7D5B]' 
                    : 'border-sage-dark text-sage-dark animate-pulse'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    step.status === 'completed' ? 'bg-[#2E7D5B]' : 'bg-sage-dark'
                  }`} />
                </span>

                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-navy">{step.title}</h4>
                  <span className="text-[10px] text-secondaryText">{step.timestamp}</span>
                </div>

                <p className="text-secondaryText text-[11px] leading-relaxed">
                  {step.description}
                </p>

                {step.actor && (
                  <p className="text-[10px] text-sage-dark font-medium">
                    Signed by {step.actor}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Multi-Round Escalations & Logged Responses */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Dispute Rounds Container */}
          <div className="bg-surface rounded-xl border border-borderLine shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-borderLine">
              <div>
                <h3 className="text-sm font-semibold text-navy">Dispute Escalation Rounds</h3>
                <p className="text-xs text-secondaryText">Round 1, Round 2 (MOV), and Round 3 management</p>
              </div>

              {!showAddRoundForm && (
                <button
                  onClick={() => setShowAddRoundForm(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-sage-dark hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Escalation Round</span>
                </button>
              )}
            </div>

            {/* Add New Round Inline Form */}
            {showAddRoundForm && (
              <form onSubmit={handleAddRound} className="p-4 bg-warm/50 rounded-xl border border-borderLine space-y-3">
                <h4 className="text-xs font-semibold text-navy">
                  Initiate Round {dispute.currentRound + 1}
                </h4>
                <textarea
                  value={newRoundNotes}
                  onChange={(e) => setNewRoundNotes(e.target.value)}
                  rows={2}
                  placeholder="Escalation grounds (e.g. Method of Verification demand following generic bureau response)..."
                  className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddRoundForm(false)}
                    className="px-3 py-1.5 text-xs text-secondaryText hover:text-navy rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm"
                  >
                    Confirm Round {dispute.currentRound + 1}
                  </button>
                </div>
              </form>
            )}

            {/* Rounds List */}
            <div className="space-y-3">
              {dispute.rounds.map((round) => (
                <div key={round.roundNumber} className="p-4 rounded-xl border border-borderLine bg-[#FCFCFB] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-navy text-white">
                        Round {round.roundNumber}
                      </span>
                      <span className="text-xs font-semibold text-navy">{round.bureau}</span>
                    </div>
                    <span className="text-[11px] text-secondaryText">Initiated {round.createdDate}</span>
                  </div>

                  <p className="text-xs text-secondaryText leading-relaxed">
                    {round.notes}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-borderLine/80">
                    <span className="text-secondaryText">
                      Correspondence: <span className="font-semibold text-navy">{round.correspondenceStatus}</span>
                    </span>
                    <span className="text-secondaryText">
                      Response: <span className="font-semibold text-navy">{round.responseStatus}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recorded Bureau Responses Container */}
          <div className="bg-surface rounded-xl border border-borderLine shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-borderLine">
              <div>
                <h3 className="text-sm font-semibold text-navy">Recorded Bureau Responses</h3>
                <p className="text-xs text-secondaryText">Investigation outcomes and deletion notices</p>
              </div>

              <button
                onClick={() => setIsRecordModalOpen(true)}
                className="text-xs font-semibold text-navy hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-sage-dark" />
                <span>Log Response</span>
              </button>
            </div>

            {dispute.responses.length > 0 ? (
              <div className="space-y-3">
                {dispute.responses.map((resp) => (
                  <div key={resp.id} className="p-4 rounded-xl border border-borderLine bg-[#FCFCFB] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-navy">{resp.bureau}</span>
                        <Badge
                          size="sm"
                          variant={
                            resp.responseCategory === 'Deleted Information' 
                              ? 'success' 
                              : resp.responseCategory === 'Updated Information' 
                                ? 'sage' 
                                : 'attention'
                          }
                        >
                          {resp.responseCategory}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-secondaryText">{resp.responseDate}</span>
                    </div>

                    <p className="text-xs text-navy font-medium leading-relaxed">
                      {resp.outcome}
                    </p>

                    {resp.notes && (
                      <p className="text-[11px] text-secondaryText italic">
                        Notes: {resp.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[10px] text-secondaryText pt-2 border-t border-borderLine/70">
                      <span>Recorded by {resp.loggedBy}</span>
                      {resp.supportingDocName && (
                        <span className="text-sage-dark underline flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {resp.supportingDocName}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-secondaryText italic bg-warm/20 rounded-xl border border-borderLine">
                No bureau responses recorded yet. Statutory 30-day investigation clock is active.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

