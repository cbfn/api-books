import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { errorHandler } from './middlewares/error-handler.js';
import { notFoundHandler } from './middlewares/not-found-handler.js';

const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
