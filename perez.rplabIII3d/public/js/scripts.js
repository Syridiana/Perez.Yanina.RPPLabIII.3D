//import crearTabla from "./tabla.js";
import Anuncio_Auto from "./anuncio_auto.js";
import {
    addAnuncio,
    getAnuncios, modifyAnuncio, borrarAnuncio } from "./accesoADatos.js";
import crearTabla from "./tabla.js";
import {promedioPrecios} from "./consultas.js";






window.addEventListener('load', inicializarManejadores);

const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");
const btnEliminar = document.getElementById("btnEliminar");
const promedioPicker = document.getElementById("txtTransaccionElegida");
const formChangesEvent = document.querySelectorAll(".alertChanges");
const divTabla = document.getElementById("divTabla");
const checks = document.querySelectorAll(".checkboxMargin");





function inicializarManejadores() {

    let checked = JSON.parse(localStorage.getItem("anuncios"));

    getAnuncios()
    .then(function (res) {

        crearMenuFiltros(res[0]);
        loadLS();
    });




};




btnGuardar.addEventListener('click', function (e) {

    const camposCompletos = document.getElementById('myForm').checkValidity();

    e.preventDefault();

    if (camposCompletos) {

        let txtId = document.getElementById("txtID");
        txtId.value = "";


        altaUnAnuncio();

        formChangesEvent.forEach(element => {
            element.value = "";
        });

    } else {
        alert("Debe completar todos los datos correctamente");
    }
    limpiarPromedio();
});

promedioPicker.addEventListener('change', function (e) {
    filtrarTabla();
});



btnActualizar.addEventListener('click', function (e) {


    e.preventDefault();
    const selectedId = document.getElementById("txtID").value;

    if (selectedId) {



        const titulo = document.getElementById("txtTitulo").value;
        const descripcion = document.getElementById("txtDescripcion").value;
        const precio = document.getElementById("txtPrecio").value;
        const puertas = document.getElementById("txtPuertas").value;
        const km = document.getElementById("txtKM").value;
        const potencia = document.getElementById("txtPotencia").value;

        let tran;

        if (document.getElementById("TVenta").checked) {
            tran = "venta";
        } else {
            tran = "alquiler";
        }


        const anuncioNuevo = new Anuncio_Auto(titulo, tran, descripcion, precio, puertas, km, potencia);

        if (confirm("Seguro que desea guardar los cambios?")) {
            modifyAnuncio(anuncioNuevo, selectedId);
            getAnuncios();
        }



    } else {
        alert("Debe seleccionar primero un anuncio para modificar");
    }

    limpiarPromedio();
});


btnEliminar.addEventListener('click', function (e) {

    e.preventDefault();
    const selectedId = document.getElementById("txtID").value;


    if (selectedId) {
        if (confirm("Seguro que desea eliminar el anuncio?")) {
            borrarAnuncio(selectedId);
        }

    } else {
        alert("Debe seleccionar primero un anuncio para eliminar");
    }


    getAnuncios();
    limpiarPromedio();

});



function altaUnAnuncio() {


    const titulo = document.getElementById("txtTitulo").value;
    const descripcion = document.getElementById("txtDescripcion").value;
    const venta = document.querySelector('#TVenta');
    const precio = document.getElementById("txtPrecio").value;
    const puertas = document.getElementById("txtPuertas").value;
    const km = document.getElementById("txtKM").value;
    const potencia = document.getElementById("txtPotencia").value;

    let transaccion = "";

    if(venta.checked){
        transaccion = "venta";
    } else {
        transaccion = "alquiler";
    }

    const nuevoAnuncio = new Anuncio_Auto(titulo, transaccion, descripcion, precio, puertas, km, potencia);

    addAnuncio(nuevoAnuncio);

    getAnuncios();
}

function filtrarTabla() {


    let transaccion = document.getElementById("txtTransaccionElegida").value.toLowerCase();

    if (transaccion == "todas") {
        getAnuncios();
        document.getElementById("txtPromedio").value = "";
    } else {
        getAnuncios()
            .then(function (res) {

                let array = res;




                let arrPorTrans = array.filter(item => item.transaccion == transaccion);


                return arrPorTrans;
            })
            .then(function (res) {

                divTabla.innerHTML = "";
                divTabla.appendChild(crearTabla(res));

                promedioPrecios(res);
            });



    }


}





function crearMenuFiltros(item){ // devuelve thead

    const menu = document.getElementById('menuFiltros');
    

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    tr.classList.add('menuFiltros');
    
    for (const key in item) {
       let th = document.createElement('th');
       let texto = document.createTextNode(key);
       let checkbox = document.createElement('input');

       checkbox.type = "checkbox";
       checkbox.name = key;
       checkbox.value = key;
       checkbox.id = "CB" + key;
       checkbox.checked  = true;

       checkbox.addEventListener('change', manejadorCheckBox);
       
       checkbox.classList.add('checkboxMargin');
       th.appendChild(texto);
       th.appendChild(checkbox);
       
       tr.appendChild(th);

    }


    thead.appendChild(tr);
    thead.classList.add('text-capitalize');
    menu.appendChild(thead);


}



function manejadorCheckBox(){

    let allChecks = document.querySelectorAll(".checkboxMargin");

        
        getAnuncios()
            .then(function (res) {

                let array = res;
                let arrayItemsChecked = [];
                let arrayFiltrado = array.map(function (item) {
                    allChecks.forEach(element => {
                        if(!element.checked){

                           delete item[element.value]; 

                        }
                    });
                    return item;
                });

                allChecks.forEach(element => {
                    if(element.checked){

                        arrayItemsChecked.push(element.value);

                    }
                });

                localStorage.setItem("anuncios", JSON.stringify(arrayItemsChecked));
                divTabla.innerHTML = "";
                divTabla.appendChild(crearTabla(arrayFiltrado));
            });


}


function limpiarPromedio(){
    document.getElementById("txtPromedio").value = "";
    document.getElementById("txtTransaccionElegida").value = 0;
}


export function loadLS(){
    let checked = JSON.parse(localStorage.getItem("anuncios"));
    let checkBoxes = document.querySelectorAll(".checkboxMargin");

    checkBoxes.forEach(element => {

        let isChecked = false;


        checked.forEach(item => {

           if(item == element.name){
               isChecked = true;
           }
        });

        if(!isChecked){
            element.checked = false;
        }

    });

    manejadorCheckBox();

}