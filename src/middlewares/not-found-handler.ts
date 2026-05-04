import type { RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (request, response) => {
  response.status(404).json({
    message: `Cannot ${request.method} ${request.originalUrl}`,
  });
};
