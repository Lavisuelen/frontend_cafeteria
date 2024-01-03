export class produto {
  constructor(NoProduto, Descricao, Preço, Validade) {
      this._NoProduto = NoProduto;
      this._Descricao = Descricao;
      this._Preço = Preço;
      this._Validade = Validade;
      this._isCompleta = false;
      this._dataAbertura = Date.now();
      this._dataPrevistaFinalizacao = null;
      this._usuario = null;
  }

  set NoProduto(NoProduto){
    this._NoProduto = NoProduto;
  }

  set Descricao (Descricao){
    this._Descricao = Descricao ;
  }

  set Preço (Preço){
    this._Preço = Preço ;
  }

  set Validade (Validade){
    this._Validade = Validade ;
  }

  set isCompleta (isCompleta){
    this._isCompleta = isCompleta ;
  }

  set dataAbertura (dataAbertura){
    this._dataAbertura = dataAbertura ;
  }

  set dataPrevistaFinalizacao (_dataPrevistaFinalizacao){
    this._dataPrevistaFinalizacao = dataPrevistaFinalizacao ;
  }

  set usuario (usuario){
    this._usuario = usuario ;
  }

  get NoProduto(){
    return this._NoProduto;
  }

  get Descricao(){
    return this._Descricao;
  } 
  
  get Preço(){
    return this._Preço;
  } 

  get Validade(){
    return this._Validade;
  } 

  get isCompleta(){
    return this._isCompleta;
  }    

  get dataAbertura(){
    return this._dataAbertura;
  }   

  get dataPrevistaFinalizacao(){
    return this._dataPrevistaFinalizacao;
  }    

  get usuario(){
    return this._usuario;
  }   

}