import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Book } from "~/models/book";
import { getBooks } from "~/services/books-service";

export default function BookList() {
  
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function loadBooks() {    
    setLoading(true);
    setError(null);
    try {
      setBooks(await getBooks());
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error loading books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect (() => { loadBooks() },[]);

  return (
    <div>
      <h2>BOOKS</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              {book.id} - {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
