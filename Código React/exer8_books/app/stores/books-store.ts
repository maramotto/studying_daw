import { create } from "zustand";
import type Book from "~/models/Book";

const initData: Book[] = [
  {
    id: "11",
    title: "SUEÑOS DE ACERO Y NEON",
    description:
      "Los personajes que protagonizan este relato sobreviven en una sociedad en decadencia a la que, no obstante, lograrán devolver la posibilidad de un futuro. Año 2484. En un mundo dominado por las grandes corporaciones, solo un hombre, Jordi Thompson, detective privado deslenguado y vividor, pero de gran talento y sentido d...",
  },
  {
    id: "12",
    title: "LA VIDA SECRETA DE LA MENTE",
    description:
      "La vida secreta de la mentees un viaje especular que recorre el cerebro y el pensamiento: se trata de descubrir nuestra mente para entendernos hasta en los más pequeños rincones que componen lo que somos, cómo forjamos las ideas en los primeros días de vida, cómo damos forma a las decisiones que nos constituyen, cómo soñamos y cómo imaginamos, por qué sentimos ciertas emociones hacia los demás, cómo los demás influyen en nosotros, y cómo el cerebro se transforma y, con él, lo que somos.",
  },
  {
    id: "13",
    title: "CASI SIN QUERER",
    description:
      "El amor algunas veces es tan complicado como impredecible. Pero al final lo que más valoramos son los detalles más simples, los más bonitos, los que llegan sin avisar. Y a la hora de escribir sobre sentimientos, no hay nada más limpio que hacerlo desde el corazón. Y eso hace Defreds en este libro.",
  },
  {
    id: "14",
    title: "TERMINAMOS Y OTROS POEMAS SIN TERMINAR",
    description:
      "Recopilación de nuevos poemas, textos en prosa y pensamientos del autor. Un sabio dijo una vez: «Pocas cosas hipnotizan tanto en este mundo como una llama y como la luna, será porque no podemos cogerlas o porque nos iluminan en la penumbra». Realmente no sé si alguien dijo esta cita o me la acabo de inventar pero deberían de haberla escrito porque el poder hipnótico que ejercen esa mujer de rojo y esa dama blanca sobre el ser humano es digna de estudio.",
  },
  {
    id: "15",
    title: "LA LEGIÓN PERDIDA",
    description:
      "En el año 53 a. C. el cónsul Craso cruzó el Éufrates para conquistar Oriente, pero su ejército fue destrozado en Carrhae. Una legión entera cayó prisionera de los partos. Nadie sabe a ciencia cierta qué pasó con aquella legión perdida.150 años después, Trajano está a punto de volver a cruzar el Éufrates. ...",
  },
];

interface BooksState {
  books: Book[];
  nextId: number;  
  getBooks: () => Book[];
  getBook: (id: number | string) => Book | undefined;
  addBook: (title: string, description: string) => Book;
  updateBook: (id: number | string, title: string, description: string) => void;
  removeBook: (id: number | string) => void;
}

export const useBooksStore = create<BooksState>((set, get) => ({
  
  books: initData,
  nextId: 16,
  
  getBooks: () => get().books,

  getBook: (id: number | string) => get().books.find((book) => book.id === id),

  addBook: (title: string, description: string) => {
    const newBook: Book = { id: get().nextId.toString(), title, description };
    set((state) => ({
      books: [...state.books, newBook],
      nextId: state.nextId + 1,
    }));
    return newBook;
  },

  updateBook: (id: number | string, title: string, description: string) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, title, description } : book
      ),
    })),

  removeBook: (id: number | string) =>
    set({ books: get().books.filter((book) => book.id !== id) }),
  
}));

