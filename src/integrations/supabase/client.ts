import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rbasuowvzdxddqlwpejp.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiYXN1b3d2emR4ZGRxbHdwZWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODUzMDksImV4cCI6MjA1Njc2MTMwOX0.dtreaLZP_d_NpSLn9eNJIvbsRMf0g8dzlnhdZLZrp9Q";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
