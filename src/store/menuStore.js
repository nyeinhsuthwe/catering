import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMenuStore = create(
  persist(
    (set) => ({
      menuLists: [],
      setMenuLists: (menu) => set({ menuLists: menu }),
    }),
    {
      name: "menu-storage",
    }
  )
);

export default useMenuStore;
