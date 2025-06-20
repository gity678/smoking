// supabase-client.js
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_KEY = 'YOUR_ANON_KEY';
const TABLE_NAME = 'timers'; // غيّر الاسم إذا كان مختلفاً

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// جلب كل البيانات من الجدول
async function fetchDataFromSupabase() {
  const { data, error } = await client.from(TABLE_NAME).select('*').order('id', { ascending: true });
  if (error) {
    console.error("خطأ في الجلب:", error.message);
    return [];
  }
  return data;
}
