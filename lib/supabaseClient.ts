
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dkqwxjxbnczcgnroltnd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcXd4anhibmN6Y2ducm9sdG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0Njk4OTgsImV4cCI6MjA4MDA0NTg5OH0.zTD1OUcF-C5QO0KfRYpnUH9NNtT-nx0OomKxC5ZI1bs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
