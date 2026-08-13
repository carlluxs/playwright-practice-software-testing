# Casos de teste — Practice Software Testing

Loja de ferramentas usada como alvo dos testes automatizados em Playwright.
Site: https://practicesoftwaretesting.com

Os casos estão escritos em Dado / Quando / Então, na mesma linguagem dos
comentários que aparecem no código.

| Área | Casos | Status |
|---|---|---|
| Autenticação | CT-001 a CT-004 | a fazer |
| Catálogo e busca | CT-005 a CT-008 | a fazer |
| Carrinho | CT-009 a CT-012 | a fazer |
| Checkout | CT-013 a CT-015 | a fazer |

A suíte cobre a jornada completa de uma compra: entrar na conta, encontrar o
produto, montar o carrinho e finalizar o pedido.

Referência do site:
- 50 produtos, 9 por página
- Categorias: Hand Tools, Power Tools, Other
- Marcas: ForgeFlex Tools, MightyCraft Hardware
- Ordenação: nome (A-Z / Z-A), preço (maior / menor)

---

# Autenticação

## CT-001 - Deve autenticar um usuário válido

- **Dado que** tenho uma conta cadastrada
- **Quando** informo e-mail e senha corretos
- **Então** devo ser direcionado para a área da conta

## CT-002 - Não deve autenticar com senha incorreta

- **Dado que** tenho uma conta cadastrada
- **Quando** informo a senha errada
- **Então** devo ver a mensagem de credenciais inválidas e permanecer na tela de login

## CT-003 - Não deve autenticar sem preencher os campos

- **Dado que** estou na tela de login com os campos vazios
- **Quando** confirmo sem preencher e-mail e senha
- **Então** devo ver as mensagens de campo obrigatório

## CT-004 - Deve encerrar a sessão

- **Dado que** estou autenticado
- **Quando** faço logout pelo menu
- **Então** devo voltar para a área pública e o menu deve exibir a opção de entrar

---

# Catálogo e busca

## CT-005 - Deve exibir os produtos na página inicial

- **Dado que** estou na página inicial
- **Quando** a listagem carrega
- **Então** devem ser exibidos 9 produtos, com nome e preço visíveis

## CT-006 - Deve buscar um produto pelo nome

- **Dado que** estou na página inicial
- **Quando** pesquiso por "Pliers"
- **Então** todos os resultados exibidos devem conter o termo no nome

## CT-007 - Deve informar quando a busca não retorna resultado

- **Dado que** estou na página inicial
- **Quando** pesquiso por um termo inexistente
- **Então** devo ver o aviso de nenhum resultado encontrado

## CT-008 - Deve ordenar os produtos pelo menor preço

- **Dado que** estou na listagem de produtos
- **Quando** seleciono a ordenação por menor preço
- **Então** os produtos devem aparecer do menor para o maior preço

---

# Carrinho

## CT-009 - Deve adicionar um produto ao carrinho

- **Dado que** estou no detalhe de um produto
- **Quando** adiciono o produto ao carrinho
- **Então** o contador do carrinho deve exibir 1 item

## CT-010 - Deve adicionar mais de uma unidade do mesmo produto

- **Dado que** estou no detalhe de um produto
- **Quando** aumento a quantidade para 3
- **E** adiciono o produto ao carrinho
- **Então** o carrinho deve registrar 3 unidades desse produto

## CT-011 - Deve remover um produto do carrinho

- **Dado que** estou na tela do carrinho com um produto
- **Quando** removo o produto
- **Então** o carrinho deve ficar vazio

## CT-012 - O total do carrinho deve ser a soma dos itens

- **Dado que** tenho mais de um produto no carrinho
- **Quando** observo o total
- **Então** o valor deve corresponder à soma dos subtotais de cada linha

---

# Checkout

## CT-013 - Deve exigir autenticação para finalizar a compra

- **Dado que** não estou autenticado e tenho produtos no carrinho
- **Quando** inicio o checkout
- **Então** devo ser direcionado para a etapa de login

## CT-014 - Não deve avançar sem preencher o endereço

- **Dado que** estou na etapa de endereço do checkout
- **Quando** tento avançar com campos obrigatórios em branco
- **Então** devo ver as mensagens de campo obrigatório

## CT-015 - Deve concluir a compra com dados válidos

- **Dado que** estou autenticado com produtos no carrinho
- **Quando** avanço pelas etapas do checkout
- **E** informo endereço e forma de pagamento válidos
- **Então** o pedido deve ser confirmado
