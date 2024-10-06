import Util from "./util.js";

const
    GRIS = 0,
    VERDE = 1,
    ROJO = 2;

/**
 * .nodo: HTMLElement
 * 
 * .x
 * .y
 * .alto
 * .ancho
 * 
 * .direccion
 * .trayectoria
 * 
 * .velocidadMovimiento
 * .velocidadMovimientoBase
 * .velocidadMovimientoMaximo
 * .aceleracionMovimiento
 * .velocidadRotacion
 * .velocidadRotacionBase
 * .velocidadRotacionMaxima
 * .aceleracionRotacion
 * 
 * .equipo
 * .salud
 * .fuerza
 * 
 * .coordenadas: { x, y }
 * .dimensiones: { alto, ancho }
 * .velocidadMovimiento: { actual, base, maxima, aceleracion }
 * .velocidadRotacion: { actual, base, maxima, aceleracion }
 * 
 * .coordenadas = { x, y }
 * .dimensiones = lado
 * 
 * .renderizar(): undefined
 * .mover(): undefined
 * .apuntar(Coordenadas coordenadas): undefined
 * .taclear(Coordenadas coordenadas): undefined
 * .rotar(boolean antihorario): undefined
 * .observar(entidad): undefined
 * .
 */

class Entidad {

    constructor() {
        
        this.nodo;
        
        this.x;
        this.y;
        this.lado;
        this.alto;
        this.ancho;
        
        this.direccion;
        this.trayectoria;
        
        this.velocidadMovimiento;
        this.velocidadMovimientoBase;
        this.velocidadMovimientoMaximo;
        this.aceleracionMovimiento;
        this.velocidadRotacion;
        this.velocidadRotacionBase;
        this.velocidadRotacionMaxima;
        this.aceleracionRotacion;
        
        this.equipo;
        this.salud;
        this.fuerza;

        this.objetivo;

    }

    get coordenadas() {
        const { x, y } = this;
        return { x, y };
    }

    get dimensiones() {
        const { ancho, alto } = this;
        return { ancho, alto } = this;
    }

    set coordenadas({ x, y }) {
        this.x = x;
        this.y = y;
    }

    set dimensiones(lado) {
        this.ancho = lado;
        this.alto = lado;
    }

    // @actualizarCSS
    desplazar() {
        this.velocidadMovimiento = this.velocidadMovimiento == 0? this.velocidadMovimientoBase: this.velocidadMovimiento * this.aceleracionMovimiento;
    }

}

export default class Entidad {

    constructor(selector) {

        this.elemento = document.querySelector(selector).cloneNode(true);  
        
        this.rotacion = Math.random() * 360;

        this.coordenadas = {
            x: Math.random() * 5000,
            y: Math.random() * 5000
        };
        this.dimensiones = {
            alto: 0,
            ancho: 0
        };

        this.velociadad = {
            rotacion: 10,
            desplazamiento: 10
        }

        this.direccion = Math.random() * 360;

        this.velocidadDesplazamientoBase = 2;
        this.desplazamientoMaximo = 10;

        this.aceleracion = 1.006;
        this.desaceleracion = 0.80;
        
        this.vida = 100;
        this.ataque = 20;
        this.equipo = GRIS;

        this.actualizar = () => null;

    }

    get coordenadas() {
        const { x, y } = this;
        return { x, y };
    }

    get dimensiones() {

    }

    __actualizarCSS() {
        this.elemento.style.setProperty("--x", `${this.coordenadas.x}px`);
        this.elemento.style.setProperty("--y", `${this.coordenadas.y}px`);
        this.elemento.style.setProperty("--alto", `${this.dimensiones.alto}px`);
        this.elemento.style.setProperty("--ancho", `${this.dimensiones.ancho}px`);
        this.elemento.style.setProperty("--grados", `${this.grados}deg`);
    }
    
    posicionar(coordenadas) {
        this.coordenadas = coordenadas;
    }

    dimensionar(dimensiones) {
        this.dimensiones = dimensiones;
    }

/*  establecerDimensiones(lado) {
        this.dimensiones = {
            ancho: lado,
            alto: lado
        };
    }

    establecerCoordenadas(coordendas) {
        this.coordenadas = coordenadas;
    }

    establecerDireccion(direccion) {
        this.direccion = direccion;
    }

    establecerRotacion(rotacion) {
        this.rotacion = rotacion;
    } */

    establecerComportamiento(comportamiento) {
        this.actualizar = comportamiento;
    }

    refrescar() {
        this.__actualizarCSS();
    }

    // @coordenadas: Coordenadas
    apuntar(coordenadas) {
        const delta = Util.delta(coordenadas);
    }

    mover() {
        if(this.desplazamiento == 0) this.desplazamiento = this.desplazamientoBase;
        
        this.coordenadas = Util.trayectoria(this);

        if (this.desplazamiento <= this.desplazamientoMaximo) this.desplazamiento *= this.aceleracion;
        else this.desplazamiento = this.desplazamientoMaximo;
    }

    rotar(antihorario = false) {
        this.grados += this.rotacion * (antihorario? -1 : 1);
    }

    animar() {
        this.refrescar();
    }

}

/* 
    + apuntar(): 
    + mover():
    + posicionar():
    + dimensionar(): 
    + sincronizar():
*/

/*
    Entidad funciones
        - apuntar: gradualmente .rotacion segun -objetivo.coordenadas
        - mover: .coordenadas con .velocidad segun .direccion
        - rotar: .rotacion con .velocidad segun -antihorario
        - taclear: Triangulo
            actualiza .desplazamiento a 100
            bloquea .rotacion
            inicia un conteo (desplazamiento | tiempo)
        - disparar: Pentagono
            actualiza .desplazamiento / 2
            actualiza .rotacion **2
            anima explosion
            invoca Proyectil.Traingulo

        - avanzar:
            actualiza el elemento segun -tiempo-transcurrido cuando este entra en pantalla

        - actualizarCSS: actualiza las propiedades CSS
        - animar: responde a un "frame" en funcion del comportamiento;

*/

/* 
    sincronizar: ajusta la entidad con variables globales.
    apuntar: ajusta .grados en funcion de una entidad
    mover: agrega desplazamiento en funcion de .trayectoria
    comportamiento

    ana lleva al oso la avell ana
*/

// establecerCoordenadas

/*
    .elemento: HTMLElement 
    .x: float (guarda su posicion en el eje x)
    .y: float (guarda su posicion en el eje y)
    .alto: float ()

*/

/*
    .getElement<...>(string selectorEspecifico): HTMLElement
    .getElements<...>(string selectorEspecifico): HTMLColection
    .querySelector(string selector): HTMLElement
    .text

    .clone
    .copy
    .createElement
    .duply   

*/