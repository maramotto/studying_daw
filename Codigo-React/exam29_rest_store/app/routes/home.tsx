import { useActionState } from "react";
import { useTitlesStore } from "~/stores/titles-store";

export default function Home() {

  const { error, titles, searchTitles } = useTitlesStore();

  async function searchAction(prevState: any, formData: FormData) {
    const searchTerm = formData.get("title") as string;
    await searchTitles(searchTerm);
  }

  const [_, formAction, isPending] = useActionState(
    searchAction,
    null
  );

  return (
    <div>
      <h1>Open Library</h1>

      <form action={formAction}>
        <input type="text" name="title" disabled={isPending} />
        <button type="submit" disabled={isPending}>Buscar</button>
      </form>

      {isPending && <p>Cargando...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isPending && titles.length === 0 && !error && <p>No se encontraron resultados</p>}

      {!isPending && titles.map((title, index) => (
        <p key={index}>{title}</p>
      ))}
    </div>
  );
}