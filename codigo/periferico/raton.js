export default class Raton {

    constructor() {

        this.coordenadas = {
            x: 0,
            y: 0
        }

    }

    actualizar(coordenadas) {
        this.coordenadas = coordenadas;
    }

    sincronizar({ pageX, pageY }) {
        console.log("here");
        this.actualizar({ x: pageX, y: pageY });
    }

    montar() {
        document.addEventListener("mousemove", e => this.sincronizar(e));
    }

}