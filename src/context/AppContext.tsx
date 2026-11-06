import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Client, 
  CreditReport, 
  Dispute, 
  Letter, 
  Task, 
  CalendarEvent, 
  DocumentItem, 
  TeamMember, 
  ActivityLog, 
  Notification, 
  BureauDirectoryEntry,
  LetterTemplate,
  Bureau,
  UserRole
} from '../types';

import { mockUsers, mockTeamMembers } from '../data/mockUsers';
import { mockClients } from '../data/mockClients';
import { mockReports } from '../data/mockReports';
import { mockDisputes } from '../data/mockDisputes';
import { mockLetters, mockTemplates } from '../data/mockLetters';
import { mockTasks } from '../data/mockTasks';
import { mockCalendarEvents } from '../data/mockCalendar';
import { mockDocuments } from '../data/mockDocuments';
import { mockActivityLogs } from '../data/mockActivity';
import { mockNotifications } from '../data/mockNotifications';
import { mockBureauDirectory } from '../data/mockBureaus';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  
  // Clients
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'enrollmentDate' | 'activeDisputesCount' | 'creditScores' | 'onboardingChecklist' | 'notes' | 'activity'>) => Client;
  updateClient: (id: string, updates: Partial<Client>) => void;
  addClientNote: (clientId: string, content: string, isInternal: boolean) => void;
  updateOnboardingStep: (clientId: string, step: keyof Client['onboardingChecklist'], completed: boolean) => void;

  // Reports
  reports: CreditReport[];
  importReport: (clientId: string, bureau: Bureau, source: string) => void;
  flagDiscrepancy: (
    reportId: string, 
    accountId: string, 
    discrepancy: {
      category: any;
      description: string;
      evidenceNotes: string;
      assignedStaff: string;
    }
  ) => void;
  updateAccountStatus: (reportId: string, accountId: string, status: 'clean' | 'flagged' | 'in_dispute' | 'resolved') => void;

  // Disputes
  disputes: Dispute[];
  addDispute: (dispute: Omit<Dispute, 'id' | 'rounds' | 'responses' | 'timeline'>) => Dispute;
  updateDisputeStatus: (id: string, status: Dispute['status']) => void;
  addDisputeRound: (disputeId: string, notes: string) => void;
  recordBureauResponse: (
    disputeId: string,
    response: {
      bureau: Bureau;
      responseCategory: any;
      outcome: string;
      supportingDocName?: string;
      followUpRequired: boolean;
      notes: string;
    }
  ) => void;

  // Letters
  letters: Letter[];
  templates: LetterTemplate[];
  addLetter: (letter: Omit<Letter, 'id' | 'createdDate' | 'lastUpdated' | 'approvalStatus'>) => Letter;
  updateLetterContent: (id: string, content: string) => void;
  submitLetterForApproval: (id: string) => void;
  approveLetter: (id: string, notes?: string) => void;
  rejectLetter: (id: string, reason: string) => void;
  recordLetterSubmission: (id: string, trackingNumber?: string) => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  toggleTaskComplete: (id: string) => void;

  // Calendar
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id' | 'status'>) => void;

  // Documents
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id' | 'uploadDate' | 'status'>) => void;

  // Team
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id' | 'assignedClientsCount' | 'activeTasksCount'>) => void;
  toggleTeamMemberStatus: (id: string) => void;

  // Activity & Notifications
  activityLogs: ActivityLog[];
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Bureau Directory
  bureauDirectory: BureauDirectoryEntry[];
  updateBureauEntry: (id: string, updates: Partial<BureauDirectoryEntry>) => void;

  // Global Settings
  settings: {
    companyName: string;
    timezone: string;
    sessionTimeout: number; // minutes
    autoNotification: boolean;
    requireTwoSignOffs: boolean;
  };
  updateSettings: (newSettings: Partial<AppContextType['settings']>) => void;

  // Reset
  resetDemoData: () => void;

  // Toast System
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' | 'error' } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'dispute_alpha_';

function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading from localStorage', e);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing to localStorage', e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState<User>(() => getStored('currentUser', mockUsers[0]));
  const [clients, setClients] = useState<Client[]>(() => getStored('clients', mockClients));
  const [reports, setReports] = useState<CreditReport[]>(() => getStored('reports', mockReports));
  const [disputes, setDisputes] = useState<Dispute[]>(() => getStored('disputes', mockDisputes));
  const [letters, setLetters] = useState<Letter[]>(() => getStored('letters', mockLetters));
  const [tasks, setTasks] = useState<Task[]>(() => getStored('tasks', mockTasks));
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => getStored('calendar', mockCalendarEvents));
  const [documents, setDocuments] = useState<DocumentItem[]>(() => getStored('documents', mockDocuments));
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => getStored('team', mockTeamMembers));
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => getStored('activity', mockActivityLogs));
  const [notifications, setNotifications] = useState<Notification[]>(() => getStored('notifications', mockNotifications));
  const [bureauDirectory, setBureauDirectory] = useState<BureauDirectoryEntry[]>(() => getStored('bureaus', mockBureauDirectory));
  const [templates] = useState<LetterTemplate[]>(mockTemplates);
  const [settings, setSettings] = useState(() => getStored('settings', {
    companyName: 'Dispute Alpha Operations LLC',
    timezone: 'America/New_York (EST)',
    sessionTimeout: 30,
    autoNotification: true,
    requireTwoSignOffs: false,
  }));

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => { setStored('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { setStored('clients', clients); }, [clients]);
  useEffect(() => { setStored('reports', reports); }, [reports]);
  useEffect(() => { setStored('disputes', disputes); }, [disputes]);
  useEffect(() => { setStored('letters', letters); }, [letters]);
  useEffect(() => { setStored('tasks', tasks); }, [tasks]);
  useEffect(() => { setStored('calendar', calendarEvents); }, [calendarEvents]);
  useEffect(() => { setStored('documents', documents); }, [documents]);
  useEffect(() => { setStored('team', teamMembers); }, [teamMembers]);
  useEffect(() => { setStored('activity', activityLogs); }, [activityLogs]);
  useEffect(() => { setStored('notifications', notifications); }, [notifications]);
  useEffect(() => { setStored('bureaus', bureauDirectory); }, [bureauDirectory]);
  useEffect(() => { setStored('settings', settings); }, [settings]);

  const logActivity = (activity: string, module: ActivityLog['module'], relatedRecord: string, actionType: ActivityLog['actionType']) => {
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      activity,
      user: currentUser.name,
      role: currentUser.role === 'admin' ? 'Administrator' : currentUser.role === 'staff' ? 'Staff' : 'Client',
      module,
      relatedRecord,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actionType,
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const switchRole = (role: UserRole) => {
    const targetUser = mockUsers.find(u => u.role === role) || mockUsers[0];
    setCurrentUserState(targetUser);
    showToast(`Switched view to ${targetUser.name} (${targetUser.role.toUpperCase()})`, 'info');
  };

  const setCurrentUser = (user: User) => {
    setCurrentUserState(user);
  };

  // Client actions
  const addClient = (clientData: Omit<Client, 'id' | 'enrollmentDate' | 'activeDisputesCount' | 'creditScores' | 'onboardingChecklist' | 'notes' | 'activity'>) => {
    const newId = `CLI-${Math.floor(1000 + Math.random() * 9000)}`;
    const newClient: Client = {
      ...clientData,
      id: newId,
      enrollmentDate: new Date().toISOString().substring(0, 10),
      activeDisputesCount: 0,
      creditScores: {
        equifax: 610,
        experian: 615,
        transunion: 605,
      },
      onboardingChecklist: {
        profileCompleted: true,
        agreementUploaded: false,
        documentsReceived: false,
        monitoringAuthorized: false,
        reportImported: false,
      },
      notes: [
        {
          id: `NOT-${Date.now()}`,
          author: currentUser.name,
          role: currentUser.role,
          content: 'Client onboarded via Dispute Alpha intake.',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          isInternal: true,
        }
      ],
      activity: [
        {
          id: `ACT-${Date.now()}`,
          type: 'onboarding_created',
          title: 'Client Profile Created',
          description: `Account initialized by ${currentUser.name}.`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          user: currentUser.name,
        }
      ],
    };

    setClients(prev => [newClient, ...prev]);
    logActivity(`Created new client profile: ${newClient.firstName} ${newClient.lastName}`, 'Clients', `${newClient.id}`, 'create');
    showToast(`Client ${newClient.firstName} ${newClient.lastName} created successfully!`, 'success');
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    logActivity(`Updated profile details for client ${id}`, 'Clients', id, 'update');
    showToast('Client details updated.', 'info');
  };

  const addClientNote = (clientId: string, content: string, isInternal: boolean) => {
    const newNote = {
      id: `NOT-${Date.now()}`,
      author: currentUser.name,
      role: currentUser.role === 'admin' ? 'Administrator' : currentUser.role === 'staff' ? 'Staff' : 'Client',
      content,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isInternal,
    };
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, notes: [newNote, ...c.notes] } : c));
    logActivity(`Added note to client ${clientId}`, 'Clients', clientId, 'update');
    showToast('Note added successfully.', 'success');
  };

  const updateOnboardingStep = (clientId: string, step: keyof Client['onboardingChecklist'], completed: boolean) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        const updatedChecklist = { ...c.onboardingChecklist, [step]: completed };
        return { ...c, onboardingChecklist: updatedChecklist };
      }
      return c;
    }));
    logActivity(`Updated onboarding step ${String(step)} for client ${clientId}`, 'Clients', clientId, 'update');
    showToast('Onboarding checklist updated.', 'info');
  };

  // Report actions
  const importReport = (clientId: string, bureau: Bureau, source: string) => {
    const client = clients.find(c => c.id === clientId);
    const clientName = client ? `${client.firstName} ${client.lastName}` : 'Client';
    const newReport: CreditReport = {
      id: `REP-${bureau.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId,
      clientName,
      bureau,
      reportDate: new Date().toISOString().substring(0, 10),
      importDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      importSource: source,
      summary: {
        totalAccounts: 12,
        openAccounts: 8,
        closedAccounts: 4,
        negativeAccounts: 2,
        collections: 1,
        publicRecords: 0,
      },
      accounts: mockReports[0].accounts,
    };

    setReports(prev => [newReport, ...prev]);
    updateOnboardingStep(clientId, 'reportImported', true);
    logActivity(`Imported ${bureau} credit report for ${clientName}`, 'Reports', newReport.id, 'upload');
    showToast(`Imported ${bureau} report successfully for ${clientName}!`, 'success');
  };

  const flagDiscrepancy = (
    reportId: string, 
    accountId: string, 
    disc: { category: any; description: string; evidenceNotes: string; assignedStaff: string }
  ) => {
    const newDiscrepancy = {
      id: `DISC-${Date.now()}`,
      ...disc,
      reviewStatus: 'Pending Review' as const,
      flaggedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        return {
          ...rep,
          accounts: rep.accounts.map(acc => {
            if (acc.id === accountId) {
              return {
                ...acc,
                reviewStatus: 'flagged',
                discrepancies: [...acc.discrepancies, newDiscrepancy],
              };
            }
            return acc;
          }),
        };
      }
      return rep;
    }));

    logActivity(`Flagged potential discrepancy on account ${accountId}`, 'Reports', reportId, 'review');
    showToast('Potential discrepancy flagged for human investigation.', 'warning');
  };

  const updateAccountStatus = (reportId: string, accountId: string, status: 'clean' | 'flagged' | 'in_dispute' | 'resolved') => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        return {
          ...rep,
          accounts: rep.accounts.map(acc => acc.id === accountId ? { ...acc, reviewStatus: status } : acc),
        };
      }
      return rep;
    }));
    logActivity(`Updated account ${accountId} status to ${status}`, 'Reports', reportId, 'update');
    showToast(`Account review status updated to "${status}".`, 'info');
  };

  // Dispute actions
  const addDispute = (disputeData: Omit<Dispute, 'id' | 'rounds' | 'responses' | 'timeline'>) => {
    const newId = `DSP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDispute: Dispute = {
      ...disputeData,
      id: newId,
      rounds: [
        {
          roundNumber: disputeData.currentRound || 1,
          createdDate: new Date().toISOString().substring(0, 10),
          bureau: disputeData.bureau,
          accountName: disputeData.creditorName,
          correspondenceStatus: 'Drafted',
          responseStatus: 'Awaiting Response',
          notes: 'Dispute round initiated.',
        }
      ],
      responses: [],
      timeline: [
        {
          id: `DTL-${Date.now()}`,
          title: 'Potential Discrepancy Formalized',
          description: `Dispute record created for ${disputeData.creditorName}.`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'completed',
          actor: currentUser.name,
        },
        {
          id: `DTL-${Date.now() + 1}`,
          title: 'Draft Preparation',
          description: 'Ready for Letter Studio drafting.',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'current',
        }
      ],
    };

    setDisputes(prev => [newDispute, ...prev]);
    // increment client active dispute count
    setClients(prev => prev.map(c => c.id === disputeData.clientId ? { ...c, activeDisputesCount: c.activeDisputesCount + 1 } : c));
    logActivity(`Created dispute ${newId} for ${disputeData.clientName}`, 'Disputes', newId, 'create');
    showToast(`Dispute ${newId} initialized.`, 'success');
    return newDispute;
  };

  const updateDisputeStatus = (id: string, status: Dispute['status']) => {
    setDisputes(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status,
          timeline: [
            ...d.timeline,
            {
              id: `DTL-${Date.now()}`,
              title: `Status Changed to ${status.replace('_', ' ').toUpperCase()}`,
              description: `Updated by ${currentUser.name}.`,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              status: 'completed',
              actor: currentUser.name,
            }
          ]
        };
      }
      return d;
    }));
    logActivity(`Updated dispute ${id} status to ${status}`, 'Disputes', id, 'status_change');
    showToast(`Dispute status set to ${status.replace('_', ' ')}.`, 'info');
  };

  const addDisputeRound = (disputeId: string, notes: string) => {
    setDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        const nextRound = d.currentRound + 1;
        const newRound = {
          roundNumber: nextRound,
          createdDate: new Date().toISOString().substring(0, 10),
          bureau: d.bureau,
          accountName: d.creditorName,
          correspondenceStatus: 'Drafted' as const,
          responseStatus: 'Awaiting Response' as const,
          notes,
        };
        return {
          ...d,
          currentRound: nextRound,
          status: 'draft',
          rounds: [...d.rounds, newRound],
          timeline: [
            ...d.timeline,
            {
              id: `DTL-${Date.now()}`,
              title: `Round ${nextRound} Initiated`,
              description: notes || `Follow-up escalation round opened.`,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              status: 'completed',
              actor: currentUser.name,
            }
          ]
        };
      }
      return d;
    }));
    logActivity(`Opened Round escalation for dispute ${disputeId}`, 'Disputes', disputeId, 'update');
    showToast(`Round added to dispute ${disputeId}.`, 'success');
  };

  const recordBureauResponse = (
    disputeId: string,
    response: {
      bureau: Bureau;
      responseCategory: any;
      outcome: string;
      supportingDocName?: string;
      followUpRequired: boolean;
      notes: string;
    }
  ) => {
    const newResponse = {
      id: `RSP-${Date.now()}`,
      responseDate: new Date().toISOString().substring(0, 10),
      ...response,
      loggedBy: currentUser.name,
    };

    setDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        const newStatus = response.responseCategory === 'Deleted Information' 
          ? 'closed' 
          : response.followUpRequired 
            ? 'follow_up_required' 
            : 'response_received';

        return {
          ...d,
          status: newStatus,
          responses: [...d.responses, newResponse],
          timeline: [
            ...d.timeline,
            {
              id: `DTL-${Date.now()}`,
              title: `Bureau Response: ${response.responseCategory}`,
              description: response.outcome,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              status: 'completed',
              actor: currentUser.name,
            }
          ]
        };
      }
      return d;
    }));

    logActivity(`Recorded ${response.bureau} response for dispute ${disputeId}`, 'Disputes', disputeId, 'update');
    showToast(`Response recorded: ${response.responseCategory}`, 'success');
  };

  // Letters actions
  const addLetter = (letterData: Omit<Letter, 'id' | 'createdDate' | 'lastUpdated' | 'approvalStatus'>) => {
    const newId = `LTR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLetter: Letter = {
      ...letterData,
      id: newId,
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      approvalStatus: 'draft',
    };

    setLetters(prev => [newLetter, ...prev]);
    logActivity(`Drafted dispute letter ${newId} for ${letterData.clientName}`, 'Letters', newId, 'create');
    showToast(`Letter ${newId} drafted successfully!`, 'success');
    return newLetter;
  };

  const updateLetterContent = (id: string, content: string) => {
    setLetters(prev => prev.map(l => l.id === id ? {
      ...l,
      content,
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
    } : l));
  };

  const submitLetterForApproval = (id: string) => {
    setLetters(prev => prev.map(l => l.id === id ? {
      ...l,
      approvalStatus: 'pending_approval',
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
    } : l));
    logActivity(`Submitted letter ${id} for required administrator approval`, 'Letters', id, 'update');
    showToast(`Letter submitted for Administrator approval.`, 'info');
  };

  const approveLetter = (id: string, notes?: string) => {
    if (currentUser.role !== 'admin') {
      showToast('Only administrators can approve dispute correspondence.', 'error');
      return;
    }

    setLetters(prev => prev.map(l => l.id === id ? {
      ...l,
      approvalStatus: 'approved',
      approvalRecord: {
        approvedBy: currentUser.name,
        approvedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        notes: notes || 'Verified compliance with FCRA standards. Authorized for dispatch.',
      },
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
    } : l));

    logActivity(`Approved dispute letter ${id} for dispatch`, 'Letters', id, 'approval');
    showToast(`Letter ${id} approved by ${currentUser.name}! Ready to record submission.`, 'success');
  };

  const rejectLetter = (id: string, reason: string) => {
    if (currentUser.role !== 'admin') {
      showToast('Only administrators can reject dispute correspondence.', 'error');
      return;
    }

    setLetters(prev => prev.map(l => l.id === id ? {
      ...l,
      approvalStatus: 'rejected',
      rejectionRecord: {
        rejectedBy: currentUser.name,
        rejectedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        reason,
      },
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
    } : l));

    logActivity(`Requested revisions for letter ${id}`, 'Letters', id, 'update');
    showToast(`Letter returned to staff for revision.`, 'warning');
  };

  const recordLetterSubmission = (id: string, trackingNumber?: string) => {
    const letter = letters.find(l => l.id === id);
    if (!letter || letter.approvalStatus !== 'approved') {
      showToast('Cannot record submission: Letter must be approved first!', 'error');
      return;
    }

    setLetters(prev => prev.map(l => l.id === id ? {
      ...l,
      approvalStatus: 'submission_recorded',
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
    } : l));

    // Update dispute status if linked
    if (letter.disputeId) {
      updateDisputeStatus(letter.disputeId, 'submitted');
    }

    logActivity(`Recorded dispatch for letter ${id} (${trackingNumber || 'Mock Certified Mail'})`, 'Letters', id, 'status_change');
    showToast(`Submission recorded! 30-day response window started.`, 'success');
  };

  // Tasks actions
  const addTask = (taskData: Omit<Task, 'id' | 'status'>) => {
    const newId = `TSK-${Math.floor(100 + Math.random() * 900)}`;
    const newTask: Task = {
      ...taskData,
      id: newId,
      status: 'pending',
    };
    setTasks(prev => [newTask, ...prev]);
    logActivity(`Created task: ${taskData.title}`, 'Tasks', newId, 'create');
    showToast(`Task created.`, 'success');
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    showToast(`Task status updated to ${status}.`, 'info');
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
    logActivity(`Updated task status for ${id}`, 'Tasks', id, 'status_change');
    showToast('Task updated.', 'success');
  };

  // Calendar actions
  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id' | 'status'>) => {
    const newId = `EVT-${Math.floor(10 + Math.random() * 90)}`;
    const newEvent: CalendarEvent = {
      ...eventData,
      id: newId,
      status: 'upcoming',
    };
    setCalendarEvents(prev => [...prev, newEvent]);
    showToast('Calendar deadline added.', 'success');
  };

  // Document actions
  const addDocument = (docData: Omit<DocumentItem, 'id' | 'uploadDate' | 'status'>) => {
    const newId = `DOC-${Math.floor(100 + Math.random() * 900)}`;
    const newDoc: DocumentItem = {
      ...docData,
      id: newId,
      uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Verified',
    };
    setDocuments(prev => [newDoc, ...prev]);
    logActivity(`Simulated upload for document ${docData.name}`, 'Documents', newId, 'upload');
    showToast(`Document "${docData.name}" uploaded successfully!`, 'success');
  };

  // Team actions
  const addTeamMember = (memberData: Omit<TeamMember, 'id' | 'assignedClientsCount' | 'activeTasksCount'>) => {
    const newId = `USR-${Math.floor(100 + Math.random() * 900)}`;
    const newMember: TeamMember = {
      ...memberData,
      id: newId,
      assignedClientsCount: 0,
      activeTasksCount: 0,
    };
    setTeamMembers(prev => [...prev, newMember]);
    logActivity(`Added new team member: ${memberData.name}`, 'Settings', newId, 'create');
    showToast(`Team member ${memberData.name} added.`, 'success');
  };

  const toggleTeamMemberStatus = (id: string) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m));
    showToast('Team member status toggled.', 'info');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  // Bureau Directory
  const updateBureauEntry = (id: string, updates: Partial<BureauDirectoryEntry>) => {
    setBureauDirectory(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    showToast('Bureau directory record updated.', 'success');
  };

  // Settings
  const updateSettings = (newSettings: Partial<AppContextType['settings']>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Operational settings saved.', 'success');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.clear();
    setCurrentUserState(mockUsers[0]);
    setClients(mockClients);
    setReports(mockReports);
    setDisputes(mockDisputes);
    setLetters(mockLetters);
    setTasks(mockTasks);
    setCalendarEvents(mockCalendarEvents);
    setDocuments(mockDocuments);
    setTeamMembers(mockTeamMembers);
    setActivityLogs(mockActivityLogs);
    setNotifications(mockNotifications);
    setBureauDirectory(mockBureauDirectory);
    showToast('Demo environment reset to initial state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        clients,
        addClient,
        updateClient,
        addClientNote,
        updateOnboardingStep,
        reports,
        importReport,
        flagDiscrepancy,
        updateAccountStatus,
        disputes,
        addDispute,
        updateDisputeStatus,
        addDisputeRound,
        recordBureauResponse,
        letters,
        templates,
        addLetter,
        updateLetterContent,
        submitLetterForApproval,
        approveLetter,
        rejectLetter,
        recordLetterSubmission,
        tasks,
        addTask,
        updateTaskStatus,
        toggleTaskComplete,
        calendarEvents,
        addCalendarEvent,
        documents,
        addDocument,
        teamMembers,
        addTeamMember,
        toggleTeamMemberStatus,
        activityLogs,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        bureauDirectory,
        updateBureauEntry,
        settings,
        updateSettings,
        resetDemoData,
        showToast,
        toast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

