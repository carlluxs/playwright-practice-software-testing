// Casos de teste — Autenticação (Practice Software Testing)

const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/login')
const { evidencia } = require('../pages/evidencia')

test.describe('Autenticação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login')
  })

  test('CT-001 - Deve autenticar um usuário válido', async ({ page }, testInfo) => {
    // Dado que tenho uma conta cadastrada
    // (as credenciais ficam no .env, fora do git)
    await evidencia(page, testInfo, 'tela de login')

    // Quando informo e-mail e senha corretos
    await page.fill('[data-test="email"]', process.env.USUARIO_EMAIL)
    await page.fill('[data-test="password"]', process.env.USUARIO_SENHA)
    await page.click('[data-test="login-submit"]')

    // Então devo ser direcionado para a área da conta
    await expect(page).toHaveURL(/account/)
    await expect(page.locator('[data-test="page-title"]')).toHaveText('My account')
    await evidencia(page, testInfo, 'area da conta')
  })

  test('CT-002 - Não deve autenticar com senha incorreta', async ({ page }, testInfo) => {
    // Dado que tenho uma conta cadastrada
    // Usa um e-mail que nao existe: errar a senha da conta real varias vezes
    // mexe na massa de dados usada pelo resto da suite.

    // Quando informo a senha errada
    await page.fill('[data-test="email"]', 'nao-existe@exemplo.com')
    await page.fill('[data-test="password"]', 'senhaerrada')
    await page.click('[data-test="login-submit"]')

    // Então devo ver a mensagem de credenciais inválidas e permanecer na tela de login
    await expect(page.locator('[data-test="login-error"]')).toHaveText('Invalid email or password')
    await expect(page).toHaveURL(/login/)
    await evidencia(page, testInfo, 'erro de credenciais invalidas')
  })

  test('CT-003 - Não deve autenticar sem preencher os campos', async ({ page }, testInfo) => {
    // Dado que estou na tela de login com os campos vazios

    // Quando confirmo sem preencher e-mail e senha
    await page.click('[data-test="login-submit"]')

    // Então devo ver as mensagens de campo obrigatório
    await expect(page.locator('[data-test="email-error"]')).toHaveText('Email is required')
    await expect(page.locator('[data-test="password-error"]')).toHaveText('Password is required')
    await evidencia(page, testInfo, 'campos obrigatorios')
  })

  test('CT-004 - Deve encerrar a sessão', async ({ page }, testInfo) => {
    // Dado que estou autenticado
    await LoginPage.entrar(page)
    await evidencia(page, testInfo, 'sessao autenticada')

    // Quando faço logout pelo menu
    await page.click('[data-test="nav-menu"]')
    await page.click('[data-test="nav-sign-out"]')

    // Então devo voltar para a área pública e o menu deve exibir a opção de entrar
    await expect(page.locator('[data-test="nav-sign-in"]')).toBeVisible()
    await expect(page.locator('[data-test="nav-menu"]')).toBeHidden()
    await evidencia(page, testInfo, 'sessao encerrada')
  })
})
