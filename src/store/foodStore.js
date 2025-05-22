import { create } from "zustand";
import { persist } from "zustand/middleware";

export const foodStore = create(
     persist(
        (set) => ({
          food: null,
          foodList: null,
          setFood: (food) => set({ food }),
          setFoodList: (foodList) => set({ foodList }),
    
        }),
        {
          name: "food-storage",
        }
      )
)