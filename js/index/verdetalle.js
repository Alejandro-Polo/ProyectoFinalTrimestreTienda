const detalleDiv = document.getElementById("detalleProducto");

const mostrarDetalles = () => {
    const producto = JSON.parse(localStorage.getItem("productoDetalle"));
    if (!producto) {
        detalleDiv.textContent = "No hay detalles para mostrar.";
        return;
    }

    detalleDiv.innerHTML = `
        <img src="${producto.image}" alt="${producto.name}">
        <h2>${producto.name}</h2>
        <p>Serie: ${producto.amiiboSeries}</p>
        <p>Precio estimado: $${(Math.random() * 100).toFixed(2)}</p>
    `;
};

window.onload = mostrarDetalles;
