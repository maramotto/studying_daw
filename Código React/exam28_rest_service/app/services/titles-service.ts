export async function searchTitles(searchTerm: string): Promise<string[]> {

  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.docs) {
    return data.docs.map((item: any) => item.title);
  }

  return [];
}
