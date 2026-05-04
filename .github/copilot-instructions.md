# Copilot Instructions

## Build, test, and lint

- Install dependencies with `npm install`
- Run the development server with `npm run dev`
- Build the project with `npm run build`
- Start the compiled server with `npm run start`
- Lint the codebase with `npm run lint`
- Run the full test suite with `npm run test`
- Run coverage with `npm run test:coverage`
- Run the main local quality gate with `npm run check`
- Run a single test file with `npm run test -- test/app.test.ts`
- Run a single test by name with `npm run test -- -t "returns JSON 404 for unmapped routes"`

## High-level architecture

- `src/app.ts` owns the Express application setup. It wires cross-cutting middleware and exports the app without binding a port, so tests can import the app directly.
- `src/server.ts` is only the process bootstrap. It reads validated environment config, starts the HTTP server, and handles graceful shutdown signals.
- `src/config/env.ts` is the single source of truth for environment variables. Load and validate new runtime config there instead of reading `process.env` throughout the codebase.
- `src/middlewares/` contains HTTP boundary behavior shared by all future routes. The default stack already returns JSON for not-found requests and unexpected failures.
- `test/` is reserved for HTTP-level and integration-oriented tests. Current tests exercise the app through Supertest rather than calling Express handlers directly.

## Key conventions

- Keep route registration out of `src/server.ts`; add future routers to `src/app.ts` so the same app instance is used in production and tests.
- Use `.js` extensions in relative TypeScript imports because the project is configured for Node ESM via `module: "NodeNext"` and `"type": "module"`.
- Preserve middleware ordering in `src/app.ts`: security/parsing middleware first, route handlers next, then `notFoundHandler`, and `errorHandler` last.
- Add new environment variables to both `src/config/env.ts` and `.env.example`.
- Prefer request-level tests with Supertest in `test/**/*.test.ts`; the current setup is organized around black-box API behavior, not direct handler invocation.
