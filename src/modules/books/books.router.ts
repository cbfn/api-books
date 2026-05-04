import { Router } from 'express';

import {
  createBookSchema,
  bookIdParamsSchema,
  updateBookSchema,
} from './books.schemas.js';
import { booksService } from './books.service.js';

const booksRouter = Router();

const parseBookId = (id: unknown): number => {
  return bookIdParamsSchema.parse({ id }).id;
};

booksRouter.post('/', (request, response) => {
  const payload = createBookSchema.parse(request.body);
  const book = booksService.create(payload);

  response.status(201).json(book);
});

booksRouter.get('/', (_request, response) => {
  response.status(200).json(booksService.list());
});

booksRouter.get('/:id', (request, response) => {
  const id = parseBookId(request.params.id);
  const book = booksService.getById(id);

  response.status(200).json(book);
});

booksRouter.put('/:id', (request, response) => {
  const id = parseBookId(request.params.id);
  const payload = updateBookSchema.parse(request.body);
  const book = booksService.update(id, payload);

  response.status(200).json(book);
});

booksRouter.post('/:id/borrow', (request, response) => {
  const id = parseBookId(request.params.id);
  const book = booksService.borrow(id);

  response.status(200).json(book);
});

booksRouter.post('/:id/return', (request, response) => {
  const id = parseBookId(request.params.id);
  const book = booksService.returnBook(id);

  response.status(200).json(book);
});

booksRouter.delete('/:id', (request, response) => {
  const id = parseBookId(request.params.id);
  booksService.delete(id);

  response.status(204).send();
});

export { booksRouter };
