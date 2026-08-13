# Comandos do Playwright — referência

Anotações de consulta. Não precisa decorar: os 8 primeiros resolvem quase tudo.

Toda linha segue a mesma fórmula:

```
await  page  .acao( onde , o que )
 │      │      │      │      │
 │      │      │      │      └─ o texto/valor (quando precisa)
 │      │      │      └─ o seletor: qual elemento
 │      │      └─ a ação: o que fazer
 │      └─ a aba do navegador
 └─ espera terminar antes de seguir
```

**`await` em tudo.** É a diferença nº 1 pro Cypress. Sem ele o teste corre
adiante sem esperar e falha sem motivo aparente.

---

## Os 8 que você mais usa

| Comando | O que faz |
|---|---|
| `await page.goto('/auth/login')` | Abre uma página |
| `await page.fill(sel, 'texto')` | Preenche um campo (limpa antes) |
| `await page.click(sel)` | Clica |
| `await page.selectOption(sel, 'valor')` | Escolhe num campo de seleção |
| `await page.check(sel)` | Marca uma caixa de seleção |
| `await expect(page).toHaveURL(/conta/)` | Verifica o endereço da página |
| `await expect(page.locator(sel)).toBeVisible()` | Verifica que apareceu na tela |
| `await expect(page.locator(sel)).toHaveText('x')` | Verifica o texto |

---

## Navegação

```js
await page.goto('/auth/login')   // abre a pagina
await page.goBack()              // volta
await page.goForward()           // avanca
await page.reload()              // recarrega
page.url()                       // le o endereco atual (sem await)
await page.title()               // le o titulo da aba
```

## Achar elementos

O jeito recomendado é procurar pelo que a pessoa vê na tela:

```js
page.getByRole('button', { name: 'Sign in' })  // pelo tipo + texto
page.getByText('Nenhum resultado')             // pelo texto
page.getByLabel('E-mail')                      // pelo rotulo do campo
page.getByPlaceholder('Your email')            // pelo texto de dica
page.getByTestId('login-submit')               // pelo atributo de teste
page.locator('[data-test="email"]')            // por seletor CSS
```

Neste projeto usamos `[data-test="..."]`, que é o atributo dedicado a testes
que o site oferece — não muda quando mexem no visual.

Quando o seletor acha vários:

```js
page.locator('.produto').first()    // o primeiro
page.locator('.produto').last()     // o ultimo
page.locator('.produto').nth(2)     // o terceiro (comeca do zero)
await page.locator('.produto').count()   // quantos achou
```

## Ações

```js
await page.click(sel)                  // clica
await page.dblclick(sel)               // clique duplo
await page.fill(sel, 'texto')          // preenche (limpa antes)
await page.type(sel, 'texto')          // digita letra por letra
await page.press(sel, 'Enter')         // aperta uma tecla
await page.clear(sel)                  // limpa o campo
await page.check(sel)                  // marca caixa de selecao
await page.uncheck(sel)                // desmarca
await page.selectOption(sel, 'valor')  // escolhe numa lista
await page.hover(sel)                  // passa o mouse por cima
await page.setInputFiles(sel, 'arquivo.png')  // anexa arquivo
```

## Verificações (expect)

O que você quer verificar vai **dentro** do `expect`:

```js
// Da pagina
await expect(page).toHaveURL(/account/)
await expect(page).toHaveTitle('Minha conta')

// Do elemento
const item = page.locator('[data-test="produto"]')
await expect(item).toBeVisible()          // aparece na tela
await expect(item).toBeHidden()           // nao aparece
await expect(item).toHaveText('Martelo')  // texto exato
await expect(item).toContainText('Mart')  // contem o trecho
await expect(item).toHaveValue('10')      // valor do campo
await expect(item).toHaveCount(9)         // quantos elementos
await expect(item).toBeEnabled()          // pode clicar
await expect(item).toBeDisabled()         // esta travado
await expect(item).toBeChecked()          // caixa marcada

// O contrario de qualquer uma: .not
await expect(item).not.toBeVisible()
```

**Barras em vez de aspas** (`/account/`) significam "contém esse trecho".
Com aspas (`'...'`), tem que ser exatamente igual.

## Esperas

Na maioria das vezes você **não precisa** esperar: o Playwright já espera
sozinho o elemento aparecer antes de agir. Isso resolve o problema que dava
tanta dor de cabeça no Advwin.

Quando precisar mesmo:

```js
await page.waitForURL('**/account')            // ate mudar de pagina
await page.locator(sel).waitFor()              // ate o elemento aparecer
await page.waitForLoadState('networkidle')     // ate a rede sossegar
```

Evite `await page.waitForTimeout(3000)` — esperar um tempo fixo deixa o teste
lento e instável. Prefira esperar por algo concreto.

## Ler informação da tela

```js
const texto = await page.locator(sel).innerText()
const valor = await page.locator(sel).inputValue()
const quantos = await page.locator(sel).count()
const lista = await page.locator(sel).allInnerTexts()  // todos de uma vez
```

## Estrutura do arquivo de teste

```js
const { test, expect } = require('@playwright/test')

// Agrupa casos da mesma area
test.describe('Autenticação', () => {

  // Roda antes de cada caso do grupo
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login')
  })

  test('CT-001 - Deve autenticar um usuário válido', async ({ page }) => {
    // Dado / Quando / Então
  })

})
```

## Comandos do terminal

| Comando | O que faz |
|---|---|
| `npm test` | Roda todos os testes |
| `npm run ui` | Abre o modo visual (assistir rodando) |
| `npm run codegen` | Abre o gravador |
| `npm run report` | Mostra o relatório da última execução |
| `npx playwright test login` | Roda só o arquivo login |
| `npx playwright test --headed` | Roda com o navegador visível |
| `npx playwright test --debug` | Roda passo a passo, pausando |

---

## Comparando com o Cypress

| Cypress | Playwright |
|---|---|
| `cy.visit('/x')` | `await page.goto('/x')` |
| `cy.get(sel).click()` | `await page.click(sel)` |
| `cy.get(sel).type('oi')` | `await page.fill(sel, 'oi')` |
| `cy.contains('Salvar')` | `page.getByText('Salvar')` |
| `cy.get(sel).should('be.visible')` | `await expect(page.locator(sel)).toBeVisible()` |
| `cy.url().should('include','/x')` | `await expect(page).toHaveURL(/x/)` |
| `cy.get(sel).select('a')` | `await page.selectOption(sel, 'a')` |
| (sem await) | **sempre `await`** |
