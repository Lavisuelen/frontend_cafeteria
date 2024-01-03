import produtoView from "../view/ProdutoView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarProdutoFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = produtoView.renderizarFormulario();
  document.getElementById("formulario_produto").addEventListener("submit", cadastrarProduto);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarProduto(event) {
  event.preventDefault();
  const NoProdutoValor = document.getElementById("produto_titulo_formulario").value;
  const DescricaoValor = document.getElementById("produto_descricao_formulario").value;
  const PreçoValor = document.getElementById("produto_preço_formulario").value;
  const ValidadeValor = document.getElementById("produto_validade_formulario").value;
  const novoProduto = { NoProduto: NoProdutoValor, Descricao: DescricaoValor, Preço: PreçoValor, Validade: ValidadeValor };

  try {
    await fetch(`${API_BASE_URL}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoProduto),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaProduto(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaProdutos(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/produtos");
    const produtosBD = await response.json(); 

    const produtos = produtosBD.map((row) => {
      return {
        id: row.id,
        NoProduto: row.NoProduto,
        Descricao: row.Descricao,
        Preço: row.Preço,
        Validade: row.Validade,
        dataAbertura: row.data_abertura,
      };
    });
    componentePrincipal.innerHTML = produtoView.renderizarTabela(produtos);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de tarefa.
 * Cada botão, quando clicado, aciona a função de exclusão de tarefa correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const produtoId = this.getAttribute("produto-id");
      excluirProduto(produtoId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de tarefa.
 * Cada botão, quando clicado, aciona a função de buscar a tarefa específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const produtoId = this.getAttribute("produto-atualizar-id");
      buscarProduto(produtoId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirProduto(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o produto");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaProdutos(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarProduto(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/${id}`);
    const produtosBD = await response.json();
    if (produtosBD.length <= 0) return;

    const produto = produtosBD.map(row => ({
      id: row.id,
      NoProduto: row.NoProduto,
      Descricao: row.Descricao,
      Preço: row.Preço,
      Validade: row.Validade,
      dataAbertura: row.data_abertura,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = produtoView.renderizarFormularioAtualizar(produto);
    document.getElementById("formulario_produto_atualizar").addEventListener("submit", atualizarProduto);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarProduto(event) {
  event.preventDefault();

  const idValor = document.getElementById("produto_id_formulario").value;
  const NoProdutoValor = document.getElementById("produto_titulo_formulario").value;
  const DescricaoValor = document.getElementById("produto_descricao_formulario").value;
  const PreçoValor = document.getElementById("produto_preço_formulario").value;
  const ValidadeValor = document.getElementById("produto_validade_formulario").value;
  const produto = {id: idValor, NoProduto: NoProdutoValor, Descricao: DescricaoValor, Preço: PreçoValor, Validade: ValidadeValor};

  try {
    const response = await fetch(`${API_BASE_URL}/produtos`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o produto");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaProdutos(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
  }
}

const ProdutoController = {
  renderizarProdutoFormulario,
  cadastrarProduto,
  renderizarListaProdutos,
  excluirProduto,
};

export default ProdutoController;
