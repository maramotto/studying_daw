import ItemsManager from "~/components/items-manager";
import { ItemsProvider } from "~/contexts/items-context";

export default function Home() {
  return (
    <ItemsProvider>
      <ItemsManager />
    </ItemsProvider>
  );
}

