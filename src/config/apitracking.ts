const apiMap: Record<string, string> = {
  "2025-07": "https://script.google.com/macros/s/AKfycby-nn0mM3hJw5x_trEgl9ao6d6hFmwby9GA8Qcuk8zScrks3vsJThSLqoGu7EkN_UhXrQ/exec",
  "2025-08": "https://script.google.com/macros/s/AKfycbxl0jdwaQtk7-xKHtZlD14vRXPkDJdzUrvF1MUr-xs-cNX6m6EDfpZi_tzNuPRCS3iW9Q/exec",
};

export function getTrackingApis(): string[] {
  const now = new Date();
  const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000); // WIB
  const year = wib.getFullYear();
  const month = wib.getMonth() + 1;

  const currentKey = `${year}-${String(month).padStart(2, "0")}`;
  const nextMonthKey = `${month === 12 ? year + 1 : year}-${month === 12 ? "01" : String(month + 1).padStart(2, "0")}`;

  const apis: string[] = [];

  if (apiMap[currentKey]) apis.push(apiMap[currentKey]);
  if (apiMap[nextMonthKey]) apis.push(apiMap[nextMonthKey]);

  // if not available get active month
  if (apis.length === 0) {
    const latestKey = Object.keys(apiMap).sort().reverse()[0];
    apis.push(apiMap[latestKey]);
    console.warn(`⚠️ Tidak ada API bulan aktif. Gunakan fallback: ${latestKey}`);
  }

  return apis;
}
