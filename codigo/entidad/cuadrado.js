import Entidad from "../entidad.js";

export default class Cuadrado extends Entidad {

    constructor() {
        super(".cuadrado");

        this.salud = 6;
        this.fuerza = 3;
    }

}