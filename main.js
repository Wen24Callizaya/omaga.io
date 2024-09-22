import Escenario from "./codigo/escenario.js";
import Pentagono from "./codigo/entidad/pentagono.js";
import PanelPrueba from "./codigo/interfaz.js";
import Circulo from "./codigo/entidad/circulo.js";
import Camara from "./codigo/camara.js";

const escenario = new Escenario();
const cant = 1;
const camara = new Camara();
const panelPrueba = new PanelPrueba();
const pentagonos = [];
const jugador = new Circulo();

let pentagono;
for (let i = 0; i < cant; i++) {
    pentagono = new Pentagono();
    pentagono.dimensionar(Math.random() * 16 + 32);
    pentagono.posicionar({ x: 1000, y: 1000 });
    pentagonos.push(pentagono);
}

jugador.posicionar({ x: 1000, y: 1000 });

const fin = pentagonos.map(pentagono => pentagono.elemento);

fin.push(jugador.elemento);

camara.enfocar(pentagonos[0]);

// -- ancho, alto y entidades del escenario
escenario.integrar(fin);

// Intervalos de evetons

// -- Rotacion y movimiento de cada pentagono
pentagonos[0].trayectoria = 45;
panelPrueba.procesar({
    Px: pentagonos[0].coordenadas.x,
    Py: pentagonos[0].coordenadas.y,
    Cx: camara.coordenadas.x,
    Cy: camara.coordenadas.y,
    Pa: pentagonos[0].dimensiones.ancho,
    Ca: window.innerWidth,
    F: (window.innerWidth + pentagonos[0].dimensiones.ancho)/2
});
panelPrueba.cargar();

function animacion() {
    panelPrueba.actualizar({
        Px: Math.round(pentagonos[0].coordenadas.x),
        Py: Math.round(pentagonos[0].coordenadas.y),
        Cx: Math.round(camara.coordenadas.x),
        Cy: Math.round(camara.coordenadas.y)
    });
    camara.actualizar();
    pentagonos.map((pentagono, i) => {
        pentagono.rotar(1)
        pentagono.mover();
    });
    requestAnimationFrame(animacion);

}

requestAnimationFrame(animacion);

// Partida -> Juego en si
// Decoracion
// Entidad -> Algo fisico en el juego