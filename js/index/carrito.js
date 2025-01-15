const carritoDiv = document.getElementById("carrito");

const mostrarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || {};
    carritoDiv.innerHTML = "";

    if (Object.keys(carrito).length === 0) {
        carritoDiv.textContent = "El carrito está vacío.";
        return;
    }

    Object.entries(carrito).forEach(([id, cantidad]) => {
        const productoDiv = document.createElement("div");
        productoDiv.textContent = `Producto: ${id} | Cantidad: ${cantidad}`;
        carritoDiv.appendChild(productoDiv);
    });
};

window.onload = mostrarCarrito;
