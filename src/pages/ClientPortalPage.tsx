import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BrandLogo } from '../components/common/BrandLogo';
import { Badge } from '../components/common/Badge';
import { 
  LayoutDashboard, 
  TrendingUp, 
  FolderArchive, 
  Mail, 
  MessageSquare, 
  User, 
  Upload, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Send, 
  ShieldCheck,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export const ClientPortalPage: React.FC = () => {
  const { clients, disputes, documents, switchRole, showToast } = useApp();
  const navigate = useNavigate();

  // Find demo client Jordan Hayes
  const client = clients.find(c => c.id === 'CLI-8492') || clients[0];
  const clientDisputes = disputes.filter(d => d.clientId === client.id);
  const clientDocs = documents.filter(d => d.clientId === client.id);

  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'documents' | 'letters' | 'messages' | 'profile'>('overview');
  
  // Messaging state
  const [messages, setMessages] = useState([
    {
      id: 'MSG-1',
      sender: 'staff',
      senderName: 'Sarah Jenkins (Senior Dispute Specialist)',
      text: 'Hello Jordan, we have reviewed your Tri-Bureau credit report and prepared a Round 1 challenge regarding the Metro Collection Group settled account. It has been approved for dispatch.',
      timestamp: 'Oct 18, 2026 • 11:30 AM',
    },
    {
      id: 'MSG-2',
      sender: 'client',
      senderName: 'Jordan Hayes',
      text: 'Thank you Sarah! I also uploaded my recent bank statement showing the automatic deduction for Summit Auto Finance.',
      timestamp: 'Oct 21, 2026 • 02:15 PM',
    },
    {
      id: 'MSG-3',
      sender: 'staff',
      senderName: 'Sarah Jenkins (Senior Dispute Specialist)',
      text: 'Received! We have attached that payment proof to our verification letter for Experian. We will notify you as soon as the bureau returns their response.',
      timestamp: 'Oct 22, 2026 • 09:20 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Upload simulation state
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Supporting Documents');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: `MSG-${Date.now()}`,
      sender: 'client' as const,
      senderName: `${client.firstName} ${client.lastName}`,
      text: chatInput,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
    showToast('Message transmitted to your dispute specialist.', 'success');
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim()) return;
    showToast(`Uploaded ${uploadName} successfully!`, 'success');
    setUploadName('');
  };

  // 7-step visual progress timeline (PRD Section 20)
  const progressSteps = [
    { title: 'Enrollment', status: 'completed', desc: 'Agreement and intake verified' },
    { title: 'Documents Received', status: 'completed', desc: 'ID and proof of address confirmed' },
    { title: 'Credit Report Review', status: 'completed', desc: 'Tradelines audited across 3 bureaus' },
    { title: 'Dispute Preparation', status: 'completed', desc: 'Formal challenge packages drafted' },
    { title: 'Internal Approval', status: 'completed', desc: 'Senior compliance sign-off executed' },
    { title: 'Submission Recorded', status: 'active', desc: 'Dispatched via Certified Mail tracking' },
    { title: 'Response Tracking', status: 'upcoming', desc: 'Awaiting statutory 30-day bureau results' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F4] flex flex-col text-primaryText selection:bg-sage-light selection:text-navy">
      {/* Client Portal Header Bar */}
      <header className="bg-surface border-b border-borderLine sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BrandLogo size="sm" showTagline={false} />
          <span className="hidden sm:inline-block text-[11px] font-semibold tracking-wider uppercase text-sage-dark bg-sage-light px-2.5 py-0.5 rounded-full">
            Client Portal
          </span>
        </div>

        {/* Persona Switcher shortcut back to Admin/Staff */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              switchRole('admin');
              navigate('/app/dashboard');
            }}
            className="text-xs font-semibold text-navy bg-warm hover:bg-warm/80 px-3 py-1.5 rounded-lg border border-borderLine flex items-center gap-1.5 transition-colors"
          >
            <span>Return to Admin View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Client Shell */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Navigation Tabs (Welcoming & Simple) */}
        <div className="bg-surface rounded-xl p-1.5 border border-borderLine shadow-subtle flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'progress', label: 'My Progress', icon: TrendingUp },
            { id: 'documents', label: 'Documents', icon: FolderArchive },
            { id: 'letters', label: 'My Letters', icon: Mail },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'profile', label: 'My Profile', icon: User },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-secondaryText hover:text-navy hover:bg-warm'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Greeting Card */}
            <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-borderLine shadow-card">
              <div className="max-w-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sage-dark">
                  Client Case ID: {client.id}
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif text-navy font-normal tracking-tight mt-1">
                  Welcome back, {client.firstName}.
                </h1>
                <p className="text-xs sm:text-sm text-secondaryText mt-2 leading-relaxed">
                  Your dedicated specialist, <span className="font-semibold text-navy">{client.assignedStaffName}</span>, is actively managing your credit file disputes. Here is your current case summary.
                </p>
              </div>

              {/* Status Metric Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-borderLine">
                <div className="p-4 bg-warm/40 rounded-xl border border-borderLine">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Active Disputes</span>
                  <div className="text-2xl font-bold text-navy mt-1">{client.activeDisputesCount} Tradelines</div>
                  <span className="text-[11px] text-[#2E7D5B] font-medium">In Round 1 Investigation</span>
                </div>

                <div className="p-4 bg-warm/40 rounded-xl border border-borderLine">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Document Verification</span>
                  <div className="text-2xl font-bold text-[#2E7D5B] mt-1">100% Complete</div>
                  <span className="text-[11px] text-secondaryText">All required proofs verified</span>
                </div>

                <div className="p-4 bg-warm/40 rounded-xl border border-borderLine">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondaryText">Next Bureau Milestone</span>
                  <div className="text-2xl font-bold text-navy mt-1">Nov 20, 2026</div>
                  <span className="text-[11px] text-secondaryText">Equifax response due</span>
                </div>
              </div>
            </div>

            {/* Active Items & Milestones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Active Disputes Card */}
              <div className="bg-surface rounded-xl p-6 border border-borderLine shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-borderLine">
                  <h3 className="text-sm font-semibold text-navy">Items Being Challenged</h3>
                  <span className="text-xs text-secondaryText">{clientDisputes.length} active</span>
                </div>

                <div className="space-y-3">
                  {clientDisputes.map(d => (
                    <div key={d.id} className="p-3.5 rounded-xl border border-borderLine bg-[#FCFCFB] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-navy">{d.creditorName}</span>
                        <Badge size="sm" variant="sage">
                          Round {d.currentRound}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-secondaryText">
                        Bureau: <span className="font-medium text-navy">{d.bureau}</span> • Reason: {d.disputeCategory}
                      </p>
                      <div className="text-[10px] text-sage-dark font-medium pt-1">
                        Status: Approved & Dispatched via Certified Mail
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Updates Feed */}
              <div className="bg-surface rounded-xl p-6 border border-borderLine shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-borderLine">
                  <h3 className="text-sm font-semibold text-navy">Recent Account Updates</h3>
                  <span className="text-xs text-sage-dark font-medium">Live Feed</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-warm/30 border border-borderLine flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-navy">Dispute Letter Approved for Equifax</p>
                      <p className="text-[11px] text-secondaryText mt-0.5">
                        Your dispute regarding Metro Collection Group was audited and dispatched.
                      </p>
                      <span className="text-[10px] text-secondaryText/80 mt-1 block">Oct 18, 2026</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-warm/30 border border-borderLine flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-navy">Settlement Agreement Verified</p>
                      <p className="text-[11px] text-secondaryText mt-0.5">
                        Your uploaded settlement proof was reviewed and attached to the bureau packet.
                      </p>
                      <span className="text-[10px] text-secondaryText/80 mt-1 block">Oct 15, 2026</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: My Progress */}
        {activeTab === 'progress' && (
          <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-borderLine shadow-card space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-navy">Your Dispute Lifecycle Progress</h2>
              <p className="text-xs text-secondaryText mt-1">
                Visual roadmap showing each stage of your case from initial intake to bureau resolution.
              </p>
            </div>

            {/* 7-Step Horizontal / Vertical Progress Flow */}
            <div className="space-y-4 pt-4">
              {progressSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    step.status === 'completed'
                      ? 'bg-[#EEF7F2] border-[#D1EBDD]'
                      : step.status === 'active'
                        ? 'bg-surface border-navy ring-1 ring-navy shadow-subtle'
                        : 'bg-[#FCFCFB] border-borderLine opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.status === 'completed'
                        ? 'bg-[#2E7D5B] text-white'
                        : step.status === 'active'
                          ? 'bg-navy text-white'
                          : 'bg-warm text-secondaryText'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-navy">{step.title}</h4>
                      <p className="text-[11px] text-secondaryText">{step.desc}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    step.status === 'completed'
                      ? 'bg-white text-[#2E7D5B]'
                      : step.status === 'active'
                        ? 'bg-navy text-white'
                        : 'bg-warm text-secondaryText'
                  }`}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Documents Upload Simulation */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl p-6 border border-borderLine shadow-card">
              <h3 className="text-base font-semibold text-navy">Upload Supporting Document</h3>
              <p className="text-xs text-secondaryText mt-1 mb-4">
                Upload your updated ID, utility bills, or receipts from creditors to substantiate your disputes.
              </p>

              <form onSubmit={handleUploadDoc} className="space-y-3 max-w-lg">
                <div>
                  <input
                    type="text"
                    placeholder="Document title (e.g. Utility_Bill_Nov_2026.pdf)"
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="px-3 py-1.5 text-xs border border-borderLine rounded-lg bg-surface text-navy focus:outline-none focus:ring-1 focus:ring-sage"
                  >
                    <option value="Supporting Documents">Proof of Payment / Settlement</option>
                    <option value="Agreements">Identification Document</option>
                    <option value="Other">Utility Bill / Proof of Address</option>
                  </select>

                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-sage" />
                    <span>Upload Document</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Document Files List */}
            <div className="bg-surface rounded-2xl p-6 border border-borderLine shadow-card space-y-3">
              <h3 className="text-sm font-semibold text-navy pb-2 border-b border-borderLine">
                Verified Documents on File
              </h3>
              <div className="divide-y divide-borderLine">
                {clientDocs.map(doc => (
                  <div key={doc.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-navy">{doc.name}</p>
                      <p className="text-[11px] text-secondaryText">{doc.category} • Uploaded {doc.uploadDate}</p>
                    </div>
                    <Badge size="sm" variant="success">
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Letters (Client-Facing Sanitized View - No Internal Notes) */}
        {activeTab === 'letters' && (
          <div className="bg-surface rounded-2xl p-6 border border-borderLine shadow-card space-y-4">
            <div>
              <h3 className="text-base font-semibold text-navy">Your Dispute Correspondence</h3>
              <p className="text-xs text-secondaryText mt-1">
                Formal letters approved and sent to credit bureaus on your behalf.
              </p>
            </div>

            <div className="divide-y divide-borderLine">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] text-secondaryText">LETTER LTR-3081</span>
                  <h4 className="text-sm font-semibold text-navy mt-0.5">Equifax • Metro Collection Group</h4>
                  <p className="text-xs text-secondaryText mt-0.5">
                    Category: Unverified Collection Settlement • Round 1
                  </p>
                  <p className="text-[11px] text-secondaryText/80 mt-1">
                    Dispatched via Certified Mail tracking #940011189956281001
                  </p>
                </div>
                <Badge variant="success">
                  Dispatched & Active
                </Badge>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] text-secondaryText">LETTER LTR-3082</span>
                  <h4 className="text-sm font-semibold text-navy mt-0.5">Experian • Summit Auto Finance</h4>
                  <p className="text-xs text-secondaryText mt-0.5">
                    Category: Payment History Review • Round 1
                  </p>
                  <p className="text-[11px] text-secondaryText/80 mt-1">
                    Under final review by compliance director prior to mailing
                  </p>
                </div>
                <Badge variant="pending">
                  In Preparation
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Messages */}
        {activeTab === 'messages' && (
          <div className="bg-surface rounded-2xl border border-borderLine shadow-card flex flex-col h-[520px]">
            <div className="p-4 border-b border-borderLine flex items-center justify-between bg-[#FCFCFB]">
              <div>
                <h3 className="text-sm font-semibold text-navy">Direct Message Specialist</h3>
                <p className="text-xs text-secondaryText">Direct communication with {client.assignedStaffName}</p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'client' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-secondaryText mb-1 font-medium">{msg.senderName}</span>
                  <div className={`p-3.5 rounded-xl max-w-md text-xs leading-relaxed ${
                    msg.sender === 'client'
                      ? 'bg-navy text-white rounded-br-none'
                      : 'bg-warm/70 text-navy border border-borderLine rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-secondaryText/70 mt-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-borderLine flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message to your specialist..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 6: Profile */}
        {activeTab === 'profile' && (
          <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-borderLine shadow-card space-y-4 max-w-xl">
            <h3 className="text-base font-semibold text-navy">Your Contact Information</h3>
            <p className="text-xs text-secondaryText">
              Keep your contact details up-to-date so bureau correspondence reaches you reliably.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-secondaryText mb-1">Full Legal Name</label>
                <input
                  type="text"
                  disabled
                  value={`${client.firstName} ${client.lastName}`}
                  className="w-full px-3 py-2 border border-borderLine rounded-lg bg-warm/30 text-navy font-medium"
                />
              </div>

              <div>
                <label className="block text-secondaryText mb-1">Email</label>
                <input
                  type="text"
                  defaultValue={client.email}
                  className="w-full px-3 py-2 border border-borderLine rounded-lg bg-surface text-navy font-medium focus:ring-1 focus:ring-sage"
                />
              </div>

              <div>
                <label className="block text-secondaryText mb-1">Mailing Address</label>
                <input
                  type="text"
                  defaultValue={`${client.address.street}, ${client.address.city}, ${client.address.state} ${client.address.zip}`}
                  className="w-full px-3 py-2 border border-borderLine rounded-lg bg-surface text-navy font-medium focus:ring-1 focus:ring-sage"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Profile details updated.', 'success')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-navy rounded-lg"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

