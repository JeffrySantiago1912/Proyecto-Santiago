class Ingreso extends Dato {
  static contadorIngresos = 0;

  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._idIngreso = ++Ingreso.contadorIngresos;
  }

  get idIngreso() {
    return this._idIngreso;
  }
}
