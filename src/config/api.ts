///src/config/api.ts

import axios from "axios";

export const API_URL = "https://apiv1.ariandto.pro/api";

export interface Photo {
  id: number;
  filename: string;
  path: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// ✅ GET all photos
export async function getPhotos(): Promise<Photo[]> {
  const res = await api.get<Photo[]>("/photos");
  return res.data;
}

// ✅ POST: Upload new photo
export async function uploadPhoto(file: File): Promise<Photo> {
  const form = new FormData();
  form.append("photo", file);
  const res = await api.post<Photo>("/photos", form);
  return res.data;
}

// ✅ PUT: Update photo
export async function updatePhoto(id: number, file: File): Promise<Photo> {
  const form = new FormData();
  form.append("photo", file);
  const res = await api.put<Photo>(`/photos/${id}`, form);
  return res.data;
}

// ✅ DELETE: Remove photo
export async function deletePhoto(id: number): Promise<void> {
  await api.delete(`/photos/${id}`);
}
