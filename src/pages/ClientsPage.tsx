import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { AddClientModal } from '../components/modals/AddClientModal';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export const ClientsPage: React.FC = () => {
  const { clients } = useApp();
  const navigate = useNavigate();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'onboarding' | 'pending_documents' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Metrics
  const totalCount = clients.length;
  const activeCount = clients.filter(c => c.status === 'active').length;
  const onboardingCount = clients.filter(c => c.status === 'onboarding').length;
  const pendingDocsCount = clients.filter(c => c.status === 'pending_documents').length;

  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.assignedStaffName.toLowerCase().includes(search.toLowerCase());

    if (filter === 'all') return matchesSearch;
    return matchesSearch && c.status === filter;
  });

  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <AddClientModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Clients</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Manage onboarding, documentation, and client relationships.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <UserPlus className="w-3.5 h-3.5 text-sage" />
          <span>+ Add Client</span>
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Clients"
          value={totalCount}
          subtitle="Enrolled in system"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Active Clients"
          value={activeCount}
          subtitle="Active dispute programs"
          icon={<CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />}
        />
        <StatCard
          label="Onboarding"
          value={onboardingCount}
          subtitle="In intake & verification"
          icon={<Clock className="w-4 h-4 text-[#B87A28]" />}
        />
        <StatCard
          label="Awaiting Documents"
          value={pendingDocsCount}
          subtitle="Missing ID / address proof"
          icon={<AlertCircle className="w-4 h-4 text-[#C45738]" />}
        />
      </div>

      {/* Main Table Card */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
        
        {/* Filters and Search Bar */}
        <div className="p-4 border-b border-borderLine flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FCFCFB]">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Clients', count: totalCount },
              { id: 'active', label: 'Active', count: activeCount },
              { id: 'onboarding', label: 'Onboarding', count: onboardingCount },
              { id: 'pending_documents', label: 'Pending Docs', count: pendingDocsCount },
              { id: 'inactive', label: 'Inactive', count: clients.filter(c => c.status === 'inactive').length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id as any);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  filter === tab.id
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-secondaryText hover:text-navy hover:bg-warm'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filter === tab.id ? 'bg-white/20 text-white' : 'bg-warm text-secondaryText'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-secondaryText absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
        </div>

        {/* Client Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBF9] text-secondaryText uppercase text-[10px] tracking-wider border-b border-borderLine">
              <tr>
                <th className="py-3 px-5 font-semibold">Client Name</th>
                <th className="py-3 px-4 font-semibold">Client ID</th>
                <th className="py-3 px-4 font-semibold">Enrollment Date</th>
                <th className="py-3 px-4 font-semibold">Assigned Specialist</th>
                <th className="py-3 px-4 font-semibold">Active Disputes</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderLine">
              {paginatedClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => navigate(`/app/clients/${client.id}`)}
                  className="hover:bg-warm/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-navy">{client.firstName} {client.lastName}</div>
                    <div className="text-[11px] text-secondaryText">{client.email} • {client.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-secondaryText">
                    {client.id}
                  </td>
                  <td className="py-3.5 px-4 text-secondaryText">
                    {client.enrollmentDate}
                  </td>
                  <td className="py-3.5 px-4 text-navy">
                    {client.assignedStaffName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-navy">{client.activeDisputesCount}</span>
                    <span className="text-secondaryText text-[11px]"> active</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      size="sm"
                      variant={
                        client.status === 'active' 
                          ? 'success' 
                          : client.status === 'onboarding' 
                            ? 'pending' 
                            : client.status === 'pending_documents'
                              ? 'attention'
                              : 'default'
                      }
                    >
                      {client.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/clients/${client.id}`);
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-navy hover:bg-warm rounded border border-borderLine"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-borderLine flex items-center justify-between text-xs text-secondaryText bg-[#FCFCFB]">
          <span>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-2.5 py-1 rounded border border-borderLine disabled:opacity-40 hover:bg-warm"
            >
              Previous
            </button>
            <span className="font-semibold text-navy">{currentPage} / {totalPages || 1}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-2.5 py-1 rounded border border-borderLine disabled:opacity-40 hover:bg-warm"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

