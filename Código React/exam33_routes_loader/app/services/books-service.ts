import type { Book } from "~/models/book";

export async function getBooks(): Promise<Book[]> {
  const response = await fetch('https://openlibrary.org/search.json?title=react&fields=title,key&limit=10');
  
  if (!response.ok) {
    throw new Error(`Error fetching books: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();

  if (data.docs) {
    return data.docs.map((item: any) => ({
      id: item.key.split("/").pop(),
      title: item.title
    }));
  }

  return [];
}

export async function getBook(id: string): Promise<Book> {
  const response = await fetch(`https://openlibrary.org/works/${id}.json`);
  
  if (!response.ok) {
    throw new Error(`Error fetching book: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();

  const description = typeof data.description === 'string'
    ? data.description
    : data.description?.value || "No description";

  return {
    id, title: data.title, description
  };
}
