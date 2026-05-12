import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router";
import type Book from "~/models/Book";
import { addBook } from "~/services/books-service";

export default function BookNew() {
  
  const navigate = useNavigate();

  async function createBookAction(prevState: { success: boolean; error: string | null }, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      const newBook: Book = await addBook(title, description);
      navigate(`/book/${newBook.id}`);
      return { success: true, error: null };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Error creating book" };
    }
  }

  const [state, formAction, isPending] = useActionState(
    createBookAction,
    { success: false, error: null }
  );

  return (
    <div>
      <h1>New Book</h1>
      <form action={formAction}>
        <div>
          <label>Title: </label>
          <input type="text" name="title" required disabled={isPending} />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" name="description" disabled={isPending} />
        </div>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </button>
        <button type="button" onClick={() => navigate("/")} disabled={isPending}>
          Cancel
        </button>
      </form>
    </div>
  );
}
