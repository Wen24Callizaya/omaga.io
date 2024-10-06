import Escenario from "./codigo/escenario.js";
import Camara from "./codigo/camara.js";
import PanelDatos from "./codigo/interfaz/panelDatos.js";
import Pentagono from "./codigo/entidad/pentagono.js";
import Circulo from "./codigo/entidad/circulo.js";
import Raton from "./codigo/periferico/raton.js";
import Teclado from "./codigo/periferico/teclado.js";
import Triangulo from "./codigo/entidad/triangulo.js";
import Cuadrado from "./codigo/entidad/cuadrado.js";
import Jugador from "./codigo/entidad/jugador.js";

const escenario = new Escenario();
const camara = new Camara();
const panelPrueba = new PanelDatos();
const jugador = new Jugador();

const raton = new Raton();
const teclado = new Teclado();

raton.montar();
teclado.montar();

const pentagonos = [];
const triangulos = [];
const cuadrados = [];
const cant = 5;

let pentagono, triangulo, cuadrado;
for (let i = 0; i < cant; i++) {
    pentagono = new Pentagono();
    pentagono.dimensionar(Math.random() * 16 + 32);
    pentagono.posicionar({ x: Math.random() * 1000 + 1000, y: Math.random() * 1000 + 1000 });
    pentagonos.push(pentagono);
    triangulo = new Triangulo();
    triangulo.dimensionar(Math.random() * 8 + 32);
    triangulo.posicionar({ x: Math.random() * 1000 + 1000, y: Math.random() * 1000 + 1000 });
    triangulos.push(triangulo);
    cuadrado = new Cuadrado();
    cuadrado.dimensionar(Math.random() * 8 + 32);
    cuadrado.posicionar({ x: Math.random() * 1000 + 1000, y: Math.random() * 1000 + 1000 });
    cuadrados.push(cuadrado);
    pentagono.refrescar();
    triangulo.refrescar();
    cuadrado.refrescar();
}

function comportamientoPentagono(pentagono) {
    pentagono.rotar();
    pentagono.mover();
    pentagono.trayectoria += 1;
}

pentagonos.map(pentagono => {
    pentagono.establecerComportamiento(comportamientoPentagono);
})

const entidades = [...pentagonos, ...triangulos, ...cuadrados, jugador];

jugador.posicionar({ x: 1000, y: 1000 });
jugador.dimensionar(54);

escenario.integrar(entidades.map(entidad => entidad.elemento));
camara.enfocar(jugador);

let ind = 1; /*sr
setInterval(() => {
    camara.enfocar(pentagonos[ind]);
    ind = (ind + 1) % pentagonos.length;
}, 2000); */

panelPrueba.procesar(() => ({
    Tw: teclado.leer("w"),
    Ta: teclado.leer("a"),
    Tr: teclado.leer("r"),
    Ts: teclado.leer("s")
}));
panelPrueba.cargar();

jugador.establecerPerifericos(teclado, raton);

function animacion() {

    panelPrueba.actualizar();
    camara.actualizar();

    entidades.map(entidad => entidad.mover());
    entidades.map(entidad => entidad.animar());

    requestAnimationFrame(animacion);

}

requestAnimationFrame(animacion);
