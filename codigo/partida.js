import Escenario from "./escenario.js";

export default class Partida {

    constructor() {
        this.escenario = new Escenario();

        this.perifericos = {
            teclado: new Teclado(),
            raton: new Raton(),
            tick: new Tick()
        }

        this.jugador = null;
    }

    configurarJugador() {
        this.jugador = new Jugador();
        this.jugador.establecerPerifecicos(this.perifericos);
        this.jugador.posicionar({
            x: Math.random() * 100 + 2450,
            y: Math.random() * 100 + 2450
        });
    }

    configurarGeneracion(clases, probabilidades) {
        this.contructores = clases;
        this.probabilidades = probabilidades;
    }

    configurarInterfaces() {

    }

    __generarXAleatorioExcluyente(xFinal, intervalo) {
        let x = Math.random() * xFinal;
        return x >= intervalo.inicio && x <= intervalo.final? this.__generarXAleatorioExcluyente(xFinal, intervalo): x;
    }    
    
    __generarYAleatorioExcluyente(yFinal, intervalo) {
        let y = Math.random() * yFinal;
        return y >= intervalo.inicio && y <= intervalo.final? this.__generarXAleatorioExcluyente(yFinal, intervalo): y;
    }

    __generarCoordenadasAleatoriasExcluyentes() {
        let
            mediaAnchoVentana = (window.innerWidth - this.jugador.dimensiones.x)/2,
            mediaAltoVentana = (window.innerHeight - this.jugador.dimensiones.y)/2,
            intervaloX = {
                inicio: this.jugador.coordenadas.x - mediaAnchoVentana,
                final: this.jugador.coordenadas.x + mediaAnchoVentana
            },
            intervaloY = {
                inicio: this.jugador.coordenadas.y - mediaAltoVentana,
                final: this.jugador.coordenadas.y + mediaAltoVentana
            };

        return {
            x: this.__generarXAleatorioExcluyente(this.escenario.dimensiones.x, intervaloX),
            y: this.__generarYAleatorioExcluyente(this.escenario.dimensiones.x, intervaloX)
        }
    }

    generar() {

    }

    animar(tiempoActual) {
        requestAnimationFrame(this.animar)
    }

}

/**
 * Partida se encarga de lo que sucede en una partida
 *  - inicializacion
 *      - genenerar el jugador
 *      - configurar interfaces
 *      - configurar generacion
 *  - seguimiento
 *      - ganar y perder
 *      - generacion
 *      - camara
 */