import { create } from "zustand";
import type Item from "~/models/item";

interface ItemsStore {
  items: Item[];
  nextId: number;
  getItem: (id: number) => Item | undefined;
  addItem: (description: string) => void;
  removeItem: (id: number) => void;
  toggleItem: (id: number) => void;
}

export const useItemsStore = create<ItemsStore>((set, get) => ({
  
  items: [],
  nextId: 1,
  
  getItem: (id) => get().items.find(item => item.id === id),
  
  addItem: (description) => set(state => ({
    items: [
      ...state.items,
      { id: state.nextId, description, checked: false },
    ],
    nextId: state.nextId + 1,
  })),
  
  removeItem: (id) => set(state => ({
    items: state.items.filter(item => item.id !== id),
  })),
  
  toggleItem: (id) => set(state => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ),
  })),
  
}));