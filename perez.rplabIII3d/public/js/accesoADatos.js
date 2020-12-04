import crearTabla from "./tabla.js";
import {cargarPromedioPotencia, cargarMinimo, cargarMaximo} from "./consultas.js";
import {loadLS} from "./scripts.js";


const divTabla = document.getElementById("divTabla");
const spinner = document.getElementById("spinner");




export function crearSpinner() {
    const img = document.createElement('img');
    img.setAttribute("src", "./images/spinner.svg");
    img.setAttribute("alt", "Imagen Spinner");

    return img;

}



export const getOneAnuncio = (id)=>{
    return new Promise((res, rej)=>{

    
        const xhr = new XMLHttpRequest();

    
        xhr.addEventListener('readystatechange', () => {
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300){
    
                    //divTabla.innerHTML = "";
    
                    let anuncio = JSON.parse(xhr.responseText);
    
                    const titulo = document.getElementById("txtTitulo");
                    const descripcion = document.getElementById("txtDescripcion");
                    const precio = document.getElementById("txtPrecio");
                    const puertas = document.getElementById("txtPuertas");
                    const km = document.getElementById("txtKM");
                    const potencia = document.getElementById("txtPotencia");
        

                            
                            titulo.value = anuncio.titulo;
                            descripcion.value = anuncio.descripcion;
                            precio.value = anuncio.precio;
                            puertas.value = anuncio.num_puertas;
                            km.value = anuncio.num_kms;
                            potencia.value = anuncio.potencia;
        
                            if(anuncio.transaccion == "venta")
                            {
    
                                document.getElementById("TVenta").checked = true;
                            } else
                            {
                                document.getElementById("TAlquiler").checked = true;
                            }
    
                    res(datos);
                    //ol.appendChild(crearItems(datos));
    
                } else
                {
                    let mensaje = xhr.statusText || "Error";
                    console.warn("Error: " + xhr.status + "-" + mensaje);
                }
 
            }
               
        });
    
        xhr.open('GET', "http://localhost:3000/anuncios/" + id); // el id a modificar
    
    
    
        xhr.send();
    
        getAnuncios()   
        .then(function (res) {

           loadLS();
        });

    });
}

export const getAnuncios = ()=>{
    return new Promise((res, rej)=>{

        spinner.appendChild(crearSpinner());

        const xhr = new XMLHttpRequest();

        divTabla.innerHTML = "";

    
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                // el status de una peticion puede venir en varios valores segun el caso
                // 400s codigos de error de parte del cliente
                // 500s errores del servidor
                if (xhr.status >= 200 && xhr.status < 300) {
    

    
                    let datos = JSON.parse(xhr.responseText);
                    divTabla.appendChild(crearTabla(datos));
                    cargarMaximo(datos);
                    cargarMinimo(datos);
                    cargarPromedioPotencia(datos);

                    res(datos);
    
                } else {
                    let mensaje = xhr.statusText || "Se produjo un error";
                    console.error("Error: " + xhr.status + "-" + mensaje);
    
                }
                spinner.innerHTML = "";
    
            }
    
    
    
        });
    
        xhr.open('GET', "http://localhost:3000/anuncios/"); // el method por default es GET // por default es asincrono, se puede cambiar
        xhr.send();

    });
}

export const modifyAnuncio= (anuncio, id)=>{
    return new Promise((res, rej)=>{
        
        const xhr = new XMLHttpRequest();

    
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
    
                    //divTabla.innerHTML = "";
    
                    let datos = JSON.parse(xhr.responseText);
                    res(datos);
    
                } else {
                    let mensaje = xhr.statusText || "Error";
                    console.warn("Error: " + xhr.status + "-" + mensaje);
                }
            }
    
        });
    
        xhr.open('PUT', "http://localhost:3000/anuncios/" + id); // el id a modificar
    
        xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
    
        xhr.send(JSON.stringify(anuncio));
        alert("Anuncio modificado con exito");
    });
}

export const borrarAnuncio = (id)=>{
    return new Promise((res, rej)=>{



    const xhr = new XMLHttpRequest();


    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {

                let datos = JSON.parse(xhr.responseText);
               // divTabla.appendChild(crearTabla(datos));
               res(datos);

            } else {
                let mensaje = xhr.statusText || "Error";
                console.warm("Error: " + xhr.status + "-" + mensaje);
            }

        }

    });

    xhr.open('DELETE', "http://localhost:3000/anuncios/" + id); // el id a modificar

    xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");

    xhr.send();
    alert("Anuncio borrado con exito");

    });
}

export const addAnuncio = (anuncio)=>{
    return new Promise((res, rej)=>{


        const xhr = new XMLHttpRequest();


    
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
    
                    let datos = JSON.parse(xhr.responseText);
                    res(datos);
                    
    
                } else {
                    let mensaje = xhr.statusText || "Error";
                    console.warn("Error: " + xhr.status + "-" + mensaje);
                }

            }
    
        });
    
        xhr.open('POST', "http://localhost:3000/anuncios/");
    
        xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
    
        
        xhr.send(JSON.stringify(anuncio));

        alert("Anuncio guardado con exito");

    });
}

