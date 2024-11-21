export default class Raton {

    constructor() {

        this.coordenadas = {
            x: 0,
            y: 0
        }

        this.click = false;

    }

    actualizar(coordenadas) {
        this.coordenadas = coordenadas;
    }

    sincronizar({ pageX, pageY }) {
        this.actualizar({ x: pageX, y: pageY });
    }

    sincronizarClick() {
        this.click = true;
        setTimeout(() => { this.click = false }, 100);
    }

    montar() {
        document.addEventListener("mousemove", e => this.sincronizar(e));
        document.addEventListener("click", () => { this.sincronizarClick() })
    }

}