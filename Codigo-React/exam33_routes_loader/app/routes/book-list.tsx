import { Link, useLoaderData } from "react-router";
import { getBooks } from "~/services/books-service";
import type { Route } from "./+types/book-list";

export async function clientLoader() {
  return await getBooks();
}

export default function BookList({ loaderData }: Route.ComponentProps) {
  
  const books = loaderData;

  return (
    <div>
      <h2>BOOKS</h2>
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
