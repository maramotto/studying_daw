import { useActionState, useEffect, useRef } from "react";
import ItemRow from "~/components/item-row";
import { useItemsStore } from "~/stores/items-store";

export default function ItemsManager() {

  const { items, addItem, loadItems, error } = useItemsStore();

  async function addItemAction(prevState: any, formData: FormData) {
    const description = formData.get("description") as string;
    await addItem(description);
  }

  const [_, formAction, isPending] = useActionState(addItemAction, null);

  useEffect(() => { loadItems() }, []);

  return (
    <>
      <h1>A checklist</h1>

      {items.map(item => (
        <ItemRow key={item.id} id={item.id} />
      ))}

      {isPending && <p>Adding item...</p>}
      {error && <p>Error: {error}</p>}

      <hr />
      <form action={formAction}>
        <input type="text" name="description" />
        <button type="submit">Add</button>
      </form>
    </>
  );
}