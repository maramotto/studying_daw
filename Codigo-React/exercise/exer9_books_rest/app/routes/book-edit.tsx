import { useActionState, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getBook, updateBook } from "~/services/books-service";
import type Book from "~/models/Book";

export default function BookEdit() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isPendingLoading, setIsPendingLoading] = useState(true);

  async function loadBook() {
    if (id) {
      setIsPendingLoading(true);
      const data = await getBook(id);
      setBook(data);
      setIsPendingLoading(false);
    }
  }

  async function updateBookAction(prevState: { success: boolean; error: string | null }, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      await updateBook(id || "", title, description);
      navigate(`/book/${id}`);
      return { success: true, error: null };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Error updating book" };
    }
  }

  const [state, formAction, isPending] = useActionState(
    updateBookAction,
    { success: false, error: null }
  );

  useEffect(() => { loadBook(); }, [id]);

  if (!id) {
    return <p>Missing book id</p>;
  }

  if (isPendingLoading) {
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
      <h1>Edit Book</h1>
      <form action={formAction}>
        <div>
          <label>Title: </label>
          <input type="text" name="title" defaultValue={book.title} required disabled={isPending} />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" name="description" defaultValue={book.description} disabled={isPending} />
        </div>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        <button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={() => navigate(`/book/${id}`)} disabled={isPending}>
          Cancel
        </button>
      </form>
    </div>
  );
}
