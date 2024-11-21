import Entidad from "../entidad.js";
import Util from "../util.js";

export default class Pentagono extends Entidad {

    constructor() {
        super(".pentagono");

        this.rotacion.base /= 2;
        this.desplazamiento.base = 1;
        this.salud = 12;
        this.fuerza = 6;
    }

    alterarTrayectoria(angulo) {
        return 185 - angulo;
    }

    calcularDimensiones(lado) {
        const dimensiones = {
            ancho: ((Math.sin(18 * Math.PI/180)) * lado + lado / 2) * 2,
            alto: (Math.cos(18 * Math.PI/180)) * lado + (lado ** 2 - (lado / 2 + (Math.sin(18 * Math.PI/180)) * lado) ** 2) ** 0.5
        };
        this.nodo.style.setProperty("--diferencia", `${-1*(dimensiones.ancho - dimensiones.alto)}px`);
        return dimensiones
    }

    atacar() {
        if(!(this.reloj.total - this.comienzoAtaque > 5)) {
            this.estaAtacando = false;
            this.comienzoAtaque = 0;
            this.dimensiones = this.alto * 1.30;
        }
        if(!this.estaAtacando) return;

    }
        
    actualizar() {
        
        this.estado = Math.floor(Math.random() * 25) + 1;

        if(this.estaProximoObjetivo(200) && this.estado == 24) {
            this.estaAtacando = true;
            this.aceleracionBloqueda = true;
            this.intervalo(() => { this.desplazamiento.diminuir() }, 1000);
            this.intervalo(() => { 
                this.aceleracionBloqueda = false;
                this.estaAtacando = false;
            }, 20000);
        }

        this.rotar();
        this.apuntarObjetivo();
        this.mover();

    }

} // enemigo