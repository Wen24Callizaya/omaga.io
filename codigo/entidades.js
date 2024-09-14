import { Util } from "./configuradores.js";

class Entidad {

    constructor(selector) {

        this.elemento = document.querySelector(selector).cloneNode(true);
        
        this.grados = Math.random() * 360;
        this.coordenadas = {
            x: 0,
            y: 0
        };
        this.dimensiones = {
            alto: 0,
            ancho: 0
        };

        this.desplazamiento = 10;
        this.rotacion = 5;

        this.desplazamientoMaximo = 30;
        this.aceleracion = 0.5;
        
        this.vida = 100;
        this.ataque = 20;

        this.equipo = GRIS;

    }
    __establecerCoordenadas(coordenadas) {
        this.coordenadas.x = coordenadas.x;
        this.coordenadas.y = coordenadas.y;
    }

    __establecerRotacion(grados) {
        this.grados = grados;
    }

    __actualizarCSS() {
        this.elemento.style.setProperty("--x", `${this.coordenadas.x}px`);
        this.elemento.style.setProperty("--y", `${this.coordenadas.y}px`);
        this.elemento.style.setProperty("--grados", `${this.grados}deg`); 
    }

    mostrar() {
        this.elemento.style.setProperty("display", "block");
    }

    posicionar(coordenadas) {
        this.coordenadas = coordenadas;
        this.__actualizarCSS();
    }
    
    mover(coordenadas) {
        this.coordenadas = Util.redistribuirDesplazamiento(this, coordenadas);
        this.__actualizarCSS();
    }

    colicionar() {

    }



    rotar(grados) {
        this.__establecerRotacion(this.grados + grados);
        this.__aplicarRotacion();
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

    actualizarRotacion() {
        this.elemento.style.setProperty("--grados", `${this.grados}deg`);
    }

    establecerCoordenadas(coordenadas) {
        this.coordenadas = coordenadas;
    }

    establecerRotacion(grados) {
        this.grados = grados;
    }

    mover(coordenadas) {
        this.__aplicarCoordenadas();
    }

    apuntar(coordenadas) {
        const calculo = Util.obtenerAnguloMasProximo(this.coordenadas, coordenadas);
        
        this.establecerRotacion(calculo);
        this.actualizarRotacion();
    }
    
}

class Triangulo {

} // enemigo

class Pentagono {

} // enemigo

class Circulo {

} // 

class Cuadrado {

} //}
export {  };