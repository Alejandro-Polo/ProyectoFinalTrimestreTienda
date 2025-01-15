import { validarJWT } from '../login/token.js';
import { agregarAlCarrito, verCarrito, guardarCarritoEnLocalStorage,agregarProducto , cargarCarritoDesdeLocalStorage } from './carritocompra.js';

const apiURL = "https://www.amiiboapi.com/api/amiibo/";
export let productos = [];
let productosFiltrados = [];
let ordenAscendente = true;
let productosMostrados = 8;

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

    const main = document.createElement("main");
    main.id = "productos";
    main.style.margin = "20px auto";
    document.body.appendChild(main);
};

const obtenerProductos = async () => {
    const response = await fetch(apiURL);
    const data = await response.json();
    productos = data.amiibo;
    productosFiltrados = [...productos];
    cargarOpcionesSeries();
    mostrarProductos(productosFiltrados.slice(0, productosMostrados));
};

const mostrarProductos = (listaProductos) => {
    const contenedor = document.getElementById("productos");

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
        precio.textContent = `Precio: $${(Math.random() * 100).toFixed(2)}`;
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
};

const cargarOpcionesSeries = () => {
    const select = document.getElementById("filtroAmiiboSeries");
    const series = [...new Set(productos.map((p) => p.amiiboSeries))];

    const optionTodos = document.createElement("option");
    optionTodos.value = "";
    optionTodos.textContent = "Todas las Series";
    select.appendChild(optionTodos);

    series.forEach((serie) => {
        const option = document.createElement("option");
        option.value = serie;
        option.textContent = serie;
        select.appendChild(option);
    });
};

const filtrarPorAmiiboSeries = () => {
    const select = document.getElementById("filtroAmiiboSeries");
    const serieSeleccionada = select.value;

    if (serieSeleccionada === "") {
        productosFiltrados = [...productos];
    } else {
        productosFiltrados = productos.filter((p) => p.amiiboSeries === serieSeleccionada);
    }

    productosMostrados = 8; // Reinicia la cantidad de productos mostrados
    document.getElementById("productos").innerHTML = ""; // Limpia el contenedor
    mostrarProductos(productosFiltrados.slice(0, productosMostrados));
};

const alternarOrden = () => {
    const botonOrden = document.getElementById("botonOrden");
    ordenAscendente = !ordenAscendente;

    if (ordenAscendente) {
        botonOrden.textContent = "Ordenar Ascendente";
        productosFiltrados.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        botonOrden.textContent = "Ordenar Descendente";
        productosFiltrados.sort((a, b) => b.name.localeCompare(a.name));
    }

    productosMostrados = 8; // Reinicia la cantidad de productos mostrados
    document.getElementById("productos").innerHTML = ""; // Limpia el contenedor
    mostrarProductos(productosFiltrados.slice(0, productosMostrados));
};

//scroll infinito
window.addEventListener("scroll", () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;

    if (scrollableHeight - scrollPosition < 100) {
        // Si estamos cerca del final, cargamos más productos
        const totalProductos = productosFiltrados.length;

        if (productosMostrados < totalProductos) {
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
