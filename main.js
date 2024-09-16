import Escenario from "./codigo/escenario.js";
import Pentagono from "./codigo/entidad/pentagono.js";

const escenario = new Escenario();
const pentagono2 = new Pentagono();

const pentagonos = [], direccionX = [], direccionY = [];

let pentagono;

// Configuracion de variables
// -- rellenando los datos de los pentagonos al azar
for(let i = 0; i < 100; i ++ ) {
    pentagono = new Pentagono();
    pentagono.dimensionar(Math.random() * 16 + 32);
    pentagono.posicionar({ x: Math.random() * 1000 + 100, y: Math.random() * 1000 + 100});
    pentagono.rotar(Math.random() * 360);
    pentagono.desplazamiento = Math.random();
    pentagono.desplazamientoMaximo = 50;
    pentagono.aceleracion = Math.random() / 20;
    pentagono.desplazamientoBase = pentagono.desplazamiento;
    pentagonos.push(pentagono);
    direccionX[i] = Math.random() * 5;
    direccionY[i] = Math.random() * 5;
}

// -- ancho, alto y entidades del escenario
escenario.dimensionar({ ancho: 12000, alto: 5000 });
escenario.integrar(pentagonos.map(pentagono => pentagono.elemento));

// Intervalos de evetons
// -- Direccion de cada pentagono
setInterval(() => {
    for(let i = 0; i < 100; i ++ ) {
        direccionX[i] = Math.random() * 5;
        direccionY[i] = Math.random() * 5;
    }
}, 2000);

// -- Rotacion y movimiento de cada pentagono
setInterval(() => {
    pentagonos.map((pentagono, i) => {
        pentagono.rotar(pentagono.desplazamiento)
        pentagono.desplazamiento += pentagono.aceleracion;
        if(pentagono.desplazamiento >= pentagono.desplazamientoMaximo)
            pentagono.desplazamiento = pentagono.desplazamientoBase;
        pentagono.posicionar({ x: pentagono.coordenadas.x + direccionX[i] - 2.5, y: pentagono.coordenadas.y + direccionY[i] - 2.5});
    });
}, 1000/60);

// Partida -> Juego en si
// Decoracion
// Entidad -> Algo fisico en el juego