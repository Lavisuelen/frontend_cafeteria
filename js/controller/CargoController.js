import cargoView from "../view/CargoView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarCargoFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = cargoView.renderizarFormulario();
  document.getElementById("formulario_cargo").addEventListener("submit", cadastrarCargo);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarCargo(event) {
  event.preventDefault();
  const NoCargoValor = document.getElementById("cargo_titulo_formulario").value;
  const DescricaoValor = document.getElementById("cargo_descricao_formulario").value;
  const SalarioValor = document.getElementById("cargo_salario_formulario").value;
  const novoCargo = { NoCargo: NoCargoValor, Descricao: DescricaoValor, Salario: SalarioValor };

  try {
    await fetch(`${API_BASE_URL}/cargos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCargo),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaCargo(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar cargo:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaCargos(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/cargos");
    const cargosBD = await response.json(); 

    const cargos = cargosBD.map((row) => {
      return {
        id: row.id,
        NoCargo: row.NoCargo,
        Descricao: row.Descricao,
        Salario: row.Salario,
        dataAbertura: row.data_abertura,
      };
    });
    componentePrincipal.innerHTML = cargoView.renderizarTabela(cargos);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar cargos:", error);
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
      const cargoId = this.getAttribute("cargo-id");
      excluirCargo(cargoId);
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
      const cargoId = this.getAttribute("cargo-atualizar-id");
      buscarCargo(cargoId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirCargo(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/cargos/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o cargo");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaCargos(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir cargo:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarCargo(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/cargos/${id}`);
    const cargosBD = await response.json();
    if (cargosBD.length <= 0) return;

    const cargo = cargosBD.map(row => ({
      id: row.id,
      NoCargo: row.NoCargo,
      Descricao: row.Descricao,
      Salario: row.Salario,
      dataAbertura: row.data_abertura,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = cargoView.renderizarFormularioAtualizar(cargo);
    document.getElementById("formulario_cargo_atualizar").addEventListener("submit", atualizarCargo);
  } catch (error) {
    console.error("Erro ao buscar cargos:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarCargo(event) {
  event.preventDefault();

  const idValor = document.getElementById("cargo_id_formulario").value;
  const NoCargoValor = document.getElementById("cargo_titulo_formulario").value;
  const DescricaoValor = document.getElementById("cargo_descricao_formulario").value;
  const SalarioValor = document.getElementById("cargo_salario_formulario").value;
  const cargo = {id: idValor, NoCargo: NoCargoValor, Descricao: DescricaoValor, Salario: SalarioValor,};

  try {
    const response = await fetch(`${API_BASE_URL}/cargos`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(cargo),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o cargo");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaCargos(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar cargo:", error);
  }
}

const CargoController = {
  renderizarCargoFormulario,
  cadastrarCargo,
  renderizarListaCargos,
  excluirCargo,
};

export default CargoController;
