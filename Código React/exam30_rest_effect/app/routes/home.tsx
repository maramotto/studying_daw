import { useEffect, useState } from "react";

export default function Home() {

  const [titles, setTitles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(true);

  async function fetchBooks() {

    setIsPending(true);
    setError(null);

    const url = "https://openlibrary.org/search.json?title=JavaScript";

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.docs) {
        const bookTitles = data.docs.map((item: any) => item.title);
        setTitles(bookTitles);
      }
    } catch (error) {
      console.error(error);
      setError("Error al cargar libros");
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Open Library - JavaScript Books</h1>

      {isPending && <p>Cargando...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isPending && titles.length === 0 && !error && <p>No se encontraron resultados</p>}

      {!isPending && titles.map((title: string, index: number) => (
        <p key={index}>{title}</p>
      ))}
    </div>
  );
}