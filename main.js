import Escenario from "./codigo/escenario.js";
import Camara from "./codigo/camara.js";
import PanelDatos from "./codigo/interfaz/panelDatos.js";

import Raton from "./codigo/periferico/raton.js";
import Teclado from "./codigo/periferico/teclado.js";
import Tick from "./codigo/periferico/tick.js";

import Triangulo from "./codigo/entidad/triangulo.js";
import Cuadrado from "./codigo/entidad/cuadrado.js";
import Pentagono from "./codigo/entidad/pentagono.js";
import Circulo from "./codigo/entidad/circulo.js";

import Jugador from "./codigo/entidad/jugador.js";
import Colisionador from "./codigo/colisionador.js";
import Torreta from "./codigo/entidad/torreta.js";

// INSTACIA
const escenario = new Escenario();
const camara = new Camara();
const panelPrueba = new PanelDatos();
const jugador = new Jugador(escenario);
const torreta = new Torreta();

const colisionador = new Colisionador(5500, 5500, 150, escenario);

const raton = new Raton();
const teclado = new Teclado();
const tick = new Tick();

// MONTAJE DE PERIFERICOS
raton.montar();
teclado.montar();

const entidades = [];

// GENERACION DE ENTIDADES
function generar(clase, cantidad, tamanio, equipo) {
    for(let i = 0; i < cantidad; i++) {
        const figura = new clase();
        figura.dimensiones = tamanio;
        figura.equipo = equipo;
        figura.coordenadas = { x: Math.random() * 1000 + 1000, y: Math.random() * 1000 + 1000 };
        figura.desplazamiento.aceleracion = 1.05;
        figura.objetivo = jugador;
        figura.reloj = tick;
        entidades.push(figura);
    }

}

generar(Pentagono, 10, 52, 2);

jugador.entidades = entidades;
jugador.coordenadas = { x: 1500, y: 1500 };
jugador.dimensiones = 54;

entidades.push(jugador);

escenario.integrar(entidades.map(entidad => entidad.nodo));

camara.enfocar(jugador);

let ind = 1;

panelPrueba.procesar(() => ({
    YoX: jugador.x,
    YoY: jugador.y
}));
    
panelPrueba.cargar();
jugador.nombre = localStorage.getItem("nombre");//Aqui

jugador.establecerPerifericos(teclado, raton);

document.querySelector(".nombre-jugador").innerHTML = localStorage.getItem("nombre")

function animacion(momento) {
    tick.actualizar(momento);

    panelPrueba.actualizar();
    camara.actualizar();
    colisionador.actualizar(entidades);

    entidades.map(entidad => entidad.actualizar());

    entidades.filter(e => {
        e.vida 
    })

    requestAnimationFrame(animacion);
}

requestAnimationFrame(animacion);
