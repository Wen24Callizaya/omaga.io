import Circulo from "./circulo.js";
import Util from "../util.js";
import Proyectil from "./proyectil.js";

export default class Jugador extends Circulo {

    constructor(escenario, entidades) {
        super(".circulo");

        this.nodo.classList.add("jugador");
        this.nodo.appendChild(this.nodo.children[0]);
        this.nodo.innerHTML += "<div class='torreta'></div>"
        this.perifericos = {};
        this.torreta;
        this.salud = 1;
        this.equipo = 1;
        this.escenario = escenario;
        this.entidades = entidades;
        this.enEspera = false;
    }

    controlarMovimiento({ w, a, d, s }) {
        let movimientoX = 0, movimientoY = 0;
        
        if(d) movimientoX = 1;
        if(a) movimientoX = -1;

        if(w) movimientoY = 1;
        if(s) movimientoY = -1;

        if(!(movimientoX || movimientoY)) return;

        let trayectoria = Math.atan2(movimientoY, movimientoX) * (180/Math.PI);

        this.trayectoria = trayectoria + (trayectoria < 0? 360 : 0) + 90;

        this.mover();
    }

    establecerPerifericos(teclado, raton) {
        this.perifericos = {
            teclado,
            raton
        };
    }

    apuntarMouse() {
        const delta = {
            x: this.perifericos.raton.coordenadas.x - this.x,
            y: this.perifericos.raton.coordenadas.y - this.y
        }


        let angulo = Math.atan2(delta.y, delta.x) * 180 / 3.1415;

        if(angulo < 0) angulo += 360;

        this.direccion = angulo;
    }

    poderDisparar() {
        if(this.perifericos.raton.click && !this.enEspera) {
            this.enEspera = true;
            let bala = new Proyectil();
            bala.trayectoria = 90 - this.direccion;
            bala.x = this.x + this.ancho/2 - 10;
            bala.y = this.y + this.alto/2 - 10;
            this.entidades.push(bala);
            this.escenario.integrar([bala.nodo]);
            setTimeout(() => {
                this.enEspera = false;
            }, 250);
        }
    }

    actualizar() {
        this.controlarMovimiento(this.perifericos.teclado.obtenerEstado());
        this.apuntarMouse();
        this.poderDisparar();
    }

}