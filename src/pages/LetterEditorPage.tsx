import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  CheckCircle2, 
  Printer, 
  RotateCcw, 
  Paperclip, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  UserCheck,
  Eye,
  Building,
  Edit2
} from 'lucide-react';
import { Bureau, LetterTemplate } from '../types';

export const LetterEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    letters, 
    templates, 
    clients, 
    bureauDirectory, 
    addLetter, 
    updateLetterContent, 
    submitLetterForApproval, 
    approveLetter, 
    rejectLetter, 
    recordLetterSubmission,
    currentUser,
    showToast 
  } = useApp();

  // If editing existing letter or creating new
  const existingLetter = id ? letters.find(l => l.id === id) : null;

  // Form State
  const [selectedClientId, setSelectedClientId] = useState(existingLetter?.clientId || clients[0]?.id || '');
  const [selectedBureau, setSelectedBureau] = useState<Bureau>(existingLetter?.bureau || 'Equifax');
  const [selectedTemplateId, setSelectedTemplateId] = useState(existingLetter?.templateId || templates[0]?.id || '');
  const [creditorName, setCreditorName] = useState(existingLetter?.creditorName || 'Metro Collection Group');
  const [accountMasked, setAccountMasked] = useState(existingLetter?.accountReferenceMasked || '•••• •••• •••• 9921');
  const [disputeRound, setDisputeRound] = useState(existingLetter?.disputeRound || 1);
  const [category, setCategory] = useState('Unverified Collection');
  const [supportingNotes, setSupportingNotes] = useState('Settlement receipt attached confirming zero balance');
  const [attachedFiles, setAttachedFiles] = useState<string[]>(
    existingLetter?.attachedDocuments || ['Driver_License_Proof.pdf', 'Settlement_Receipt.pdf']
  );

  // Raw letter body for live preview / editing
  const [editableBody, setEditableBody] = useState('');
  const [isRawEditing, setIsRawEditing] = useState(false);
  const [activeLetterId, setActiveLetterId] = useState<string | null>(existingLetter?.id || null);

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const selectedBureauEntry = bureauDirectory.find(b => b.name === selectedBureau) || bureauDirectory[0];
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];

  // Helper to dynamically populate template placeholders
  const generatePopulatedContent = (templateBody: string) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const clientAddress = selectedClient 
      ? `${selectedClient.address.street}, ${selectedClient.address.city}, ${selectedClient.address.state} ${selectedClient.address.zip}`
      : '742 Evergreen Terrace, Portland, OR 97201';
    
    const bureauAddr = selectedBureauEntry 
      ? `${selectedBureauEntry.mailingAddress.line1}, ${selectedBureauEntry.mailingAddress.line2 || ''}, ${selectedBureauEntry.mailingAddress.city}, ${selectedBureauEntry.mailingAddress.state} ${selectedBureauEntry.mailingAddress.zip}`
      : 'Consumer Dispute Operations, P.O. Box 740256, Atlanta, GA 30374';

    return templateBody
      .replace(/\[DATE\]/g, today)
      .replace(/\[BUREAU_NAME\]/g, selectedBureau)
      .replace(/\[BUREAU_ADDRESS\]/g, bureauAddr)
      .replace(/\[CLIENT_NAME\]/g, selectedClient ? `${selectedClient.firstName} ${selectedClient.lastName}` : 'Consumer')
      .replace(/\[CLIENT_ADDRESS\]/g, clientAddress)
      .replace(/\[CREDITOR_NAME\]/g, creditorName)
      .replace(/\[ACCOUNT_NUMBER_MASKED\]/g, accountMasked)
      .replace(/\[DISPUTE_CATEGORY\]/g, category)
      .replace(/\[DISPUTE_ROUND\]/g, String(disputeRound));
  };

  // Sync populated text when selections change
  useEffect(() => {
    if (existingLetter && !isRawEditing) {
      setEditableBody(existingLetter.content);
      setActiveLetterId(existingLetter.id);
    } else if (selectedTemplate && !isRawEditing) {
      setEditableBody(generatePopulatedContent(selectedTemplate.bodyTemplate));
    }
  }, [
    selectedClientId, 
    selectedBureau, 
    selectedTemplateId, 
    creditorName, 
    accountMasked, 
    disputeRound, 
    category, 
    existingLetter, 
    isRawEditing
  ]);

  const currentLetterRecord = activeLetterId ? letters.find(l => l.id === activeLetterId) : existingLetter;

  // Save Draft
  const handleSaveDraft = () => {
    if (activeLetterId) {
      updateLetterContent(activeLetterId, editableBody);
      showToast('Dispute letter draft saved successfully.', 'success');
    } else {
      const newLetter = addLetter({
        clientId: selectedClient.id,
        clientName: `${selectedClient.firstName} ${selectedClient.lastName}`,
        bureau: selectedBureau,
        templateId: selectedTemplateId,
        templateTitle: selectedTemplate.title,
        disputeRound,
        creditorName,
        accountReferenceMasked: accountMasked,
        content: editableBody,
        attachedDocuments: attachedFiles,
      });
      setActiveLetterId(newLetter.id);
    }
  };

  // Submit for Approval (Staff flow)
  const handleSubmitForApproval = () => {
    let letterIdToSubmit = activeLetterId;
    if (!letterIdToSubmit) {
      const newLetter = addLetter({
        clientId: selectedClient.id,
        clientName: `${selectedClient.firstName} ${selectedClient.lastName}`,
        bureau: selectedBureau,
        templateId: selectedTemplateId,
        templateTitle: selectedTemplate.title,
        disputeRound,
        creditorName,
        accountReferenceMasked: accountMasked,
        content: editableBody,
        attachedDocuments: attachedFiles,
      });
      letterIdToSubmit = newLetter.id;
      setActiveLetterId(newLetter.id);
    }
    submitLetterForApproval(letterIdToSubmit);
  };

  // Approve (Admin flow)
  const handleApprove = () => {
    if (!activeLetterId) return;
    approveLetter(activeLetterId, 'Verified against client bank statements and FCRA reinvestigation standards.');
  };

  // Reject / Revisions
  const handleReject = () => {
    if (!activeLetterId) return;
    rejectLetter(activeLetterId, 'Please attach the second utility bill verification proof.');
  };

  // Record Postal Submission
  const handleRecordDispatch = () => {
    if (!activeLetterId) return;
    recordLetterSubmission(activeLetterId, 'USPS-MOCK-940011189956281001');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-borderLine">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/letters')}
            className="p-1.5 rounded-lg text-secondaryText hover:text-navy hover:bg-warm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-navy">Letter Studio</h1>
              {activeLetterId && (
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-warm text-secondaryText">
                  {activeLetterId}
                </span>
              )}
              {currentLetterRecord && (
                <Badge 
                  size="sm" 
                  variant={
                    currentLetterRecord.approvalStatus === 'approved' 
                      ? 'success' 
                      : currentLetterRecord.approvalStatus === 'pending_approval' 
                        ? 'pending' 
                        : currentLetterRecord.approvalStatus === 'submission_recorded'
                          ? 'navy'
                          : 'default'
                  }
                >
                  {currentLetterRecord.approvalStatus.replace('_', ' ').toUpperCase()}
                </Badge>
              )}
            </div>
            <p className="text-xs text-secondaryText">
              Live split-screen dispute correspondence engine with mandatory human audit workflow.
            </p>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSaveDraft}
            className="px-3 py-1.5 text-xs font-medium text-navy bg-warm hover:bg-warm/80 rounded-lg border border-borderLine transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5 text-secondaryText" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-medium text-navy bg-warm hover:bg-warm/80 rounded-lg border border-borderLine transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-secondaryText" />
            <span>Print / PDF Preview</span>
          </button>

          {/* Workflow Transitions */}
          {(!currentLetterRecord || currentLetterRecord.approvalStatus === 'draft') && (
            <button
              onClick={handleSubmitForApproval}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-sage" />
              <span>Submit for Admin Approval</span>
            </button>
          )}

          {currentLetterRecord?.approvalStatus === 'pending_approval' && currentUser.role === 'admin' && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleReject}
                className="px-3 py-1.5 text-xs font-semibold text-[#BD3838] bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
              >
                Request Revisions
              </button>
              <button
                onClick={handleApprove}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2E7D5B] hover:bg-[#25684B] rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Approve Letter</span>
              </button>
            </div>
          )}

          {currentLetterRecord?.approvalStatus === 'approved' && (
            <button
              onClick={handleRecordDispatch}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-sage" />
              <span>Record Postal Dispatch</span>
            </button>
          )}

          {currentLetterRecord?.approvalStatus === 'submission_recorded' && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sage-light text-navy text-xs font-semibold rounded-lg border border-sage/30">
              <CheckCircle2 className="w-4 h-4 text-sage-dark" />
              <span>Dispatch Recorded (30-Day Clock Active)</span>
            </div>
          )}
        </div>
      </div>

      {/* Approval Status Audit Notice if present */}
      {currentLetterRecord?.approvalRecord && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-emerald-900">
              Compliance Sign-off Executed:
            </span>{' '}
            Approved by <span className="font-semibold text-navy">{currentLetterRecord.approvalRecord.approvedBy}</span> on {currentLetterRecord.approvalRecord.approvedAt}.
            <p className="text-secondaryText mt-0.5">{currentLetterRecord.approvalRecord.notes}</p>
          </div>
        </div>
      )}

      {/* Split-Screen Workspace (PRD Section 11) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDE: Letter Configuration (5 cols) */}
        <div className="lg:col-span-5 bg-surface rounded-xl border border-borderLine shadow-card p-5 space-y-4">
          <div className="pb-3 border-b border-borderLine flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy">Letter Parameters</h3>
            <span className="text-[11px] text-secondaryText">Auto-generates preview</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Target Client</label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.id})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Target Bureau</label>
              <select
                value={selectedBureau}
                onChange={(e) => setSelectedBureau(e.target.value as Bureau)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
              >
                <option value="Equifax">Equifax</option>
                <option value="Experian">Experian</option>
                <option value="TransUnion">TransUnion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Dispute Round</label>
              <select
                value={disputeRound}
                onChange={(e) => setDisputeRound(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
              >
                <option value={1}>Round 1 (Initial Challenge)</option>
                <option value={2}>Round 2 (Method of Verification)</option>
                <option value={3}>Round 3 (Bureau Escalation)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Letter Template</label>
            <select
              value={selectedTemplateId}
              onChange={(e) => {
                setSelectedTemplateId(e.target.value);
                setIsRawEditing(false);
              }}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              {templates.map(t => (
                <option key={t.id} value={t.id}>{t.title} ({t.category})</option>
              ))}
            </select>
            <p className="text-[10px] text-secondaryText mt-1 italic">
              {selectedTemplate.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Creditor / Furnisher</label>
              <input
                type="text"
                value={creditorName}
                onChange={(e) => setCreditorName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Account Ref (Masked)</label>
              <input
                type="text"
                value={accountMasked}
                onChange={(e) => setAccountMasked(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Dispute Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          {/* Attached Evidence Files */}
          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5 flex items-center justify-between">
              <span>Attached Evidence Documentation</span>
              <span className="text-[10px] text-sage-dark">{attachedFiles.length} attached</span>
            </label>
            <div className="space-y-1.5">
              {attachedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-warm/50 text-xs border border-borderLine">
                  <span className="truncate text-navy font-mono text-[11px] flex items-center gap-1.5">
                    <Paperclip className="w-3 h-3 text-secondaryText" />
                    {file}
                  </span>
                  <button
                    onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                    className="text-secondaryText hover:text-[#BD3838] ml-2 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bureau Mailing Destination Preview */}
          <div className="p-3 bg-warm/40 rounded-xl border border-borderLine text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-secondaryText block">
              Bureau Mailing Destination (Mock Verified)
            </span>
            <p className="font-semibold text-navy">{selectedBureauEntry.mailingAddress.line1}</p>
            <p className="text-secondaryText text-[11px]">{selectedBureauEntry.mailingAddress.line2}</p>
            <p className="text-secondaryText text-[11px]">
              {selectedBureauEntry.mailingAddress.city}, {selectedBureauEntry.mailingAddress.state} {selectedBureauEntry.mailingAddress.zip}
            </p>
          </div>

        </div>

        {/* RIGHT SIDE: Live Document Preview (7 cols) */}
        <div className="lg:col-span-7 bg-surface rounded-xl border border-borderLine shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderLine">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-sage-dark" />
              <h3 className="text-sm font-semibold text-navy">Live Formal Document Output</h3>
            </div>
            
            <button
              onClick={() => setIsRawEditing(!isRawEditing)}
              className="px-2.5 py-1 text-xs font-medium text-navy hover:bg-warm rounded border border-borderLine flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3 text-secondaryText" />
              <span>{isRawEditing ? 'Switch to Form Sync' : 'Direct Text Edit'}</span>
            </button>
          </div>

          {/* Letter Formal Sheet Simulation */}
          <div className="bg-[#FAFBF9] rounded-xl p-8 border border-borderLine shadow-subtle font-mono text-xs text-navy leading-relaxed min-h-[580px] overflow-x-auto whitespace-pre-wrap select-text">
            {isRawEditing ? (
              <textarea
                value={editableBody}
                onChange={(e) => setEditableBody(e.target.value)}
                rows={22}
                className="w-full bg-transparent font-mono text-xs focus:outline-none resize-none leading-relaxed"
              />
            ) : (
              editableBody
            )}
          </div>

          {/* Security & Disclaimer Footer */}
          <div className="p-3 rounded-lg bg-warm/30 border border-borderLine text-[11px] text-secondaryText flex items-center justify-between">
            <span className="italic">
              * Illustrative sample dispute text under FCRA § 611(a) reinvestigation procedures.
            </span>
            <span className="font-semibold text-navy">Dispute Alpha Engine</span>
          </div>

        </div>

      </div>
    </div>
  );
};

