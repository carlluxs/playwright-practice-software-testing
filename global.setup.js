// Garante que a conta de teste do .env existe antes da suite rodar.
//
// O site de treino reseta a base de tempos em tempos e apaga as contas. Sem
// isso, os testes que dependem de login falhariam do nada — e o problema nao
// seria o codigo, e sim a massa de dados que sumiu.

const API = 'https://api.practicesoftwaretesting.com'

async function consegueLogar(email, senha) {
  const r = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: senha }),
  })
  return r.status === 200
}

async function cadastrar(email, senha) {
  const r = await fetch(`${API}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: 'Carlos',
      last_name: 'Teste',
      dob: '1990-01-01',
      phone: '11987654321',
      email,
      password: senha,
      address: {
        street: 'Rua de Teste 100',
        city: 'Florianopolis',
        state: 'SC',
        country: 'BR',
        postal_code: '88000000',
      },
    }),
  })
  if (r.status !== 201) {
    throw new Error(`Nao consegui cadastrar a conta de teste (HTTP ${r.status}): ${await r.text()}`)
  }
}

module.exports = async () => {
  const email = process.env.USUARIO_EMAIL
  const senha = process.env.USUARIO_SENHA

  if (!email || !senha) {
    throw new Error('Faltam USUARIO_EMAIL e USUARIO_SENHA no .env (veja o .env.example)')
  }

  if (await consegueLogar(email, senha)) {
    console.log(`[setup] conta de teste ok: ${email}`)
    return
  }

  console.log(`[setup] conta ${email} nao existe — criando`)
  await cadastrar(email, senha)

  if (!(await consegueLogar(email, senha))) {
    throw new Error('A conta foi criada mas o login continua falhando')
  }
  console.log('[setup] conta criada e login confirmado')
}
