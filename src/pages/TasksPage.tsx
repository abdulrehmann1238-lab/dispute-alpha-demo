import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { CreateTaskModal } from '../components/modals/CreateTaskModal';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Filter,
  UserCheck 
} from 'lucide-react';
import { Task } from '../types';

export const TasksPage: React.FC = () => {
  const { tasks, toggleTaskComplete, currentUser } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterView, setFilterView] = useState<'all' | 'my' | 'pending' | 'completed' | 'overdue'>('all');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const totalTasks = tasks.length;
  const myTasksCount = tasks.filter(t => t.assignedToId === currentUser.id).length;
  const pendingCount = tasks.filter(t => t.status !== 'completed').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = 
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.clientName && t.clientName.toLowerCase().includes(search.toLowerCase())) ||
      t.assignedToName.toLowerCase().includes(search.toLowerCase());

    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;

    if (!matchesSearch || !matchesPriority) return false;

    if (filterView === 'my') return t.assignedToId === currentUser.id;
    if (filterView === 'pending') return t.status !== 'completed';
    if (filterView === 'completed') return t.status === 'completed';
    if (filterView === 'overdue') return t.status !== 'completed' && new Date(t.dueDate) < new Date();
    return true;
  });

  return (
    <div className="space-y-6">
      <CreateTaskModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Task Management</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Delegate investigations, document audits, and statutory follow-ups across staff.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-sage" />
          <span>+ Create Task</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Tasks"
          value={totalTasks}
          icon={<CheckSquare className="w-4 h-4" />}
        />
        <StatCard
          label="My Assigned Tasks"
          value={myTasksCount}
          subtitle={`Assigned to ${currentUser.name}`}
          icon={<UserCheck className="w-4 h-4 text-navy" />}
        />
        <StatCard
          label="Pending Execution"
          value={pendingCount}
          subtitle="In pipeline"
          icon={<Clock className="w-4 h-4 text-[#B87A28]" />}
        />
        <StatCard
          label="Completed"
          value={completedCount}
          subtitle="Action executed"
          icon={<CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />}
        />
      </div>

      {/* Tasks Table Card */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-4 border-b border-borderLine flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FCFCFB]">
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Tasks', count: totalTasks },
              { id: 'my', label: 'My Tasks', count: myTasksCount },
              { id: 'pending', label: 'Pending', count: pendingCount },
              { id: 'completed', label: 'Completed', count: completedCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterView(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  filterView === tab.id
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-secondaryText hover:text-navy hover:bg-warm'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filterView === tab.id ? 'bg-white/20 text-white' : 'bg-warm text-secondaryText'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-secondaryText absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-borderLine rounded-lg bg-surface text-navy focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBF9] text-secondaryText uppercase text-[10px] tracking-wider border-b border-borderLine">
              <tr>
                <th className="py-3 px-5 font-semibold w-10">Done</th>
                <th className="py-3 px-4 font-semibold">Task Title & Description</th>
                <th className="py-3 px-4 font-semibold">Related Client</th>
                <th className="py-3 px-4 font-semibold">Dispute ID</th>
                <th className="py-3 px-4 font-semibold">Assigned Specialist</th>
                <th className="py-3 px-4 font-semibold">Priority</th>
                <th className="py-3 px-4 font-semibold">Due Date</th>
                <th className="py-3 px-5 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderLine">
              {filteredTasks.map(task => (
                <tr
                  key={task.id}
                  className="hover:bg-warm/40 transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTaskComplete(task.id)}
                      className="w-4 h-4 rounded text-navy border-borderLine focus:ring-sage cursor-pointer"
                    />
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className={`font-semibold ${
                      task.status === 'completed' ? 'line-through text-secondaryText' : 'text-navy'
                    }`}>
                      {task.title}
                    </div>
                    {task.description && (
                      <p className="text-[11px] text-secondaryText mt-0.5 line-clamp-1">{task.description}</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-navy">
                    {task.clientName || 'General Operations'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-secondaryText text-[11px]">
                    {task.relatedDisputeId || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-navy">
                    {task.assignedToName}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      size="sm"
                      variant={
                        task.priority === 'high' ? 'attention' : task.priority === 'medium' ? 'pending' : 'default'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-secondaryText">
                    {task.dueDate}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span className={`inline-flex items-center text-xs font-semibold ${
                      task.status === 'completed' ? 'text-[#2E7D5B]' : 'text-secondaryText'
                    }`}>
                      {task.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

