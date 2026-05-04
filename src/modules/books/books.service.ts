import { AppError } from '../../errors/app-error.js';

import type { BookRepository } from './books.repository.js';
import type { Book, CreateBookInput, UpdateBookInput } from './books.schemas.js';
import { booksRepository } from './books.store.js';

class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}

  list(): Book[] {
    return this.bookRepository.list();
  }

  getById(id: number): Book {
    return this.findByIdOrThrow(id);
  }

  create(input: CreateBookInput): Book {
    if (this.bookRepository.has(input.id)) {
      throw new AppError(`Book with id ${input.id} already exists`, 409);
    }

    return this.bookRepository.save(input);
  }

  update(id: number, input: UpdateBookInput): Book {
    const currentBook = this.findByIdOrThrow(id);

    return this.bookRepository.save({
      ...currentBook,
      ...input,
    });
  }

  borrow(id: number): Book {
    return this.setAvailability(id, false);
  }

  returnBook(id: number): Book {
    return this.setAvailability(id, true);
  }

  delete(id: number): void {
    this.findByIdOrThrow(id);
    this.bookRepository.delete(id);
  }

  private findByIdOrThrow(id: number): Book {
    const book = this.bookRepository.findById(id);

    if (!book) {
      throw new AppError(`Book with id ${id} not found`, 404);
    }

    return book;
  }

  private setAvailability(id: number, available: boolean): Book {
    const currentBook = this.findByIdOrThrow(id);

    return this.bookRepository.save({
      ...currentBook,
      available,
    });
  }
}

export const booksService = new BooksService(booksRepository);
