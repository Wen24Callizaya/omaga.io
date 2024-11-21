import Entidad from "../entidad.js";

export default class Torreta extends Entidad {

    constructor() {
        super(".torreta");

        this.salud = 100000000000000000000000000000000000;
        this.fuerza = 6;
    }

    alterarTrayectoria(angulo) {
        return 180 - angulo;
    }

    calcularDimensiones(lado) {
        const dimensiones = {
            ancho: ((Math.sin(18 * Math.PI/180)) * lado + lado / 2) * 2,
            alto: (Math.cos(18 * Math.PI/180)) * lado + (lado ** 2 - (lado / 2 + (Math.sin(18 * Math.PI/180)) * lado) ** 2) ** 0.5
        };
        this.nodo.style.setProperty("--diferencia", `${-1*(dimensiones.ancho - dimensiones.alto)}px`);
        return dimensiones
    }
        
    actualizar() {

        this.rotar();
        this.apuntarObjetivo();
        this.mover();

    }

}