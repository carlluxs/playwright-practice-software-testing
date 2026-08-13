# Automação de testes — Practice Software Testing

Suíte de testes automatizados em Playwright para a loja
[Practice Software Testing](https://practicesoftwaretesting.com), aplicação de
treino com catálogo, carrinho, checkout e área de conta.

Os casos de teste estão documentados em [`docs/cenarios.md`](docs/cenarios.md),
escritos em Dado / Quando / Então antes da automação.

## Execução

```bash
npm install
npx playwright install chromium

cp .env.example .env    # preencha com uma conta de teste
npm test                # linha de comando
npm run ui              # modo visual
```

## Estrutura

```
tests/            Casos de teste, por área
pages/            Ações reaproveitadas entre testes
docs/             Documentação dos casos, com evidências
evidencias/       Prints gerados na execução
global.setup.js   Prepara a conta de teste antes da suíte
playwright.config.js
```

## Documentação dos casos

Cada caso está descrito em Dado / Quando / Então, com os prints da execução:

| Módulo | Casos | Documentação |
|---|---|---|
| Autenticação | CT-001 a CT-004 | [docs/login.md](docs/login.md) |
| Catálogo e busca | CT-005 a CT-008 | [docs/catalogo.md](docs/catalogo.md) |
| Carrinho | CT-009 a CT-012 | [docs/carrinho.md](docs/carrinho.md) |
| Checkout | CT-013 a CT-015 | [docs/checkout.md](docs/checkout.md) |

## Evidências

Os prints são gerados pelo helper `evidencia(page, testInfo, 'descrição')` e
salvos em `evidencias/<spec>/` com o identificador do caso e a ordem da chamada:

```
evidencias/login.spec.js/CT-001 - 1 - tela de login.png
evidencias/login.spec.js/CT-001 - 2 - area da conta.png
```

O identificador vem do título do teste, o que mantém a evidência amarrada ao
caso documentado sem ninguém precisar repetir o número em outro lugar.

## Decisões técnicas

**Estratégia de seleção.** Os elementos são localizados pelo atributo
`data-test`, dedicado a testes. Classes CSS e ids são descartados por mudarem
junto com o visual.

**Conta de teste garantida pelo setup.** O site reseta a base periodicamente e
apaga as contas cadastradas. O `global.setup.js` roda antes da suíte, tenta
autenticar com a conta do `.env` e, se ela não existir mais, cadastra
novamente pela API. Sem isso a suíte falharia sozinha de tempos em tempos, sem
nenhuma alteração no código.

**Credenciais fora do repositório.** Usuário e senha ficam no `.env`, que está
no `.gitignore`. O `.env.example` documenta quais variáveis são necessárias.

**Teste de credencial inválida não usa a conta real.** O caso de senha
incorreta (CT-002) usa um e-mail inexistente. Errar a senha da conta usada pelo
restante da suíte é um risco desnecessário sobre a massa de dados compartilhada.

**Espera por condição, não por tempo.** Onde a tela atualiza de forma assíncrona
(busca e ordenação), a verificação usa `expect.poll`, que relê até a condição
ser satisfeita. Esperar um tempo fixo deixaria o teste lento quando o site
responde rápido e instável quando responde devagar.

## Cobertura

| Módulo | Casos | Escopo |
|---|---|---|
| Autenticação | CT-001 a CT-004 | Login válido e inválido, campos obrigatórios, logout |
| Catálogo e busca | CT-005 a CT-008 | Listagem, busca com e sem resultado, ordenação por preço |
| Carrinho | CT-009 a CT-012 | Inclusão, quantidade, remoção, total |
| Checkout | CT-013 a CT-015 | Exigência de login, campos obrigatórios, compra concluída |

## Tecnologias

Playwright 1.62 · JavaScript
