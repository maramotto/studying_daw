import { type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { useBooksStore } from "~/stores/books-store";

export default function BookEdit() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { getBook, updateBook } = useBooksStore();

  const book = !id? null : getBook(id!);

  function handleSubmit(event: SubmitEvent) {

    event.preventDefault();

    const formData = new FormData(event.target);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    updateBook(id!, title, description);
    navigate(`/book/${id}`);

  }

  if (!id) {
    return <p>Missing book id</p>;
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" name="title" defaultValue={book.title} required />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" name="description" defaultValue={book.description} />
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(`/book/${id}`)}>Cancel</button>
      </form>
    </div>
  );
}
