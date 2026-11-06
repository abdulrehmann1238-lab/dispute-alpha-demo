import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  RotateCcw, 
  ChevronDown, 
  UserCheck, 
  ShieldAlert, 
  FileText, 
  Users, 
  Scale, 
  CheckCircle2,
  ExternalLink,
  X
} from 'lucide-react';
import { UserRole } from '../../types';

interface TopHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenAddClient: () => void;
  onOpenCreateTask: () => void;
  onOpenCreateDispute: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenMobileMenu,
  onOpenAddClient,
  onOpenCreateTask,
  onOpenCreateDispute,
}) => {
  const { 
    currentUser, 
    switchRole, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    resetDemoData,
    clients,
    disputes,
    documents
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.read);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setIsQuickActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter mock search records
  const matchingClients = searchQuery.trim() 
    ? clients.filter(c => 
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const matchingDisputes = searchQuery.trim()
    ? disputes.filter(d => 
        d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.creditorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.bureau.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const matchingDocs = searchQuery.trim()
    ? documents.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const hasSearchResults = matchingClients.length > 0 || matchingDisputes.length > 0 || matchingDocs.length > 0;

  // Generate breadcrumb
  const pathParts = location.pathname.split('/').filter(Boolean);
  const getBreadcrumbTitle = (part: string) => {
    if (part === 'app') return 'Dispute Alpha';
    if (part === 'dashboard') return 'Operations Dashboard';
    if (part === 'clients') return 'Client Management';
    if (part === 'reports') return 'Credit Report Management';
    if (part === 'disputes') return 'Dispute Center';
    if (part === 'letters') return 'Letter Studio';
    if (part === 'tasks') return 'Task Management';
    if (part === 'calendar') return 'Calendar & Deadlines';
    if (part === 'team') return 'Team & Access';
    if (part === 'documents') return 'Document Library';
    if (part === 'activity') return 'Activity Logs';
    if (part === 'bureaus') return 'Bureau Directory';
    if (part === 'templates') return 'Letter Templates';
    if (part === 'settings') return 'Settings';
    if (part === 'editor') return 'Letter Editor';
    if (part === 'client') return 'Client Portal';
    return part;
  };

  return (
    <header className="h-16 bg-surface border-b border-borderLine sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-secondaryText hover:text-navy rounded-lg hover:bg-warm"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-secondaryText">
          <Link to="/app/dashboard" className="hover:text-navy font-medium">Dispute Alpha</Link>
          {pathParts.slice(1).map((part, index) => (
            <React.Fragment key={index}>
              <span className="text-secondaryText/50">/</span>
              <span className={`capitalize ${index === pathParts.length - 2 ? 'font-semibold text-navy' : 'hover:text-navy'}`}>
                {getBreadcrumbTitle(part)}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Center: Search Field */}
      <div className="flex-1 max-w-md mx-4 relative" ref={searchRef}>
        <div className="relative">
          <Search className="w-4 h-4 text-secondaryText absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Search clients, disputes, documents..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-warm/50 border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage focus:bg-surface text-navy placeholder:text-secondaryText transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondaryText hover:text-navy"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {isSearchOpen && searchQuery.trim() && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-surface rounded-xl shadow-floating border border-borderLine py-2 z-50 max-h-96 overflow-y-auto">
            {hasSearchResults ? (
              <div className="space-y-3">
                {matchingClients.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-secondaryText bg-warm/40">
                      Clients ({matchingClients.length})
                    </div>
                    {matchingClients.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          navigate(`/app/clients/${c.id}`);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="px-3 py-2 hover:bg-warm/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-xs font-semibold text-navy">{c.firstName} {c.lastName}</div>
                          <div className="text-[11px] text-secondaryText">{c.email} • {c.id}</div>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-sage-light text-navy">
                          {c.activeDisputesCount} disputes
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {matchingDisputes.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-secondaryText bg-warm/40">
                      Disputes ({matchingDisputes.length})
                    </div>
                    {matchingDisputes.map(d => (
                      <div
                        key={d.id}
                        onClick={() => {
                          navigate(`/app/disputes/${d.id}`);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="px-3 py-2 hover:bg-warm/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-xs font-semibold text-navy">{d.id} — {d.creditorName}</div>
                          <div className="text-[11px] text-secondaryText">{d.clientName} • {d.bureau}</div>
                        </div>
                        <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-warm text-navy">
                          {d.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {matchingDocs.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-secondaryText bg-warm/40">
                      Documents ({matchingDocs.length})
                    </div>
                    {matchingDocs.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          navigate('/app/documents');
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="px-3 py-2 hover:bg-warm/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="truncate pr-2">
                          <div className="text-xs font-medium text-navy truncate">{doc.name}</div>
                          <div className="text-[11px] text-secondaryText">{doc.clientName}</div>
                        </div>
                        <span className="text-[10px] text-secondaryText flex-shrink-0">{doc.category}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-secondaryText">
                No mock records matching "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls: Quick Actions, Notifications, Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Action Menu */}
        <div className="relative" ref={quickRef}>
          <button
            onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-navy text-white text-xs font-medium rounded-lg hover:bg-navy-light shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New</span>
            <ChevronDown className="w-3 h-3 text-white/70" />
          </button>

          {isQuickActionsOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-surface rounded-xl shadow-floating border border-borderLine py-1.5 z-50 animate-in fade-in zoom-in-95">
              <button
                onClick={() => {
                  setIsQuickActionsOpen(false);
                  onOpenAddClient();
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-navy hover:bg-warm flex items-center gap-2.5"
              >
                <Users className="w-4 h-4 text-sage-dark" />
                <span>Add Client</span>
              </button>

              <button
                onClick={() => {
                  setIsQuickActionsOpen(false);
                  onOpenCreateTask();
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-navy hover:bg-warm flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-sage-dark" />
                <span>Create Task</span>
              </button>

              <button
                onClick={() => {
                  setIsQuickActionsOpen(false);
                  onOpenCreateDispute();
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-navy hover:bg-warm flex items-center gap-2.5"
              >
                <Scale className="w-4 h-4 text-sage-dark" />
                <span>Create Dispute</span>
              </button>

              <button
                onClick={() => {
                  setIsQuickActionsOpen(false);
                  navigate('/app/letters/editor');
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-navy hover:bg-warm flex items-center gap-2.5"
              >
                <FileText className="w-4 h-4 text-sage-dark" />
                <span>Create Letter</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Icon with live dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 text-secondaryText hover:text-navy rounded-lg hover:bg-warm relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#BD3838] ring-2 ring-white" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-surface rounded-xl shadow-floating border border-borderLine z-50 animate-in fade-in zoom-in-95 overflow-hidden">
              <div className="px-4 py-3 border-b border-borderLine flex items-center justify-between bg-[#FCFCFB]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-navy">Notifications</span>
                  {unreadNotifications.length > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#BD3838] text-white">
                      {unreadNotifications.length} new
                    </span>
                  )}
                </div>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-sage-dark hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-borderLine/60">
                {notifications.slice(0, 6).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.relatedLink) {
                        navigate(n.relatedLink);
                        setIsNotificationsOpen(false);
                      }
                    }}
                    className={`p-3 text-xs cursor-pointer hover:bg-warm/50 transition-colors ${
                      !n.read ? 'bg-sage-light/20 font-medium' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-navy ${!n.read ? 'font-semibold' : ''}`}>{n.title}</p>
                      <span className="text-[10px] text-secondaryText flex-shrink-0">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-secondaryText mt-1 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-borderLine bg-[#FCFCFB] text-center">
                <Link
                  to="/app/notifications"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-xs text-navy font-medium hover:text-sage-dark inline-block"
                >
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Demo Role Switcher Badge */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg border border-borderLine bg-warm/60 hover:bg-warm text-xs transition-colors"
          >
            <div className={`w-2 h-2 rounded-full ${
              currentUser.role === 'admin' ? 'bg-navy' : currentUser.role === 'staff' ? 'bg-sage' : 'bg-gold'
            }`} />
            <div className="text-left hidden sm:block">
              <span className="text-[10px] uppercase font-bold tracking-wider text-secondaryText block leading-tight">Role</span>
              <span className="text-xs font-semibold text-navy capitalize block leading-tight">{currentUser.role}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-secondaryText ml-0.5" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-60 bg-surface rounded-xl shadow-floating border border-borderLine py-2 z-50">
              <div className="px-3 py-1.5 border-b border-borderLine mb-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-secondaryText">Switch Demo Persona</span>
              </div>

              <button
                onClick={() => {
                  switchRole('admin');
                  setIsRoleDropdownOpen(false);
                  navigate('/app/dashboard');
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-warm transition-colors ${
                  currentUser.role === 'admin' ? 'bg-sage-light text-navy font-semibold' : 'text-primaryText'
                }`}
              >
                <div>
                  <div className="font-semibold">Alex Vance (Admin)</div>
                  <div className="text-[11px] text-secondaryText">Full compliance & operations</div>
                </div>
                {currentUser.role === 'admin' && <UserCheck className="w-4 h-4 text-sage-dark" />}
              </button>

              <button
                onClick={() => {
                  switchRole('staff');
                  setIsRoleDropdownOpen(false);
                  navigate('/app/dashboard');
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-warm transition-colors ${
                  currentUser.role === 'staff' ? 'bg-sage-light text-navy font-semibold' : 'text-primaryText'
                }`}
              >
                <div>
                  <div className="font-semibold">Sarah Jenkins (Staff)</div>
                  <div className="text-[11px] text-secondaryText">Dispute drafting & bureau logs</div>
                </div>
                {currentUser.role === 'staff' && <UserCheck className="w-4 h-4 text-sage-dark" />}
              </button>

              <button
                onClick={() => {
                  switchRole('client');
                  setIsRoleDropdownOpen(false);
                  navigate('/client');
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-warm transition-colors ${
                  currentUser.role === 'client' ? 'bg-sage-light text-navy font-semibold' : 'text-primaryText'
                }`}
              >
                <div>
                  <div className="font-semibold">Jordan Hayes (Client)</div>
                  <div className="text-[11px] text-secondaryText">Client Portal view</div>
                </div>
                {currentUser.role === 'client' && <UserCheck className="w-4 h-4 text-sage-dark" />}
              </button>

              <div className="pt-1.5 mt-1.5 border-t border-borderLine px-2">
                <button
                  onClick={() => {
                    setIsRoleDropdownOpen(false);
                    resetDemoData();
                  }}
                  className="w-full text-left px-2 py-1.5 text-[11px] text-secondaryText hover:text-[#BD3838] hover:bg-red-50 rounded flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DEMO ENVIRONMENT indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warm/70 border border-borderLine text-[11px] font-semibold text-secondaryText">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>DEMO ENVIRONMENT</span>
        </div>
      </div>
    </header>
  );
};

