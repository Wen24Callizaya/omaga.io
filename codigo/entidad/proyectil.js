import Entidad from "../entidad.js";
import { Velocidad } from "../entidad.js"


export default class Proyectil extends Entidad {

    constructor() {
        super(".circulo");


        console.log(this);

        this.dimensiones = 20;
        this.desplazamiento = new Velocidad(100, 300, 0.12, 0);
        this.equipo = 1;
        setInterval(() => {
            this.nodo.remove();
        }, 1000)
        this.nodo.classList.add("proyectil");
        this.salud = 1;
        this.fuerza = 10;
    }

    actualizar() {
        this.mover();
    }

}