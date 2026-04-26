import { useContext } from "react";
import { TitleContext } from "~/contexts/title-context";

export default function ChangeTitle() {
  
  const { toUpperCase } = useContext(TitleContext);

  return (
    <>
      <button onClick={toUpperCase}>Upper Case</button>
    </>
  );
}
