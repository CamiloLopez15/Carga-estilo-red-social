"use strict"

const publicaciones = document.querySelector('.publicaciones');
let contador = 0;

const cargarMasPublicaciones = entry => {
    if (entry[0].isIntersecting) cagarPublicaciones(4);
}

const createPublicationCode = (name, content) => {
    let container = document.createElement('DIV');
    let comentarios = document.createElement('DIV');
    let h3 = document.createElement('H3');
    let contenido = document.createElement('P');
    let btnComentario = document.createElement('INPUT');
    let btnEnviar = document.createElement('INPUT');

    container.classList.add('publicacion');
    comentarios.classList.add('comentarios');
    btnEnviar.classList.add('enviar');
    btnComentario.classList.add('comentario');

    btnEnviar.type = "submit";

    btnComentario.setAttribute('placeholder', "Introduce un comentario");
    h3.textContent = name;
    contenido.textContent = content;

    comentarios.appendChild(btnComentario);
    comentarios.appendChild(btnEnviar);

    container.appendChild(h3);
    container.appendChild(contenido);
    container.appendChild(comentarios);

    return container
}

const observer = new IntersectionObserver(cargarMasPublicaciones);

const cagarPublicaciones = async num => {
    const request = await fetch("informacion.txt");
    const content = await request.json();
    const arr = content.content;
    const documentFragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        if (arr[contador] != undefined) {
            let newPublication = createPublicationCode(arr[contador].nombre, arr[contador].contenido);
            documentFragment.appendChild(newPublication);
            contador++;
            if (i == num-1) observer.observe(newPublication);
        } else {
            if(publicaciones.lastElementChild.id !== "nomore") {
                let noMore = document.createElement('H3');
                noMore.textContent = "No hay más publicaciones.";
                noMore.id = "nomore"
                documentFragment.appendChild(noMore);
                publicaciones.appendChild(documentFragment);
                break;
            }
        }
    }
    publicaciones.appendChild(documentFragment);
}


cagarPublicaciones(4);