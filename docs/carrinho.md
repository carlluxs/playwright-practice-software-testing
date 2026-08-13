# Carrinho

Casos de teste do carrinho de compras.

Spec: [`tests/carrinho.spec.js`](../tests/carrinho.spec.js)

Os casos usam o primeiro produto da listagem, obtido por uma função auxiliar
que abre o detalhe e devolve o nome — assim o teste não depende de um produto
específico do catálogo.

---

## CT-009 - Deve adicionar um produto ao carrinho

- **Dado que** estou no detalhe de um produto
- **Quando** adiciono o produto ao carrinho
- **Então** o contador do carrinho deve exibir 1 item

**Evidência:**

![Produto adicionado](../evidencias/carrinho.spec.js/CT-009%20-%201%20-%20produto%20adicionado.png)

---

## CT-010 - Deve adicionar mais de uma unidade do mesmo produto

- **Dado que** estou no detalhe de um produto
- **Quando** aumento a quantidade para 3
  **E** adiciono o produto ao carrinho
- **Então** o carrinho deve registrar 3 unidades desse produto

A verificação vai até a tela do carrinho conferir nome e quantidade: o contador
do topo mostraria 3 mesmo que a quantidade não tivesse sido registrada na linha.

**Evidência:**

![Três unidades no carrinho](../evidencias/carrinho.spec.js/CT-010%20-%201%20-%20tres%20unidades%20no%20carrinho.png)

---

## CT-011 - Deve remover um produto do carrinho

- **Dado que** estou na tela do carrinho com um produto
- **Quando** removo o produto
- **Então** o carrinho deve ficar vazio

**Evidência:**

![Carrinho vazio após remover](../evidencias/carrinho.spec.js/CT-011%20-%201%20-%20carrinho%20vazio%20apos%20remover.png)

---

## CT-012 - O total do carrinho deve ser a soma dos itens

- **Dado que** tenho mais de um produto no carrinho
- **Quando** observo o total
- **Então** o valor deve corresponder à soma dos subtotais de cada linha

O teste soma os valores lidos na tela e compara com o total exibido, em vez de
verificar um valor fixo — o cálculo continua sendo validado se os preços do
catálogo mudarem.

**Evidência:**

![Total igual à soma dos itens](../evidencias/carrinho.spec.js/CT-012%20-%201%20-%20total%20igual%20a%20soma%20dos%20itens.png)
