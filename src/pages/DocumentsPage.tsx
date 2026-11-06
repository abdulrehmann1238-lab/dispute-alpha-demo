import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { 
  FolderArchive, 
  Upload, 
  Search, 
  FileText, 
  Download, 
  Eye, 
  Filter, 
  Grid, 
  List,
  CheckCircle2,
  Paperclip
} from 'lucide-react';
import { DocumentItem } from '../types';

export const DocumentsPage: React.FC = () => {
  const { documents, addDocument, clients, showToast } = useApp();

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Upload Form
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<any>('Supporting Documents');
  const [newDocClient, setNewDocClient] = useState(clients[0]?.id || '');

  const categories = [
    'Agreements',
    'Credit Reports',
    'Supporting Documents',
    'Dispute Letters',
    'Bureau Responses',
    'Other',
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.clientName.toLowerCase().includes(search.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && doc.category === selectedCategory;
  });

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const client = clients.find(c => c.id === newDocClient);

    addDocument({
      name: newDocName.endsWith('.pdf') ? newDocName : `${newDocName}.pdf`,
      category: newDocCategory,
      clientId: newDocClient,
      clientName: client ? `${client.firstName} ${client.lastName}` : 'Client',
      uploadedBy: 'Alex Vance',
      fileType: 'PDF',
      fileSize: '1.2 MB',
    });

    setIsUploadOpen(false);
    setNewDocName('');
  };

  return (
    <div className="space-y-6">
      {/* Document Preview Modal */}
      {previewDoc && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewDoc(null)}
          title={`Document Preview: ${previewDoc.name}`}
          description={`${previewDoc.category} • Client: ${previewDoc.clientName} • File Size: ${previewDoc.fileSize}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="h-96 bg-warm/30 rounded-xl border border-borderLine flex flex-col items-center justify-center p-8 text-center">
              <FileText className="w-16 h-16 text-sage mb-3" />
              <h4 className="text-base font-semibold text-navy">{previewDoc.name}</h4>
              <p className="text-xs text-secondaryText max-w-sm mt-1">
                Fictional mock preview representation for compliance verification.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-surface border border-borderLine text-secondaryText">
                  STATUS: {previewDoc.status}
                </span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-surface border border-borderLine text-secondaryText">
                  UPLOADED: {previewDoc.uploadDate}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-borderLine">
              <button
                onClick={() => showToast(`Simulated download of ${previewDoc.name}`, 'info')}
                className="px-3.5 py-2 text-xs font-semibold text-navy bg-warm hover:bg-warm/80 rounded-lg border border-borderLine flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sample</span>
              </button>

              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg"
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Simulated Upload Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Simulate Document Ingestion"
        description="Attach client agreements, utility bills, or bureau result letters."
        maxWidth="md"
      >
        <form onSubmit={handleSimulateUpload} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Document File Name</label>
            <input
              type="text"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="e.g. Utility_Bill_November_Proof.pdf"
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Document Category</label>
              <select
                value={newDocCategory}
                onChange={(e) => setNewDocCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Associate with Client</label>
              <select
                value={newDocClient}
                onChange={(e) => setNewDocClient(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 border-2 border-dashed border-borderLine rounded-xl text-center bg-[#FCFCFB]">
            <Upload className="w-6 h-6 text-secondaryText mx-auto mb-1" />
            <p className="text-xs font-medium text-navy">Simulated local file ingestion</p>
            <p className="text-[10px] text-secondaryText mt-0.5">Files are held locally in demonstration state</p>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-borderLine">
            <button
              type="button"
              onClick={() => setIsUploadOpen(false)}
              className="px-4 py-2 text-xs text-secondaryText hover:text-navy rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm"
            >
              Simulate Upload
            </button>
          </div>
        </form>
      </Modal>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Document Library</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Central repository for service agreements, utility bills, credit reports, and bureau results.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Upload className="w-3.5 h-3.5 text-sage" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="p-4 bg-surface rounded-xl border border-borderLine shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all' ? 'bg-navy text-white shadow-xs' : 'text-secondaryText hover:text-navy hover:bg-warm'
            }`}
          >
            All Categories ({documents.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-navy text-white shadow-xs' : 'text-secondaryText hover:text-navy hover:bg-warm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-secondaryText absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          <div className="inline-flex rounded-lg bg-warm/60 p-1 border border-borderLine">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-surface text-navy' : 'text-secondaryText'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-surface text-navy' : 'text-secondaryText'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Mode */}
      {viewMode === 'table' && (
        <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF9] text-secondaryText uppercase text-[10px] tracking-wider border-b border-borderLine">
                <tr>
                  <th className="py-3 px-5 font-semibold">Document Name</th>
                  <th className="py-3 px-4 font-semibold">Client</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Uploaded By</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Size</th>
                  <th className="py-3 px-5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderLine">
                {filteredDocuments.map(doc => (
                  <tr
                    key={doc.id}
                    onClick={() => setPreviewDoc(doc)}
                    className="hover:bg-warm/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-5">
                      <div className="font-semibold text-navy flex items-center gap-2">
                        <FileText className="w-4 h-4 text-sage-dark flex-shrink-0" />
                        <span className="truncate max-w-xs">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-navy">
                      {doc.clientName}
                    </td>
                    <td className="py-3 px-4 text-secondaryText">
                      {doc.category}
                    </td>
                    <td className="py-3 px-4 text-secondaryText">
                      {doc.uploadedBy}
                    </td>
                    <td className="py-3 px-4 text-secondaryText">
                      {doc.uploadDate}
                    </td>
                    <td className="py-3 px-4 text-secondaryText font-mono text-[11px]">
                      {doc.fileSize}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewDoc(doc);
                        }}
                        className="px-2.5 py-1 text-xs font-medium text-navy hover:bg-warm rounded border border-borderLine"
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map(doc => (
            <div
              key={doc.id}
              onClick={() => setPreviewDoc(doc)}
              className="bg-surface rounded-xl p-4 border border-borderLine shadow-subtle hover:border-sage hover:shadow-card cursor-pointer transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-lg bg-warm/60 text-sage-dark">
                  <FileText className="w-5 h-5" />
                </div>
                <Badge size="sm" variant="sage">
                  {doc.fileType}
                </Badge>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-navy truncate" title={doc.name}>{doc.name}</h4>
                <p className="text-[11px] text-secondaryText mt-0.5">{doc.clientName}</p>
              </div>

              <div className="pt-2 border-t border-borderLine flex items-center justify-between text-[10px] text-secondaryText">
                <span>{doc.category}</span>
                <span>{doc.fileSize}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

