# Autenticação

Casos de teste da autenticação da loja Practice Software Testing.

Spec: [`tests/login.spec.js`](../tests/login.spec.js)

A conta usada nos testes fica no `.env`, fora do repositório. O
`global.setup.js` garante que ela existe antes da suíte rodar.

---

## CT-001 - Deve autenticar um usuário válido

- **Dado que** tenho uma conta cadastrada
- **Quando** informo e-mail e senha corretos
- **Então** devo ser direcionado para a área da conta

A verificação confere a URL e o título da página: a URL sozinha provaria a
navegação, mas não que a tela certa carregou.

**Evidências:**

| Tela de login | Área da conta |
| --- | --- |
| ![Tela de login](../evidencias/login.spec.js/CT-001%20-%201%20-%20tela%20de%20login.png) | ![Área da conta](../evidencias/login.spec.js/CT-001%20-%202%20-%20area%20da%20conta.png) |

---

## CT-002 - Não deve autenticar com senha incorreta

- **Dado que** tenho uma conta cadastrada
- **Quando** informo a senha errada
- **Então** devo ver a mensagem de credenciais inválidas e permanecer na tela de login

O caso usa um e-mail inexistente, e não a conta do `.env`: errar a senha da
conta usada pelo restante da suíte é risco desnecessário sobre uma massa de
dados compartilhada.

**Evidência:**

![Erro de credenciais inválidas](../evidencias/login.spec.js/CT-002%20-%201%20-%20erro%20de%20credenciais%20invalidas.png)

---

## CT-003 - Não deve autenticar sem preencher os campos

- **Dado que** estou na tela de login com os campos vazios
- **Quando** confirmo sem preencher e-mail e senha
- **Então** devo ver as mensagens de campo obrigatório

O site valida os dois campos ao mesmo tempo, então as duas mensagens são
verificadas na mesma execução.

**Evidência:**

![Campos obrigatórios](../evidencias/login.spec.js/CT-003%20-%201%20-%20campos%20obrigatorios.png)

---

## CT-004 - Deve encerrar a sessão

- **Dado que** estou autenticado
- **Quando** faço logout pelo menu
- **Então** devo voltar para a área pública e o menu deve exibir a opção de entrar

A verificação confere os dois lados da troca: o botão de entrar aparece e o
menu da conta desaparece.

**Evidências:**

| Sessão autenticada | Sessão encerrada |
| --- | --- |
| ![Sessão autenticada](../evidencias/login.spec.js/CT-004%20-%201%20-%20sessao%20autenticada.png) | ![Sessão encerrada](../evidencias/login.spec.js/CT-004%20-%202%20-%20sessao%20encerrada.png) |
