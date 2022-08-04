
class DatoFactory {
    constructor(tipoDato) {
        this._tipoDato = tipoDato;
      }

     contruir(descripcion, valor){
        if(this._tipoDato === "ingreso"){
            return new Ingreso(descripcion, valor);
        }
        return new Egreso(descripcion, valor);
    }
}