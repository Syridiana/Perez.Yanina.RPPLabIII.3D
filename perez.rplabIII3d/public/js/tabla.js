import {getOneAnuncio, getAnuncios} from './accesoADatos.js';


export default function crearTabla(lista){ // devuelve una tabla

    const tabla = document.createElement('table');
    tabla.classList.add('table', 'table-bordered', 'table-striped', 'table-hover', 'w-auto');
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
}



function crearCabecera(item){ // devuelve thead
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    
    for (const key in item) {
       let th = document.createElement('th');
       let texto = document.createTextNode(key);
      
       th.appendChild(texto);



       tr.appendChild(th);

    }


    thead.appendChild(tr);
    thead.classList.add('thead-dark', 'text-capitalize');

    return thead;

}







function crearCuerpo(lista){ // devuelve tbody
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
       // console.log(element);
        const tr = document.createElement('tr');
        tr.classList.add('cursorPointer', 'text-capitalize', 'anuncio-entrada');


        for (const key in element) {
            const td = document.createElement('td');
            td.classList.add(key);
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);

            if(key =='id'){

                tr.setAttribute('data-id', element[key]);
            }
        }

        
        agregarManejadorTR(tr);
        tbody.appendChild(tr);

    });

    return tbody;

}


function agregarManejadorTR(tr){
    if(tr){

        tr.addEventListener('click', function(e) {


            const id = e.target.parentElement.getAttribute('data-id');
/*             let allChecks = document.querySelectorAll(".checkboxMargin");

            allChecks.forEach(element => {
                element.checked = true;
            }); */
            
            document.getElementById("txtID").value = id;

            getOneAnuncio(id);
            


        });
    }

}
















