import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdhjipeqivzeteiepicr.supabase.co'; // Replace with your URL
const supabaseKey = 'sb_publishable_sRCaduIxGg4AeUHenE4c0g_IuxtYSGP'; // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey);