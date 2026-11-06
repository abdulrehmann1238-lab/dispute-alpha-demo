import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose }) => {
  const { addTask, clients, disputes, teamMembers } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [relatedDisputeId, setRelatedDisputeId] = useState('');
  const [assignedToId, setAssignedToId] = useState(teamMembers[1]?.id || 'USR-STAFF-1');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().substring(0, 10);
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    const selectedClient = clients.find(c => c.id === clientId);
    const assignedMember = teamMembers.find(t => t.id === assignedToId);

    addTask({
      title,
      description,
      clientId: clientId || undefined,
      clientName: selectedClient ? `${selectedClient.firstName} ${selectedClient.lastName}` : undefined,
      relatedDisputeId: relatedDisputeId || undefined,
      assignedToId,
      assignedToName: assignedMember?.name || 'Sarah Jenkins',
      priority,
      dueDate,
    });

    onClose();
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Operational Task"
      description="Assign dispute investigation, follow-up, or document auditing tasks to your team."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Task Title <span className="text-[#BD3838]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. Audit Round 2 response from Equifax"
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
          />
          {error && <p className="text-[11px] text-[#BD3838] mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Key action items, statutory deadlines, or specific verification requirements..."
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Related Client</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="">None / Internal Ops</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.id})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Assigned Staff</label>
            <select
              value={assignedToId}
              onChange={(e) => setAssignedToId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              {teamMembers.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Due Date</label>
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
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

