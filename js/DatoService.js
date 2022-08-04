class DatoService{
    static ingresos = [
        new Ingreso("Sueldo", 35000.00)
      ];
      
     static egresos = [
        new Egreso("Renta del Departamento", 4500)
      
      ];

    static guardar(dato){
        if(dato instanceof Egreso){
            DatoService.egresos.push(dato);
        }else{
            DatoService.ingresos.push(dato);
        }
    }

    static totalEgresado(){
        return DatoService.egresos.reduce((suma, egreso) => { return suma + egreso.valor;}, 0);
    }

    static totalIngresado(){
        return DatoService.ingresos.reduce((suma, ingreso) => { return suma + ingreso.valor;},0);
    }

    static eliminarIngresoPorId(id){
        let indiceEliminar = DatoService.egresos.findIndex(egreso => egreso.id === id); 
        DatoService.egresos.splice(indiceEliminar, 1);
    }

    static eliminarEgresoPorId(id){
        let indiceEliminar = DatoService.egresos.findIndex(egreso => egreso.id === id); 
        DatoService.egresos.splice(indiceEliminar, 1);
    }

}