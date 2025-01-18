const apiURL = "https://www.amiiboapi.com/api/amiibo/";
let productos = [];
let productosFiltrados = [];

export const obtenerProductos = async () => {
    const response = await fetch(apiURL);
    const data = await response.json();
    productos = data.amiibo;
    // operador spread (...) para copiar los elementos en un nuevo array
    productosFiltrados = [...productos];
};

const crearGaleria = async () => {
    // Obtener los productos desde la función importada
    await obtenerProductos();

    // Seleccionar 10 productos aleatorios
    const productosAleatorios = [];
    const productosUnicos = new Set(); // Para evitar productos duplicados

    while (productosAleatorios.length < 10 && productosFiltrados.length > productosAleatorios.length) {
        const indiceAleatorio = Math.floor(Math.random() * productosFiltrados.length);
        if (!productosUnicos.has(indiceAleatorio)) {
            productosAleatorios.push(productosFiltrados[indiceAleatorio]);
            productosUnicos.add(indiceAleatorio);
        }
    }

    // Crear galería en el DOM
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = ""; // Limpiar cualquier contenido previo

    productosAleatorios.forEach((producto) => {
        const item = document.createElement("div");
        item.classList.add("galeria__item");

        const imagen = document.createElement("img");
        imagen.src = producto.image;
        imagen.alt = producto.name;
        imagen.classList.add("galeria__imagen");

        const nombre = document.createElement("p");
        nombre.textContent = producto.name;
        nombre.classList.add("galeria__nombre");

        item.appendChild(imagen);
        item.appendChild(nombre);

        galeria.appendChild(item);
    });
};

// Llamar a la función para crear la galería al cargar la página
window.onload = () => {
    crearGaleria();
};
