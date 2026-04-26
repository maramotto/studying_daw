import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type Book from "~/models/Book";
import { useBooksStore } from "~/stores/books-store";

export default function BookDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { getBook, removeBook } = useBooksStore();

  const book = getBook(id!);
  
  function handleDelete() {
    if (id) {
        removeBook(id);
        navigate("/");
    }
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
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <button onClick={() => navigate(`/book/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}
