import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://omtnzppzghmnxbwxmrha.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tdG56cHB6Z2htbnhid3htcmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM4NTc3NjgsImV4cCI6MTk4OTQzMzc2OH0.iKL1RCvE5mpq3wbv1t1j5yCK3LQk3Q8iHK1I7vcSNw8'
)