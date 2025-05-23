import { create } from "zustand";
import { persist } from "zustand/middleware";

export const feedback = create(
  persist(
    (set) => ({
      feedBack: [],
      setFeedback: (feedBack) => set({ feedBack }),
      addFeedback: (item) =>
        set((state) => ({ feedBack: [...state.feedBack, item] })),
      removeFeedback: (id) =>
        set((state) => ({
          feedBack: state.feedBack.filter((item) => item.fb_id !== id),
        })),
    }),

    {
      name: "feedback-storage",
    }
  )
);
