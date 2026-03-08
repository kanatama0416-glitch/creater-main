import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Creator {
  id: string;
  name: string;
  bio: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  website_url: string | null;
  note_url: string | null;
  youtube_url: string | null;
  avatar_url: string | null;
  comment: string | null;
  created_at: string;
}

export interface Card {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  image_url: string;
  concept: string | null;
  created_at: string;
  creator?: Creator;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_num: number;
  created_at: string;
}
