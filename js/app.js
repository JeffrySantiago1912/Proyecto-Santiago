//Arreglo de Ingresos//
const ingresos = [
  new Ingreso("Sueldo", 35000.00)
];


//Arreglo de Egresos//
const egresos = [
  new Egreso("Renta del Departamento", 4500)

];


//Cargar en el body//
let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};



//Calcular total de Ingresos y mostrarlos en el cabecero//
let totalIngresos = () => {
  let totalIngreso = 0;
   for (let ingreso of ingresos) {
     totalIngreso += ingreso.valor;
   }
      return totalIngreso;
};


//Calcular total de Egresos y mostrarlos en el cabecero//
let totalEgresos = () => {
  let totalEgreso = 0;
   for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
     return totalEgreso;
};



let cargarCabecero = () => {
  //Para ir sustituyendo los id que van a ir cargando en el index.html//
  //Los id ["presupuesto, ingresos, egresos, porcentaje"] los vamos a ir sustituyendo//

  //Tendra el presupuesto total//
  let presupuesto = totalIngresos() - totalEgresos();

  let porcentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());

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
    for(let ingreso of ingresos){
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
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id); 
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}






//Nos permite mostrar los egresos//
const cargarEgresos = () =>{

    let egresosHTML = "";
    for(let egreso of egresos){
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
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
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
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id); 
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const agregarDato = () =>{
 
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];

    if(descripcion.value !== "" && valor.value !=="") {
        if(tipo.value === "ingreso"){

            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();

        } else if (tipo.value === "egreso"){

            egresos.push(new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }

    }
}