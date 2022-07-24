class Egreso extends Dato {
  static contadorEgresos = 0;

  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._idEgreso = ++Egreso.contadorEgresos;
  }

  get idEgreso() {
    return this._idEgreso;
  }
}
