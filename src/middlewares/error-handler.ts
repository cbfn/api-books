import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../errors/app-error.js';

type JsonSyntaxError = SyntaxError & {
  body: unknown;
  status: number;
};

const isJsonSyntaxError = (error: unknown): error is JsonSyntaxError => {
  return (
    error instanceof SyntaxError &&
    typeof error === 'object' &&
    error !== null &&
    'body' in error &&
    'status' in error &&
    typeof error.status === 'number'
  );
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  void _next;

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      details: error.details,
      message: error.message,
    });

    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      details: error.flatten(),
      message: 'Validation failed',
    });

    return;
  }

  if (isJsonSyntaxError(error) && error.status === 400) {
    response.status(400).json({
      message: 'Invalid JSON payload',
    });

    return;
  }

  response.status(500).json({
    message: 'Internal server error',
  });
};
