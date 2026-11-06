import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { Building2, Edit2, Phone, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BureauDirectoryEntry } from '../types';

export const BureauDirectoryPage: React.FC = () => {
  const { bureauDirectory, updateBureauEntry, currentUser } = useApp();

  const [editingEntry, setEditingEntry] = useState<BureauDirectoryEntry | null>(null);
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleOpenEdit = (entry: BureauDirectoryEntry) => {
    setEditingEntry(entry);
    setLine1(entry.mailingAddress.line1);
    setLine2(entry.mailingAddress.line2 || '');
    setCity(entry.mailingAddress.city);
    setState(entry.mailingAddress.state);
    setZip(entry.mailingAddress.zip);
    setPhone(entry.phone);
    setNotes(entry.notes);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;

    updateBureauEntry(editingEntry.id, {
      mailingAddress: {
        line1,
        line2,
        city,
        state,
        zip,
      },
      phone,
      notes,
      lastVerified: new Date().toISOString().substring(0, 10),
    });

    setEditingEntry(null);
  };

  return (
    <div className="space-y-6">
      {/* Edit Modal */}
      {editingEntry && (
        <Modal
          isOpen={true}
          onClose={() => setEditingEntry(null)}
          title={`Edit Bureau Record: ${editingEntry.name}`}
          description="Update mailing routing address for dispute dispatch."
          maxWidth="md"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Mailing Line 1</label>
              <input
                type="text"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Mailing Line 2 / Department</label>
              <input
                type="text"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">ZIP</label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Support Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Routing & Dispatch Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-borderLine">
              <button
                type="button"
                onClick={() => setEditingEntry(null)}
                className="px-4 py-2 text-xs text-secondaryText hover:text-navy rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm"
              >
                Save Record
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Bureau Directory</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Maintain verified mailing routing addresses and statutory dispatch rules for the major credit bureaus.
          </p>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-4 bg-warm/60 border border-borderLine rounded-xl text-xs text-secondaryText leading-relaxed">
        <span className="font-semibold text-navy">Demonstration Disclaimer:</span> Addresses shown are clearly marked demonstration placeholders for simulation testing. Always verify current statutory mailing addresses prior to live postal dispatch.
      </div>

      {/* Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bureauDirectory.map(bureau => (
          <div
            key={bureau.id}
            className="bg-surface rounded-xl p-6 border border-borderLine shadow-card space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-navy">{bureau.name}</h3>
                  <Badge size="sm" variant="success">
                    {bureau.status}
                  </Badge>
                </div>
                <span className="text-[10px] text-secondaryText">Verified {bureau.lastVerified}</span>
              </div>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => handleOpenEdit(bureau)}
                  className="p-1.5 rounded-lg border border-borderLine text-secondaryText hover:text-navy hover:bg-warm transition-colors flex items-center gap-1 text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {/* Mailing Address Box */}
            <div className="p-3.5 bg-background rounded-lg border border-borderLine font-mono text-xs text-navy space-y-0.5">
              <p className="font-semibold">{bureau.mailingAddress.line1}</p>
              {bureau.mailingAddress.line2 && <p className="text-secondaryText">{bureau.mailingAddress.line2}</p>}
              <p>
                {bureau.mailingAddress.city}, {bureau.mailingAddress.state} {bureau.mailingAddress.zip}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-secondaryText">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {bureau.phone}
              </span>
              <span className="flex items-center gap-1.5 truncate">
                <Globe className="w-3.5 h-3.5" />
                {bureau.website}
              </span>
            </div>

            <p className="text-[11px] text-secondaryText leading-relaxed pt-2 border-t border-borderLine">
              {bureau.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

