class Jugador {

    constructor() {
        const jugador = document.querySelector(".jugador");

        this.elemento = jugador.cloneNode(true);

        this.coordenadas = {
            x: 0,
            y: 0
        };
        console.log("elemento jugador");

        this.velocidad = 10;
        this.velocidadMaxima = 100;
        this.aceleracion = 0.5;
        this.grados = 90;
        this.cadencia = 1;

        this.eventosId = [];

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
        
        document.addEventListener("keydown", (event) => {
            if(this.upEvent) return;
            this.upEvent = true;
            if(event.key != "w") return;
            this.upEvent = setInterval((() => {
                (() => this.mover({x: 0, y: -this.velocidad}))();
            }).bind(this), 1000/60);
        });

        document.addEventListener("keyup", (event) => {
            if(!this.upEvent) return;
            if(this.upEvent) {
                clearInterval(this.upEvent);
                this.upEvent = 0;
            }
        })

        //--

        document.addEventListener("keydown", (event) => {
            if(this.downEvent) return;
            this.downEvent = true;
            if(event.key !== "r") return;
            this.downEvent = setInterval((() => {
                (() => this.mover({x: 0, y: this.velocidad}))();
            }).bind(this), 1000/60);
        });

        document.addEventListener("keyup", (event) => {
            if(!this.downEvent) return;
            if(this.downEvent) {
                clearInterval(this.downEvent);
                this.downEvent = 0;
            }
        })

        //--

        document.addEventListener("keydown", (event) => {
            if(this.leftEvent) return;
            this.leftEvent = true;
            if(event.key !== "a") return;
            this.leftEvent = setInterval((() => {
                (() => this.mover({x: -this.velocidad, y: 0}))();
            }).bind(this), 1000/60);
        });

        document.addEventListener("keyup", (event) => {
            if(this.leftEvent) {
                clearInterval(this.leftEvent);
                this.leftEvent = 0;
            }
        })

        //--
        
        document.addEventListener("keydown", (event) => {
            if(this.rightEvent) return;
            if(event.key != "s") return;
            this.rightEvent = setInterval((() => {
                (() => this.mover({x: this.velocidad, y: 0}))();
            }).bind(this), 1000/60);
        });

        document.addEventListener("keyup", (event) => {
            if(this.rightEvent) {
                clearInterval(this.rightEvent);
                this.rightEvent = 0;
            }
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
