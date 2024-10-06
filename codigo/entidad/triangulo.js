import Entidad from "../entidad.js";

export default class Triangulo extends Entidad {

    constructor() {
        super(".triangulo");
    }

    __actualizarCSS() {
        this.elemento.style.setProperty("--x", `${this.coordenadas.x}px`);
        this.elemento.style.setProperty("--y", `${this.coordenadas.y}px`);
        this.elemento.style.setProperty("--alto", `${this.dimensiones.alto}px`);
        this.elemento.style.setProperty("--ancho", `${this.dimensiones.ancho}px`);
        this.elemento.style.setProperty("--grados", `${this.grados}deg`); 
        this.elemento.style.setProperty("--diferencia", `-${this.dimensiones.ancho - this.dimensiones.alto}px`);
    }

    dimensionar(lado) {
        this.dimensiones = {
            ancho: lado,
            alto: (lado**2 - (lado/2)**2)**0.5
        }
        this.__actualizarCSS();
    }

    actualizar() {
        //this.rotar(4);
        this.rotar(3);
        this.mover();
        this.trayectoria += 1;
    }

}