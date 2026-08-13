# Catálogo e busca

Casos de teste da listagem, busca e ordenação de produtos.

Spec: [`tests/catalogo.spec.js`](../tests/catalogo.spec.js)

Todos os casos partem da página inicial, aberta no `beforeEach`.

---

## CT-005 - Deve exibir os produtos na página inicial

- **Dado que** estou na página inicial
- **Quando** a listagem carrega
- **Então** devem ser exibidos 9 produtos, com nome e preço visíveis

A contagem usa `[data-test="product-name"]`, que aparece uma vez por produto.
Um seletor mais aberto contaria também os elementos internos do cartão.

**Evidência:**

![Catálogo com 9 produtos](../evidencias/catalogo.spec.js/CT-005%20-%201%20-%20catalogo%20com%209%20produtos.png)

---

## CT-006 - Deve buscar um produto pelo nome

- **Dado que** estou na página inicial
- **Quando** pesquiso por "Pliers"
- **Então** todos os resultados exibidos devem conter o termo no nome

A verificação percorre todos os resultados, e não apenas o primeiro. Logo após
a busca a tela ainda exibe os produtos anteriores por um instante, então a
leitura espera a lista terminar de filtrar.

**Evidência:**

![Resultados da busca por Pliers](../evidencias/catalogo.spec.js/CT-006%20-%201%20-%20resultados%20da%20busca%20por%20pliers.png)

---

## CT-007 - Deve informar quando a busca não retorna resultado

- **Dado que** estou na página inicial
- **Quando** pesquiso por um termo inexistente
- **Então** devo ver o aviso de nenhum resultado encontrado

Além do aviso, o caso confere que nenhum produto ficou na tela.

**Evidência:**

![Aviso de nenhum resultado](../evidencias/catalogo.spec.js/CT-007%20-%201%20-%20aviso%20de%20nenhum%20resultado.png)

---

## CT-008 - Deve ordenar os produtos pelo menor preço

- **Dado que** estou na listagem de produtos
- **Quando** seleciono a ordenação por menor preço
- **Então** os produtos devem aparecer do menor para o maior preço

A comparação é feita entre a lista exibida e ela mesma ordenada, e não contra
uma sequência fixa escrita no teste: assim o caso continua válido quando o
catálogo mudar.

**Evidência:**

![Produtos do menor para o maior preço](../evidencias/catalogo.spec.js/CT-008%20-%201%20-%20produtos%20do%20menor%20para%20o%20maior%20preco.png)
