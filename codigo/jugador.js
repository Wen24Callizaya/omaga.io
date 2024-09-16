import { Circulo } from "./entidad.js";

class Jugador extends Circulo {

    constructor() {
        super();
        
        this.montarTorreta();
    }

    montarTorreta() {
        const cuerpo = this.elemento;
        const torreta = document.querySelector(".torreta");

        this.elemento = document.createElement("div")
        this.elemento.appendChild(torreta);
    }

}