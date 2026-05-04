import type { Book, CreateBookInput, UpdateBookInput } from './books.schemas.js';

const books = new Map<number, Book>();

const cloneBook = (book: Book): Book => ({ ...book });

export const listBooks = (): Book[] => {
  return Array.from(books.values()).map(cloneBook);
};

export const getBookById = (id: number): Book | undefined => {
  const book = books.get(id);

  return book ? cloneBook(book) : undefined;
};

export const createBook = (input: CreateBookInput): Book => {
  const book = cloneBook(input);

  books.set(book.id, book);

  return cloneBook(book);
};

export const updateBook = (id: number, input: UpdateBookInput): Book | undefined => {
  const currentBook = books.get(id);

  if (!currentBook) {
    return undefined;
  }

  const updatedBook: Book = {
    ...currentBook,
    ...input,
  };

  books.set(id, updatedBook);

  return cloneBook(updatedBook);
};

export const deleteBook = (id: number): boolean => {
  return books.delete(id);
};

export const hasBook = (id: number): boolean => {
  return books.has(id);
};

export const resetBooksStore = (): void => {
  books.clear();
};
