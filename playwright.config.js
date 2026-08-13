// @ts-check
const { defineConfig, devices } = require('@playwright/test')

// Le o .env (usuario e senha de teste ficam la, fora do git)
require('dotenv').config()

module.exports = defineConfig({
  testDir: './tests',

  // Roda uma vez antes de tudo: garante que a conta de teste existe
  globalSetup: require.resolve('./global.setup.js'),

  // Endereco do site: evita repetir a URL em todo teste
  use: {
    baseURL: 'https://practicesoftwaretesting.com',

    // Guarda o rastro so quando o teste falha, pra investigar depois
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Espera padrao das verificacoes. O site e' lento pra carregar a listagem.
  expect: { timeout: 10000 },

  // Um teste nao pode depender do outro: cada um roda do zero
  fullyParallel: true,

  reporter: 'html',

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
