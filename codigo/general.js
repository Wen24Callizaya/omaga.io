const 
    GRIS = 0,
    VERDE = 1,
    ROJO = 2;

class Teclado {

}

class Raton {

}

class Partida {

}

class GiroGrupal {

    suscribir(entidad) {

    }

}

class Pantalla {

}

class Contador {

}

class Terreno {

}

class Util {

    static delta({ x, y }, { x: x2, y: y2 }) {
        return { x: x - x2, y: y - y2 };
    }

    static enrutarPorProximidad(grados) { 
        return (this.grados + 180 > grados)? this.grados - (this.grados - grados) : this.grados + grados;
    }

    static grados(radianes) {
        return radianes * 180 / Math.PI;
    }

    static arcotangente2({x, y}) {
        return Math.atan2(y, x);
    }

    static obtenerAnguloMasProximo(entidadOrigen, entidadObjetivo) {
        return Util.enrutarPorProximidad(Util.grados(Util.arcotangente2(Util.delta(entidadOrigen, entidadObjetivo))));
    }

}

class Torreta {

    constructor() {

        this.elemento = document.querySelector(".torreta").cloneNode(true);


    }

}

class TorretaBase {
    
    

}

class PantallaInicio {

}

class PantallaJuego {

}

export { Util };