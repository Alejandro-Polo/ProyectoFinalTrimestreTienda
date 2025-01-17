import { agregarProducto } from './carritocompra.js';

const apiURL = "https://www.amiiboapi.com/api/amiibo/";
export let productos = [];
let productosFiltrados = [];
let ordenAscendente = true;
let productosMostrados = 8;

// Crea la estructura html de la página con dom del header
const crearEstructuraDOM = () => {
    const header = document.createElement("header");

    const titulo = document.createElement("h1");
    titulo.textContent = "Tienda de Amiibo";
    titulo.style.flex = "1";
    header.appendChild(titulo);

    const carritoDiv = document.createElement("div");
    carritoDiv.id = "carritoInfo";
    carritoDiv.style.display = "flex";
    carritoDiv.style.alignItems = "center";

    const botonCarrito = document.createElement("button");
    botonCarrito.textContent = "Carrito";
    botonCarrito.onclick = () => location.href = "./carrito.html";
    carritoDiv.appendChild(botonCarrito);

    const contadorCarrito = document.createElement("span");
    contadorCarrito.id = "contadorCarrito";
    contadorCarrito.style.marginLeft = "10px";
    contadorCarrito.textContent = "0";
    carritoDiv.appendChild(contadorCarrito);

    const selectAmiiboSeries = document.createElement("select");
    selectAmiiboSeries.id = "filtroAmiiboSeries";
    selectAmiiboSeries.style.marginLeft = "20px";
    selectAmiiboSeries.onchange = filtrarPorAmiiboSeries;
    carritoDiv.appendChild(selectAmiiboSeries);

    const botonOrden = document.createElement("button");
    botonOrden.textContent = "Ordenar Ascendente";
    botonOrden.id = "botonOrden";
    botonOrden.style.marginLeft = "10px";
    botonOrden.onclick = alternarOrden;
    carritoDiv.appendChild(botonOrden);

    header.appendChild(carritoDiv);

    document.body.appendChild(header);

    
};

const obtenerProductos = async () => {
    const response = await fetch(apiURL);
    const data = await response.json();
    productos = data.amiibo;
    // operador spread (...) para copiar los elementos en un nuevo array
    productosFiltrados = [...productos];
    cargarOpcionesSeries();
    mostrarProductos(productosFiltrados.slice(0, productosMostrados));
};

//Creación de la estructura html con dom de los productos
const mostrarProductos = (listaProductos) => {
    const contenedor = document.createElement("div")

    listaProductos.forEach((producto) => {
        const productoHTML = document.createElement("div");
        productoHTML.classList.add("producto");

        const imagen = document.createElement("img");
        imagen.src = producto.image;
        imagen.alt = producto.name;
        productoHTML.appendChild(imagen);

        const nombre = document.createElement("h3");
        nombre.textContent = producto.name;
        productoHTML.appendChild(nombre);

        const precio = document.createElement("p");
        precio.textContent = `Precio: ${(Math.random() * 100).toFixed(2)} €`;
        productoHTML.appendChild(precio);

        const botonAgregar = document.createElement("button");
        botonAgregar.textContent = "Agregar al carrito";
        botonAgregar.onclick = () => agregarProducto(producto);
        productoHTML.appendChild(botonAgregar);

        const botonDetalle = document.createElement("button");
        botonDetalle.textContent = "Ver detalle";
        botonDetalle.onclick = () => location.href = `./verdetalles.html?id=${producto.head}-${producto.tail}`;
        productoHTML.appendChild(botonDetalle);

        contenedor.appendChild(productoHTML);
    });
    document.body.appendChild(contenedor);
};

// genera el select con las diferentes series 
const cargarOpcionesSeries = () => {
    const select = document.getElementById("filtroAmiiboSeries");
    //se extraen los nombres de las series, new Set elimina los duplicaods y [... ] lo termina convirtiendo en un array
    const series = [...new Set(productos.map((p) => p.amiiboSeries))];

    const optionTodos = document.createElement("option");
    optionTodos.value = "";
    optionTodos.textContent = "Todas las Series";
    select.appendChild(optionTodos);
    // recorriendo ese array de las series sin repetidos se crea una opcion para cada una en el select
    series.forEach((serie) => {
        const option = document.createElement("option");
        option.value = serie;
        option.textContent = serie;
        select.appendChild(option);
    });
};

const filtrarPorAmiiboSeries = () => {
    // recogemos el select y su valor seleccionado
    const select = document.getElementById("filtroAmiiboSeries");
    const serieSeleccionada = select.value;

    // si no hay valor seleccionado entonces se muestra los productos que ya habia
    if (serieSeleccionada === "") {
        // operador spread (...) para copiar los elementos en un nuevo array
        productosFiltrados = [...productos];
    } else {
        //filtra los productos para obtener un array que contenga solo a los que pertenecen a dicha aamiiboSeries
        productosFiltrados = productos.filter((p) => p.amiiboSeries === serieSeleccionada);
    }
    // Reinicia la cantidad de productos mostrados
    productosMostrados = 8;
    // Limpia el contenedor 
    document.getElementById("productos").innerHTML = ""; 
    mostrarProductos(productosFiltrados.slice(0, productosMostrados));
};

const alternarOrden = () => {
    const botonOrden = document.getElementById("botonOrden");
    ordenAscendente = !ordenAscendente;
    // se ordena ascendentemente si ordenascendente es true , sino se ordena descendentemente
    if (ordenAscendente) {
        botonOrden.textContent = "Ordenar Ascendente";
        // Usando sort para ordenar el array y una funcion de comparacion sabiendo que a esta delante de b 
        productosFiltrados.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        botonOrden.textContent = "Ordenar Descendente";
        // Usando sort para ordenar el array y una funcion de comparacion sabiendo que b esta detras de a 
        productosFiltrados.sort((a, b) => b.name.localeCompare(a.name));
    }
// Reinicia la cantidad de productos mostrados
    productosMostrados = 8;
    // Limpia el contenedor
    document.getElementById("productos").innerHTML = "";
    mostrarProductos(productosFiltrados.slice(0, productosMostrados));
};

//scroll infinito
window.addEventListener("scroll", () => {
    // pixeles que el ussuario puede desplazarse
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;

    if (scrollableHeight - scrollPosition < 100) {
        // Si estamos cerca del final, cargamos más productos
        const totalProductos = productosFiltrados.length;

        if (productosMostrados < totalProductos) {
            // Carga los 8 productos siguientes cada vez que se esta llegando al final
            const nuevosProductos = productosFiltrados.slice(productosMostrados, productosMostrados + 8);
            productosMostrados += nuevosProductos.length;
            mostrarProductos(nuevosProductos);
        }
    }
});

window.onload = () => {
    crearEstructuraDOM();
    obtenerProductos();
};
