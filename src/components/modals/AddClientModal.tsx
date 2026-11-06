import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose }) => {
  const { addClient, teamMembers } = useApp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('(555) ');
  const [dob, setDob] = useState('1990-01-01');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('');
  const [assignedStaffId, setAssignedStaffId] = useState(teamMembers[1]?.id || 'USR-STAFF-1');
  const [status, setStatus] = useState<'active' | 'onboarding' | 'pending_documents'>('onboarding');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email address is required';
    if (!street.trim()) newErrors.street = 'Street address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!zip.trim()) newErrors.zip = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const staffMember = teamMembers.find(t => t.id === assignedStaffId);

    addClient({
      firstName,
      lastName,
      email,
      phone,
      dob,
      address: {
        street,
        city,
        state,
        zip,
      },
      assignedStaffId,
      assignedStaffName: staffMember?.name || 'Sarah Jenkins',
      status,
    });

    onClose();
    // reset fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setStreet('');
    setCity('');
    setZip('');
    setNotes('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Client"
      description="Create a client profile for dispute onboarding and credit monitoring import."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              First Name <span className="text-[#BD3838]">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Jordan"
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
                errors.firstName ? 'border-[#BD3838]' : 'border-borderLine'
              }`}
            />
            {errors.firstName && <p className="text-[11px] text-[#BD3838] mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Last Name <span className="text-[#BD3838]">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Hayes"
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
                errors.lastName ? 'border-[#BD3838]' : 'border-borderLine'
              }`}
            />
            {errors.lastName && <p className="text-[11px] text-[#BD3838] mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Email Address <span className="text-[#BD3838]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
                errors.email ? 'border-[#BD3838]' : 'border-borderLine'
              }`}
            />
            {errors.email && <p className="text-[11px] text-[#BD3838] mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 000-0000"
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Date of Birth (Mock)</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Assigned Staff</label>
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
            <label className="block text-xs font-semibold text-navy mb-1">Initial Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="onboarding">Onboarding</option>
              <option value="pending_documents">Pending Documents</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Street Address <span className="text-[#BD3838]">*</span>
          </label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="123 Financial Way, Suite 400"
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
              errors.street ? 'border-[#BD3838]' : 'border-borderLine'
            }`}
          />
          {errors.street && <p className="text-[11px] text-[#BD3838] mt-1">{errors.street}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              City <span className="text-[#BD3838]">*</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Portland"
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
                errors.city ? 'border-[#BD3838]' : 'border-borderLine'
              }`}
            />
            {errors.city && <p className="text-[11px] text-[#BD3838] mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="OR"
              maxLength={2}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              ZIP Code <span className="text-[#BD3838]">*</span>
            </label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="97201"
              maxLength={10}
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
                errors.zip ? 'border-[#BD3838]' : 'border-borderLine'
              }`}
            />
            {errors.zip && <p className="text-[11px] text-[#BD3838] mt-1">{errors.zip}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">Internal Intake Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Preliminary dispute priorities, specific negative tradeline concerns..."
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
          />
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
            Create Client
          </button>
        </div>
      </form>
    </Modal>
  );
};

