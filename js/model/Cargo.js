export class cargo {
  constructor(NoCargo, Descricao, Salario) {
      this._NoCargo = NoCargo;
      this._Descricao = Descricao;
      this._Salario = Salario;
      this._isCompleta = false;
      this._dataAbertura = Date.now();
      this._dataPrevistaFinalizacao = null;
      this._usuario = null;
  }

  set NoCargo(NoCargo){
    this._NoCargo = NoCargo;
  }

  set Descricao (Descricao){
    this.Descricao = Descricao ;
  }

  set Salario (Salario){
    this.Salario = Salario ;
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

  get NoCargo(){
    return this._NoCargo;
  }

  get Descricao(){
    return this._Descricao;
  }  

  get Salario(){
    return this._Salario;
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