import Anuncio from "./anuncio.js";

export default class Anuncio_Auto extends Anuncio{
    constructor(titulo, transaccion, descripcion, precio, puertas, kms, potencia){


        super(titulo, transaccion, descripcion, precio);

        this.num_puertas = puertas;
        this.num_kms = kms;
        this.potencia = potencia;

    }
}