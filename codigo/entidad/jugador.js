import Circulo from "./circulo.js";
import Util from "../util.js";

export default class Jugador extends Circulo {

    constructor() {
        super();

        this.perificos = {};
    }

    controlarMovimiento({ w, a, r, s }) {
        let movimientoX = 0, movimientoY = 0;
        
        if(s) movimientoX = 1;
        if(a) movimientoX = -1;

        if(w) movimientoY = 1;
        if(r) movimientoY = -1;

        if(!(movimientoX || movimientoY)) return;

        let trayectoria = Math.atan2(movimientoY, movimientoX) * (180/Math.PI);

        this.trayectoria = trayectoria + (trayectoria < 0? 360 : 0) + 90;
        this.mover();
    }

    establecerPerifericos(teclado, raton) {
        this.perificos = {
            teclado,
            raton
        };
    }

    actualizar() {
        this.controlarMovimiento(this.perificos.teclado.obtenerEstado());
    }

}