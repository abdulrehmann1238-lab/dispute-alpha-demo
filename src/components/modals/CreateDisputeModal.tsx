import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Bureau } from '../../types';

interface CreateDisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateDisputeModal: React.FC<CreateDisputeModalProps> = ({ isOpen, onClose }) => {
  const { addDispute, clients, teamMembers } = useApp();

  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [bureau, setBureau] = useState<Bureau>('Equifax');
  const [creditorName, setCreditorName] = useState('');
  const [category, setCategory] = useState<any>('Inaccurate Balance');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [assignedStaffId, setAssignedStaffId] = useState(teamMembers[1]?.id || 'USR-STAFF-1');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().substring(0, 10);
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditorName.trim()) {
      setError('Creditor / Furnisher name is required');
      return;
    }

    const client = clients.find(c => c.id === clientId);
    const staff = teamMembers.find(t => t.id === assignedStaffId);

    addDispute({
      clientId,
      clientName: client ? `${client.firstName} ${client.lastName}` : 'Client',
      bureau,
      creditorName,
      accountId: `ACC-${Math.floor(100 + Math.random() * 900)}`,
      disputeCategory: category,
      status: 'draft',
      currentRound: 1,
      assignedStaffId,
      assignedStaffName: staff?.name || 'Sarah Jenkins',
      dueDate,
      priority,
    });

    onClose();
    setCreditorName('');
    setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Dispute Record"
      description="Initialize a structured dispute round for bureau reinvestigation and letter drafting."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Client <span className="text-[#BD3838]">*</span>
          </label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
          >
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.id})</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Bureau</label>
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
            <label className="block text-xs font-semibold text-navy mb-1">
              Creditor / Data Furnisher <span className="text-[#BD3838]">*</span>
            </label>
            <input
              type="text"
              value={creditorName}
              onChange={(e) => {
                setCreditorName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. First National Bank"
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
            {error && <p className="text-[11px] text-[#BD3838] mt-1">{error}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Dispute Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="Inaccurate Balance">Inaccurate Balance</option>
              <option value="Late Payment Verification">Late Payment Verification</option>
              <option value="Duplicate Account">Duplicate Account</option>
              <option value="Fraudulent / Identity Dispute">Fraudulent / Identity Dispute</option>
              <option value="Unverified Collection">Unverified Collection</option>
              <option value="Outdated Account">Outdated Account</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Assigned Specialist</label>
            <select
              value={assignedStaffId}
              onChange={(e) => setAssignedStaffId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              {teamMembers.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Statutory Target Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
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
            className="px-4 py-2 text-xs font-medium text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors"
          >
            Create Dispute
          </button>
        </div>
      </form>
    </Modal>
  );
};

