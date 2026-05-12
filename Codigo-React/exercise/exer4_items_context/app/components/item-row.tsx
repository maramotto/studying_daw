import { useContext } from "react";
import { ItemsContext } from "~/contexts/items-context";

interface ItemRowProps {
  id: number;
}

export default function ItemRow({ id }: ItemRowProps) {
  const { getItem, removeItem, toggleItem } = useContext(ItemsContext);
  const item = getItem(id);

  if (!item) {
    return null;
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => toggleItem(item.id)}
      />
      <span style={{ textDecoration: item.checked ? "line-through" : "none" }}>
        {item.description}
      </span>
      <button onClick={() => removeItem(item.id)}>Delete</button>
    </div>
  );
}