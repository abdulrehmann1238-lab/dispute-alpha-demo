import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ 
  isOpen, 
  onClose,
  title = "Request a Private Demonstration"
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid corporate email required';
    if (!company.trim()) errs.company = 'Company name is required';
    if (!message.trim()) errs.message = 'Please share your operational dispute volume or goals';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={submitted ? "Request Acknowledged" : title}
      description={submitted ? "" : "Experience how Dispute Alpha orchestrates professional credit repair operations."}
      maxWidth="md"
    >
      {submitted ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-navy">Demonstration Request Received</h4>
          <p className="text-xs text-secondaryText max-w-sm mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-navy">{fullName}</span>. In a production deployment, our solutions architect would contact you at <span className="font-semibold text-navy">{email}</span> to tailor an operational walkthrough.
          </p>
          <div className="pt-4">
            <button
              onClick={handleReset}
              className="px-5 py-2 text-xs font-medium text-white bg-navy hover:bg-navy-light rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Full Name <span className="text-[#BD3838]">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Eleanor Vance"
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
                errors.fullName ? 'border-[#BD3838]' : 'border-borderLine'
              }`}
            />
            {errors.fullName && <p className="text-[11px] text-[#BD3838] mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Business Email <span className="text-[#BD3838]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.vance@company.com"
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
                errors.email ? 'border-[#BD3838]' : 'border-borderLine'
              }`}
            />
            {errors.email && <p className="text-[11px] text-[#BD3838] mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Company / Firm Name <span className="text-[#BD3838]">*</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Apex Credit Solutions"
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
                errors.company ? 'border-[#BD3838]' : 'border-borderLine'
              }`}
            />
            {errors.company && <p className="text-[11px] text-[#BD3838] mt-1">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Operational Message <span className="text-[#BD3838]">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Tell us about your team size, active dispute volume, or current software challenges..."
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sage ${
                errors.message ? 'border-[#BD3838]' : 'border-borderLine'
              }`}
            />
            {errors.message && <p className="text-[11px] text-[#BD3838] mt-1">{errors.message}</p>}
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
              className="px-5 py-2 text-xs font-medium text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

