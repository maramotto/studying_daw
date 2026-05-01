import { useNavigate } from "react-router";
import { getBook, removeBook } from "~/services/books-service";
import type { Route } from "./+types/book-detail";
import { useState } from "react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getBook(params.id!);
}

export default function BookDetail({ loaderData }: Route.ComponentProps) {

  const book = loaderData;
  const navigate = useNavigate();

  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isPendingDelete, setPendingDelete] = useState(false);

  async function handleDelete() {
    setPendingDelete(true);
    setDeleteError(null);
    try {
      await removeBook(book.id);
      navigate("/");
    } catch (err) {
      console.error(err);
      setDeleteError("Error deleting book");
      setPendingDelete(false);
    }
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
      <button onClick={() => navigate(`/book/${book.id}/edit`)}>Edit</button>
      <button onClick={handleDelete} disabled={isPendingDelete}>
        {isPendingDelete ? "Deleting..." : "Delete"}
      </button>
      <button onClick={() => navigate("/")} disabled={isPendingDelete}>Back</button>
    </div>
  );
}
