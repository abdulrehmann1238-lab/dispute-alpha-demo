import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Bureau } from '../../types';

interface RecordResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  disputeId: string;
  defaultBureau: Bureau;
  creditorName: string;
}

export const RecordResponseModal: React.FC<RecordResponseModalProps> = ({
  isOpen,
  onClose,
  disputeId,
  defaultBureau,
  creditorName,
}) => {
  const { recordBureauResponse } = useApp();

  const [bureau, setBureau] = useState<Bureau>(defaultBureau);
  const [responseCategory, setResponseCategory] = useState<any>('Updated Information');
  const [outcome, setOutcome] = useState('');
  const [supportingDocName, setSupportingDocName] = useState('');
  const [followUpRequired, setFollowUpRequired] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outcome.trim()) {
      setError('Investigation outcome description is required');
      return;
    }

    recordBureauResponse(disputeId, {
      bureau,
      responseCategory,
      outcome,
      supportingDocName: supportingDocName || undefined,
      followUpRequired,
      notes,
    });

    onClose();
    setOutcome('');
    setNotes('');
    setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Bureau Response"
      description={`Log formal reinvestigation findings from ${bureau} for ${creditorName}.`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Responding Bureau</label>
            <select
              value={bureau}
              onChange={(e) => setBureau(e.target.value as Bureau)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="Equifax">Equifax</option>
              <option value="Experian">Experian</option>
              <option value="TransUnion">TransUnion</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Response Category</label>
            <select
              value={responseCategory}
              onChange={(e) => {
                const val = e.target.value;
                setResponseCategory(val);
                if (val === 'Deleted Information') setFollowUpRequired(false);
                if (val === 'Verified Information') setFollowUpRequired(true);
              }}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="Updated Information">Updated Information</option>
              <option value="Verified Information">Verified Information (Remains)</option>
              <option value="Deleted Information">Deleted Information (Removed)</option>
              <option value="No Response Recorded">No Response Recorded (Statutory Expired)</option>
              <option value="Additional Investigation Required">Additional Investigation Required</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Investigation Finding / Summary <span className="text-[#BD3838]">*</span>
          </label>
          <textarea
            value={outcome}
            onChange={(e) => {
              setOutcome(e.target.value);
              if (error) setError('');
            }}
            rows={2}
            placeholder="e.g. Creditor updated balance to $0; late payment notation removed..."
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
          />
          {error && <p className="text-[11px] text-[#BD3838] mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">Attached Bureau Result File</label>
          <input
            type="text"
            value={supportingDocName}
            onChange={(e) => setSupportingDocName(e.target.value)}
            placeholder="e.g. Equifax_Investigation_Result_Nov2026.pdf"
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">Internal Case Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Strategic notes for next round or client disclosure..."
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>

        <div className="p-3 bg-warm/50 rounded-lg border border-borderLine">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={followUpRequired}
              onChange={(e) => setFollowUpRequired(e.target.checked)}
              className="w-4 h-4 rounded text-navy border-borderLine focus:ring-sage"
            />
            <span className="text-xs font-semibold text-navy">
              Requires Method of Verification (MOV) or subsequent Round 2 escalation
            </span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-borderLine">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-secondaryText hover:text-navy rounded-lg hover:bg-warm transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors"
          >
            Save Bureau Response
          </button>
        </div>
      </form>
    </Modal>
  );
};

