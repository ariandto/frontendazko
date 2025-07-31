const apiMap: Record<string, string> = {
  "2025-07": "https://script.google.com/macros/s/AKfycboxOlaX9sXLv81EfWfOqULepP4HtrUCQF1e1vzai2h8c8TK34C62B9WhNy5X0YjdovPA/exec",
  "2025-08": "https://script.google.com/macros/s/AKfycbyh85HwM3cIZl2bei79vAADL7ahiqWNtsFeuAisk220AFvS1cTGn7gBG1INF-51jb1x0/exec",
  // tinggal tambahkan:
  // "2025-09": "...",
  // "2025-10": "...",
  // dst.
};

export function getTrackingApi(): string {
  const today = new Date();
  const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  if (apiMap[key]) {
    return apiMap[key];
  }

  // Fallback jika bulan tidak ada (misal Desember belum dibuat)
  console.warn("⚠️ Tidak ditemukan API untuk:", key);
  return apiMap["2025-08"]; // fallback default
}
