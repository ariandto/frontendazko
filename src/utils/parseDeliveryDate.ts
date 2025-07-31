export function parseDeliveryDate(noLC: string): string {
  if (!noLC || noLC.length < 6) return "Tanggal tidak valid";

  const tahun = "20" + noLC.slice(0, 2);
  const bulan = noLC.slice(2, 4);
  const tanggal = noLC.slice(4, 6);

  const bulanNama: Record<string, string> = {
    "01": "Jan", "02": "Feb", "03": "Mar",
    "04": "Apr", "05": "Mei", "06": "Jun",
    "07": "Jul", "08": "Agust", "09": "Sept",
    "10": "Okt", "11": "Nov", "12": "Des",
  };

  return `${tanggal} ${bulanNama[bulan] || "Bulan Tidak Valid"} ${tahun}`;
}
