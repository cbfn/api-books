import request from 'supertest';

import { app } from '../src/app.js';

describe('app bootstrap', () => {
  it('returns JSON 404 for unmapped routes', async () => {
    const response = await request(app).get('/api/books');

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.body).toEqual({
      message: 'Cannot GET /api/books',
    });
  });
});
