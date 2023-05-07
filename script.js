// Modals

const modalCadastro = document.getElementById('modalCadastro');
const modalCompra = document.getElementById('modalCompra');
const modalCategoria = document.getElementById('modalCategoria');
const mdlRemovCategoria = document.getElementById('mdlRemoveCategoria');
const categoriaProduto = document.getElementById('categoriaProduto');
const categoriasRemove = document.getElementById('categorias');
const tabelaRead = document.getElementById('tabelaRead');
const modalEditar = document.getElementById('modalEditar');
const categoriaEditar = document.getElementById('editarCategoria');

let nomeCategoria = document.getElementById('nomeCategoria');
let produtoAtual = '';
let produtos = [];
let categorias = [];
let idProduto = 0;
let editarNome = document.getElementById('editarNome');
let editarCategoria = document.getElementById('editarCategoria');
let editarEstoque = document.getElementById('editarEstoque');
let editarPreco = document.getElementById('editarPreco');


/**

Adiciona um novo produto ao array de produtos e à tabela de produtos na página.

@function cadastrarProduto

@returns {void}
*/

function cadastrarProduto() {
    let nomeProduto = document.getElementById('nomeProduto');
    let estoqueProduto = document.getElementById('estoqueProduto');
    let precoProduto = document.getElementById('precoProduto');
    let categoria;
    idProduto++;

    if (categoriaProduto.value == '') {
        categoria = 'Sem categoria';
    } else {
        categoria = categoriaProduto.value;
    }
    if (nomeProduto.value == '' || estoqueProduto.value == '' || precoProduto.value == '') {
        alert("Faltam informações a ser preenchidas!")
    } else {
        let novoProduto = {
            id: idProduto,
            nome: nomeProduto.value,
            estoque: estoqueProduto.value,
            preco: precoProduto.value,
            categoria: categoria
        }
        produtos.push(novoProduto);
        adicionarLinha(novoProduto);
        alert("Produto cadastrado!");
        modalCadastro.close();
        nomeProduto.value = '';
        estoqueProduto.value = '';
        precoProduto.value = '';
    }
}

/**
Cria uma nova categoria no sistema.
@function cadastrarCategoria

@returns {void}
 */
function cadastrarCategoria() {
    let novaCategoria = nomeCategoria.value;

    if (categorias.includes(novaCategoria)) {
        alert("Categoria já cadastrada!");

    } else if (novaCategoria.length == 0) {
        alert("Insira algo no campo!")
    } else {
        let option = document.createElement('option');
        option.value = novaCategoria;
        option.text = novaCategoria;

        let copiaOption = document.createElement('option');
        copiaOption.value = novaCategoria;
        copiaOption.text = novaCategoria;

        let cOption = document.createElement('option');
        cOption.value = novaCategoria;
        cOption.text = novaCategoria;

        categoriasRemove.add(option);
        categoriaProduto.add(copiaOption);
        categoriaEditar.add(cOption);
        alert("Categoria cadastrada!");
        categorias.push(novaCategoria);
        modalCategoria.close();
        nomeCategoria.value = '';
    }
}

/**
Remove uma categoria do sistema

@function removerCategoria

@returns {void}
 */
function removerCategoria() {
    let removaCategoria = categoriasRemove.value;

    if (removaCategoria == '') {
        alert("Selecione uma categoria!");
        return;
    }
    if (categorias.includes(removaCategoria)) {
        const opcoes = categoriaProduto.options;
        const opcoesRemove = categoriasRemove.options;
        const opcoesEditar = categoriaEditar.options;

        for (let i = 0; i < opcoes.length; i++) {
            if (opcoes[i].value === removaCategoria) {
                opcoes[i].remove();
                categorias.splice(categorias.indexOf(removaCategoria), 1);
                break;
            }
        }
        for (let i = 0; i < opcoesRemove.length; i++) {
            if (opcoesRemove[i].value === removaCategoria) {
                opcoesRemove[i].remove();
                break;
            }
        }
        for (let i = 0; i < opcoesEditar.length; i++) {
            if (opcoesEditar[i].value === removaCategoria) {
                opcoesRemove[i].remove();
                break;
            }
        }
    }
    alert("Categoria removida!");
    mdlRemovCategoria.close();
}

/**
Realiza a compra de um produto.
@function comprarProduto

@returns {void}
 */
function comprarProduto() {
    let compraProduto = document.getElementById("compraProduto");
    let compraQuantia = document.getElementById("compraQuantia");

    if (compraProduto.value == '' || compraQuantia.value == '') {
        alert("Preencha todos os campos!");
        return;
    }
    let encontrado = false;
    for (let indice = 0; indice < produtos.length; indice++) {
        if (produtos[indice]['nome'].toLowerCase() === compraProduto.value.toLowerCase()) {
            encontrado = true;
            if (compraQuantia.value > produtos[indice]['estoque']) {
                alert("Estoque insuficiente!");
            } else {
                let valorCompra = compraQuantia.value * produtos[indice]['preco'];
                let confirmarCompra = confirm("O valor da compra deu: R$ " + valorCompra + ", deseja finalizar a compra?");
                if (confirmarCompra) {
                    alert("Obrigado pela compra!");
                    let novoEstoque = produtos[indice]['estoque'] - compraQuantia.value;
                    if (novoEstoque == 0) {
                        excluirProduto(produtos[indice]['id']);
                    } else {
                        produtos[indice]['estoque'] = novoEstoque;
                        let linhaRead = document.getElementById(produtos[indice]['id'])
                        linhaRead.querySelector('#tdEstoque').textContent = novoEstoque;
                    }
                } else {
                    modalCompra.close()
                }
            }
            break;
        }
    }
    if (!encontrado) {
        alert("Produto não encontrado!")
    }
    compraProduto.value = "";
    compraQuantia.value = "";
}

/**
adiciona uma linha na tabela de produtos.
@function adicionarLinha
@param {*} produto 
 */
function adicionarLinha(produto) {
    let linha = document.createElement('tr');
    let id = document.createElement('td');
    let nome = document.createElement('td');
    let categoria = document.createElement('td');
    let estoque = document.createElement('td');
    let preco = document.createElement('td');
    let botaoEditar = document.createElement('button');
    let botaoExcluir = document.createElement('button');
    let botaoEditarTD = document.createElement('td');
    let botaoExcluirTD = document.createElement('td');

    id.textContent = produto.id;
    id.id = "tdId";
    nome.textContent = produto.nome;
    nome.id = "tdNome";
    categoria.textContent = produto.categoria;
    categoria.id = "tdCategoria";
    estoque.textContent = produto.estoque;
    estoque.id = "tdEstoque";
    preco.textContent = "R$ " + produto.preco;
    preco.id = "tdPreco"
    botaoEditar.innerText = "Editar";
    botaoEditar.onclick = function () {
        abrirEditar(produto.id);
    }
    botaoEditar.classList.add('botaoEditar');
    botaoExcluir.innerText = "Excluir";
    botaoExcluir.onclick = function () {
        excluirProduto(produto.id);
    };
    botaoExcluir.classList.add('botaoExcluir');

    botaoEditarTD.appendChild(botaoEditar);
    botaoExcluirTD.appendChild(botaoExcluir);

    linha.id = produto.id;
    linha.appendChild(id);
    linha.appendChild(nome);
    linha.appendChild(categoria);
    linha.appendChild(estoque);
    linha.appendChild(preco);
    linha.appendChild(botaoEditarTD);
    linha.appendChild(botaoExcluirTD);
    tabelaRead.appendChild(linha);
}

/**
remove um produto da lista de produtos e do array de produtos.
@function excluirProduto
@param {*} id 
 */
function excluirProduto(id) {
    let linha = document.getElementById(id);
    tabelaRead.removeChild(linha);
    for (let indice = 0; indice < produtos.length; indice++) {
        if (produtos[indice]['id'] == id) {
            produtos.splice(indice, 1);
        }
    }
}

/**
Abre o modal para editar as informações de um produto, requisita o id para verificar as informações do produto.
@function abrirEditar
@param {*} id 
 */
function abrirEditar(id) {
    for (let indice = 0; indice < produtos.length; indice++) {
        if (produtos[indice]['id'] == id) {
            produtoAtual = produtos[indice];
            editarNome.value = produtoAtual.nome;
            editarCategoria.value = produtoAtual.categoria;
            editarEstoque.value = produtoAtual.estoque;
            editarPreco.value = produtoAtual.preco;
            modalEditar.showModal();
            return;
        }
    }

    alert('Produto não encontrado.');
}

/**
Edita as informações do produto que havia sido selecionado na @function abrirEditar.

@function editarProduto
@param {*} id 
 */
function editarProduto(id) {
    for (let indice = 0; indice < produtos.length; indice++) {
        if (produtos[indice]['id'] == id) {
            if (editarNome.value == '' || editarCategoria.value == '' || editarEstoque.value == '' || editarPreco.value == '') {
                alert("Preencha todos os campos!")
            } else {
                produtos[indice]['nome'] = editarNome.value;
                produtos[indice]['categoria'] = editarCategoria.value;
                produtos[indice]['estoque'] = editarEstoque.value;
                produtos[indice]['preco'] = editarPreco.value;

                let linhaRead = document.getElementById(id);
                let tdNome = linhaRead.querySelector('#tdNome');
                let tdCategoria = linhaRead.querySelector('#tdCategoria');
                let tdEstoque = linhaRead.querySelector('#tdEstoque');
                let tdPreco = linhaRead.querySelector('#tdPreco');

                tdNome.textContent = editarNome.value;
                tdCategoria.textContent = editarCategoria.value;
                tdEstoque.textContent = editarEstoque.value;
                tdPreco.textContent = "R$ " + editarPreco.value;

                alert("Produto alterado!");
                modalEditar.close();
            }
        }
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        if (modalCategoria.hasAttribute('open')) {
            e.preventDefault();
            cadastrarCategoria();
        }
        if (modalCadastro.hasAttribute('open')) {
            e.preventDefault();
            cadastrarProduto();
        }
        if (mdlRemovCategoria.hasAttribute('open')) {
            e.preventDefault();
            removerCategoria();
        }
        if (modalEditar.hasAttribute('open')) {
            e.preventDefault();
            editarProduto(produtoAtual.id);
        }
        if (modalCompra.hasAttribute('open')) {
            e.preventDefault();
            comprarProduto();
        }
    }
});
