import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FileText, ArrowRight, Eye, Copy, CheckCircle2 } from 'lucide-react';
import { LetterTemplate } from '../types';
import { Modal } from '../components/common/Modal';

export const TemplatesPage: React.FC = () => {
  const { templates, showToast } = useApp();
  const navigate = useNavigate();

  const [previewTemplate, setPreviewTemplate] = useState<LetterTemplate | null>(null);

  const handleCopy = (body: string) => {
    navigator.clipboard.writeText(body);
    showToast('Template body copied to clipboard!', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Template Preview Modal */}
      {previewTemplate && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewTemplate(null)}
          title={previewTemplate.title}
          description={`Category: ${previewTemplate.category}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <p className="text-xs text-secondaryText italic">{previewTemplate.description}</p>
            <div className="p-4 rounded-xl bg-background border border-borderLine font-mono text-xs text-navy whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {previewTemplate.bodyTemplate}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-borderLine">
              <button
                onClick={() => handleCopy(previewTemplate.bodyTemplate)}
                className="px-3.5 py-1.5 text-xs font-semibold text-navy bg-warm hover:bg-warm/80 rounded-lg border border-borderLine flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Raw Template</span>
              </button>
              <button
                onClick={() => {
                  setPreviewTemplate(null);
                  navigate('/app/letters/editor');
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg flex items-center gap-1.5"
              >
                <span>Apply in Letter Studio</span>
                <ArrowRight className="w-3.5 h-3.5 text-sage" />
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Letter Templates</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Standardized dispute templates with dynamic bureau and client variable placeholders.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/letters/editor')}
          className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <FileText className="w-3.5 h-3.5 text-sage" />
          <span>Open Letter Studio</span>
        </button>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map(tmpl => (
          <div
            key={tmpl.id}
            className="bg-surface rounded-xl p-6 border border-borderLine shadow-card flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-dark bg-sage-light px-2 py-0.5 rounded">
                  {tmpl.category}
                </span>
                <span className="font-mono text-xs text-secondaryText">{tmpl.id}</span>
              </div>
              <h3 className="text-base font-semibold text-navy">{tmpl.title}</h3>
              <p className="text-xs text-secondaryText mt-2 leading-relaxed">
                {tmpl.description}
              </p>
            </div>

            <div className="pt-4 border-t border-borderLine flex items-center justify-between">
              <button
                onClick={() => setPreviewTemplate(tmpl)}
                className="text-xs font-semibold text-navy hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Template</span>
              </button>

              <button
                onClick={() => navigate('/app/letters/editor')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm flex items-center gap-1"
              >
                <span>Use</span>
                <ArrowRight className="w-3 h-3 text-sage" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

