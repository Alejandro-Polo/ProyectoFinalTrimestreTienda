let carrito = {};


const actualizarContadorCarrito = () => {
    const contador = document.getElementById("contadorCarrito");
    if (contador) {
        const totalProductos = Object.values(carrito).reduce((total, item) => total + item.cantidad, 0);
        contador.textContent = totalProductos;
    }
};


export const agregarAlCarrito = (productoId, nombre, serie) => {
    if (carrito[productoId]) {
        carrito[productoId].cantidad += 1;
    } else {
        carrito[productoId] = {
            cantidad: 1,
            nombre: nombre, 
            serie: serie,   
        };
    }
    guardarCarritoEnLocalStorage(); 
    actualizarContadorCarrito(); 
};


export const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
};


export const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    actualizarContadorCarrito(); 
};


export const verCarrito = () => {
    const contenedor = document.getElementById("productosCarrito");
    contenedor.innerHTML = ''; 

    if (Object.keys(carrito).length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "El carrito está vacío.";
        contenedor.appendChild(mensaje);
    } else {
        for (const productoId in carrito) {
            const producto = carrito[productoId];
            const divProducto = document.createElement("div");
            divProducto.classList.add("producto-carrito");

            const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;
            divProducto.appendChild(nombre);

            const cantidad = document.createElement("p");
            cantidad.textContent = `Cantidad: ${producto.cantidad}`;
            divProducto.appendChild(cantidad);

            const serie = document.createElement("p");
            serie.textContent = `Serie de Amiibo: ${producto.serie}`;
            divProducto.appendChild(serie);

            contenedor.appendChild(divProducto);
        }
    }
};

export const eliminarDelCarrito = (productoId) => {
    if (carrito[productoId]) {
        delete carrito[productoId];
    }
    guardarCarritoEnLocalStorage();o
    verCarrito(); 
    actualizarContadorCarrito();
};


export const agregarProducto = (producto) => {
    const productoId = `${producto.head}-${producto.tail}`;
    const nombre = producto.name;
    const serie = producto.amiiboSeries;
    
    agregarAlCarrito(productoId, nombre, serie);
};


window.onload = () => {
    cargarCarritoDesdeLocalStorage();
    verCarrito(); 
};
