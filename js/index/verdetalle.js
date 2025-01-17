const detalleDiv = document.getElementById("detalleProducto");

const mostrarDetalles = () => {
    // obtenemos la cadena json del producto que convertimos en un objeto js con json.parse
    const producto = JSON.parse(localStorage.getItem("productoDetalle"));
    //Creación de la página con dom
    const img = document.createElement("img");
    img.src = producto.image;
    img.alt = producto.name;

    const titulo = document.createElement("h2");
    titulo.textContent = producto.name;

    const serie = document.createElement("p");
    serie.textContent = `Serie: ${producto.amiiboSeries}`;

    const personaje = document.createElement("p");
    personaje.textContent = `Personaje: ${producto.character}`;

    const juego = document.createElement("p");
    juego.textContent = `Serie de Juego: ${producto.gameSeries}`;

    const id = document.createElement("p");
    id.textContent = `id: ${producto.head}-${producto.tail}`;

    const tipo = document.createElement("p");
    tipo.textContent = `Tipo: ${producto.type}`;

    const fechaLanzamiento = document.createElement("ul");
    fechaLanzamiento.textContent = "Fecha de Lanzamiento:";
    const au = document.createElement("li");
    au.textContent = `Australia: ${producto.release.au}`;
    const eu = document.createElement("li");
    eu.textContent = `Europa: ${producto.release.eu}`;
    const jp = document.createElement("li");
    jp.textContent = `Japón: ${producto.release.jp}`;
    const na = document.createElement("li");
    na.textContent = `Norteamérica: ${producto.release.na}`;
    fechaLanzamiento.appendChild(au);
    fechaLanzamiento.appendChild(eu);
    fechaLanzamiento.appendChild(jp);
    fechaLanzamiento.appendChild(na);

    const precio = document.createElement("p");
    precio.textContent = `Precio estimado: ${(Math.random() * 100).toFixed(2)} €`;

    detalleDiv.innerHTML = "";
    detalleDiv.appendChild(img);
    detalleDiv.appendChild(titulo);
    detalleDiv.appendChild(serie);
    detalleDiv.appendChild(personaje);
    detalleDiv.appendChild(juego);
    detalleDiv.appendChild(id);
    detalleDiv.appendChild(tipo);
    detalleDiv.appendChild(fechaLanzamiento);
    detalleDiv.appendChild(precio);
};

window.onload = mostrarDetalles;
