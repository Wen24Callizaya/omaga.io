class Contador {

    constructor() {
        this.frames = 60;
        this.omaga 
    }

}

const GRIS = 0, VERDE = 1, ROJO = 2;

class Entidad {

    constructor(selector) {

        this.elemento = document.querySelector(selector);
        this.coordenadas = {
            x: 0,
            y: 0
        };
        this.grados = 0;
        this.desplazamiento = 10;
        this.vida = 0;
        this.equipo = GRIS;
        this.ataque = 0;
        this.dimensiones = {
            alto: 0,
            ancho: 0
        }

    }

    colicionar() {

    }

    posicionar() {

    }

    apuntar() {

    }

    avanzar() {

    }

    taclear() {

    }

    

}

class Traingulo extends Entidad

class EntidadPuntaje extends Entidad {

    constructor(forma) {
    }

}

class Triangulo {
    
    constructor() {

        this.elemento = document.querySelector(".triangulo").cloneNode(true);

        this.vida = 1000;
        this.dimension = 1;
        this.grados = 0;
        this.coordenadas = {
            x: 0,
            y: 0
        };
        this.experiencia = 100;
        this.rareza = 100;

    }

    __aplicarCoordenadas() {
        const {x, y} = this.coordenadas;
        this.elemento.style.setProperty("--x", `${x}px`);
        this.elemento.style.setProperty("--y", `${y}px`);
    }

    __aplicarRotacion() {
        console.log(this.grados)
        this.elemento.style.setProperty("--grados", `${this.grados}deg`); 
    }

    __establecerCoordenadas(coordenadas) {
        this.coordenadas.x = coordenadas.x;
        this.coordenadas.y = coordenadas.y;
    }

    __establecerRotacion(grados) {
        this.grados = grados;
    }

    mostrar() {
        this.elemento.style.setProperty("display", "block");
    }

       posicionar(coordenadas) {
        this.__establecerCoordenadas(coordenadas);
        this.__aplicarCoordenadas(); 
    }

    rotar(grados) {
        this.__establecerRotacion(this.grados + grados);
        this.__aplicarRotacion();
    }

    montarComportamiento() {
        setInterval(() => {
            this.rotar(0.2 + Math.random());
        }, 1000/60);
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

        this.nombre = localStorage.getItem("nombre");
        this.velocidad = 10;
        this.velocidadMaxima = 100;
        this.aceleracion = 0.5;
        this.grados = 90;

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

        this.dimensionar({x: 5000, y: 5000});
        this.posicionar({x: 0, y: 0});

        this.grados = 0;
        this.zonas = 0;

    }

    __aplicarDimensiones() {
        this.elemento.style.setProperty("--width", `${this.dimensiones.x}px`);
        this.elemento.style.setProperty("--height", `${this.dimensiones.y}px`);
    }

    __establecerDimensiones(dimensiones) {
        this.dimensiones = dimensiones;
    }

    __establecerZona(zona) {
        this.zonas.push(zona);
    }
    
    dimensionar(dimensiones) {
        this.__establecerDimensiones(dimensiones);
        this.__aplicarDimensiones();
    }

    posicionar(coordenadas) {
        this.coordenadas = coordenadas;
        this.elemento.style.setProperty("--x", `${this.coordenadas.x}px`);
        this.elemento.style.setProperty("--y", `${this.coordenadas.y}px`);
    }

    montarGeneracion() {
        
    }

    cargar(entidades) {
        for(let entidad of entidades)
            this.elemento.appendChild(entidad);
    }

    montarGeneracion() {
        this.intervalos.generacion = setInterval(() => {

            for(let zona of this.zonas) {
                this.generacion(zona);
            }

        }, 1000);
    }

    montarGeneracion() {
        setInterval(() => {
            let aleatorio = Math.random() * 100;
            const pentagono = new Pentagono();
            pentagono.posicionar({
                x: 200 + Math.random() * 1600,
                y: 200 + Math.random() * 1600
            })
            pentagono.montarComportamiento();
            console.log("Pentagono: " + aleatorio);
            if(aleatorio < 5)
                this.elemento.appendChild(pentagono.elemento);
        }, 1000);
    }

}


class Partida {

    constructor() {
    
    }

    init() {
        const terreno = new Terreno();
        const zonaPeriferia = new Zona();

        terreno.establecerDimensiones({x: 3000, y: 3000});

        zonaPeriferia.establecerZona({x: 500, y: 500}, {x: 600, y: 600});
        
        terreno.establecerAreas([zonaPeriferia]);
        terreno.establecerGeneracion({
            zonaCentral: [
                new Generacion([Rombo, Triangulo, Circulo], [20, 50, 5], true),
                new Generacion([Pentagono, Cuadrado], [20, 80], false)
            ],
            zonaPeriferia: [
                new Generacion([Triangulo], [20], true),
                new Generacion([Cuadrado], [80], false)
            ]
        });
        terreno.montarEventos();
    }

}

class TrianguloEnemigo {

    constructor(x, y, color) {
        this.altura = 50
        this.ancho = 50
        this.coordenadas = {
            x: x,
            y: y
        }
        this.ataque = 10
        this.desplazamiento = 10
        this.color = color;
    }

    localizar(jugador) {
        const coordenadas = jugador.coordenadas;
        if(coordenadas.x > this.coordenadas.x)
            this.moverD();
        else
            this.moverIzquierda();
            
    }

    moverIzquierda() {
        this.coordenadas.x -= this.desplazamiento;
    }

}

class TrianguloEnemigoPoderoso extends TrianguloEnemigo {

    constructor() {
        super(100, 200, "#036539");
    }

    moverIzquierda() {
        this.coordenadas.x 
    }

}

const trianguloEnemigoPoderoso = new TrianguloEnemigoPoderoso();

const pentagono = {

    alto: 10,
    ancho: 10,
    color: "927386",
    daño: 10,

    atacar(jugador) {
        jugador.vida - this.daño;
    }

}

pentagono.atacar();

const 
    trianguloEnemigo2 = new TrianguloEnemigo(120, 10, "#f00"),
    trianguloEnemigo3 = new TrianguloEnemigo(110, 90, "#0f0"),
    trianguloEnemigo4 = new TrianguloEnemigo(10, 200, "#00f");


    trianguloEnemigo2.localizar(pentagono)


const trianguloEnemigo = {

    altura: 50,
    ancho: 50,
    coordenadas: {
        x: 10,
        y: 10
    },
    ataque: 10,
    desplazamiento: 10,
    color: "#f00",

    localizar(jugador) {
        const coordenadas = jugador.coordenadas;
        if(coordenadas.x > this.coordenadas.x)
            this.moverD();
        else
            this.moverIzquierda();
            
    }

    moverIzquierda() {
    }

}


const terreno = new Terreno();
const jugador2 = new Jugador();
const nombre = document.querySelector(".nombre-jugador");

nombre.textContent = jugador2.nombre;
terreno.cargar([jugador2.elemento]);

const coordenadas = {};
coordenadas.x = terreno.x + terreno.ancho / 2;
coordenadas.y = terreno.y + terreno.alto / 2;
console.log(terreno);

terreno.montarGeneracion();

jugador2.establecerCoordenadas(coordenadas);
jugador2.actualizarPosicion();
//jugador2.montarControladorTeclado();
jugador2.montarControladorRaton();
//jugador2.establecerRotacion(270);
//jugador2.actualizarRotacion();

console.log(jugador2);

// Tope de aparicion por aparicion > Aparecen mas enemigos si el jugador tiene mas nivel.
