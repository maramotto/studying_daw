import { create } from "zustand";
import type Item from "~/models/item";

const API_URL = "http://localhost:8080/api/items";

interface ItemsState {
  items: Item[];
  error: string | null;
  getItem: (id: number) => Item | undefined;
  loadItems: () => Promise<void>;
  addItem: (description: string) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  toggleItem: (id: number) => Promise<void>;
}

export const useItemsStore = create<ItemsState>((set, get) => ({
  items: [],
  error: null,
  loadItems: async () => {
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      set({ items: data });
    } catch (err) {
      console.error("Error loading items:", err);
      set({ error: "Error loading items" });
    }
  },

  getItem: (id) => get().items.find(item => item.id === id),

  addItem: async (description: string) => {
    try {
      const response = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, checked: false }),
      });
      await get().loadItems();
    } catch (err) {
      console.error("Error adding item:", err);
      set({ error: "Error adding item" });
    }
  },

  removeItem: async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      await get().loadItems();
    } catch (err) {
      console.error("Error removing item:", err);
      set({ error: "Error deleting item" });
    }
  },

  toggleItem: async (id: number) => {
    const item = get().items.find(item => item.id === id);
    if (!item) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: item.description,
          checked: !item.checked
        }),
      });
      await get().loadItems();
    } catch (err) {
      console.error("Error toggling item:", err);
      set({ error: "Error toggling item" });
    }
  },
}));
