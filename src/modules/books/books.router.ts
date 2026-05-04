import { Router } from 'express';

import { AppError } from '../../errors/app-error.js';
import {
  createBookSchema,
  bookIdParamsSchema,
  updateBookSchema,
} from './books.schemas.js';
import {
  createBook,
  deleteBook,
  getBookById,
  hasBook,
  listBooks,
  setBookAvailability,
  updateBook,
} from './books.store.js';

const booksRouter = Router();

booksRouter.post('/', (request, response) => {
  const payload = createBookSchema.parse(request.body);

  if (hasBook(payload.id)) {
    throw new AppError(`Book with id ${payload.id} already exists`, 409);
  }

  const book = createBook(payload);

  response.status(201).json(book);
});

booksRouter.get('/', (_request, response) => {
  response.status(200).json(listBooks());
});

booksRouter.get('/:id', (request, response) => {
  const { id } = bookIdParamsSchema.parse(request.params);
  const book = getBookById(id);

  if (!book) {
    throw new AppError(`Book with id ${id} not found`, 404);
  }

  response.status(200).json(book);
});

booksRouter.put('/:id', (request, response) => {
  const { id } = bookIdParamsSchema.parse(request.params);
  const payload = updateBookSchema.parse(request.body);
  const book = updateBook(id, payload);

  if (!book) {
    throw new AppError(`Book with id ${id} not found`, 404);
  }

  response.status(200).json(book);
});

booksRouter.post('/:id/borrow', (request, response) => {
  const { id } = bookIdParamsSchema.parse(request.params);
  const book = setBookAvailability(id, false);

  if (!book) {
    throw new AppError(`Book with id ${id} not found`, 404);
  }

  response.status(200).json(book);
});

booksRouter.post('/:id/return', (request, response) => {
  const { id } = bookIdParamsSchema.parse(request.params);
  const book = setBookAvailability(id, true);

  if (!book) {
    throw new AppError(`Book with id ${id} not found`, 404);
  }

  response.status(200).json(book);
});

booksRouter.delete('/:id', (request, response) => {
  const { id } = bookIdParamsSchema.parse(request.params);
  const wasDeleted = deleteBook(id);

  if (!wasDeleted) {
    throw new AppError(`Book with id ${id} not found`, 404);
  }

  response.status(204).send();
});

export { booksRouter };
