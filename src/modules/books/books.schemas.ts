import { z } from 'zod';

export const bookSchema = z.object({
  id: z.number().int(),
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  year: z.string().trim().min(1),
  available: z.boolean(),
});

export const createBookSchema = bookSchema;

export const updateBookSchema = bookSchema.omit({
  id: true,
});

export const bookIdParamsSchema = z.object({
  id: z.coerce.number().int(),
});

export type Book = z.infer<typeof bookSchema>;
export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
