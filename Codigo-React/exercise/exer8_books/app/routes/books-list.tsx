import { Link, useNavigate } from "react-router";
import type Book from "~/models/Book";
import { useBooksStore } from "~/stores/books-store";

export default function BooksList() {
  
  const navigate = useNavigate();
  const { books } = useBooksStore();

  return (
    <>
      <h2>Books</h2>
      <ul>
        {books.map((book: Book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/book-new")}>Add Book</button>
    </>
  );
}
