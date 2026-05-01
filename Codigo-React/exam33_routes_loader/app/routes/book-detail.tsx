import { useNavigate, useLoaderData } from "react-router";
import { getBook } from "~/services/books-service";
import type { Route } from "./+types/book-detail";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getBook(params.id!);
}

export default function BookDetail({ loaderData }: Route.ComponentProps) {
  
  const book = loaderData;

  const navigate = useNavigate();

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