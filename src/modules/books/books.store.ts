import type { BookRepository } from './books.repository.js';
import type { Book } from './books.schemas.js';

class InMemoryBookRepository implements BookRepository {
  private readonly books = new Map<number, Book>();

  private cloneBook(book: Book): Book {
    return { ...book };
  }

  list(): Book[] {
    return Array.from(this.books.values()).map((book) => this.cloneBook(book));
  }

  findById(id: number): Book | undefined {
    const book = this.books.get(id);

    return book ? this.cloneBook(book) : undefined;
  }

  save(book: Book): Book {
    const bookToPersist = this.cloneBook(book);

    this.books.set(bookToPersist.id, bookToPersist);

    return this.cloneBook(bookToPersist);
  }

  delete(id: number): boolean {
    return this.books.delete(id);
  }

  has(id: number): boolean {
    return this.books.has(id);
  }

  reset(): void {
    this.books.clear();
  }
}

export const booksRepository = new InMemoryBookRepository();

export const resetBooksStore = (): void => {
  booksRepository.reset();
};
