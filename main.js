class Jugador {

    constructor() {
        const jugador = document.querySelector(".jugador");

        this.elemento = jugador.cloneNode(true);

        this.coordenadas = {
            x: 0,
            y: 0
        };
        console.log("elemento jugador");

        this.nombre = localStorage.getItem("nombre");
        this.velocidad = 10;
        this.velocidadMaxima = 100;
        this.aceleracion = 0.5;
        this.grados = 90;
        this.cadencia = 1;

        this.activado = {
            w: false,
            s: false,
            a: false,
            d: false
        }

        this.registro = {
            w: 0,
            s: 0,
            a: 0,
            d: 0
        }

        this.elemento.style.setProperty("display", "inline-block");
    }


    actualizarPosicion() {
        this.elemento.style.setProperty("--x", `${this.coordenadas.x}px`);
        this.elemento.style.setProperty("--y", `${this.coordenadas.y}px`);
    }

    actualizarRotacion() {
        this.elemento.style.setProperty("--grados", `${this.grados}deg`);
    }

    establecerCoordenadas(coordenadas) {
        this.coordenadas = coordenadas;
    }

    establecerRotacion(grados) {
        this.grados = grados;
    }

    mover(coordenadas) {
        this.coordenadas.x += coordenadas.x;
        this.coordenadas.y += coordenadas.y;
        this.actualizarPosicion();
    }

/*     disparar() {
        uvu
    }

    taclear() {

    }

    apuntarRaton() {} */

    controlarTeclado(evento) {

        let tecla = evento.key.replace(/./, letra => letra.toUpperCase());
        
        const funcion = [
            
            () => this.mover({x: 0, y: this.velocidad}),
            () => this.mover({x: -this.velocidad, y: 0}),
            () => this.mover({x: this.velocidad, y: 0}),
        ][({W: 0, R: 1, A: 2, S: 3})[tecla]];
        
    }

    controlarRaton() {

    }

    controlarRatonClick() {

    }

    montarControladorTeclado() {

        let key = false;
        setInterval(() => {
            this.establecerRotacion(this.grados + 2 + this.grados / 250);
            
            this.actualizarRotacion();
        }, 1000/60);
        
        document.addEventListener("keydown", ({tecla: key}) => {
            if(!this.activado[tecla]) return;

            this.activado[tecla] = true;
            this.registro[tecla] = setInterval((() => {
                (() => this.mover({x: 0, y: -this.velocidad}))();
            }).bind(this), 1000/60);
        });

        document.addEventListener("keyup", ({tecla: key}) => {
                clearInterval(this.registro[tecla]);
                this.registro[tecla] = 0;
         })

    }

    montarControladorRaton() {
        document.addEventListener("mousedown", this.controlarRaton);
        document.addEventListenir("mouseclick", this.controlarRatonClick);
    }

    montarControladores() {

    }

}


class Terreno {

    constructor() {
        this.elemento = document.querySelector(".terreno");
        
        this.datos = this.elemento.getBoundingClientRect();

        this.ancho = this.datos.width;
        this.alto = this.datos.height;
        this.x = this.datos.left;
        this.y = this.datos.top;
    }
    
    cargar(entidades) {
        for(let entidad of entidades)
            this.elemento.appendChild(entidad);
    }

}

//-- Ejecucion;

const terreno = new Terreno();
const jugador2 = new Jugador();
const nombre = document.querySelector(".nombre-jugador");

nombre.textContent = jugador2.nombre;
terreno.cargar([jugador2.elemento]);

const coordenadas = {};
coordenadas.x = terreno.x + terreno.ancho / 2;
coordenadas.y = terreno.y + terreno.alto / 2;
console.log(terreno);

jugador2.establecerCoordenadas(coordenadas);
jugador2.actualizarPosicion();
jugador2.montarControladorTeclado();
jugador2.establecerRotacion(270);
jugador2.actualizarRotacion();

console.log(jugador2);
