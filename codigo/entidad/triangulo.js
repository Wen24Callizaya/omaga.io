export default class Triangulo extends Entidad {

    constructor() {
        super(".traingulo");
    }

    dimensionar(lado) {
        this.dimensiones = {
            ancho: lado,
            alto: (lado**2 - lado**2)**0.5  
        }
    }

}