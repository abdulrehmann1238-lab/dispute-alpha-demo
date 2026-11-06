import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { 
  Bell, 
  CheckCheck, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  Building,
  ShieldCheck
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<'all' | 'unread' | 'approval' | 'deadline' | 'bureau'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'approval') return n.category === 'approval';
    if (filter === 'deadline') return n.category === 'deadline';
    if (filter === 'bureau') return n.category === 'bureau';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Notification Center</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Real-time operational alerts for pending approvals, client uploads, and bureau deadlines.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="px-3.5 py-2 text-xs font-semibold text-navy bg-warm hover:bg-warm/80 rounded-lg border border-borderLine transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4 text-sage-dark" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs & Content */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
        <div className="p-4 border-b border-borderLine flex items-center gap-2 overflow-x-auto bg-[#FCFCFB]">
          {[
            { id: 'all', label: `All Alerts (${notifications.length})` },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'approval', label: 'Approvals' },
            { id: 'deadline', label: 'Deadlines' },
            { id: 'bureau', label: 'Bureau Responses' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === tab.id ? 'bg-navy text-white shadow-xs' : 'text-secondaryText hover:text-navy hover:bg-warm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="divide-y divide-borderLine">
          {filteredNotifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.relatedLink) navigate(n.relatedLink);
              }}
              className={`p-4 sm:p-5 hover:bg-warm/40 cursor-pointer transition-colors flex items-start justify-between gap-4 ${
                !n.read ? 'bg-sage-light/20' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                  !n.read ? 'bg-[#BD3838]' : 'bg-borderLine'
                }`} />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xs sm:text-sm ${!n.read ? 'font-bold text-navy' : 'font-semibold text-navy'}`}>
                      {n.title}
                    </h3>
                    <Badge size="sm" variant="sage">
                      {n.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-secondaryText mt-1 leading-relaxed max-w-2xl">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-secondaryText/80 mt-1.5 block">
                    {n.timestamp}
                  </span>
                </div>
              </div>

              {n.relatedLink && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationRead(n.id);
                    navigate(n.relatedLink!);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-sage-dark hover:underline flex items-center gap-1 flex-shrink-0"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="py-12 text-center text-xs text-secondaryText italic">
              No notifications matching this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

