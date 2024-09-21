import Escenario from "./codigo/escenario.js";
import Pentagono from "./codigo/entidad/pentagono.js";
import Jugador from "./codigo/entidad/jugador.js";
import Circulo from "./codigo/entidad/circulo.js";
import Camara from "./codigo/camara.js";

const escenario = new Escenario();
const cant = 2;
const camara = new Camara();

const pentagonos = [];
const jugador = new Circulo();

let pentagono;

// Configuracion de variables
// -- rellenando los datos de los pentagonos al azar
for(let i = 0; i < cant; i ++ ) {
    pentagono = new Pentagono();
    pentagono.dimensionar(Math.random() * 16 + 32);
    pentagono.posicionar({ x: Math.random() * 1000, y: Math.random() * 1000 });
    pentagonos.push(pentagono);
} 

jugador.posicionar({ x: 100, y: 100  });

const fin = pentagonos.map(pentagono => pentagono.elemento);

fin.push(jugador);

jugador.equipo("verde");
camara.enfocar(jugador);

// -- ancho, alto y entidades del escenario
escenario.dimensionar({ ancho: 1200, alto: 1200 });  
escenario.integrar(fin);

// Intervalos de evetons

let direccion = 0;
setInterval(() => {
    direccion = (direccion)? 0: 180;
    pentagonos.map(pentagono => pentagono.establecer({ trayectoria: pentagono.trayectoria + direccion }));
}, 2000);

// -- Rotacion y movimiento de cada pentagono
function animacion() {

    pentagonos.map((pentagono, i) => {
        if(!i) console.log(pentagono.desplazamiento);
        pentagono.rotar(1)
        pentagono.mover();
    });
    requestAnimationFrame(animacion);

}
requestAnimationFrame(animacion);

// Partida -> Juego en si
// Decoracion
// Entidad -> Algo fisico en el juego