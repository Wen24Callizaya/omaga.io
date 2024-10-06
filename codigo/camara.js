import Util from "./util.js";

export default class Camara {

    constructor() {
        this.elemento = document.querySelector(".camara");
        
        this.enfoque;
        this.dimensiones = {
            ancho: 0,
            alto: 0
        }
        this.coordenadas = {
            x: 0,
            y: 0
        }
    }

    __actualizarCSS() {
        this.elemento.style.setProperty("--x", `${this.coordenadas.x}px`);
        this.elemento.style.setProperty("--y", `${this.coordenadas.y}px`);
    }

    // @coordenadas: Coordenadas, :undefined
    posicionar(coordenadas) {
        this.coordenadas = coordenadas;
        this.__actualizarCSS(); 
    }

    actualizar() {
        this.posicionar(this.__centrar(this.enfoque));
        window.scroll({ top: this.coordenadas.y , left: this.coordenadas.x });
    }

    // :undefined
    dimensionar() {    

    }

    __centrar(punto) {
        return {
            x: punto.coordenadas.x - (window.innerWidth - punto.dimensiones.ancho)/2,
            y: punto.coordenadas.y - (window.innerHeight - punto.dimensiones.alto)/2
        };
    }

    // @entidad: Entidad, :undefined
    actualizarPeriferia(entidad, raton) {
        const delta = Util.delta(entidad, raton);
        this.posicionar(this.__centrar({
            coordenadas: {
                x: entidad.coordenadas.x - delta.x,
                y: entidad.coordenadas.y - delta.y
            },
            dimensiones: entidad.dimensiones
        }))
    }

    // @entidades: Entiad , :undefined
    enfocarGrupo(entidades) {

    }

    enfocarRaton(enfoque) {
        this.enfoque = enfoque;
    }

    // @entidad: Entidad , :undefined
    enfocar(entidad) {
        this.enfoque = entidad;
    }

    /*
        + renderizar -> se encarga de que la pantalla siempre este sobre  este objeto
    */

}