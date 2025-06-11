import { create } from "zustand";

export const announcementStore = create((set) => ({
  announcements: [],
  loading: true,
  setAnnouncements: (data) => set({ announcements: data, loading: false }),
}));
