import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { 
  LayoutDashboard, 
  Users, 
  FileSearch, 
  Scale, 
  Mail, 
  CheckSquare, 
  Calendar, 
  UserCog, 
  FolderArchive, 
  Activity, 
  Bell, 
  Building2, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const { currentUser, switchRole, notifications } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigationSections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { name: 'Clients', path: '/app/clients', icon: Users },
        { name: 'Credit Reports', path: '/app/reports', icon: FileSearch },
        { name: 'Disputes', path: '/app/disputes', icon: Scale },
        { name: 'Letter Studio', path: '/app/letters', icon: Mail },
        { name: 'Tasks', path: '/app/tasks', icon: CheckSquare },
        { name: 'Calendar', path: '/app/calendar', icon: Calendar },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        ...(currentUser.role === 'admin' ? [{ name: 'Team', path: '/app/team', icon: UserCog }] : []),
        { name: 'Documents', path: '/app/documents', icon: FolderArchive },
        { name: 'Activity Logs', path: '/app/activity', icon: Activity },
        { 
          name: 'Notifications', 
          path: '/app/notifications', 
          icon: Bell, 
          badge: unreadCount > 0 ? unreadCount : undefined 
        },
      ],
    },
    {
      title: 'CONFIGURATION',
      items: [
        { name: 'Bureau Directory', path: '/app/bureaus', icon: Building2 },
        { name: 'Templates', path: '/app/templates', icon: FileText },
        { name: 'Settings', path: '/app/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-navy-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-surface border-r border-borderLine flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-borderLine bg-[#FCFCFB]">
          {!isCollapsed ? (
            <div className="flex flex-col">
              <BrandLogo size="sm" showTagline={false} />
              <span className="text-[10px] font-semibold tracking-wider uppercase text-secondaryText/70 mt-1 pl-10">
                Operations Workspace
              </span>
            </div>
          ) : (
            <div className="mx-auto">
              <BrandLogo size="sm" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-secondaryText hover:text-navy hover:bg-warm transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navigationSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-bold tracking-widest text-secondaryText/70 uppercase mb-2">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen?.(false)}
                    className={({ isActive }) => `
                      group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative
                      ${isActive 
                        ? 'bg-sage-light text-navy font-semibold shadow-xs' 
                        : 'text-secondaryText hover:text-navy hover:bg-warm/60'
                      }
                      ${isCollapsed ? 'justify-center px-0' : ''}
                    `}
                    title={isCollapsed ? item.name : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive ? 'text-sage-dark' : 'text-secondaryText group-hover:text-navy'
                        }`} />
                        
                        {!isCollapsed && (
                          <span className="truncate flex-1">{item.name}</span>
                        )}

                        {!isCollapsed && item.badge !== undefined && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-[#BD3838] text-white">
                            {item.badge}
                          </span>
                        )}

                        {/* Collapsed dot badge */}
                        {isCollapsed && item.badge !== undefined && (
                          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#BD3838]" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}

          {/* Quick jump to Client Portal */}
          <div className="pt-2 border-t border-borderLine">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold tracking-widest text-secondaryText/70 uppercase mb-2">
                PORTAL VIEW
              </p>
            )}
            <button
              onClick={() => {
                switchRole('client');
                navigate('/client');
                setIsMobileOpen?.(false);
              }}
              className={`w-full group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sage-dark bg-sage-light/60 hover:bg-sage-light border border-sage/20 transition-all ${
                isCollapsed ? 'justify-center px-0' : ''
              }`}
              title="Switch to Client Portal View"
            >
              <ExternalLink className="w-4 h-4 text-sage-dark" />
              {!isCollapsed && <span>View Client Portal</span>}
            </button>
          </div>
        </div>

        {/* User Card & Role Info */}
        <div className="p-3 border-t border-borderLine bg-[#FCFCFB]">
          <div className={`flex items-center gap-3 p-2 rounded-lg bg-surface border border-borderLine shadow-subtle ${
            isCollapsed ? 'justify-center p-1.5' : ''
          }`}>
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-borderLine flex-shrink-0" 
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-navy truncate">{currentUser.name}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`inline-flex items-center px-1.5 py-0.2 text-[10px] font-bold rounded uppercase tracking-wider ${
                    currentUser.role === 'admin' 
                      ? 'bg-navy-light text-white' 
                      : currentUser.role === 'staff' 
                        ? 'bg-sage text-white' 
                        : 'bg-warm text-navy'
                  }`}>
                    {currentUser.role}
                  </span>
                  <span className="text-[11px] text-secondaryText truncate">
                    {currentUser.role === 'admin' ? 'Super Admin' : 'Dispute Lead'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

