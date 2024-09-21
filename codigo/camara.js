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
        this.elemento.computedStyleMap.setProperty("--x", `${this.coordenadas.x}px`);
        this.elemento.computedStyleMap.setProperty("--y", `${this.coordenadas.y}px`);
    }

    // @coordenadas: Coordenadas, :undefined
    posicionar(coordenadas) {
        this.coordenadas = coordenadas;
        this.__actualizarCSS(); 
    }

    actualizar() {
        window.scrollTo = this.elemento;
        this.posicionar({ this.enfoque. });
    }

    // :undefined
    dimensionar() {    

    }

    // @entidad: Entidad, :undefined
    enfocarPeriferia(entidad) {

    }

    // @entidades: Entiad , :undefined
    enfocarGrupo(entidades) {

    }

    // @entidad: Entidad , :undefined
    enfocar(entidad) {
        this.enfoque = entidad;
    }

    /*
        + renderizar -> se encarga de que la pantalla siempre este sobre  este objeto
    */

}