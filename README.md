# api-books

Base inicial para uma API REST com Node.js, Express, TypeScript e Vitest.

## Requisitos

- Node.js 20+

## Scripts

- `npm run dev`: sobe o servidor em modo desenvolvimento com reload
- `npm run build`: compila o codigo TypeScript para `dist/`
- `npm run start`: executa a versao compilada
- `npm run lint`: valida o codigo com ESLint
- `npm run test`: executa os testes com Vitest
- `npm run test:coverage`: gera cobertura de testes
- `npm run check`: executa lint, testes e build em sequencia

## Executar um teste especifico

- Arquivo: `npm run test -- test/app.test.ts`
- Nome do teste: `npm run test -- -t "returns JSON 404 for unmapped routes"`

## Estrutura inicial

- `src/app.ts`: configuracao da aplicacao Express
- `src/server.ts`: bootstrap do servidor HTTP
- `src/config/env.ts`: validacao das variaveis de ambiente
- `src/middlewares/`: middlewares compartilhados da camada HTTP
- `test/`: testes HTTP com Supertest e Vitest

Nenhuma rota de dominio foi criada nesta etapa.
