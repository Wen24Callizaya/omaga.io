class Contador {

    constructor() {
        this.frames = 60;
        this.omaga 
    }

}

class Jugador {

    constructor() {
        const jugador = document.querySelector(".jugador");
        this.nombre;
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

    tomarNombre(){
        let nombre = document.querySelector(".entrada");
        let nombreValor = nombre.value;
        this.nombre = nombreValor;
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
*/

    diferenciar(coordenadas) {
        return { x: this.coordenadas.x - coordenadas.x, y: this.coordenadas.y - coordenadas.y };
    }

    apuntarRaton({clientX: x, clientY: y}) {
        this.apuntar({ coordenadas: {x, y} });
    }

    proximidad(grados) { 
        return (this.grados + 180 > grados)? this.grados - (this.grados - grados) : this.grados + grados;
    }

    apuntar(entidad) {
        const 
            x = this.coordenadas.x - entidad.coordenadas.x,
            y = this.coordenadas.y - entidad.coordenadas.y
        
            console.log(this.proximidad(Math.atan2(y, x) * 180/Math.PI));
        this.establecerRotacion(this.proximidad(Math.atan2(y, x) * 180/Math.PI) - 90);
        this.actualizarRotacion();
    }

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
        document.addEventListener("mousemove", (event) => {
            console.log("owo")
            this.apuntarRaton(event);
        });
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

//document.querySelector(".boton-enviar").addEventListener("click", () => {
    //jugador2.tomarNombre();
    //alert("guardada con exito")
//})

terreno.cargar([jugador2.elemento]);

const coordenadas = {};
coordenadas.x = terreno.x + terreno.ancho / 2;
coordenadas.y = terreno.y + terreno.alto / 2;
console.log(terreno);

jugador2.establecerCoordenadas(coordenadas);
jugador2.actualizarPosicion();
//jugador2.montarControladorTeclado();
jugador2.montarControladorRaton();
//jugador2.establecerRotacion(270);
//jugador2.actualizarRotacion();

console.log(jugador2);
