import { create } from "zustand";
import { persist } from "zustand/middleware";

export const feedbackStore = create(
  persist(
    (set) => ({
      feedBack: null,
      setFeedBack: (feedBack) => set({ feedBack }),
    }),
    {
      name: "user-storage",
    }
  )
);
