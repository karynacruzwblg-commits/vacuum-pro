import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database
export interface UserProfileDB {
  id: string;
  user_id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  program_level: 1 | 2 | 3;
  is_premium: boolean;
  current_day: number;
  current_week: number;
  streak: number;
  points: number;
  completed_days: number[];
  checklist_progress: Record<string, boolean>;
  before_photo?: string;
  after_photo?: string;
  avatar_color: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionnaireAnswerDB {
  id: string;
  user_id: string;
  answers: Record<number, number>;
  created_at: string;
}
