import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const SUPABASE_SERVICE_KEY: string = process.env.NEXT_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsd3hkbHhmcGhrZ2t5aWt3cnR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1MDI4Njk4NSwiZXhwIjoxOTY1ODYyOTg1fQ.C2Z_M9KyyQAdrKAkrV5G6h94WbIZMgEtp3RZ_Mk2z7U';

console.log("SUPABASE_URL", SUPABASE_URL);
console.log("SUPABASE_ANON_KEY", SUPABASE_ANON_KEY);
console.log("SUPABASE_SERVICE_KEY", SUPABASE_SERVICE_KEY);

const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { client as supabaseClient };

export const getServiceSupabase = () => createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY
);
