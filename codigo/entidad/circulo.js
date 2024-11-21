import Entidad from "../entidad.js";
import Util from "../util.js";

export default class Circulo extends Entidad {

    constructor() {
        super(".circulo");

        this.salud = 4;
        this.fuerza = 2;
    }

}