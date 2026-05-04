import { app } from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

const shutdown = (signal: NodeJS.Signals): void => {
  console.log(`Received ${signal}. Closing HTTP server...`);

  server.close((error) => {
    if (error) {
      console.error('Failed to close the HTTP server cleanly.', error);
      process.exitCode = 1;

      return;
    }

    process.exit(0);
  });
};

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});
