// supabaseFunctions.js
const SUPABASE_URL = 'https://gdgnbvkzqujzflcyzqpi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // المفتاح الكامل
const TABLE = 'timers';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// دالة استيراد البيانات من Supabase
async function loadDataFromSupabase() {
  try {
    const { data, error } = await supabase.from(TABLE).select('*').order('id', { ascending: true });
    if (error) {
      console.error("خطأ في جلب البيانات:", error.message);
      return [];
    }
    return data;
  } catch (err) {
    console.error("خطأ غير متوقع:", err.message);
    return [];
  }
}

// دالة حفظ صف في Supabase
async function saveRowToSupabase(row) {
  try {
    const { error } = await supabase.from(TABLE).insert([row]);
    if (error) {
      console.error("فشل في حفظ البيانات:", error.message);
    }
  } catch (err) {
    console.error("خطأ غير متوقع أثناء الحفظ:", err.message);
  }
}
