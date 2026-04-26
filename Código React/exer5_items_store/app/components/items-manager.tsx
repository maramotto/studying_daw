import { useRef } from "react";
import ItemRow from "~/components/item-row";
import { useItemsStore } from "~/stores/items-store";

export default function ItemsManager() {

  const { items, addItem } = useItemsStore();
  
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAdd() {
    const value = inputRef.current?.value ?? "";
    if (value) {
      addItem(value);
      inputRef.current!.value = "";
    }
  }

  return (
    <>
      <h1>A checklist</h1>

      {items.map(item => (
        <ItemRow key={item.id} id={item.id} />
      ))}

      <hr />
      <input type="text" ref={inputRef} />
      <button onClick={handleAdd}>Add</button>
    </>
  );
}