import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface FlagDiscrepancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  accountId: string;
  creditorName: string;
}

export const FlagDiscrepancyModal: React.FC<FlagDiscrepancyModalProps> = ({
  isOpen,
  onClose,
  reportId,
  accountId,
  creditorName,
}) => {
  const { flagDiscrepancy, teamMembers, currentUser } = useApp();

  const [category, setCategory] = useState<any>('Balance Discrepancy');
  const [description, setDescription] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [assignedStaff, setAssignedStaff] = useState(currentUser.name);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Investigation description is required');
      return;
    }

    flagDiscrepancy(reportId, accountId, {
      category,
      description,
      evidenceNotes,
      assignedStaff,
    });

    onClose();
    setDescription('');
    setEvidenceNotes('');
    setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Flag Potential Discrepancy"
      description={`Identify potential reporting inconsistencies for ${creditorName} for staff investigation.`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">Issue Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
          >
            <option value="Balance Discrepancy">Balance requires verification</option>
            <option value="Account Status Review">Account status requires review</option>
            <option value="Duplicate Reporting">Duplicate reporting requires investigation</option>
            <option value="Payment History Discrepancy">Payment history discrepancy</option>
            <option value="Personal Information Mismatch">Personal information mismatch</option>
            <option value="Unverified Collection">Unverified third-party collection</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Factual Description <span className="text-[#BD3838]">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError('');
            }}
            rows={2}
            placeholder="e.g. Account settled with zero balance receipt on Nov 2024, yet active balance reported..."
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
          />
          {error && <p className="text-[11px] text-[#BD3838] mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">Evidence & Substantiation Notes</label>
          <textarea
            value={evidenceNotes}
            onChange={(e) => setEvidenceNotes(e.target.value)}
            rows={2}
            placeholder="Attached bank statement, settlement letter, or client ACH clearing confirmation..."
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">Assigned Investigator</label>
          <select
            value={assignedStaff}
            onChange={(e) => setAssignedStaff(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
          >
            {teamMembers.map(t => (
              <option key={t.id} value={t.name}>{t.name} ({t.role})</option>
            ))}
          </select>
        </div>

        <div className="p-3 bg-warm/50 rounded-lg border border-borderLine text-[11px] text-secondaryText leading-relaxed">
          <span className="font-semibold text-navy">Compliance note:</span> Accounts flagged here are tracked as potential discrepancies subject to human verification and do not represent automated legal invalidity determinations.
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
            Flag For Review
          </button>
        </div>
      </form>
    </Modal>
  );
};

