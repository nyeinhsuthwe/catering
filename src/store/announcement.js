import { create } from "zustand";

export const announcementStore = create((set) => ({
  announcements: [],
  setAnnouncements: (data) => set({ announcements: data }),
}));
