import { createContext } from "react";

interface TitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

export const TitleContext = createContext<TitleContextType>(null!);