const apiMap: Record<string, string> = {
  "2025-07": "https://script.google.com/macros/s/AKfycby-nn0mM3hJw5x_trEgl9ao6d6hFmwby9GA8Qcuk8zScrks3vsJThSLqoGu7EkN_UhXrQ/exec",
  "2025-08": "https://script.google.com/macros/s/AKfycbxl0jdwaQtk7-xKHtZlD14vRXPkDJdzUrvF1MUr-xs-cNX6m6EDfpZi_tzNuPRCS3iW9Q/exec",
  "2025-09": "https://script.google.com/macros/s/AKfycbyMl25Vw2jjqyY6K-dBEBO8Rbo8UXhK0pcwKkAyiQRZxD_7D5a3ZnGW9JNXqfvV4xfpFQ/exec"
};

export function getTrackingApis(): string[] {
  const now = new Date();
  const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000); // UTC+7 / WIB

  const year = wib.getFullYear();
  const month = wib.getMonth() + 1; // getMonth() is 0-based

  const currentKey = `${year}-${String(month).padStart(2, "0")}`;
  const prevMonthKey = `${month === 1 ? year - 1 : year}-${month === 1 ? "12" : String(month - 1).padStart(2, "0")}`;
  const nextMonthKey = `${month === 12 ? year + 1 : year}-${month === 12 ? "01" : String(month + 1).padStart(2, "0")}`;

  const apis: string[] = [];

  // ✅ Urutan prioritas pencarian:
  // 1. Bulan sekarang
  // 2. Bulan sebelumnya
  // 3. Bulan berikutnya
  if (apiMap[currentKey]) apis.push(apiMap[currentKey]);
  if (apiMap[prevMonthKey]) apis.push(apiMap[prevMonthKey]);
  if (apiMap[nextMonthKey]) apis.push(apiMap[nextMonthKey]);

  // 🔁 Jika semua tidak tersedia, fallback ke versi terbaru
  if (apis.length === 0) {
    const latestKey = Object.keys(apiMap).sort().reverse()[0];
    apis.push(apiMap[latestKey]);
    console.warn(`⚠️ Tidak ada API bulan aktif. Gunakan fallback: ${latestKey}`);
  }

  return apis;
}
