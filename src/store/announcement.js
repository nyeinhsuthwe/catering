import { create } from "zustand";
import api from "../providers/axiosInstance"; 

export const announcementStore = create((set) => ({
  announcements: [],
  loading: true,

  setAnnouncements: (data) => set({ announcements: data, loading: false }),

  fetchAnnouncements: async () => {
    set({ loading: true });
    try {
      const res = await api.get("announcement/list"); 
      set({ announcements: res.data.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      set({ loading: false });
    }
  },
}));
