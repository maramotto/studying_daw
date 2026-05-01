import { useActionState } from "react";
import { useNavigate } from "react-router";
import { getBook, updateBook } from "~/services/books-service";
import type { Route } from "./+types/book-edit";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getBook(params.id!);
}

export default function BookEdit({ loaderData }: Route.ComponentProps) {
  
  const book = loaderData;
  const navigate = useNavigate();

  async function updateBookAction(prevState: { success: boolean; error: string | null }, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      await updateBook(book.id, title, description);
      navigate(`/book/${book.id}`);
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
        <button type="button" onClick={() => navigate(`/book/${book.id}`)} disabled={isPending}>
          Cancel
        </button>
      </form>
    </div>
  );
}
