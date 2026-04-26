import { createContext, useState, type ReactNode } from "react";

interface TitleContextType {
  title: string;
  toUpperCase: () => void;
}

export const TitleContext = createContext<TitleContextType>(null!);

export function TitleProvider({ children }: { children: ReactNode }) {

  const [title, setTitle] = useState("Welcome to Home");

  function toUpperCase() {
    setTitle(title.toUpperCase());
  }

  return (
    <TitleContext.Provider value={{ title, toUpperCase }}>
      {children}
    </TitleContext.Provider>
  );
}