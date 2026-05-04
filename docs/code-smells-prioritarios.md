# Code Smells Prioritarios

## Contexto

O foco prioritario esta no modulo `books`, que hoje concentra a maior parte da logica de dominio existente na API. Os itens abaixo foram selecionados por impacto direto em manutencao, evolucao e risco de duplicacao.

## 1. Router com responsabilidades demais

**Onde aparece**

- `src/modules/books/books.router.ts`

**Sinal do smell**

- O router faz validacao, orquestracao, decisao de regra de negocio e montagem de resposta HTTP no mesmo lugar.
- As acoes `borrow` e `return` reforcam essa concentracao de regras no handler HTTP.

**Impacto**

- Aumenta acoplamento entre transporte HTTP e comportamento de dominio.
- Dificulta reuso das regras quando surgirem novos endpoints ou mudancas de persistencia.
- Faz o arquivo crescer rapidamente a cada nova operacao.

**Direcao sugerida**

- Extrair regras de negocio para uma camada de service/use-case.
- Deixar o router responsavel por parse de entrada, chamada de caso de uso e resposta HTTP.

## 2. Duplicacao do fluxo por `id`

**Onde aparece**

- `src/modules/books/books.router.ts`

**Sinal do smell**

- Varias rotas repetem o mesmo padrao: parse do `id`, busca/atualizacao, teste de inexistencia e retorno `404`.

**Impacto**

- Facilita divergencia entre endpoints equivalentes.
- Torna correcao de comportamento transversal mais cara.
- Polui o router com boilerplate em vez de intencao de negocio.

**Direcao sugerida**

- Centralizar busca por livro em helper/service que ja lance erro padronizado quando o recurso nao existir.
- Reutilizar esse fluxo em `get`, `put`, `borrow`, `return` e `delete`.

## 3. Store em memoria acoplado ao modulo HTTP

**Onde aparece**

- `src/modules/books/books.store.ts`
- `src/modules/books/books.router.ts`

**Sinal do smell**

- O store em memoria e usado diretamente pelo router.
- A fronteira entre persistencia e regra de negocio ainda nao esta clara.

**Impacto**

- Trocar `Map` por banco, adapter ou repository exigira mexer em pontos demais.
- O dominio fica dependente demais da forma atual de armazenamento.

**Direcao sugerida**

- Introduzir uma abstracao explicita de repository/service.
- Manter o store atual apenas como implementacao em memoria por tras dessa interface.

## Ordem recomendada de ataque

1. Extrair um service para concentrar regras de negocio do modulo `books`
2. Remover duplicacao do fluxo de busca por `id` e erro `404`
3. Isolar o store em memoria atras de uma abstracao mais facil de substituir
