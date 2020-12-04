export const promedioTransacciones = (transaccion)=>{
    return new Promise((res, rej)=>{

        const xhr = new XMLHttpRequest();


    
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                // el status de una peticion puede venir en varios valores segun el caso
                // 400s codigos de error de parte del cliente
                // 500s errores del servidor
                if (xhr.status >= 200 && xhr.status < 300) {

    
                    let datos = JSON.parse(xhr.responseText);

                    //console.log(datos);
                    res(datos);
    
                } else {
                    let mensaje = xhr.statusText || "Se produjo un error";
                    console.error("Error: " + xhr.status + "-" + mensaje);
    
                }

    
            }
    
    
    
        });
    
        xhr.open('GET', "http://localhost:3000/anuncios/"); // el method por default es GET // por default es asincrono, se puede cambiar
        xhr.send();

    });
}



export function cargarMaximo(lista){

    
    let arrayPrecios = lista.map(function (arrayPrecios) {

        return arrayPrecios.precio;

    });

    let max = Math.max(...arrayPrecios);


    document.getElementById("txtMaximo").value = "$ " + max;

}



export function cargarMinimo(lista){

    let arrayPrecios = lista.map(function (arrayPrecios) {

        return arrayPrecios.precio;

    });

    const min = arrayPrecios.reduce(function(prev, current) {
        return (prev < current) ? prev : current;
    }) 
  

    document.getElementById("txtMinimo").value = "$ " + min;
    
}

export function cargarPromedioPotencia(lista){

    let arrayPotencia = lista.map(function (arrayPotencia) {

        return arrayPotencia.potencia;

    });

    let promedio = average(arrayPotencia);
  

    document.getElementById("txtPotenciaPromedio").value = promedio;
}


 export function average(nums) {

    let suma = nums.reduce(function (a, b) {

        return (a + b);

    });
    
    return suma / nums.length;
}



export function promedioPrecios(lista) {


    let arrayPrecios = lista.map(function (arrayPrecios) {

        return arrayPrecios.precio;

    });

    let nuevo = average(arrayPrecios);

    console.log(nuevo);

    document.getElementById("txtPromedio").value = "$ " + nuevo;

}
