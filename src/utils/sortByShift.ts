// src/utils/sortByShift.ts

import type { User } from "../types/User";

function toMinutes(shift: string): number {
  const match = shift.match(/(\d{2}):(\d{2})/);
  if (!match) return 9999;
  const [_, hh, mm] = match;
  return parseInt(hh) * 60 + parseInt(mm);
}

export function sortByCurrentShift(users: User[]): User[] {
  const now = new Date();
  const wibNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  const nowMinutes = wibNow.getHours() * 60 + wibNow.getMinutes();

  return [...users].sort((a, b) => {
    const aStart = toMinutes(a.shift);
    const bStart = toMinutes(b.shift);
    const aDiff = Math.abs(nowMinutes - aStart);
    const bDiff = Math.abs(nowMinutes - bStart);
    return aDiff - bDiff;
  });
}

// 🕒 Klasifikasi shift berdasarkan WIB
export function getCurrentShiftLabel(): "Shift Pagi" | "Shift Siang" | "Shift Malam" {
  const now = new Date();
  const wibNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  const hour = wibNow.getHours();

  if (hour >= 5 && hour < 14) {
    return "Shift Pagi";
  } else if (hour >= 14 && hour < 22) {
    return "Shift Siang";
  } else {
    return "Shift Malam";
  }
}
