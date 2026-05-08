// lib/googleSheets.ts
export async function getAllCourses() {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbyk63-r9Y3aBAVSRK_c9Sojdbkc-SD730Ts1BVYCK7Q_TKzaVKNWAN0JR-eigwbosguJg/exec"; 
  
  try {
    const res = await fetch(GAS_URL, { cache: 'no-store' });
    const data = await res.json();
    
    // 預處理：確保每一筆資料的 id 都是字串
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        ...item,
        id: String(item.id || "").trim()
      }));
    }
    return [];
  } catch (err) {
    console.error("Fetch Error:", err);
    return [];
  }
}