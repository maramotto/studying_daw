import { useRef, useState } from "react";

export default function Home() {

  const [titles, setTitles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.SubmitEvent) {

    event.preventDefault();

    setTitles([]);
    setError(null);
    setIsPending(true);

    const searchTerm = titleRef.current?.value ?? "";

    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.docs) {
        const bookTitles = data.docs.map((item: any) => item.title);
        setTitles(bookTitles);
      }
    } catch (error) {
      console.error(error);
      setError("Error al buscar libros");
    } finally {
      setIsPending(false);
    }

    event.target.reset();
  };

  return (
    <div>
      <h1>Open Library</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" ref={titleRef} disabled={isPending} />
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