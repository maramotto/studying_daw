import { useActionState } from "react";
import { searchTitles } from "~/services/titles-service";

async function searchAction(prevState: { titles: string[], error: string | null }, formData: FormData) {
  const searchTerm = formData.get("title") as string;
  
  try {
    const results = await searchTitles(searchTerm);
    return { titles: results, error: null };
  } catch (error) {
    console.error(error);
    return { titles: [], error: "Error al buscar libros" };
  }
}

export default function Home() {
  
  const [state, formAction, isPending] = useActionState(
    searchAction,
    { titles: [], error: null }
  );

  return (
    <div>
      <h1>Open Library</h1>

      <form action={formAction}>
        <input type="text" name="title" disabled={isPending} />
        <button type="submit" disabled={isPending}>Buscar</button>
      </form>

      {isPending && <p>Cargando...</p>}

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}

      {!isPending && state.titles.length === 0 && !state.error && <p>No se encontraron resultados</p>}

      {!isPending && state.titles.map((title, index) => (
        <p key={index}>{title}</p>
      ))}
    </div>
  );
}