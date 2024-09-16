import Entidad from "../entidad.js";

export default class Pentagono extends Entidad {

    constructor() {
        super(".pentagono");
    }

    dimensionar(lado) {
        this.dimensiones = {
            ancho: ((Math.sin(18 * Math.PI/180)) * lado + lado / 2) * 2,
            alto: (Math.cos(18 * Math.PI/180)) * lado + (lado ** 2 - (lado / 2 + (Math.sin(18 * Math.PI/180)) * lado) ** 2) ** 0.5
        };
        this.elemento.style.setProperty("--diferencia", `-${this.dimensiones.ancho - this.dimensiones.alto}px`);
        this.__actualizarCSS();
    }

} // enemigo