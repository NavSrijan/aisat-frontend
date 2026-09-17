import mbaStudentsRaw from '@/data/mbaStudents.json';
import { CandidateLead } from '@/types/aisat';

export interface SeededStudent {
  sNo: number;
  name: string;
  email: string;
  phoneNumber: string;
  college: string;
  branch: string;
  graduationYear: string;
  targetDomain: string;
}

export const MBA_STUDENTS: SeededStudent[] = mbaStudentsRaw as SeededStudent[];

/**
 * Normalizes email for lookup
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Finds a seeded MBA student by email, or generates candidate details if not pre-seeded.
 */
export function findOrCreateMbaStudent(email: string): CandidateLead {
  const normalized = normalizeEmail(email);
  const matched = MBA_STUDENTS.find((s) => normalizeEmail(s.email) === normalized);

  if (matched) {
    return {
      name: matched.name,
      email: matched.email,
      phoneNumber: matched.phoneNumber,
      college: matched.college,
      rollNumber: `PGDM25-${matched.sNo.toString().padStart(3, '0')}`,
      branch: matched.branch,
      graduationYear: matched.graduationYear,
      targetDomain: matched.targetDomain,
    };
  }

  // Fallback generation for any test email
  const nameFromEmail = email
    .split('@')[0]
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Generate synthetic sequential/deterministic phone number
  const hash = Math.abs(
    normalized.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  );
  const syntheticPhone = `9000${(hash % 900000 + 100000).toString()}`;

  return {
    name: nameFromEmail || 'Management Candidate',
    email: email.trim(),
    phoneNumber: syntheticPhone,
    college: 'Poddar Group of Institutions',
    rollNumber: '',
    branch: 'MBA / PGDM',
    graduationYear: '2025',
    targetDomain: 'Management & Applied AI',
  };
}
