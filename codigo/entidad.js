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

export class Velocidad {

    actual = 0;
    base = 0;
    maxima = 0;
    aceleracion = 0;
    desaceleracion = 0;
    seAumentoMaximo = false;

    constructor(base, maxima, aceleracion, desaceleracion) {
        this.base = base;
        this.maxima = maxima;
        this.aceleracion = aceleracion;
    }

    aumentar() {
        if(this.seAumentoMaximo) return;

        if(this.actual < this.base)
            this.actual = this.base;
        if(this.actual >= this.maxima && !this.seAumentoMaximo)
            this.seAumentoMaximo = true;
        if(this.actual >= this.base && this.actual <= this.maxima)
            this.actual *= this.aceleracion;
    }

    diminuir() {

        if(this.actual < this.base)
            this.actual = 0;
        if(this.actual >= this.base) {
            this.actual *= this.desaceleracion;
            this.seAumentoMaximo = false;
        }
    }

}

export default class Entidad {

    nodo;
    
    #x = 0;
    #y = 0;
    lado = 0;
    alto = 0;
    ancho = 0;
    
    #direccion = 0;
    trayectoria = 0;

    rotacion = new Velocidad(200, 300, 0.12, 0.12);
    desplazamiento = new Velocidad(10, 15, 1.0012, 1.36);
    
    equipo = 2;
    salud = 0;
    fuerza;

    objetivo;
    reloj;

    estaAtacando = false;
    aceleracionBloqueda = false; 

    enColicion = false;
    objetoColicion = null;

    hitboxVisible = true; // Controla la visibilidad de la hitbox


    constructor(selector) {
        
        this.nodo = document.querySelector(selector).cloneNode(true);

    }

    estaProximoObjetivo(rango) {
        return this.x + rango > this.objetivo.x &&
        this.x - rango < this.objetivo.x &&
        this.y + rango > this.objetivo.y &&
            this.y - rango < this.objetivo.y;
    }

    intervalo(funcion, espera) {
        const inicio = this.reloj.total;
        this.a = inicio;
        if(inicio - this.reloj.total > espera) funcion();
    }

    get coordenadas() {
        const { x, y } = this;
        return { x, y };
    }

    get dimensiones() {
        const { ancho, alto } = this;
        return { ancho, alto };
    }

    get direccion() { 
        return this.#direccion; 
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(x) {
        this.#x = x;
        this.nodo.style.setProperty("--x", `${this.#x}px`);
    }    
    
    set y(y) {
        this.#y = y;
        this.nodo.style.setProperty("--y", `${this.#y}px`);
    }

    set coordenadas({ x, y }) {
        this.x = x;
        this.y = y;
    }

    set dimensiones(lado) {
        const { ancho, alto } = this.calcularDimensiones(lado);
        this.ancho = ancho;
        this.alto = alto;
        this.nodo.style.setProperty("--ancho", `${this.ancho}px`);
        this.nodo.style.setProperty("--alto", `${this.alto}px`);
    }

    set direccion(direccion) {
        this.#direccion = direccion;
        this.nodo.style.setProperty("--direccion", `${this.direccion}deg`);
    }

    calcularDimensiones(lado) {
        return { 
            ancho: lado, 
            alto: lado 
        };
    }

    mover() {    
        this.coordenadas = {
                x: this.coordenadas.x + Util.seno(this.trayectoria) * this.desplazamiento.actual,
                y: this.coordenadas.y + Util.coseno(this.trayectoria) * this.desplazamiento.actual
        };

        if(!this.aceleracionBloqueda) this.desplazamiento.aumentar();
    }
    
    rotar(antihorario = false) {
        this.rotacion.aumentar();
        this.direccion += this.rotacion.actual;
    }

    alterarTrayectoria(angulo) {
        return 270 - angulo;
    }

    calcularAlguloObjetivo() {
        const delta =  {
            x: this.x - this.objetivo.x,
            y: this.y - this.objetivo.y
        };

        let anguloObjetivo = Math.atan2(delta.y, delta.x) * 180 / 3.1415;

        if (anguloObjetivo < 0) {
            anguloObjetivo += 360;
        }

        
        return this.alterarTrayectoria(anguloObjetivo);

    }

    apuntarObjetivo() {
        this.trayectoria = this.calcularAlguloObjetivo();
    }


    atacar() {

    }

    avanzar() {
        this.trayectoria = this.apuntar(this.objetivo, "trayectoria");
        this.mover();
    }


    
        // Método para ocultar la hitbox temporalmente
        ocultarHitbox() {
            this.hitboxVisible = false;
            setTimeout(() => {
                this.hitboxVisible = true;
            }, 1000); // 1 segundo
        }

    actualizar() {

    }

}