// store/totalAmount.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const totalAmountStore = create(
  persist(
    (set) => ({
      totalAmount: 0,
      totalOrders: 0,
      setTotalAmount: (amount) => set({ totalAmount: amount }),
      setTotalOrders: (orders) => set({ totalOrders: orders }),
    }),
    {
      name: "total-amount-storage", 
    }
  )
);
