import { createClient } from '@supabase/supabase-js';

// These will be set via environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for reservations
export const createReservation = async (email) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .insert([{ email, tier: 'founding-council' }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating reservation:', error);
    return { data: null, error };
  }
};

export const getReservation = async (email) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return { data: null, error };
  }
};

export const completeRegistration = async (email) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .update({
        registration_completed: true,
        locked_in: true
      })
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error completing registration:', error);
    return { data: null, error };
  }
};

export const getReservationCount = async () => {
  try {
    const { count, error } = await supabase
      .from('reservations')
      .select('*', { count: 'exact', head: true })
      .eq('tier', 'founding-council');

    if (error) throw error;
    return { count, error: null };
  } catch (error) {
    console.error('Error fetching count:', error);
    return { count: 0, error };
  }
};

// Helper functions for decisions/votes
export const getDecisions = async () => {
  try {
    const { data, error } = await supabase
      .from('decisions')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching decisions:', error);
    return { data: [], error };
  }
};

export const castVote = async (decisionId, userEmail, selectedOption) => {
  try {
    const { data, error } = await supabase
      .from('votes')
      .insert([{
        decision_id: decisionId,
        user_email: userEmail,
        selected_option: selectedOption
      }])
      .select()
      .single();

    if (error) throw error;

    // Also update the reservation to mark first vote cast
    await supabase
      .from('reservations')
      .update({ first_vote_cast: true })
      .eq('email', userEmail);

    return { data, error: null };
  } catch (error) {
    console.error('Error casting vote:', error);
    return { data: null, error };
  }
};
