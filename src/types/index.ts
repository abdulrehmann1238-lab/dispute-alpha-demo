export type UserRole = 'admin' | 'staff' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title?: string;
  clientId?: string; // If role is client
}

export interface ClientNote {
  id: string;
  author: string;
  role: string;
  content: string;
  createdAt: string;
  isInternal: boolean;
}

export interface ClientActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export interface OnboardingChecklist {
  profileCompleted: boolean;
  agreementUploaded: boolean;
  documentsReceived: boolean;
  monitoringAuthorized: boolean;
  reportImported: boolean;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  enrollmentDate: string;
  assignedStaffId: string;
  assignedStaffName: string;
  status: 'active' | 'onboarding' | 'pending_documents' | 'inactive';
  activeDisputesCount: number;
  creditScores: {
    equifax: number;
    experian: number;
    transunion: number;
  };
  onboardingChecklist: OnboardingChecklist;
  notes: ClientNote[];
  activity: ClientActivity[];
}

export type Bureau = 'Equifax' | 'Experian' | 'TransUnion';

export interface AccountDiscrepancy {
  id: string;
  category: 
    | 'Balance Discrepancy'
    | 'Account Status Review'
    | 'Duplicate Reporting'
    | 'Payment History Discrepancy'
    | 'Personal Information Mismatch'
    | 'Unverified Collection';
  description: string;
  evidenceNotes: string;
  reviewStatus: 'Pending Review' | 'Under Investigation' | 'Verified' | 'Dispute Drafted';
  assignedStaff: string;
  flaggedAt: string;
}

export interface CreditAccount {
  id: string;
  creditorName: string;
  accountType: 'Revolving' | 'Installment' | 'Mortgage' | 'Collection' | 'Auto Loan';
  accountNumberMasked: string;
  reportedBalance: number;
  creditLimit?: number;
  dateOpened: string;
  lastUpdated: string;
  paymentStatus: 'Current / Pays as agreed' | '30 Days Late' | '60 Days Late' | '90+ Days Late' | 'Charge-Off' | 'In Collections';
  reviewStatus: 'clean' | 'flagged' | 'in_dispute' | 'resolved';
  bureauReporting: {
    equifax: boolean;
    experian: boolean;
    transunion: boolean;
  };
  discrepancies: AccountDiscrepancy[];
  historySummary: string;
  notes?: string[];
}

export interface CreditReport {
  id: string;
  clientId: string;
  clientName: string;
  bureau: Bureau;
  reportDate: string;
  importDate: string;
  importSource: string;
  summary: {
    totalAccounts: number;
    openAccounts: number;
    closedAccounts: number;
    negativeAccounts: number;
    collections: number;
    publicRecords: number;
  };
  accounts: CreditAccount[];
}

export type DisputeStatus = 
  | 'draft'
  | 'under_review'
  | 'approved'
  | 'submitted'
  | 'response_received'
  | 'follow_up_required'
  | 'closed';

export interface DisputeRound {
  roundNumber: number;
  createdDate: string;
  bureau: Bureau;
  accountName: string;
  correspondenceStatus: 'Drafted' | 'Approved' | 'Dispatched' | 'Delivered';
  responseStatus: 'Awaiting Response' | 'Response Logged' | 'Overdue';
  letterId?: string;
  notes: string;
}

export interface BureauResponse {
  id: string;
  responseDate: string;
  bureau: Bureau;
  responseCategory: 
    | 'Updated Information'
    | 'Verified Information'
    | 'Deleted Information'
    | 'No Response Recorded'
    | 'Additional Investigation Required';
  outcome: string;
  supportingDocName?: string;
  followUpRequired: boolean;
  notes: string;
  loggedBy: string;
}

export interface DisputeTimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
  actor?: string;
}

export interface Dispute {
  id: string;
  clientId: string;
  clientName: string;
  bureau: Bureau;
  creditorName: string;
  accountId: string;
  disputeCategory: 
    | 'Inaccurate Balance'
    | 'Late Payment Verification'
    | 'Duplicate Account'
    | 'Fraudulent / Identity Dispute'
    | 'Unverified Collection'
    | 'Outdated Account';
  status: DisputeStatus;
  currentRound: number;
  assignedStaffId: string;
  assignedStaffName: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  rounds: DisputeRound[];
  responses: BureauResponse[];
  timeline: DisputeTimelineEvent[];
}

export type LetterApprovalStatus = 
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'submission_recorded'
  | 'rejected';

export interface LetterTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  bodyTemplate: string;
}

export interface Letter {
  id: string;
  clientId: string;
  clientName: string;
  bureau: Bureau;
  templateId: string;
  templateTitle: string;
  disputeRound: number;
  disputeId?: string;
  creditorName: string;
  accountReferenceMasked: string;
  createdDate: string;
  lastUpdated: string;
  approvalStatus: LetterApprovalStatus;
  approvalRecord?: {
    approvedBy: string;
    approvedAt: string;
    notes?: string;
  };
  rejectionRecord?: {
    rejectedBy: string;
    rejectedAt: string;
    reason: string;
  };
  content: string;
  attachedDocuments: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  clientId?: string;
  clientName?: string;
  relatedDisputeId?: string;
  assignedToId: string;
  assignedToName: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'deadline' | 'bureau_response' | 'internal_review' | 'client_appointment' | 'task_deadline';
  date: string;
  time?: string;
  clientName?: string;
  assignedStaff?: string;
  description: string;
  status: 'upcoming' | 'completed' | 'overdue';
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'Agreements' | 'Credit Reports' | 'Supporting Documents' | 'Dispute Letters' | 'Bureau Responses' | 'Other';
  clientId: string;
  clientName: string;
  uploadedBy: string;
  uploadDate: string;
  fileType: 'PDF' | 'PNG' | 'DOCX' | 'JPG';
  fileSize: string;
  status: 'Verified' | 'Pending Review' | 'Archived';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Manager' | 'Staff';
  avatar: string;
  title: string;
  assignedClientsCount: number;
  activeTasksCount: number;
  status: 'active' | 'inactive';
}

export interface ActivityLog {
  id: string;
  activity: string;
  user: string;
  role: string;
  module: 'Clients' | 'Reports' | 'Disputes' | 'Letters' | 'Tasks' | 'Documents' | 'Settings';
  relatedRecord: string;
  timestamp: string;
  actionType: 'create' | 'update' | 'approval' | 'review' | 'upload' | 'status_change';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: 'approval' | 'document' | 'deadline' | 'bureau' | 'task';
  timestamp: string;
  read: boolean;
  relatedLink?: string;
}

export interface BureauDirectoryEntry {
  id: string;
  name: Bureau | 'Innovis';
  mailingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  website: string;
  lastVerified: string;
  status: 'Verified' | 'Pending Verification';
  notes: string;
}

export interface ClientMessage {
  id: string;
  sender: 'staff' | 'client';
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

