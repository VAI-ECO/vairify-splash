import type { Question } from '../types';

/**
 * Maximum number of governance votes a Founding Council member can miss
 * before losing their status and reverting to standard Premium tier.
 */
export const MAX_MISSED_VOTES = 4;

/**
 * Founding Council Governance Questions
 *
 * NOTE: These questions are currently hardcoded for frontend development.
 * In production, these will be managed through an admin panel and stored
 * in the Supabase `questions` table. Admins will be able to:
 * - Add/edit/archive questions
 * - Set question order and sections
 * - Control when questions go live
 * - View voting analytics
 */

export const foundingQuestions: Question[] = [
  {
    id: 'fc-priority-1',
    section: 'Platform Priorities',
    prompt: 'What should be our TOP priority for the first 90 days after launch?',
    options: [
      'Advanced verification features (biometric, video verification)',
      'Community safety tools (reporting, blocking, emergency features)',
      'User experience polish (onboarding, tutorials, performance)',
    ],
  },
  {
    id: 'fc-policy-1',
    section: 'Community Policies',
    prompt: 'Should Vairify require all providers to complete identity verification before their first booking?',
    options: [
      'Yes - Mandatory verification for everyone',
      'No - Keep it optional for privacy',
    ],
  },
  {
    id: 'fc-feature-1',
    section: 'Feature Roadmap',
    prompt: 'Which premium feature should we prioritize building next?',
    options: [
      'Client background check integration',
      'Multi-provider team verification',
      'Advanced scheduling & booking system',
    ],
  },
];
