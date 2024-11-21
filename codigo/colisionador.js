export default class Colisionador {
    constructor(anchoJuego, altoJuego, tamanoCelda, escenario) {
        this.anchoJuego = anchoJuego;
        this.altoJuego = altoJuego;
        this.tamanoCelda = tamanoCelda;
        this.escenario = escenario;
        this.celdas = {};
    }

    // Método para ocultar la hitbox temporalmente
    // Limpia el mapa de celdas
    limpiarCeldas() {
        this.celdas = {};
    }

    // Asigna una entidad a una celda específica
    asignarACelda(entidad) {
        const celdaX = Math.floor(entidad.x / this.tamanoCelda);
        const celdaY = Math.floor(entidad.y / this.tamanoCelda);
        const claveCelda = `${celdaX},${celdaY}`;

        if (!this.celdas[claveCelda]) {
            this.celdas[claveCelda] = [];
        }
        this.celdas[claveCelda].push(entidad);
    }

    // Actualiza el estado de las colisiones en cada frame
    actualizar(entidades) {
        // Limpia celdas y reasigna entidades a las celdas
        this.limpiarCeldas();
        entidades.forEach(entidad => this.asignarACelda(entidad));

        // Verifica colisiones en las celdas
        for (const claveCelda in this.celdas) {
            const entidadesEnCelda = this.celdas[claveCelda];

            // Verifica colisiones entre entidades de la misma celda
            for (let i = 0; i < entidadesEnCelda.length; i++) {
                for (let j = i + 1; j < entidadesEnCelda.length; j++) {
                    const entidadA = entidadesEnCelda[i];
                    const entidadB = entidadesEnCelda[j];

                    if (this.verificarColision(entidadA, entidadB)) {
                        entidadA.enColision = true;
                        entidadA.objetoColision = entidadB;
                        entidadB.enColision = true;
                        entidadB.objetoColision = entidadA;
                    }
                }
            }
        }

        for (let i = entidades.length - 1; i >= 0; i--) {
            if (entidades[i].salud < 1) {
                this.escenario.escenario.removeChild(entidades[i].nodo);
                entidades.splice(i, 1);
            }
        }
    }

    // Método para verificar si dos entidades están colisionando
    verificarColision(entidadA, entidadB) {
        const colision = (
            entidadA.x < entidadB.x + entidadB.ancho &&
            entidadA.x + entidadA.ancho > entidadB.x &&
            entidadA.y < entidadB.y + entidadB.alto &&
            entidadA.y + entidadA.alto > entidadB.y
        );
    
        if (colision && entidadA.equipo != entidadB.equipo && entidadA.hitboxVisible && entidadB.hitboxVisible) {
            // Aplica daño
            entidadA.salud -= entidadB.fuerza;
            entidadB.salud -= entidadA.fuerza;
    
            // Oculta la hitbox de ambas entidades
            entidadA.ocultarHitbox();
            entidadB.ocultarHitbox();
        }
    
        return colision;
    }
    
}
