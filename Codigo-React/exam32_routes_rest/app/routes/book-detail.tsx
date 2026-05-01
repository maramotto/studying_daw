import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Book } from "~/models/book";
import { getBook } from "~/services/books-service";

export default function BookDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function loadBook() {    
    setLoading(true);
    setError(null);
    try {
      setBook(await getBook(id!));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error loading book");
      setBook(undefined);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect (() => { loadBook() },[id]);

  if(loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div>      
      <h2>{book.title}</h2>
      <div>
        <label>Id: </label>{book.id}
      </div>
      <div>
        <label>Description: </label>{book.description}
      </div>
      <p>
        <button onClick={() => navigate("/")}>Back</button>
      </p>
    </div>
  );
}