// Print da tela pra evidência do caso de teste.
//
// O arquivo sai como "CT-009 - 1 - produto aberto.png", numerado na ordem em
// que foi chamado dentro do teste. O ID vem do título do caso, entao a
// evidencia fica amarrada ao caso documentado sem ninguem precisar repetir.

const path = require('path')

const passos = new Map()

async function evidencia(page, testInfo, descricao) {
  const caso = testInfo.title.split(' - ')[0]
  const numero = (passos.get(testInfo.testId) || 0) + 1
  passos.set(testInfo.testId, numero)

  const arquivo = path.join(
    'evidencias',
    path.basename(testInfo.file),
    `${caso} - ${numero} - ${descricao}.png`
  )

  await page.screenshot({ path: arquivo })
}

module.exports = { evidencia }
