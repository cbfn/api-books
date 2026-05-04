import request from 'supertest';
import { z } from 'zod';

import { app } from '../src/app.js';
import { resetBooksStore } from '../src/modules/books/books.store.js';

const validationErrorResponseSchema = z.object({
  message: z.string(),
  details: z.object({
    fieldErrors: z.record(z.string(), z.array(z.string()).optional()),
  }),
});

describe('books routes', () => {
  beforeEach(() => {
    resetBooksStore();
  });

  it('creates a book with valid payload', async () => {
    const response = await request(app).post('/api/books').send({
      id: 1,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      year: '2008',
      available: true,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      year: '2008',
      available: true,
    });
  });

  it('returns validation errors for invalid book payload', async () => {
    const response = await request(app).post('/api/books').send({
      id: '1',
      title: '',
      author: 'Robert C. Martin',
      year: '2008',
      available: 'true',
    });

    const body = validationErrorResponseSchema.parse(response.body);

    expect(response.status).toBe(400);
    expect(body.message).toBe('Validation failed');
    expect(body.details.fieldErrors.id).toBeDefined();
    expect(body.details.fieldErrors.title).toBeDefined();
    expect(body.details.fieldErrors.available).toBeDefined();
  });

  it('lists and retrieves created books', async () => {
    await request(app).post('/api/books').send({
      id: 1,
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      year: '2017',
      available: true,
    });

    const listResponse = await request(app).get('/api/books');
    const getResponse = await request(app).get('/api/books/1');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toEqual([
      {
        id: 1,
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        year: '2017',
        available: true,
      },
    ]);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual({
      id: 1,
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      year: '2017',
      available: true,
    });
  });

  it('updates an existing book', async () => {
    await request(app).post('/api/books').send({
      id: 1,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      year: '2008',
      available: true,
    });

    const response = await request(app).put('/api/books/1').send({
      title: 'The Clean Coder',
      author: 'Robert C. Martin',
      year: '2011',
      available: false,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      title: 'The Clean Coder',
      author: 'Robert C. Martin',
      year: '2011',
      available: false,
    });
  });

  it('deletes an existing book', async () => {
    await request(app).post('/api/books').send({
      id: 1,
      title: 'Refactoring',
      author: 'Martin Fowler',
      year: '1999',
      available: true,
    });

    const deleteResponse = await request(app).delete('/api/books/1');
    const getResponse = await request(app).get('/api/books/1');

    expect(deleteResponse.status).toBe(204);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toEqual({
      message: 'Book with id 1 not found',
    });
  });

  it('returns conflict when creating a duplicated id', async () => {
    await request(app).post('/api/books').send({
      id: 1,
      title: 'Domain-Driven Design',
      author: 'Eric Evans',
      year: '2003',
      available: true,
    });

    const response = await request(app).post('/api/books').send({
      id: 1,
      title: 'Patterns of Enterprise Application Architecture',
      author: 'Martin Fowler',
      year: '2002',
      available: false,
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      details: undefined,
      message: 'Book with id 1 already exists',
    });
  });
});
