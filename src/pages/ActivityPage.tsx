import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { 
  Activity, 
  Search, 
  Filter, 
  History, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { activityLogs } = useApp();

  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.activity.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.relatedRecord.toLowerCase().includes(search.toLowerCase());

    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    const matchesAction = actionFilter === 'all' || log.actionType === actionFilter;

    return matchesSearch && matchesModule && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Activity Logs</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Auditable demonstration log recording user actions, letter approvals, and bureau response events.
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-borderLine flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FCFCFB]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-secondaryText absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search audit events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-borderLine rounded-lg bg-surface text-navy focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="all">All Modules</option>
              <option value="Letters">Letters</option>
              <option value="Disputes">Disputes</option>
              <option value="Reports">Reports</option>
              <option value="Clients">Clients</option>
              <option value="Settings">Settings</option>
            </select>

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-borderLine rounded-lg bg-surface text-navy focus:outline-none focus:ring-1 focus:ring-sage"
            >
              <option value="all">All Actions</option>
              <option value="approval">Approvals</option>
              <option value="create">Creations</option>
              <option value="update">Updates</option>
              <option value="status_change">Status Changes</option>
              <option value="upload">Uploads</option>
            </select>
          </div>

          <span className="text-xs text-secondaryText">
            {filteredLogs.length} Logged Events
          </span>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBF9] text-secondaryText uppercase text-[10px] tracking-wider border-b border-borderLine">
              <tr>
                <th className="py-3 px-5 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Activity Description</th>
                <th className="py-3 px-4 font-semibold">Operator / User</th>
                <th className="py-3 px-4 font-semibold">Module</th>
                <th className="py-3 px-4 font-semibold">Related Record</th>
                <th className="py-3 px-5 text-right font-semibold">Action Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderLine">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-warm/40 transition-colors">
                  <td className="py-3.5 px-5 font-mono text-secondaryText text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-navy max-w-sm">
                    {log.activity}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-navy">{log.user}</span>
                    <span className="text-[10px] text-secondaryText block">({log.role})</span>
                  </td>
                  <td className="py-3.5 px-4 text-navy">
                    {log.module}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-secondaryText">
                    {log.relatedRecord}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Badge
                      size="sm"
                      variant={
                        log.actionType === 'approval' 
                          ? 'success' 
                          : log.actionType === 'create' 
                            ? 'navy' 
                            : log.actionType === 'status_change'
                              ? 'sage'
                              : 'default'
                      }
                    >
                      {log.actionType.toUpperCase()}
                    </Badge>
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

