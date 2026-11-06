import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  UserCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Plus, 
  Scale, 
  FileSearch,
  Lock,
  MessageSquare
} from 'lucide-react';

export const ClientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    clients, 
    updateOnboardingStep, 
    addClientNote, 
    disputes, 
    reports, 
    documents,
    currentUser 
  } = useApp();

  const client = clients.find(c => c.id === id) || clients[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'disputes' | 'documents' | 'notes' | 'activity'>('overview');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isNoteInternal, setIsNoteInternal] = useState(true);

  if (!client) {
    return (
      <div className="p-8 text-center">
        <p className="text-secondaryText">Client record not found.</p>
        <button onClick={() => navigate('/app/clients')} className="mt-4 text-xs font-semibold text-navy">
          Return to clients
        </button>
      </div>
    );
  }

  const clientDisputes = disputes.filter(d => d.clientId === client.id);
  const clientReports = reports.filter(r => r.clientId === client.id);
  const clientDocuments = documents.filter(doc => doc.clientId === client.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    addClientNote(client.id, newNoteContent, isNoteInternal);
    setNewNoteContent('');
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/app/clients')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-secondaryText hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Clients Directory</span>
        </button>
      </div>

      {/* Header Profile Card */}
      <div className="bg-surface rounded-xl border border-borderLine p-6 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center text-lg font-serif font-bold flex-shrink-0">
              {client.firstName[0]}{client.lastName[0]}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold text-navy">{client.firstName} {client.lastName}</h1>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-warm text-secondaryText">
                  {client.id}
                </span>
                <Badge
                  variant={
                    client.status === 'active' 
                      ? 'success' 
                      : client.status === 'onboarding' 
                        ? 'pending' 
                        : 'attention'
                  }
                >
                  {client.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-secondaryText mt-2">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-secondaryText" />
                  {client.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-secondaryText" />
                  {client.phone}
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-secondaryText" />
                  Assigned: {client.assignedStaffName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => navigate('/app/letters/editor')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors"
            >
              Draft Dispute Letter
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-borderLine mt-6 pt-3 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'reports', label: `Credit Reports (${clientReports.length})` },
            { id: 'disputes', label: `Disputes (${clientDisputes.length})` },
            { id: 'documents', label: `Documents (${clientDocuments.length})` },
            { id: 'notes', label: `Notes (${client.notes.length})` },
            { id: 'activity', label: 'Activity' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-sage-light text-navy'
                  : 'text-secondaryText hover:text-navy hover:bg-warm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Details & Onboarding Checklist */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Onboarding Checklist Card */}
            <div className="bg-surface rounded-xl p-5 border border-borderLine shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-borderLine">
                <div>
                  <h3 className="text-sm font-semibold text-navy">Onboarding Checklist</h3>
                  <p className="text-xs text-secondaryText">Operational prerequisites before filing disputes</p>
                </div>
                <span className="text-[11px] font-semibold text-sage-dark bg-sage-light px-2.5 py-0.5 rounded-full">
                  {Object.values(client.onboardingChecklist).filter(Boolean).length} of 5 Completed
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { key: 'profileCompleted' as const, label: 'Client Profile & Personal Data Completed' },
                  { key: 'agreementUploaded' as const, label: 'Fee Agreement & Disclosures Signed' },
                  { key: 'documentsReceived' as const, label: 'Driver License & Proof of Address Verified' },
                  { key: 'monitoringAuthorized' as const, label: 'Credit Monitoring Credentials Authorized' },
                  { key: 'reportImported' as const, label: 'Tri-Bureau Credit Report Successfully Ingested' },
                ].map(step => (
                  <label
                    key={step.key}
                    className="flex items-center justify-between p-3 rounded-lg border border-borderLine bg-[#FCFCFB] hover:bg-warm/40 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={client.onboardingChecklist[step.key]}
                        onChange={(e) => updateOnboardingStep(client.id, step.key, e.target.checked)}
                        className="w-4 h-4 rounded text-navy border-borderLine focus:ring-sage"
                      />
                      <span className={`text-xs ${
                        client.onboardingChecklist[step.key] ? 'font-medium text-navy' : 'text-secondaryText'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {client.onboardingChecklist[step.key] ? (
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                    ) : (
                      <Clock className="w-4 h-4 text-secondaryText/60" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Address & Demographic Info */}
            <div className="bg-surface rounded-xl p-5 border border-borderLine shadow-card space-y-3">
              <h3 className="text-sm font-semibold text-navy pb-2 border-b border-borderLine">
                Demographic & Contact Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-secondaryText block text-[11px]">Street Address</span>
                  <span className="font-medium text-navy">{client.address.street}</span>
                </div>
                <div>
                  <span className="text-secondaryText block text-[11px]">City, State ZIP</span>
                  <span className="font-medium text-navy">{client.address.city}, {client.address.state} {client.address.zip}</span>
                </div>
                <div>
                  <span className="text-secondaryText block text-[11px]">Date of Birth (Mock)</span>
                  <span className="font-medium text-navy">{client.dob}</span>
                </div>
                <div>
                  <span className="text-secondaryText block text-[11px]">Enrollment Date</span>
                  <span className="font-medium text-navy">{client.enrollmentDate}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Simulated Scores & Active Disputes summary */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tri-bureau Score Simulation Panel */}
            <div className="bg-surface rounded-xl p-5 border border-borderLine shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-borderLine mb-4">
                <h3 className="text-sm font-semibold text-navy">Credit Profile Disclosures</h3>
                <span className="text-[10px] text-secondaryText font-mono">SIMULATION</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-warm/40 rounded-xl border border-borderLine">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Equifax</span>
                  <div className="text-2xl font-bold text-navy mt-1">{client.creditScores.equifax}</div>
                </div>
                <div className="p-3 bg-warm/40 rounded-xl border border-borderLine">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Experian</span>
                  <div className="text-2xl font-bold text-navy mt-1">{client.creditScores.experian}</div>
                </div>
                <div className="p-3 bg-warm/40 rounded-xl border border-borderLine">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">TransUnion</span>
                  <div className="text-2xl font-bold text-navy mt-1">{client.creditScores.transunion}</div>
                </div>
              </div>

              <p className="text-[11px] text-secondaryText/80 text-center mt-3">
                Scores represent authorized partner monitoring disclosures for dispute evaluation.
              </p>
            </div>

            {/* Quick Disputes Summary */}
            <div className="bg-surface rounded-xl p-5 border border-borderLine shadow-card space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-borderLine">
                <h3 className="text-sm font-semibold text-navy">Active Disputes</h3>
                <button
                  onClick={() => setActiveTab('disputes')}
                  className="text-xs text-sage-dark font-medium hover:underline"
                >
                  View All
                </button>
              </div>

              {clientDisputes.length > 0 ? (
                <div className="space-y-2.5">
                  {clientDisputes.map(d => (
                    <div
                      key={d.id}
                      onClick={() => navigate(`/app/disputes/${d.id}`)}
                      className="p-3 rounded-lg border border-borderLine hover:bg-warm/40 cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-navy">{d.creditorName}</div>
                        <div className="text-[11px] text-secondaryText">{d.bureau} • Round {d.currentRound}</div>
                      </div>
                      <Badge size="sm" variant="sage">
                        {d.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-secondaryText py-4 text-center">No active disputes initiated yet.</p>
              )}
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Credit Reports */}
      {activeTab === 'reports' && (
        <div className="bg-surface rounded-xl border border-borderLine shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderLine">
            <div>
              <h3 className="text-base font-semibold text-navy">Authorized Bureau Disclosures</h3>
              <p className="text-xs text-secondaryText">Review tradelines and potential reporting discrepancies</p>
            </div>
            <button
              onClick={() => navigate('/app/reports')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg transition-colors"
            >
              Import Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clientReports.map(rep => (
              <div
                key={rep.id}
                onClick={() => navigate(`/app/reports/${rep.id}`)}
                className="p-4 rounded-xl border border-borderLine hover:border-sage bg-[#FCFCFB] hover:bg-surface cursor-pointer shadow-subtle transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-navy">{rep.bureau}</span>
                  <span className="text-[10px] text-secondaryText">{rep.reportDate}</span>
                </div>
                <div className="text-xl font-bold text-navy">{rep.summary.totalAccounts} Accounts</div>
                <div className="text-[11px] text-secondaryText mt-1">
                  {rep.summary.negativeAccounts} negative • {rep.summary.collections} collections
                </div>
                <div className="mt-3 pt-2 border-t border-borderLine text-xs font-semibold text-sage-dark flex items-center gap-1">
                  <span>Review tradelines</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Disputes */}
      {activeTab === 'disputes' && (
        <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
          <div className="p-4 border-b border-borderLine flex items-center justify-between bg-[#FCFCFB]">
            <h3 className="text-sm font-semibold text-navy">Dispute Filings for {client.firstName}</h3>
            <button
              onClick={() => navigate('/app/disputes')}
              className="text-xs font-semibold text-sage-dark hover:underline"
            >
              Open Dispute Board
            </button>
          </div>

          <div className="divide-y divide-borderLine">
            {clientDisputes.map(d => (
              <div
                key={d.id}
                onClick={() => navigate(`/app/disputes/${d.id}`)}
                className="p-4 hover:bg-warm/40 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-navy">{d.creditorName}</span>
                    <span className="text-[11px] font-mono text-secondaryText">{d.id}</span>
                  </div>
                  <div className="text-[11px] text-secondaryText mt-0.5">
                    {d.bureau} • Category: {d.disputeCategory} • Round {d.currentRound}
                  </div>
                </div>
                <Badge size="sm" variant="sage">
                  {d.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Documents */}
      {activeTab === 'documents' && (
        <div className="bg-surface rounded-xl border border-borderLine shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderLine">
            <h3 className="text-sm font-semibold text-navy">Client Documents</h3>
            <button
              onClick={() => navigate('/app/documents')}
              className="text-xs font-semibold text-sage-dark hover:underline"
            >
              Document Hub
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientDocuments.map(doc => (
              <div key={doc.id} className="p-3.5 rounded-xl border border-borderLine bg-[#FCFCFB]">
                <div className="flex items-start gap-2.5">
                  <FileText className="w-5 h-5 text-sage-dark flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-navy truncate">{doc.name}</p>
                    <p className="text-[10px] text-secondaryText mt-0.5">{doc.category} • {doc.fileSize}</p>
                    <p className="text-[10px] text-secondaryText mt-0.5">Uploaded {doc.uploadDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Notes (Staff internal vs Client visible) */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {/* Add Note Box */}
          <div className="bg-surface rounded-xl p-5 border border-borderLine shadow-card">
            <h3 className="text-sm font-semibold text-navy mb-2">Add Case Note</h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={3}
                placeholder="Record strategic dispute notes, client conversations, or investigative findings..."
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="noteType"
                      checked={isNoteInternal}
                      onChange={() => setIsNoteInternal(true)}
                      className="text-navy focus:ring-sage"
                    />
                    <span className="flex items-center gap-1 text-navy font-medium">
                      <Lock className="w-3.5 h-3.5 text-secondaryText" />
                      Internal Staff Only
                    </span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="noteType"
                      checked={!isNoteInternal}
                      onChange={() => setIsNoteInternal(false)}
                      className="text-navy focus:ring-sage"
                    />
                    <span className="flex items-center gap-1 text-navy font-medium">
                      <MessageSquare className="w-3.5 h-3.5 text-secondaryText" />
                      Client-Visible Message
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors"
                >
                  Post Note
                </button>
              </div>
            </form>
          </div>

          {/* Notes List */}
          <div className="space-y-3">
            {client.notes.map(note => (
              <div
                key={note.id}
                className={`p-4 rounded-xl border ${
                  note.isInternal 
                    ? 'bg-surface border-borderLine' 
                    : 'bg-sage-light/30 border-sage/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-navy">{note.author}</span>
                    <span className="text-[10px] text-secondaryText">({note.role})</span>
                    {note.isInternal ? (
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-warm text-secondaryText font-medium flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        Internal Note
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-sage-light text-navy font-medium flex items-center gap-1">
                        <MessageSquare className="w-2.5 h-2.5" />
                        Client Visible
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-secondaryText">{note.createdAt}</span>
                </div>
                <p className="text-xs text-navy leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Activity */}
      {activeTab === 'activity' && (
        <div className="bg-surface rounded-xl border border-borderLine shadow-card p-6">
          <h3 className="text-sm font-semibold text-navy pb-3 border-b border-borderLine mb-4">
            Chronological Client Timeline
          </h3>

          <div className="space-y-4">
            {client.activity.map(act => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-sage mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy">{act.title}</p>
                  <p className="text-secondaryText mt-0.5">{act.description}</p>
                  <p className="text-[10px] text-secondaryText/80 mt-0.5">
                    {act.user} • {act.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

