import { type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import type Book from "~/models/Book";
import { useBooksStore } from "~/stores/books-store";

export default function BookNew() {

  const navigate = useNavigate();
  const { addBook } = useBooksStore();

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const newBook: Book = addBook(title, description);
    navigate(`/book/${newBook.id}`);
  }

  return (
    <div>
      <h1>New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" name="title" required />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" name="description" />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}
