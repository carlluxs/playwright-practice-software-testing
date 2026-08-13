// Casos de teste — Checkout (Practice Software Testing)

const { test, expect } = require('@playwright/test')
const { evidencia } = require('../pages/evidencia')

// Coloca um produto no carrinho e abre a tela de checkout
async function irParaCheckoutComProduto(page) {
  await page.goto('/')
  const primeiro = page.locator('[data-test="product-name"]').first()
  await expect(primeiro).toBeVisible()
  await primeiro.click()

  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible()
  await page.click('[data-test="add-to-cart"]')
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1')

  await page.click('[data-test="nav-cart"]')
  await expect(page.locator('[data-test="proceed-1"]')).toBeVisible()
}

// Endereco completo: o formulario limpa os campos quando um deles e' editado,
// entao todos precisam ser preenchidos de uma vez.
async function preencherEndereco(page) {
  await page.fill('[data-test="street"]', 'Rua de Teste 100')
  await page.fill('[data-test="city"]', 'Florianopolis')
  await page.fill('[data-test="state"]', 'SC')
  // País é lista de seleção, não campo de texto — usa selectOption
  await page.selectOption('[data-test="country"]', 'BR')
  await page.fill('[data-test="postal_code"]', '88000000')
  await page.fill('[data-test="house_number"]', '42')
}

test.describe('Checkout', () => {
  test('CT-013 - Deve exigir autenticação para finalizar a compra', async ({ page }, testInfo) => {
    // Dado que não estou autenticado e tenho produtos no carrinho
    await irParaCheckoutComProduto(page)

    // Quando inicio o checkout
    await page.click('[data-test="proceed-1"]')

    // Então devo ser direcionado para a etapa de login
    await expect(page.locator('[data-test="email"]')).toBeVisible()
    await expect(page.locator('[data-test="password"]')).toBeVisible()
    await expect(page.locator('[data-test="login-submit"]')).toBeVisible()
    await evidencia(page, testInfo, 'checkout exige autenticacao')
  })

  test('CT-014 - Não deve avançar sem preencher o endereço', async ({ page }, testInfo) => {
    // Dado que estou na etapa de endereço do checkout
    await irParaCheckoutComProduto(page)
    await page.click('[data-test="proceed-1"]')

    await page.fill('[data-test="email"]', process.env.USUARIO_EMAIL)
    await page.fill('[data-test="password"]', process.env.USUARIO_SENHA)
    await page.click('[data-test="login-submit"]')

    await expect(page.locator('[data-test="proceed-2"]')).toBeVisible()
    await page.click('[data-test="proceed-2"]')
    await expect(page.locator('[data-test="street"]')).toBeVisible()

    // Quando tento avançar com campos obrigatórios em branco
    await page.fill('[data-test="street"]', '')
    await page.fill('[data-test="city"]', '')

    // Então devo ver as mensagens de campo obrigatório
    // (o site mantém o botão desabilitado enquanto o endereço não está completo)
    await expect(page.locator('[data-test="proceed-3"]')).toBeDisabled()
    await evidencia(page, testInfo, 'avanco bloqueado sem endereco')
  })

  test('CT-015 - Deve concluir a compra com dados válidos', async ({ page }, testInfo) => {
    // Dado que estou autenticado com produtos no carrinho
    await irParaCheckoutComProduto(page)
    await page.click('[data-test="proceed-1"]')

    await page.fill('[data-test="email"]', process.env.USUARIO_EMAIL)
    await page.fill('[data-test="password"]', process.env.USUARIO_SENHA)
    await page.click('[data-test="login-submit"]')

    // Quando avanço pelas etapas do checkout
    await expect(page.locator('[data-test="proceed-2"]')).toBeVisible()
    await page.click('[data-test="proceed-2"]')

    // E informo endereço e forma de pagamento válidos
    await expect(page.locator('[data-test="street"]')).toBeVisible()
    await preencherEndereco(page)
    await expect(page.locator('[data-test="proceed-3"]')).toBeEnabled()
    await page.click('[data-test="proceed-3"]')

    await evidencia(page, testInfo, 'endereco preenchido')

    await expect(page.locator('[data-test="payment-method"]')).toBeVisible()
    await page.selectOption('[data-test="payment-method"]', 'cash-on-delivery')
    await page.click('[data-test="finish"]')

    // Então o pedido deve ser confirmado
    await expect(page.locator('[data-test="payment-success-message"]')).toBeVisible()
    await evidencia(page, testInfo, 'pedido confirmado')
  })
})
