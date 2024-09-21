import Util from "./util.js";

const
    GRIS = 0,
    VERDE = 1,
    ROJO = 2;

export default class Entidad {

    constructor(selector) {

        this.elemento = document.querySelector(selector).cloneNode(true);  
        
        this.grados = Math.random() * 360;
        this.trayectoria = Math.random() * 360;

        this.coordenadas = {
            x: 0,
            y: 0
        };
        this.dimensiones = {
            alto: 0,
            ancho: 0
        };

        this.desplazamiento = 0;
        this.rotacion = 5;

        this.desplazamientoBase = 2;
        this.desplazamientoMaximo = 10;
        this.aceleracion = 1.006;
        this.desaceleracion = 0.80;
        
        this.vida = 100;
        this.ataque = 20;

        this.equipo = GRIS;

        this.__actualizarCSS();

        this.puntoColicion = null;

    }

    __actualizarCSS() {
        this.elemento.style.setProperty("--x", `${this.coordenadas.x}px`);
        this.elemento.style.setProperty("--y", `${this.coordenadas.y}px`);
        this.elemento.style.setProperty("--alto", `${this.dimensiones.alto}px`);
        this.elemento.style.setProperty("--ancho", `${this.dimensiones.ancho}px`);
        this.elemento.style.setProperty("--grados", `${this.grados}deg`); 
    }

    dimensionar(lado) {
        this.dimensiones = {
            ancho: lado,
            alto: lado
        };
        this.__actualizarCSS();
    }

    posicionar(coordenadas) {
        this.coordenadas = coordenadas;
        this.__actualizarCSS();
    }
    
    mover() {
        if(this.desplazamiento == 0) this.desplazamiento = this.desplazamientoBase;
        
        this.coordenadas = Util.trayectoria(this);

        if (this.desplazamiento <= this.desplazamientoMaximo) this.desplazamiento *= this.aceleracion;
        else this.desplazamiento = this.desplazamientoMaximo;
        
        this.__actualizarCSS();
    } // Mover, Desplazar, Transladar, Locomover, Trasnportar, Dirigir, Posicionar

    establecer(objeto) {
        for(let clave in objeto) this[clave] = objeto[clave]
    }

    colicionar() {

    }

    rotar(sentido) {
        this.grados += this.rotacion * sentido;
        this.__actualizarCSS();
    }

    apuntar(coordenadas) {

    }

    avanzar() {

    }

    taclear() {

    }

    sincronizar() {
    }

    actualizarPosicion() {

    }

    /* 
        + apuntar(): 
        + mover():
        + posicionar():
        + dimensionar(): 
        + sincronizar():
    */

    /* 
        sincronizar: ajusta la entidad con variables globales.
        apuntar: ajusta .grados en funcion de una entidad
        mover: agrega desplazamiento en funcion de .trayectoria
        comportamiento

        ana lleva al oso la avell ana
    */

}