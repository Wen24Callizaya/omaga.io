export default class Interfaz {

    constructor(selector) {
        this.elemento = document.querySelector(selector).cloneNode(true);
    }

    cargar() {
        document.body.appendChild(this.elemento);
    }

}