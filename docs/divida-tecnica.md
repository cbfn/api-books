# Divida Tecnica

## Contexto

Os itens abaixo nao bloqueiam a evolucao imediata do CRUD e das acoes de emprestimo/devolucao, mas merecem tratamento posterior para melhorar consistencia, robustez e manutencao.

## Itens adiados

## 1. Persistencia ainda em memoria

- O modulo `books` usa `Map` em memoria.
- Serve para a fase atual, mas nao atende cenarios reais de reinicio, concorrencia, auditoria ou integracao com banco.

## 2. Campo `year` com semantica fraca

- `year` continua como `string` por alinhamento com o requisito atual.
- O dominio provavelmente pede validacao mais forte, como ano numerico ou regra de formato.

## 3. Formato de erro ainda pouco padronizado

- Erros de validacao, conflito e erro interno nao compartilham exatamente o mesmo contrato de resposta.
- Isso tende a complicar consumo do lado cliente quando a API crescer.

## 4. Logging basico com `console`

- `src/server.ts` ainda usa `console.log` e `console.error`.
- Falta estrutura para correlacao, nivel de log e observabilidade.

## 5. Testes com muito payload repetido

- `test/books.test.ts` repete varios objetos de livro semelhantes.
- Fixtures ou builders reduziriam ruido e deixariam os cenarios mais expressivos.

## 6. Falta separar melhor as camadas do modulo

- Hoje ja existe separacao minima entre router, schemas e store, mas ainda falta uma camada propria de servico/aplicacao.
- Como o tema tambem aparece nos code smells prioritarios, a parte restante que nao entrar no refactor imediato deve continuar registrada como backlog tecnico.

## Prioridade posterior sugerida

1. Padronizar contrato de erro
2. Melhorar testes com fixtures/builders
3. Trocar logging basico por logger estruturado
4. Endurecer semantica de `year`
5. Evoluir persistencia para uma abstracao conectavel a banco
