// store/dateStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSelectedDatesStore = create(
  persist(
    (set) => ({
      selectedEvents: [],
      toggleEvent: (event) =>
        set((state) => {
          const exists = state.selectedEvents.some(
            (e) =>
              new Date(e.start).toDateString() ===
              new Date(event.start).toDateString()
          );
          return {
            selectedEvents: exists
              ? state.selectedEvents.filter(
                  (e) =>
                    new Date(e.start).toDateString() !==
                    new Date(event.start).toDateString()
                )
              : [...state.selectedEvents, event],
          };
        }),
              unselectEvents: () => set({ selectedEvents: [] }), 
    }),
    {
      name: "selected-events-storage",
      getStorage: () => localStorage,
    }
  )
);
