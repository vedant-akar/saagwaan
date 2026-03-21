/* =====================
   SAAGWAAN — supabase.js
   Shared Supabase client
   ===================== */

   const SUPABASE_URL = 'https://hprtarzavufreuskvbjd.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwcnRhcnphdnVmcmV1c2t2YmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNzUzNjAsImV4cCI6MjA4OTY1MTM2MH0.4-SDD3wlZKPEGT-AJaw8mje1ZLjIn1E3rO4vQw5cCPc';
   
   let sb;
   try {
     const { createClient } = supabase;
     sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
       auth: {
         persistSession: true,
         storageKey: 'saagwaan_admin',
         storage: window.localStorage,
         detectSessionInUrl: false,
         autoRefreshToken: true,
       }
     });
   } catch (e) {
     console.warn('Supabase not configured.', e);
   }
   
   async function getSession() {
     try {
       const { data, error } = await sb.auth.getSession();
       if (error) return null;
       return data.session;
     } catch (e) {
       return null;
     }
   }