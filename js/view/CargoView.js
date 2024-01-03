/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_cargo">
              <div class="form-group">
                  <label for="cargo_titulo">Nome do cargo:</label>
                  <input type="text" class="form-control" id="cargo_titulo_formulario">
              </div>
              <div class="form-group">
                  <label for="cargo_descricao">Descrição:</label>
                  <textarea class="form-control" id="cargo_descricao_formulario"></textarea>
              </div>
              <div class="form-group">
              <label for="cargo_salario">Salario:</label>
              <textarea class="form-control" id="cargo_salario_formulario"></textarea>
          </div>
              <button type="submit" class="btn btn-success mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} cargo - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(cargo) {
    return `
            <form class="mt-3" id="formulario_cargo_atualizar">
                <input type="hidden" class="form-control" id="cargo_id_formulario" value="${cargo.id}">
                <div class="form-group">
                    <label for="cargo_titulo">Nome do cargo:</label>
                    <input type="text" class="form-control" id="cargo_titulo_formulario" value="${cargo.NoCargo}">
                </div>
                <div class="form-group">
                    <label for="cargo_descricao">Descrição:</label>
                    <textarea class="form-control" id="cargo_descricao_formulario">${cargo.Descricao}</textarea>
                </div>
                <div class="form-group">
                    <label for="cargo_salario">Salario:</label>
                    <textarea class="form-control" id="cargo_salario_formulario">${cargo.Salario}</textarea>
                </div>  
                <button type="submit" class="btn btn-success mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} cargos - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(cargos) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Nome do cargo</th>
                      <th>Descrição</th>
                      <th>Salário</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  cargos.forEach((cargo) => {
    tabela += `
              <tr>
                  <td>${cargo.NoCargo}</td>
                  <td>${cargo.Descricao}</td>
                  <td>${cargo.Salario}</td>
                  <td>
                    <button class="excluir-btn" cargo-id=${cargo.id}>Excluir</button>
                    <button class="atualizar-btn" cargo-atualizar-id=${cargo.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  tabela += `
              </tbody>
          </table>
      `;

  return tabela;
}

const CargoView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default CargoView;
