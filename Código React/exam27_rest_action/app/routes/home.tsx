import { useActionState } from "react";

async function searchAction(prevState: { titles: string[], error: string | null }, formData: FormData) {
  
  const searchTerm = (formData.get("title") as string) ?? "";

  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.docs) {
      const bookTitles = data.docs.map((item: any) => item.title);
      return { titles: bookTitles, error: null };
    }
    return { titles: [], error: null };
  } catch (error) {
    console.error(error);
    return { titles: [], error: "Error al buscar libros" };
  }
}

export default function Home() {
  const [{ titles, error }, formAction, isPending] = useActionState(
    searchAction,
    { titles: new Array<string>(), error: null }
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

      {!isPending && titles.map((title: string, index: number) => (
        <p key={index}>{title}</p>
      ))}
    </div>
  );
}