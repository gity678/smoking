// supabaseFunctions.js

// بيانات الاتصال بـ Supabase
const SUPABASE_URL = 'https://gdgnbvkzqujzflcyzqpi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // عوّض هذا بمفتاحك الكامل الحقيقي
const TABLE = 'timers';

// إنشاء العميل
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// تحميل كل البيانات من الجدول
async function loadDataFromSupabase() {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error("خطأ في تحميل البيانات:", error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error("استثناء أثناء التحميل:", err.message);
    return [];
  }
}

// حفظ صف جديد في الجدول
async function saveRowToSupabase(row) {
  try {
    const { error } = await supabase
      .from(TABLE)
      .insert([row]);

    if (error) {
      console.error("فشل في الحفظ:", error.message);
    }
  } catch (err) {
    console.error("استثناء أثناء الحفظ:", err.message);
  }
}
