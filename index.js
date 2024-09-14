function tomarNombre (){
    const nombre = document.querySelector(".entrada");
    let valorNombre = nombre.value;
    localStorage.setItem("nombre", valorNombre);
}

const boton = document.querySelector(".boton-enviar");
boton.addEventListener("click", () => {
    tomarNombre();
});
