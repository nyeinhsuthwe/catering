import { create } from "zustand";
import { persist } from "zustand/middleware";

export const foodStore = create(
     persist(
        (set) => ({
          food: null,
          foodlist: null,
    
          setFood: (food) => set({ food }),
          setFoodList: (foodlist) => set({ foodlist }),
    
        }),
        {
          name: "food-storage",
        }
      )
)