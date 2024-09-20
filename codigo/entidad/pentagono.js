import Entidad from "../entidad.js";
import Util from "../util.js";

export default class Pentagono extends Entidad {

    constructor() {
        super(".pentagono");
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
        this.dimensiones = Util.dimensionarPentagono(lado);
        this.__actualizarCSS();
    }

} // enemigo