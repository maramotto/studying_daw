import { createContext, useState, type ReactNode } from "react";
import type Item from "~/models/item";

interface ItemsContextType {
  items: Item[];
  getItem: (id: number) => Item | undefined;
  addItem: (description: string) => void;
  removeItem: (id: number) => void;
  toggleItem: (id: number) => void;
}

export const ItemsContext = createContext<ItemsContextType>({} as ItemsContextType);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [nextId, setNextId] = useState(1);

  function getItem(id: number) {
    return items.find(item => item.id === id);
  }

  function addItem(description: string) {
    setItems(currentItems => [
      ...currentItems,
      { id: nextId, description, checked: false },
    ]);
    setNextId(currentId => currentId + 1);
  }

  function removeItem(id: number) {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  }

  function toggleItem(id: number) {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  return (
    <ItemsContext.Provider value={{ items, getItem, addItem, removeItem, toggleItem }}>
      {children}
    </ItemsContext.Provider>
  );
}