export default class Teclado {

    constructor() {

        this.estado = {
            w: false,
            a: false,
            r: false,
            t: false
        }

    }

    obtenerEstado() {
        return this.estado;
    }

    leer(tecla) {
        return this.estado[tecla];
    }

    activar({ key: tecla }) {
        this.estado[tecla] = true;
    }

    desactivar({ key: tecla }) {
        this.estado[tecla] = false;
    }

    montar() {
        document.addEventListener("keydown", e => this.activar(e));
        document.addEventListener("keyup", e => this.desactivar(e));
    }

}