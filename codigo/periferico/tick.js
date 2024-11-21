export default class Tick {

    total = 0;
    intervalo = 0;

    actualizar(total) {
        this.intervalo = total - this.total;
        this.total = total;
    }

}