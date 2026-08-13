// Ações da tela de login, reaproveitadas pelos testes que precisam de conta.

const LoginPage = {
  campoEmail: (page) => page.locator('[data-test="email"]'),
  campoSenha: (page) => page.locator('[data-test="password"]'),
  botaoEntrar: (page) => page.locator('[data-test="login-submit"]'),
  mensagemErro: (page) => page.locator('[data-test="login-error"]'),

  // Entra com a conta de teste do .env. Só devolve o controle depois que a
  // área da conta carregou, pra evitar teste rodando antes da hora.
  async entrar(page, email = process.env.USUARIO_EMAIL, senha = process.env.USUARIO_SENHA) {
    await page.goto('/auth/login')
    await LoginPage.campoEmail(page).fill(email)
    await LoginPage.campoSenha(page).fill(senha)
    await LoginPage.botaoEntrar(page).click()
    await page.waitForURL(/account/)
  },
}

module.exports = LoginPage
