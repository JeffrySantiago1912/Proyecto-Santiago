//Cargar en el body//
let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
  limpiarEntradas();
};

let limpiarEntradas = () => {
    document.getElementById("descripcion").value = '';
    document.getElementById("valor").value = '';

}

let cargarCabecero = () => {
  //Para ir sustituyendo los id que van a ir cargando en el index.html//
  //Los id ["presupuesto, ingresos, egresos, porcentaje"] los vamos a ir sustituyendo//

  //Tendra el presupuesto total//
  let presupuesto = DatoService.totalIngresado() - DatoService.totalEgresado();

  let porcentajeEgreso = DatoService.totalEgresado() / DatoService.totalIngresado();

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(DatoService.totalIngresado());
  document.getElementById("egresos").innerHTML = formatoMoneda(DatoService.totalEgresado());

};


const formatoMoneda = (valor) => {
    return valor.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2, });
};



const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US", { style: "percent",  minimumFractionDigits: 2,});
};




//Nos permite mostrar los ingresos//
const cargarIngresos = () => {

    let ingresosHTML = "";
    for(let ingreso of DatoService.ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
     document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}


//Crear ingreso// - Para cada objeto de tipo ingreso se generara este codigo que genera esta funcion - El codigo viene desde html
const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos" >
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class = "elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick = "eliminarIngreso(${ingreso.id})" ></ion-icon> 
                            </button>
                         </div>
                    </div>
                   </div>
    `;

    return ingresoHTML;
}

//Eliminar ingreso//
const eliminarIngreso = (id) =>{
    DatoService.eliminarIngresoPorId(id);
    cargarApp();
}

//Nos permite mostrar los egresos//
const cargarEgresos = () =>{

    let egresosHTML = "";
    for(let egreso of DatoService.egresos){
        egresosHTML += crearEgresosHMTL(egreso);
    }

    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}


//Crear egreso// - Para cada objeto de tipo egreso se generara este codigo que genera esta funcion - El codigo viene desde html
const crearEgresosHMTL =  (egreso) =>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                      <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / DatoService.totalEgresado())}</div>
                          <div class="elemento_eliminar">
                           <button class = "elemento_eliminar--btn">
                           <ion-icon name="close-circle-outline"
                          onclick = "eliminarEgresos(${egreso.id})" ></ion-icon> 
                         </button>
                        </div>
                    </div>
                </div>
    `;
    return egresoHTML;
}

//Eliminar Egreso//
const eliminarEgresos = (id) =>{
    DatoService.eliminarEgresoPorId(id);
    cargarApp();
}

let views = {"ingreso": cargarIngresos, "egreso": cargarEgresos};

const agregarDato = () =>{
 
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    const laDescripcionNoEstaVacia = descripcion.value !== "" && valor.value !== "";

    if(laDescripcionNoEstaVacia) {

        var dato = new DatoFactory(tipo.value).contruir(descripcion.value, Number(valor.value));

        DatoService.guardar(dato);
        cargarApp();

    }  else {

        descripcion.value == ""  || valor.value == "";
        alert("Debes ingresar una descripcion y un valor.");
    }
}

//Funcion para el input descripcion solo permita texto
function Solo_Texto(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    var AllowRegex  = /^[\ba-zA-Z\s-]$/;
    if (AllowRegex.test(character)) return true;     
    return false; 
}