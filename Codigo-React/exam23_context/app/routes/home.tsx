import { useState } from "react";
import ChangeTitle from "~/components/change-title";
import Header from "~/components/header";
import { TitleContext } from "~/contexts/title-context";

export default function Home() {

  const [title, setTitle] = useState("Welcome to Home");

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      <Header />
      <p>Main content</p>
      <ChangeTitle />
    </TitleContext.Provider>
  );
}