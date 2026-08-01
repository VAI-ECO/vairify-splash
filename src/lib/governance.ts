/**
 * Governance Service Layer
 *
 * This module provides the backend seam for the Founding Council voting flow.
 * All functions are currently FRONTEND STUBS that will be replaced with
 * Supabase integration when the backend is ready.
 */

import { foundingQuestions } from '../config/foundingQuestions';
import type { Question, VoteSubmission, VoteResults } from '../types';

// In-memory storage for votes (frontend-only, temporary)
const votes: Map<string, VoteSubmission> = new Map();

/**
 * Get all governance questions
 *
 * TODO(backend): Replace with Supabase query:
 * - SELECT * FROM questions WHERE active = true ORDER BY section, order
 * - Questions should be admin-manageable via dashboard
 * - Cache questions with reasonable TTL
 */
export async function getQuestions(): Promise<Question[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return foundingQuestions;
}

/**
 * Submit a vote for a question
 *
 * TODO(backend): Replace with Supabase insert:
 * - INSERT INTO votes (question_id, answer, reservation_email, created_at)
 * - VALUES ($1, $2, $3, NOW())
 * - Ensure one vote per email per question (UNIQUE constraint or upsert)
 * - Return success/error status
 *
 * @param questionId - The question ID
 * @param answer - The selected answer
 * @param reservationEmail - Email from the reservation (for auth)
 */
export async function submitVote(
  questionId: string,
  answer: string,
  reservationEmail?: string
): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Store in memory (temporary)
  const key = `${reservationEmail || 'anonymous'}_${questionId}`;
  votes.set(key, {
    questionId,
    answer,
    email: reservationEmail,
    createdAt: new Date().toISOString(),
  });

  console.log('Vote submitted (in-memory):', { questionId, answer, email: reservationEmail });
}

/**
 * Get voting results for a question
 *
 * TODO(backend): Replace with Supabase aggregation:
 * - SELECT answer, COUNT(*) as count
 * - FROM votes
 * - WHERE question_id = $1
 * - GROUP BY answer
 * - Compute percentages from counts
 * - Cache results with short TTL (e.g., 30 seconds)
 *
 * @param questionId - The question ID
 * @returns Array of {option, count, percentage} objects
 */
export async function getResults(questionId: string): Promise<VoteResults[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));

  // PLACEHOLDER DATA - These are sample numbers, NOT real votes
  const question = foundingQuestions.find(q => q.id === questionId);
  if (!question) return [];

  // Generate realistic-looking fake data
  const options = question.options;
  const fakeResults: VoteResults[] = [];

  if (options.length === 2) {
    // Binary question - skew slightly
    fakeResults.push(
      { option: options[0], count: 143, percentage: 57 },
      { option: options[1], count: 107, percentage: 43 }
    );
  } else if (options.length === 3) {
    // Three options - varied distribution
    fakeResults.push(
      { option: options[0], count: 98, percentage: 39 },
      { option: options[1], count: 127, percentage: 51 },
      { option: options[2], count: 25, percentage: 10 }
    );
  } else {
    // Fallback: even distribution
    const pct = Math.floor(100 / options.length);
    options.forEach((opt, i) => {
      fakeResults.push({
        option: opt,
        count: 50 + i * 10,
        percentage: i === 0 ? 100 - pct * (options.length - 1) : pct,
      });
    });
  }

  return fakeResults;
}

/**
 * Check if user has voted on a specific question
 *
 * TODO(backend): Replace with Supabase query:
 * - SELECT EXISTS(SELECT 1 FROM votes WHERE question_id = $1 AND reservation_email = $2)
 */
export async function hasVoted(
  questionId: string,
  reservationEmail?: string
): Promise<boolean> {
  const key = `${reservationEmail || 'anonymous'}_${questionId}`;
  return votes.has(key);
}
