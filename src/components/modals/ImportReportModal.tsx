import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Bureau } from '../../types';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface ImportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportReportModal: React.FC<ImportReportModalProps> = ({ isOpen, onClose }) => {
  const { importReport, clients } = useApp();

  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [bureau, setBureau] = useState<Bureau>('Equifax');
  const [source, setSource] = useState('Authorized IdentityIQ Partner Simulation');
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStartImport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsImporting(true);
    setProgress(20);

    const step1 = setTimeout(() => setProgress(55), 400);
    const step2 = setTimeout(() => setProgress(85), 800);
    const step3 = setTimeout(() => {
      setProgress(100);
      importReport(clientId, bureau, source);
      setIsImporting(false);
      setProgress(0);
      onClose();
    }, 1200);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Credit Report"
      description="Simulate ingestion of credit monitoring tradeline disclosures."
      maxWidth="md"
    >
      <form onSubmit={handleStartImport} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Client <span className="text-[#BD3838]">*</span>
          </label>
          <select
            value={clientId}
            disabled={isImporting}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
          >
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.id})</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Bureau</label>
            <select
              value={bureau}
              disabled={isImporting}
              onChange={(e) => setBureau(e.target.value as Bureau)}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="Equifax">Equifax</option>
              <option value="Experian">Experian</option>
              <option value="TransUnion">TransUnion</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Report Date</label>
            <input
              type="date"
              defaultValue={new Date().toISOString().substring(0, 10)}
              disabled={isImporting}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">Authorized Import Source</label>
          <select
            value={source}
            disabled={isImporting}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
          >
            <option value="Authorized IdentityIQ Partner Simulation">IdentityIQ Direct API Simulation</option>
            <option value="SmartCredit Authorized Feed Simulation">SmartCredit Monitoring Feed</option>
            <option value="PrivacyGuard Data Ingestion Simulation">PrivacyGuard Monitoring Feed</option>
            <option value="Manual Tri-Bureau PDF Parser Simulation">Manual Credit Report PDF Parser</option>
          </select>
        </div>

        {/* Import Progress state */}
        {isImporting && (
          <div className="p-4 bg-warm/50 rounded-xl border border-borderLine space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-navy">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-sage-dark" />
                Parsing Tradelines & Inquiries...
              </span>
              <span className="font-mono text-secondaryText">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-borderLine rounded-full overflow-hidden">
              <div 
                className="h-full bg-sage-dark transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-borderLine">
          <button
            type="button"
            disabled={isImporting}
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-secondaryText hover:text-navy rounded-lg hover:bg-warm transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isImporting}
            className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            {isImporting ? 'Ingesting...' : 'Import Report'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

