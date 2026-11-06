import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { DemoBanner } from '../components/layout/DemoBanner';
import { 
  Users, 
  Scale, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  TrendingUp,
  Search,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    clients, 
    disputes, 
    tasks, 
    activityLogs, 
    toggleTaskComplete 
  } = useApp();
  const navigate = useNavigate();

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '6m'>('6m');
  const [clientSearch, setClientSearch] = useState('');
  const [clientFilter, setClientFilter] = useState<'all' | 'active' | 'onboarding'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Analytics mock data tailored to time range
  const activityChartData = {
    '7d': [
      { name: 'Mon', disputes: 12, resolved: 8 },
      { name: 'Tue', disputes: 15, resolved: 10 },
      { name: 'Wed', disputes: 18, resolved: 14 },
      { name: 'Thu', disputes: 22, resolved: 16 },
      { name: 'Fri', disputes: 19, resolved: 13 },
      { name: 'Sat', disputes: 8, resolved: 6 },
      { name: 'Sun', disputes: 5, resolved: 4 },
    ],
    '30d': [
      { name: 'Week 1', disputes: 42, resolved: 28 },
      { name: 'Week 2', disputes: 58, resolved: 36 },
      { name: 'Week 3', disputes: 65, resolved: 44 },
      { name: 'Week 4', disputes: 71, resolved: 52 },
    ],
    '90d': [
      { name: 'Month 1', disputes: 140, resolved: 88 },
      { name: 'Month 2', disputes: 185, resolved: 112 },
      { name: 'Month 3', disputes: 220, resolved: 150 },
    ],
    '6m': [
      { name: 'May', disputes: 120, resolved: 64 },
      { name: 'Jun', disputes: 145, resolved: 82 },
      { name: 'Jul', disputes: 190, resolved: 108 },
      { name: 'Aug', disputes: 240, resolved: 142 },
      { name: 'Sep', disputes: 310, resolved: 198 },
      { name: 'Oct', disputes: 432, resolved: 280 },
    ],
  }[timeRange];

  // Dispute Status Data for Breakdown Bar Chart
  const statusCounts = [
    { name: 'Draft', count: disputes.filter(d => d.status === 'draft').length, color: '#75818A' },
    { name: 'Under Review', count: disputes.filter(d => d.status === 'under_review').length, color: '#C45738' },
    { name: 'Approved', count: disputes.filter(d => d.status === 'approved').length, color: '#3B7A57' },
    { name: 'Submitted', count: disputes.filter(d => d.status === 'submitted').length, color: '#2B6E96' },
    { name: 'Response Rec.', count: disputes.filter(d => d.status === 'response_received').length, color: '#B87A28' },
    { name: 'Follow-up Req.', count: disputes.filter(d => d.status === 'follow_up_required').length, color: '#BD3838' },
    { name: 'Closed', count: disputes.filter(d => d.status === 'closed').length, color: '#587463' },
  ];

  // Filtered clients list
  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(clientSearch.toLowerCase());

    if (clientFilter === 'active') return matchesSearch && c.status === 'active';
    if (clientFilter === 'onboarding') return matchesSearch && (c.status === 'onboarding' || c.status === 'pending_documents');
    return matchesSearch;
  });

  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const isStaff = currentUser.role === 'staff';

  return (
    <div className="space-y-6">
      {/* Guided Welcome Banner */}
      <DemoBanner />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">
            Good morning, {currentUser.name.split(' ')[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            {isStaff 
              ? "Here are your assigned disputes, pending letter drafts, and bureau deadlines."
              : "Here's what's happening across your dispute operations."
            }
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/app/letters/editor')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-sage" />
            <span>Open Letter Studio</span>
          </button>
        </div>
      </div>

      {/* Section 7 Overview Metrics: 6 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          label="Total Clients"
          value={clients.length + 236} // blended with fictional demo scale
          change="+14%"
          isPositive={true}
          trendLabel="vs last month"
          icon={<Users className="w-4 h-4" />}
          onClick={() => navigate('/app/clients')}
        />
        <StatCard
          label="Active Clients"
          value={186}
          change="+8%"
          isPositive={true}
          trendLabel="on active dispute plan"
          icon={<CheckCircle2 className="w-4 h-4" />}
          onClick={() => navigate('/app/clients')}
        />
        <StatCard
          label="Active Disputes"
          value={432}
          change="+24"
          isPositive={true}
          trendLabel="in progress"
          icon={<Scale className="w-4 h-4" />}
          onClick={() => navigate('/app/disputes')}
        />
        <StatCard
          label="Pending Reviews"
          value={18}
          change="Urgent"
          isPositive={false}
          trendLabel="requires admin sign-off"
          icon={<AlertCircle className="w-4 h-4 text-[#C45738]" />}
          onClick={() => navigate('/app/letters')}
        />
        <StatCard
          label="Upcoming Deadlines"
          value={12}
          trendLabel="within 7 days"
          icon={<Clock className="w-4 h-4 text-[#B87A28]" />}
          onClick={() => navigate('/app/calendar')}
        />
        <StatCard
          label="Completed Disputes"
          value={96}
          change="+19%"
          isPositive={true}
          trendLabel="successful outcomes"
          icon={<TrendingUp className="w-4 h-4 text-[#2E7D5B]" />}
          onClick={() => navigate('/app/disputes')}
        />
      </div>

      {/* Charts Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Analytics: Dispute Activity Over Time */}
        <div className="lg:col-span-8 bg-surface rounded-xl p-5 border border-borderLine shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-navy">Dispute Operation Trajectory</h3>
              <p className="text-xs text-secondaryText">Total disputes initiated vs positive deletions & updates</p>
            </div>

            {/* Time Filter Tabs */}
            <div className="inline-flex rounded-lg bg-warm/60 p-1 border border-borderLine text-xs font-medium">
              {(['7d', '30d', '90d', '6m'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    timeRange === range
                      ? 'bg-surface text-navy font-semibold shadow-subtle'
                      : 'text-secondaryText hover:text-navy'
                  }`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDisputes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#172D3D" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#172D3D" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7E9B89" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7E9B89" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#75818A' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#75818A' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E7EBE8', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="disputes" stroke="#172D3D" strokeWidth={2} fillOpacity={1} fill="url(#colorDisputes)" name="Active Disputes" />
                <Area type="monotone" dataKey="resolved" stroke="#7E9B89" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" name="Resolved / Corrected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-borderLine text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-navy" />
              <span className="text-secondaryText">Total Disputes Initiated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-sage" />
              <span className="text-secondaryText">Verified Corrections / Deletions</span>
            </div>
          </div>
        </div>

        {/* Dispute Status Breakdown Chart */}
        <div className="lg:col-span-4 bg-surface rounded-xl p-5 border border-borderLine shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-navy">Dispute Status Distribution</h3>
            <p className="text-xs text-secondaryText mb-4">Current stage across active tradelines</p>
            
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusCounts} layout="vertical" margin={{ top: 0, right: 15, left: 35, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#75818A' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E7EBE8', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {statusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-borderLine">
            <button
              onClick={() => navigate('/app/disputes')}
              className="w-full py-2 text-xs font-semibold text-navy hover:text-navy-light bg-warm/50 hover:bg-warm rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Dispute Kanban Board</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Two Column Grid: Upcoming Tasks & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upcoming Tasks Table */}
        <div className="lg:col-span-7 bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-borderLine flex items-center justify-between bg-[#FCFCFB]">
            <div>
              <h3 className="text-sm font-semibold text-navy">Priority Operational Tasks</h3>
              <p className="text-xs text-secondaryText">Action items requiring staff execution or review</p>
            </div>
            <button
              onClick={() => navigate('/app/tasks')}
              className="text-xs font-semibold text-sage-dark hover:underline flex items-center gap-1"
            >
              <span>All Tasks ({tasks.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-borderLine/70">
            {tasks.slice(0, 5).map((task) => (
              <div 
                key={task.id}
                className="p-3.5 sm:px-5 hover:bg-warm/40 flex items-start gap-3 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={() => toggleTaskComplete(task.id)}
                  className="mt-1 w-4 h-4 rounded text-navy border-borderLine focus:ring-sage"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-xs font-semibold ${
                      task.status === 'completed' ? 'line-through text-secondaryText' : 'text-navy'
                    }`}>
                      {task.title}
                    </p>
                    <Badge 
                      size="sm" 
                      variant={
                        task.priority === 'high' ? 'attention' : task.priority === 'medium' ? 'pending' : 'default'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-secondaryText mt-1">
                    {task.clientName && <span>Client: {task.clientName}</span>}
                    <span>Assigned: {task.assignedToName}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="lg:col-span-5 bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-borderLine flex items-center justify-between bg-[#FCFCFB]">
            <div>
              <h3 className="text-sm font-semibold text-navy">Operations Activity Feed</h3>
              <p className="text-xs text-secondaryText">Audit trail of real staff and bureau events</p>
            </div>
            <button
              onClick={() => navigate('/app/activity')}
              className="text-xs font-semibold text-sage-dark hover:underline flex items-center gap-1"
            >
              <span>Audit Log</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-[340px] overflow-y-auto">
            {activityLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="flex items-start gap-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-sage mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-navy font-medium leading-snug">{log.activity}</p>
                  <p className="text-[11px] text-secondaryText mt-0.5">
                    {log.user} ({log.role}) • {log.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Clients Management Table */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-borderLine flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FCFCFB]">
          <div>
            <h3 className="text-sm font-semibold text-navy">Recent Client Accounts</h3>
            <p className="text-xs text-secondaryText">Overview of enrolled consumers and their active dispute load</p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-secondaryText absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter clients..."
                value={clientSearch}
                onChange={(e) => {
                  setClientSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 pr-3 py-1.5 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            <select
              value={clientFilter}
              onChange={(e) => {
                setClientFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 text-xs border border-borderLine rounded-lg bg-surface text-navy focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="onboarding">Onboarding Only</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBF9] text-secondaryText uppercase text-[10px] tracking-wider border-b border-borderLine">
              <tr>
                <th className="py-3 px-5 font-semibold">Client Name</th>
                <th className="py-3 px-4 font-semibold">Client ID</th>
                <th className="py-3 px-4 font-semibold">Assigned Staff</th>
                <th className="py-3 px-4 font-semibold">Active Disputes</th>
                <th className="py-3 px-4 font-semibold">Enrollment</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderLine">
              {paginatedClients.map((client) => (
                <tr 
                  key={client.id}
                  onClick={() => navigate(`/app/clients/${client.id}`)}
                  className="hover:bg-warm/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-5">
                    <div className="font-semibold text-navy">{client.firstName} {client.lastName}</div>
                    <div className="text-[11px] text-secondaryText">{client.email}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-secondaryText">
                    {client.id}
                  </td>
                  <td className="py-3 px-4 text-navy">
                    {client.assignedStaffName}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-navy">{client.activeDisputesCount}</span>
                    <span className="text-secondaryText text-[11px]"> tradelines</span>
                  </td>
                  <td className="py-3 px-4 text-secondaryText">
                    {client.enrollmentDate}
                  </td>
                  <td className="py-3 px-4">
                    <Badge 
                      size="sm"
                      variant={
                        client.status === 'active' 
                          ? 'success' 
                          : client.status === 'onboarding' 
                            ? 'pending' 
                            : 'attention'
                      }
                    >
                      {client.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3 px-5 text-right">
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

        {/* Table Pagination */}
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

