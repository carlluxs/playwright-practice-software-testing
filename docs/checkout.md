# Checkout

Casos de teste do fluxo de compra.

Spec: [`tests/checkout.spec.js`](../tests/checkout.spec.js)

O checkout tem quatro etapas: carrinho, autenticação, endereço e pagamento.
Todos os casos começam com um produto no carrinho.

---

## CT-013 - Deve exigir autenticação para finalizar a compra

- **Dado que** não estou autenticado e tenho produtos no carrinho
- **Quando** inicio o checkout
- **Então** devo ser direcionado para a etapa de login

**Evidência:**

![Checkout exige autenticação](../evidencias/checkout.spec.js/CT-013%20-%201%20-%20checkout%20exige%20autenticacao.png)

---

## CT-014 - Não deve avançar sem preencher o endereço

- **Dado que** estou na etapa de endereço do checkout
- **Quando** tento avançar com campos obrigatórios em branco
- **Então** o avanço deve ficar bloqueado

O site não exibe mensagem de erro nessa etapa: ele mantém o botão de avançar
desabilitado enquanto o endereço estiver incompleto. A verificação foi ajustada
ao comportamento real da aplicação.

**Evidência:**

![Avanço bloqueado sem endereço](../evidencias/checkout.spec.js/CT-014%20-%201%20-%20avanco%20bloqueado%20sem%20endereco.png)

---

## CT-015 - Deve concluir a compra com dados válidos

- **Dado que** estou autenticado com produtos no carrinho
- **Quando** avanço pelas etapas do checkout
- **E** informo endereço e forma de pagamento válidos
- **Então** o pedido deve ser confirmado

O formulário de endereço limpa os demais campos quando um deles é editado, por
isso o teste preenche todos de uma vez. O campo de país é lista de seleção, e
não campo de texto.

**Evidências:**

| Endereço preenchido | Pedido confirmado |
| --- | --- |
| ![Endereço preenchido](../evidencias/checkout.spec.js/CT-015%20-%201%20-%20endereco%20preenchido.png) | ![Pedido confirmado](../evidencias/checkout.spec.js/CT-015%20-%202%20-%20pedido%20confirmado.png) |
