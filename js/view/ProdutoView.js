/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
    return `
            <form class="mt-3" id="formulario_produto">
                <div class="form-group">
                    <label for="produto_titulo">Nome do produto:</label>
                    <input type="text" class="form-control" id="produto_titulo_formulario">
                </div>
                <div class="form-group">
                    <label for="produto_descricao">Descrição:</label>
                    <textarea class="form-control" id="produto_descricao_formulario"></textarea>
                </div>
                <div class="form-group">
                <label for="produto_preço">Preço:</label>
                <textarea class="form-control" id="produto_preço_formulario"></textarea>
            </div>
                </div>
                <div class="form-group">
                <label for="produto_validade">Validade:</label>
                <textarea class="form-control" id="produto_validade_formulario"></textarea>
            </div>
                <button type="submit" class="btn btn-success mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   * Renderiza o formulário para atualizar uma tarefa existente.
   * @param {Object} produto - A tarefa a ser atualizada.
   * @return {string} HTML do formulário de atualização de tarefa.
   */
  function renderizarFormularioAtualizar(produto) {
      return `
              <form class="mt-3" id="formulario_produto_atualizar">
                  <input type="hidden" class="form-control" id="produto_id_formulario" value="${produto.id}">
                  <div class="form-group">
                      <label for="produto_titulo">Nome do produto:</label>
                      <input type="text" class="form-control" id="produto_titulo_formulario" value="${produto.NoProduto}">
                  </div>
                  <div class="form-group">
                      <label for="produto_descricao">Descrição:</label>
                      <textarea class="form-control" id="produto_descricao_formulario">${produto.Descricao}</textarea>
                  </div>
                  <div class="form-group">
                      <label for="produto_preço">Preço:</label>
                      <textarea class="form-control" id="produto_preço_formulario">${produto.Preço}</textarea>
                  </div>
                  <div class="form-group">
                      <label for="produto_validade">Validade:</label>
                      <textarea class="form-control" id="produto_validade_formulario">${produto.Validade}</textarea>
                  </div>   
                  <button type="submit" class="btn btn-success mt-2">Salvar</button>
              </form>
          `;
  }
  
    /**
   * Renderiza a tabela de tarefas.
   * @param {Array} produtos - Lista de tarefas a serem exibidas.
   * @return {string} HTML da tabela de tarefas.
   */
  function renderizarTabela(produtos) {
    let tabela = `
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Nome do produto</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Validade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    produtos.forEach((produto) => {
      tabela += `
                <tr>
                    <td>${produto.NoProduto}</td>
                    <td>${produto.Descricao}</td>
                    <td>${produto.Preço}</td>
                    <td>${produto.Validade}</td>
                    <td>
                      <button class="excluir-btn" produto-id=${produto.id}>Excluir</button> 
                      <button class="atualizar-btn" produto-atualizar-id=${produto.id}>Atualizar</button>
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
  
  const ProdutoView = {
      renderizarFormulario,
      renderizarTabela,
      renderizarFormularioAtualizar
  };
  
  export default ProdutoView;
  