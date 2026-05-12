import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getBook, removeBook } from "~/services/books-service";
import type Book from "~/models/Book";

export default function BookDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState<Book | null>(null);
  const [isPendingLoad, setPendingLoad] = useState(true);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isPendingDelete, setPendingDelete] = useState(false);

  async function loadBook() {
    if (id) {
      setPendingLoad(true);
      const data = await getBook(id);
      setBook(data);
      setPendingLoad(false);
    }
  }

  useEffect(() => { loadBook(); }, [id]);

  async function handleDelete() {
    if (id) {
      setPendingDelete(true);
      setDeleteError(null);
      try {
        await removeBook(id);
        navigate("/");
      } catch (err) {
        console.error(err);
        setDeleteError("Error deleting book");
        setPendingDelete(false);
      }
    }
  }

  if (!id) {
    return <p>Missing book id</p>;
  }

  if (isPendingLoad) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return (
      <div>
        <p>Book not found</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
      <button onClick={() => navigate(`/book/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete} disabled={isPendingDelete}>
        {isPendingDelete ? "Deleting..." : "Delete"}
      </button>
      <button onClick={() => navigate("/")} disabled={isPendingDelete}>Back</button>
    </div>
  );
}
