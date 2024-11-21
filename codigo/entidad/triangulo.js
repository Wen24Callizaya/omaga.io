import Entidad from "../entidad.js";

export default class Triangulo extends Entidad {

    constructor() {
        super(".triangulo");
    }

    calcularDimensiones(lado) {
        this.nodo.style.setProperty("--diferencia", `-${this.dimensiones.ancho - this.dimensiones.alto}px`);
        return {
            ancho: lado,
            alto: (lado**2 - (lado/2)**2)**0.5
        };
    }

    actualizar() {
        this.rotar(3);
        this.mover();
        this.trayectoria += 1;
    }

}