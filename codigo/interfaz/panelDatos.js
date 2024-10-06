import Interfaz from "../interfaz.js";

export default class PanelDatos extends Interfaz {

    constructor() {
        super(".panel-prueba");

        this.funcion;
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

    procesar(funcionDatos) {

        this.funcion = funcionDatos;
        this.datos = this.funcion();
        this.__removerCampos();
        this.__construirCampos();

    }

    actualizar() {
        this.datos = this.funcion();
        for(let clave in this.datos) {
            this.elemento.querySelector("." + clave).querySelector(".valor").innerHTML = this.datos[clave];
        }
    }

}