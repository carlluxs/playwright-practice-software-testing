// Casos de teste — Catálogo e busca (Practice Software Testing)

const { test, expect } = require('@playwright/test')
const { evidencia } = require('../pages/evidencia')

test.describe('Catálogo e busca', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('/')
  })

  test('CT-005 - Deve exibir os produtos na página inicial', async ({ page }, testInfo) => {
    // Dado que estou na página inicial

    // Quando a listagem carrega
    const produtos = page.locator('[data-test="product-name"]')

    // Então devem ser exibidos 9 produtos, com nome e preço visíveis
    await expect(produtos).toHaveCount(9)
    await expect(produtos.first()).toBeVisible()
    await expect(page.locator('[data-test="product-price"]').first()).toBeVisible()
    await evidencia(page, testInfo, 'catalogo com 9 produtos')
  })

  test('CT-006 - Deve buscar um produto pelo nome', async ({ page }, testInfo) => {
    // Dado que estou na página inicial

    // Quando pesquiso por "Pliers"
    await page.fill('[data-test="search-query"]', 'Pliers')
    await page.click('[data-test="search-submit"]')

    // Então todos os resultados exibidos devem conter o termo no nome.
    // Espera a lista terminar de filtrar: logo apos a busca a tela ainda
    // mostra os produtos anteriores por um instante.
    const produtos = page.locator('[data-test="product-name"]')
    await expect(page.locator('[data-test="search-caption"]')).toContainText('Pliers')
    await expect(produtos.first()).toBeVisible()

    await expect.poll(async () => {
      const nomes = await produtos.allInnerTexts()
      return nomes.length > 0 && nomes.every((n) => n.includes('Pliers'))
    }).toBe(true)
    await evidencia(page, testInfo, 'resultados da busca por pliers')
  })

  test('CT-007 - Deve informar quando a busca não retorna resultado', async ({ page }, testInfo) => {
    // Dado que estou na página inicial

    // Quando pesquiso por um termo inexistente
    await page.fill('[data-test="search-query"]', 'xyzabc123')
    await page.click('[data-test="search-submit"]')

    // Então devo ver o aviso de nenhum resultado encontrado
    await expect(page.locator('[data-test="no-results"]')).toHaveText('There are no products found.')
    await expect(page.locator('[data-test="product-name"]')).toHaveCount(0)
    await evidencia(page, testInfo, 'aviso de nenhum resultado')
  })

  test('CT-008 - Deve ordenar os produtos pelo menor preço', async ({ page }, testInfo) => {
    // Dado que estou na listagem de produtos
    await expect(page.locator('[data-test="product-name"]').first()).toBeVisible()

    // Quando seleciono a ordenação por menor preço
    await page.selectOption('[data-test="sort"]', 'price,asc')

    // Então os produtos devem aparecer do menor para o maior preço.
    // O expect.poll refaz a leitura ate a lista estar ordenada: a tela leva um
    // instante pra se reordenar e, sem isso, o teste le a ordem antiga.
    await expect.poll(async () => {
      const precos = await page.locator('[data-test="product-price"]').allInnerTexts()
      const valores = precos.map((p) => parseFloat(p.replace(/[^0-9.]/g, '')))
      return JSON.stringify(valores) === JSON.stringify([...valores].sort((a, b) => a - b))
    }).toBe(true)
    await evidencia(page, testInfo, 'produtos do menor para o maior preco')
  })
})
