export default class Util {

    static PI = 3.14159;

    static dimensionarPentagono(lado) {
        return ({
            ancho: ((Math.sin(18 * Math.PI/180)) * lado + lado / 2) * 2,
            alto: (Math.cos(18 * Math.PI/180)) * lado + (lado ** 2 - (lado / 2 + (Math.sin(18 * Math.PI/180)) * lado) ** 2) ** 0.5
        })
    }

    static radianes(angulos) {
        return angulos * Util.PI/180;
    }

    static redondear(numero) {
        return Math.round(numero * 100) / 100;
    }

    static seno(angulo) {
        return Util.redondear(Math.sin(Util.radianes(angulo)));
    }

    static coseno(angulo) {
        return Util.redondear(Math.cos(Util.radianes(angulo)));
    }

    static trayectoria(entidad) {
        // 
        // 
        
        console.log({
            resultado: (entidad.coordenadas.x + Util.seno(entidad.trayectoria) *  entidad.desplazamiento),
            x: entidad.coordenadas.x,
            suma: entiada
        });
        return ({
            x: entidad.coordenadas.x + Util.seno(entidad.trayectoria) * entidad.desplazamiento,
            y: entidad.coordenadas.y + Util.coseno(entidad.trayectoria) * entidad.desplazamiento
        });
    }

}

// Que podemos hacer sin compu?

// Proyectos

    // BANCO SOLIDARIO
    // Estructura de archivos?
    // Logica plan de funciones? Conversion de numeros programacion en español

    // OMAGA.IO
    // Plan -> Patron de ataques enemigos
    // Plan -> Interfaces

    // ONE PAGE
    // plan -> Tematica
    // plan -> Contenido

    // La otra no se

//