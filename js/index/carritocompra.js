let carrito = {};

//funcion que se encarga de modificar el numero del carrito
const actualizarContadorCarrito = () => {
    const contador = document.getElementById("contadorCarrito");
    if (contador) {
        // si existe contador , se extraen los productos del carrito como array y se suman las cantidades con reduce
        const totalProductos = Object.values(carrito).reduce((total, item) => total + item.cantidad, 0);
        contador.textContent = totalProductos;
    }
};

// se añaade un producto al carrito
const agregarAlCarrito = (productoId, nombre, serie) => {
    // si esste ya existe se aumenta en 1 la cantidad
    if (carrito[productoId]) {
        carrito[productoId].cantidad += 1;
    } else {
        // sino se guarda el nuevo producto
        carrito[productoId] = {
            cantidad: 1,
            nombre: nombre, 
            serie: serie,   
        };
    }
    guardarCarritoEnLocalStorage(); 
    actualizarContadorCarrito();
    verCarrito();
};

// se usa la api localstorage para guaardar el carrito
const guardarCarritoEnLocalStorage = () => {
    // la informacion se guarda en el objeto carrito, stringfy convierte carrito en formato json
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
};

// recupera el contenido de caarrito dessde el almacenamiento local en el localstorage
const cargarCarritoDesdeLocalStorage = () => {
    // recupera los datos asociados al carrito
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        // se convierte el texto json en js con json.parse
        carrito = JSON.parse(carritoGuardado);
    }
    actualizarContadorCarrito(); 
};


const verCarrito = () => {
    const contenedor = document.getElementById("productosCarrito");
    contenedor.innerHTML = ''; 
    // si el carrito esta vacio se muestra un texto indicaandolo
    if (Object.keys(carrito).length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "El carrito está vacío.";
        contenedor.appendChild(mensaje);
    } else {
        // sino se crea el dom para mostrar el carrito
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
            
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.onclick = () => eliminarDelCarrito(productoId);
            divProducto.appendChild(btnEliminar);

            contenedor.appendChild(divProducto);
        }
    }
};
// elimina productos del carrito
const eliminarDelCarrito = (productoId) => {
    //si la cantidad del producto que se quiere borrar es mayor que 1 se resta 1 a la cantidad
    if (carrito[productoId]) {
        if (carrito[productoId].cantidad > 1) {
            carrito[productoId].cantidad -= 1;
        } else {
            // sino se elimina del token carrito el producto seleccionado
            delete carrito[productoId]; 
        }
    }
    guardarCarritoEnLocalStorage();
    location.reload();
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
