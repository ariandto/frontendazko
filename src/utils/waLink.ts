export function waLink(phone: string) {
  if (!phone) return "#";
  let no = phone;
  if (no.startsWith("0")) no = "62" + no.slice(1);
  return `https://wa.me/${no.replace(/[^0-9]/g, "")}`;
}
