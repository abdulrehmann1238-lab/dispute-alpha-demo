import { Letter, LetterTemplate } from '../types';

export const mockTemplates: LetterTemplate[] = [
  {
    id: 'TMP-001',
    title: 'General Account Information Review',
    category: 'Account Information',
    description: 'Requests reinvestigation and verification of balance, status, and reporting timeline discrepancies under Fair Credit Reporting Act standards.',
    bodyTemplate: `[DATE]

To: [BUREAU_NAME] Dispute Department
[BUREAU_ADDRESS]

From:
[CLIENT_NAME]
[CLIENT_ADDRESS]

RE: FORMAL REQUEST FOR VERIFICATION & REINVESTIGATION (ROUND [DISPUTE_ROUND])
Creditor / Data Furnisher: [CREDITOR_NAME]
Account Reference: [ACCOUNT_NUMBER_MASKED]
Dispute Category: [DISPUTE_CATEGORY]

Dear Consumer Relations Department,

I am writing to formally request a thorough reinvestigation of the aforementioned account appearing on my credit file. Upon careful review of my recent credit disclosure, I have identified inaccurate reporting regarding this tradeline that requires factual substantiation.

Specifically, the reported records do not align with my actual historical records and documentation. Under the provisions of the Fair Credit Reporting Act, 15 U.S.C. § 1681i, consumer reporting agencies are required to conduct a reasonable investigation to verify the complete accuracy of disputed information within 30 days of receiving notice.

I request that you contact the data furnisher to review the underlying documentation verifying the reported balances and dates. If the data furnisher fails to verify or substantiate the complete accuracy of this tradeline within the statutory timeframe, I request that the inaccurate information be promptly updated or removed from my file.

Please forward an updated copy of my credit disclosure upon conclusion of your reinvestigation.

Sincerely,

[CLIENT_NAME]
Authorized Signature on File`,
  },
  {
    id: 'TMP-002',
    title: 'Payment History Review',
    category: 'Payment Delinquency',
    description: 'Challenges inaccurate late payment notations with supporting clearance receipts or banking transaction logs.',
    bodyTemplate: `[DATE]

To: [BUREAU_NAME] Dispute Department
[BUREAU_ADDRESS]

From:
[CLIENT_NAME]
[CLIENT_ADDRESS]

RE: REQUEST FOR CORRECTION OF INACCURATE PAYMENT DELINQUENCY (ROUND [DISPUTE_ROUND])
Creditor / Data Furnisher: [CREDITOR_NAME]
Account Reference: [ACCOUNT_NUMBER_MASKED]
Dispute Category: [DISPUTE_CATEGORY]

Dear Consumer Relations Department,

A review of my credit report reveals an inaccurate delinquency notation associated with the account referenced above. The current reporting reflects a late payment notation that contradicts my direct payment records and banking documentation.

I have attached verifiable banking clearance records demonstrating that payment for the disputed period was transmitted and debited within the applicable contractual terms. The data furnisher's derogatory notation appears to stem from a processing delay or reporting error.

In accordance with 15 U.S.C. § 1681s-2 and § 1681i, I request an expedited review of this payment history notation and an update to reflect the account as paid as agreed for the period in question.

Please provide written confirmation of the results of your investigation and an updated disclosure.

Sincerely,

[CLIENT_NAME]
Authorized Signature on File`,
  },
  {
    id: 'TMP-003',
    title: 'Collection Account Review',
    category: 'Third-Party Collections',
    description: 'Demands complete chain of assignment verification and zero-balance reconciliation for third-party collection agencies.',
    bodyTemplate: `[DATE]

To: [BUREAU_NAME] Dispute Department
[BUREAU_ADDRESS]

From:
[CLIENT_NAME]
[CLIENT_ADDRESS]

RE: NOTICE OF UNVERIFIED COLLECTION & REQUEST FOR COMPLETE PURGE (ROUND [DISPUTE_ROUND])
Collection Agency: [CREDITOR_NAME]
Account Reference: [ACCOUNT_NUMBER_MASKED]
Dispute Category: [DISPUTE_CATEGORY]

Dear Consumer Relations Department,

I am writing regarding a collection tradeline reported by [CREDITOR_NAME] on my consumer credit profile. I am formally requesting factual verification of the legal authority and accuracy under which this balance is being reported.

The balance listed either reflects satisfied settlement terms, unverified third-party assignment, or inaccurate statutory reporting dates. Continued reporting of unverified or satisfied balances violates accuracy mandates under FCRA § 623 and § 611.

I request that you require the reporting collection entity to supply complete documentation demonstrating:
1. Proof of legal assignment or ownership of the purported debt.
2. An itemized accounting verifying the accuracy of the reported balance.
3. Verification that previous settlements or adjustments have been credited accurately.

If the collection agency cannot provide verifiable proof within the 30-day statutory period, this unverified tradeline must be deleted from my credit file immediately.

Sincerely,

[CLIENT_NAME]
Authorized Signature on File`,
  },
];

export const mockLetters: Letter[] = [
  {
    id: 'LTR-3081',
    clientId: 'CLI-8492',
    clientName: 'Jordan Hayes',
    bureau: 'Equifax',
    templateId: 'TMP-003',
    templateTitle: 'Collection Account Review',
    disputeRound: 1,
    disputeId: 'DSP-1042',
    creditorName: 'Metro Collection Group',
    accountReferenceMasked: '•••• •••• •••• 9921',
    createdDate: '2026-10-16 11:30',
    lastUpdated: '2026-10-18 10:45',
    approvalStatus: 'submission_recorded',
    approvalRecord: {
      approvedBy: 'Alex Vance',
      approvedAt: '2026-10-18 10:45',
      notes: 'Settlement receipt copy verified and attached. Approved for postal dispatch.',
    },
    content: `October 18, 2026

To: Equifax Information Services LLC
Dispute Department, P.O. Box 740256, Atlanta, GA 30374

From:
Jordan Hayes
742 Evergreen Terrace, Portland, OR 97201

RE: NOTICE OF UNVERIFIED COLLECTION & REQUEST FOR COMPLETE PURGE (ROUND 1)
Collection Agency: Metro Collection Group
Account Reference: •••• •••• •••• 9921
Dispute Category: Unverified Collection

Dear Consumer Relations Department,

I am writing regarding a collection tradeline reported by Metro Collection Group on my consumer credit profile. I am formally requesting factual verification of the legal authority and accuracy under which this balance is being reported.

The balance listed either reflects satisfied settlement terms, unverified third-party assignment, or inaccurate statutory reporting dates. Continued reporting of unverified or satisfied balances violates accuracy mandates under FCRA § 623 and § 611.

I request that you require the reporting collection entity to supply complete documentation demonstrating:
1. Proof of legal assignment or ownership of the purported debt.
2. An itemized accounting verifying the accuracy of the reported balance.
3. Verification that previous settlements or adjustments have been credited accurately.

If the collection agency cannot provide verifiable proof within the 30-day statutory period, this unverified tradeline must be deleted from my credit file immediately.

Sincerely,

Jordan Hayes
Authorized Signature on File`,
    attachedDocuments: ['Settlement_Agreement_Metro.pdf', 'Driver_License_Proof.pdf', 'Utility_Bill_Proof.pdf'],
  },
  {
    id: 'LTR-3082',
    clientId: 'CLI-8492',
    clientName: 'Jordan Hayes',
    bureau: 'Experian',
    templateId: 'TMP-002',
    templateTitle: 'Payment History Review',
    disputeRound: 1,
    disputeId: 'DSP-1043',
    creditorName: 'Summit Auto Finance',
    accountReferenceMasked: '•••• •••• •••• 5510',
    createdDate: '2026-10-21 15:20',
    lastUpdated: '2026-10-22 09:15',
    approvalStatus: 'pending_approval',
    content: `October 22, 2026

To: Experian
Dispute Operations, P.O. Box 4500, Allen, TX 75013

From:
Jordan Hayes
742 Evergreen Terrace, Portland, OR 97201

RE: REQUEST FOR CORRECTION OF INACCURATE PAYMENT DELINQUENCY (ROUND 1)
Creditor / Data Furnisher: Summit Auto Finance
Account Reference: •••• •••• •••• 5510
Dispute Category: Late Payment Verification

Dear Consumer Relations Department,

A review of my credit report reveals an inaccurate delinquency notation associated with the account referenced above. The current reporting reflects a late payment notation that contradicts my direct payment records and banking documentation.

I have attached verifiable banking clearance records demonstrating that payment for the disputed period was transmitted and debited within the applicable contractual terms. The data furnisher's derogatory notation appears to stem from a processing delay or reporting error.

In accordance with 15 U.S.C. § 1681s-2 and § 1681i, I request an expedited review of this payment history notation and an update to reflect the account as paid as agreed for the period in question.

Please provide written confirmation of the results of your investigation and an updated disclosure.

Sincerely,

Jordan Hayes
Authorized Signature on File`,
    attachedDocuments: ['Bank_Statement_July_2024.pdf', 'Driver_License_Proof.pdf'],
  },
  {
    id: 'LTR-3083',
    clientId: 'CLI-8492',
    clientName: 'Jordan Hayes',
    bureau: 'TransUnion',
    templateId: 'TMP-001',
    templateTitle: 'General Account Information Review',
    disputeRound: 1,
    disputeId: 'DSP-1044',
    creditorName: 'Pinnacle Student Servicing',
    accountReferenceMasked: '•••• •••• •••• 1044',
    createdDate: '2026-10-24 16:00',
    lastUpdated: '2026-10-24 16:00',
    approvalStatus: 'draft',
    content: `October 24, 2026

To: TransUnion LLC
Consumer Dispute Center, P.O. Box 2000, Chester, PA 19016

From:
Jordan Hayes
742 Evergreen Terrace, Portland, OR 97201

RE: FORMAL REQUEST FOR VERIFICATION & REINVESTIGATION (ROUND 1)
Creditor / Data Furnisher: Pinnacle Student Servicing
Account Reference: •••• •••• •••• 1044
Dispute Category: Duplicate Account

Dear Consumer Relations Department,

I am writing to formally request a thorough reinvestigation of the aforementioned account appearing on my credit file. Upon careful review of my recent credit disclosure, I have identified inaccurate reporting regarding this tradeline that requires factual substantiation.

Specifically, the reported records do not align with my actual historical records and documentation. Under the provisions of the Fair Credit Reporting Act, 15 U.S.C. § 1681i, consumer reporting agencies are required to conduct a reasonable investigation to verify the complete accuracy of disputed information within 30 days of receiving notice.

I request that you contact the data furnisher to review the underlying documentation verifying the reported balances and dates. If the data furnisher fails to verify or substantiate the complete accuracy of this tradeline within the statutory timeframe, I request that the inaccurate information be promptly updated or removed from my file.

Please forward an updated copy of my credit disclosure upon conclusion of your reinvestigation.

Sincerely,

Jordan Hayes
Authorized Signature on File`,
    attachedDocuments: ['National_Student_Loan_Summary.pdf'],
  },
  {
    id: 'LTR-3084',
    clientId: 'CLI-7721',
    clientName: 'Sophia Chen',
    bureau: 'Equifax',
    templateId: 'TMP-001',
    templateTitle: 'General Account Information Review',
    disputeRound: 1,
    disputeId: 'DSP-1045',
    creditorName: 'Horizon Credit Card',
    accountReferenceMasked: '•••• •••• •••• 8832',
    createdDate: '2026-10-22 13:10',
    lastUpdated: '2026-10-25 15:00',
    approvalStatus: 'approved',
    approvalRecord: {
      approvedBy: 'Alex Vance',
      approvedAt: '2026-10-25 15:00',
      notes: 'Credit limit mismatch documented against original card agreement.',
    },
    content: `October 25, 2026

To: Equifax Information Services LLC
Dispute Department, P.O. Box 740256, Atlanta, GA 30374

From:
Sophia Chen
340 Pine Tree Lane, Seattle, WA 98101

RE: FORMAL REQUEST FOR VERIFICATION & REINVESTIGATION (ROUND 1)
Creditor / Data Furnisher: Horizon Credit Card
Account Reference: •••• •••• •••• 8832
Dispute Category: Inaccurate Balance

Dear Consumer Relations Department,

I am writing to request reinvestigation of the credit line reported on Horizon Credit Card. The reported limit is listed as $1,500 whereas my active account agreement and card statements establish a limit of $2,500. This severely skews my credit utilization metrics.

Sincerely,

Sophia Chen`,
    attachedDocuments: ['Horizon_Account_Agreement.pdf'],
  },
  {
    id: 'LTR-3085',
    clientId: 'CLI-4328',
    clientName: 'Lucas Bennett',
    bureau: 'Experian',
    templateId: 'TMP-001',
    templateTitle: 'General Account Information Review',
    disputeRound: 1,
    disputeId: 'DSP-1046',
    creditorName: 'Pinnacle Servicing',
    accountReferenceMasked: '•••• •••• •••• 7712',
    createdDate: '2026-10-23 10:00',
    lastUpdated: '2026-10-24 14:00',
    approvalStatus: 'pending_approval',
    content: `October 24, 2026

To: Experian
Dispute Operations, P.O. Box 4500, Allen, TX 75013

From:
Lucas Bennett
2214 Mission St, San Francisco, CA 94110

RE: DUPLICATE TRADELINE REPORTING CHALLENGE
Creditor: Pinnacle Servicing
Account: •••• •••• •••• 7712

Dear Experian,
This tradeline is listed twice on my Experian report with identical loan terms and dates, causing severe double-counting of liabilities.`,
    attachedDocuments: ['Loan_Consolidation_Verification.pdf'],
  },
  {
    id: 'LTR-3086',
    clientId: 'CLI-7744',
    clientName: 'Liam O\'Connor',
    bureau: 'Experian',
    templateId: 'TMP-001',
    templateTitle: 'General Account Information Review',
    disputeRound: 1,
    disputeId: 'DSP-1049',
    creditorName: 'Frontier Communications',
    accountReferenceMasked: '•••• •••• •••• 3041',
    createdDate: '2026-10-25 09:40',
    lastUpdated: '2026-10-25 11:20',
    approvalStatus: 'pending_approval',
    content: `October 25, 2026

To: Experian Dispute Operations
RE: FRAUDULENT ACCOUNT REPORTING & IDENTITY THEFT NOTICE
Creditor: Frontier Communications
Account: •••• •••• •••• 3041

I never opened or authorized this telecommunications account. Attached is my FTC Identity Theft Report #992819.`,
    attachedDocuments: ['FTC_Identity_Theft_Report_Liam.pdf'],
  },
];

