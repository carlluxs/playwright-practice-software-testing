// Casos de teste — Carrinho (Practice Software Testing)

const { test, expect } = require('@playwright/test')
const { evidencia } = require('../pages/evidencia')

// Abre o detalhe do primeiro produto da listagem e devolve o nome dele
async function abrirPrimeiroProduto(page) {
  await page.goto('/')
  const primeiro = page.locator('[data-test="product-name"]').first()
  await expect(primeiro).toBeVisible()
  const nome = (await primeiro.innerText()).trim()
  await primeiro.click()
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible()
  return nome
}

test.describe('Carrinho', () => {
  test('CT-009 - Deve adicionar um produto ao carrinho', async ({ page }, testInfo) => {
    // Dado que estou no detalhe de um produto
    await abrirPrimeiroProduto(page)

    // Quando adiciono o produto ao carrinho
    await page.click('[data-test="add-to-cart"]')

    // Então o contador do carrinho deve exibir 1 item
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1')
    await evidencia(page, testInfo, 'produto adicionado')
  })

  test('CT-010 - Deve adicionar mais de uma unidade do mesmo produto', async ({ page }, testInfo) => {
    // Dado que estou no detalhe de um produto
    const nome = await abrirPrimeiroProduto(page)

    // Quando aumento a quantidade para 3
    await page.click('[data-test="increase-quantity"]')
    await page.click('[data-test="increase-quantity"]')
    await expect(page.locator('[data-test="quantity"]')).toHaveValue('3')

    // E adiciono o produto ao carrinho
    await page.click('[data-test="add-to-cart"]')
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('3')

    // Então o carrinho deve registrar 3 unidades desse produto
    await page.click('[data-test="nav-cart"]')
    await expect(page.locator('[data-test="product-title"]')).toContainText(nome)
    await expect(page.locator('[data-test="product-quantity"]')).toHaveValue('3')
    await evidencia(page, testInfo, 'tres unidades no carrinho')
  })

  test('CT-011 - Deve remover um produto do carrinho', async ({ page }, testInfo) => {
    // Dado que estou na tela do carrinho com um produto
    await abrirPrimeiroProduto(page)
    await page.click('[data-test="add-to-cart"]')
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1')
    await page.click('[data-test="nav-cart"]')
    await expect(page.locator('[data-test="product-title"]')).toBeVisible()

    // Quando removo o produto
    await page.click('.btn-danger')

    // Então o carrinho deve ficar vazio
    await expect(page.locator('[data-test="product-title"]')).toHaveCount(0)
    await evidencia(page, testInfo, 'carrinho vazio apos remover')
  })

  test('CT-012 - O total do carrinho deve ser a soma dos itens', async ({ page }, testInfo) => {
    // Dado que tenho mais de um produto no carrinho
    await abrirPrimeiroProduto(page)
    await page.click('[data-test="add-to-cart"]')
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1')

    await page.goto('/')
    const segundo = page.locator('[data-test="product-name"]').nth(1)
    await expect(segundo).toBeVisible()
    await segundo.click()
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible()
    await page.click('[data-test="add-to-cart"]')
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('2')

    // Quando observo o total
    await page.click('[data-test="nav-cart"]')
    await expect(page.locator('[data-test="product-title"]')).toHaveCount(2)

    // Então o valor deve corresponder à soma dos subtotais de cada linha
    const paraNumero = (t) => parseFloat(t.replace(/[^0-9.]/g, ''))
    const linhas = await page.locator('[data-test="line-price"]').allInnerTexts()
    const soma = linhas.reduce((acc, t) => acc + paraNumero(t), 0)
    const total = paraNumero(await page.locator('[data-test="cart-total"]').innerText())

    expect(total).toBeCloseTo(soma, 2)
    await evidencia(page, testInfo, 'total igual a soma dos itens')
  })
})
