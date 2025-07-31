const apiMap: Record<string, string> = {
  "2025-07": "https://script.google.com/macros/s/AKfycby-nn0mM3hJw5x_trEgl9ao6d6hFmwby9GA8Qcuk8zScrks3vsJThSLqoGu7EkN_UhXrQ/exec",
  "2025-08": "https://script.google.com/macros/s/AKfycbxl0jdwaQtk7-xKHtZlD14vRXPkDJdzUrvF1MUr-xs-cNX6m6EDfpZi_tzNuPRCS3iW9Q/exec",
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
