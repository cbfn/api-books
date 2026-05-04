import type { Book } from './books.schemas.js';

export interface BookRepository {
  delete(id: number): boolean;
  findById(id: number): Book | undefined;
  has(id: number): boolean;
  list(): Book[];
  save(book: Book): Book;
}
