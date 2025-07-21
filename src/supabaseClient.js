import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdhjipeqivzeteiepicr.supabase.co'; // Replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkaGppcGVxaXZ6ZXRlaWVwaWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NzM2MzcsImV4cCI6MjA2ODQ0OTYzN30.VFMA_QsaHoGrp_Uibwo9Ij07q-puFdmYaUbJfnzA8Vg'; // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey);