class Interfaz {

    constructor(selector) {
        this.elemento = document.querySelector(selector).cloneNode(true);
    }

    cargar() {
        document.body.appendChild(this.elemento);
    }

}

export default class PanelPrueba extends Interfaz {

    constructor() {
        super(".panel-prueba");

        this.datos = {
            estado: "vacio"
        };
    }

    __removerCampos() {
        this.elemento.innerHTML = "";
    }

    __construirCampos() {
        let nuevoCampo;
        for(let clave in this.datos) {
            nuevoCampo = document.createElement("div");
            nuevoCampo.classList.add("campo");
            nuevoCampo.classList.add(clave);
            nuevoCampo.innerHTML = `
                <span class="nombre">${clave}</span>
                <span class="valor">${this.datos[clave]}</span>
            `;
            this.elemento.appendChild(nuevoCampo);
        }
    }

    procesar(datos) {

        this.datos = datos;
        this.__removerCampos();
        this.__construirCampos();

    }

    actualizar(datos) {
        this.datos = datos;
        for(let clave in this.datos) {
            this.elemento.querySelector("." + clave).querySelector(".valor").innerHTML = this.datos[clave];
        }
    }

}