import { BureauDirectoryEntry } from '../types';

export const mockBureauDirectory: BureauDirectoryEntry[] = [
  {
    id: 'BUR-01',
    name: 'Equifax',
    mailingAddress: {
      line1: 'Equifax Information Services LLC',
      line2: 'Consumer Dispute Center — P.O. Box 740256 (Mock Demo Address)',
      city: 'Atlanta',
      state: 'GA',
      zip: '30374',
    },
    phone: '(866) 349-5191',
    website: 'https://www.equifax.com',
    lastVerified: '2026-10-01',
    status: 'Verified',
    notes: 'Standard FCRA 30-day reinvestigation queue. Certified mail recommended for audit tracking.',
  },
  {
    id: 'BUR-02',
    name: 'Experian',
    mailingAddress: {
      line1: 'Experian Consumer Relations',
      line2: 'National Dispute Center — P.O. Box 4500 (Mock Demo Address)',
      city: 'Allen',
      state: 'TX',
      zip: '75013',
    },
    phone: '(888) 397-3742',
    website: 'https://www.experian.com',
    lastVerified: '2026-10-01',
    status: 'Verified',
    notes: 'Requires client SSN proof and dual utility proofs for identity validation.',
  },
  {
    id: 'BUR-03',
    name: 'TransUnion',
    mailingAddress: {
      line1: 'TransUnion LLC Dispute Operations',
      line2: 'Consumer Dispute Center — P.O. Box 2000 (Mock Demo Address)',
      city: 'Chester',
      state: 'PA',
      zip: '19016',
    },
    phone: '(800) 916-8800',
    website: 'https://www.transunion.com',
    lastVerified: '2026-10-01',
    status: 'Verified',
    notes: 'Handles online responses with updated disclosures within 30 statutory days.',
  },
  {
    id: 'BUR-04',
    name: 'Innovis',
    mailingAddress: {
      line1: 'Innovis Consumer Assistance',
      line2: 'Dispute Department — P.O. Box 1689 (Mock Demo Address)',
      city: 'Pittsburgh',
      state: 'PA',
      zip: '15230',
    },
    phone: '(800) 540-2505',
    website: 'https://www.innovis.com',
    lastVerified: '2026-10-01',
    status: 'Verified',
    notes: 'Secondary consumer reporting agency. Useful for specialized freeze or dispute audits.',
  },
];

