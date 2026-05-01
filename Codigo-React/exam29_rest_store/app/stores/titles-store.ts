import { create } from "zustand";

interface TitlesState {
  titles: string[];
  error: string | null;
  searchTitles: (searchTerm: string) => Promise<void>;
}

async function fetchTitles(searchTerm: string): Promise<string[]> {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data.docs) {
    return data.docs.map((item: any) => item.title);
  }

  return [];
}

export const useTitlesStore = create<TitlesState>((set) => ({
  
  titles: [],
  error: null,

  searchTitles: async (searchTerm: string) => {
    set({ titles: [], error: null });

    try {
      const bookTitles = await fetchTitles(searchTerm);
      set({ titles: bookTitles });
    } catch (error) {
      console.error(error);
      set({ error: "Error al buscar libros" });
    }
  },
}));
