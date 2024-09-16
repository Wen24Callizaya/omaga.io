class Terreno {

    constructor() {

    }

} // Terreno con Zonas;

export default class Escenario {

    constructor() {

        this.escenario = document.querySelector(".escenario");
        this.terreno = document.querySelector(".terreno");
        this.cuadriculas = document.querySelector(".cuadriculas");

        this.dimensiones = {
            alto: 0,
            ancho: 0
        };

    }

    __actualizarCSS() {
        this.escenario.style.setProperty("--alto", `${this.dimensiones.x}px`);
        this.escenario.style.setProperty("--ancho", `${this.dimensiones.y}px`);
    }
    
    dimensionar(dimensiones) {
        this.dimensiones = dimensiones;
        this.__actualizarCSS();
        return this;
    } /*
        - El terreno debe poseer una distancia con respecto al borde de la pantalla:
            - Diferencia de tamaño entre el escenario y el terreno
            - Medidas relativas
        - Las cuadriculas deben correspondes correctamente con el inicio del terreno y el inicio del escenario
    */

    integrar(entidades) {
        for(let entidad of entidades) this.terreno.appendChild(entidad);
        return this;
    } // Metodo temporal para probar entidades

}

const escenario = new Escenario();

escenario.dimensionar({ ancho: 5000, alto: 5000 });