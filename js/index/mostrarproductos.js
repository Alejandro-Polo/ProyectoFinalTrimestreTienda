import { agregarProducto } from './carritocompra.js';

const apiURL = "https://www.amiiboapi.com/api/amiibo/";
let productos = [];
let productosFiltrados = [];
let ordenAscendente = true;
let productosMostrados = 8;

// Crea la estructura html de la página con dom del header
export const crearEstructuraDOM = () => {
    const header = document.createElement("header");

    const titulo = document.createElement("h1");
    titulo.classList.add("header__titulo");
    titulo.textContent = "Tienda de Amiibo";
    header.appendChild(titulo);

    const menu = document.createElement("nav");
    menu.classList.add("header__menu");
    const interfaces = document.createElement("div");
    interfaces.classList.add("header__menu-item");
    const interfacesLabel = document.createElement("span");
    interfaces.classList.add("header__menu-label");
    interfacesLabel.textContent = "Interfaces";
    interfaces.appendChild(interfacesLabel);
    const subMenu = document.createElement("ul");
    subMenu.classList.add("header__submenu");

    const galeriaLink = document.createElement("li");
    const galeria = document.createElement("a");
    galeria.href = "galeria.html";
    galeria.textContent = "Galería";
    galeriaLink.appendChild(galeria);
    subMenu.appendChild(galeriaLink);

    const formularioLink = document.createElement("li");
    const formulario = document.createElement("a");
    formulario.href = "formulario.html";
    formulario.textContent = "Formulario";
    formularioLink.appendChild(formulario);
    subMenu.appendChild(formularioLink);

    interfaces.appendChild(subMenu);
    menu.appendChild(interfaces);

    header.appendChild(menu);

    const carritoDiv = document.createElement("div");
    carritoDiv.id = "carritoInfo";
    carritoDiv.classList.add("header__carrito");


    /* Tarea sergio clase, hacer un buscador para filtrar por nombre */
    const buscador = document.createElement("input");
    buscador.classList.add("header__buscador");
    buscador.type = "text";
    buscador.id = "buscadorinput";
    buscador.placeholder = "Buscador";
    carritoDiv.appendChild(buscador);

    const botonBuscar = document.createElement("button");
    botonBuscar.classList.add("header__boton");
    botonBuscar.textContent = "Buscar";
    botonBuscar.id = "btnBuscar";
    botonBuscar.onclick = filtrarPorNombre;
    carritoDiv.appendChild(botonBuscar);


    const botonCarrito = document.createElement("button");
    botonCarrito.classList.add("header__boton");
    botonCarrito.textContent = "Carrito";
    botonCarrito.onclick = () => location.href = "./carrito.html";
    carritoDiv.appendChild(botonCarrito);

    const contadorCarrito = document.createElement("span");
    contadorCarrito.classList.add("header__contador");
    contadorCarrito.id = "contadorCarrito";
    contadorCarrito.textContent = "0";
    carritoDiv.appendChild(contadorCarrito);

    const selectAmiiboSeries = document.createElement("select");
    selectAmiiboSeries.classList.add("filtro__select");
    selectAmiiboSeries.id = "filtroAmiiboSeries";
    selectAmiiboSeries.onchange = filtrarPorAmiiboSeries;
    carritoDiv.appendChild(selectAmiiboSeries);

    const botonOrden = document.createElement("button");
    botonOrden.classList.add("filtro__boton");
    botonOrden.textContent = "Ordenar Ascendente";
    botonOrden.id = "botonOrden";
    botonOrden.onclick = alternarOrden;
    carritoDiv.appendChild(botonOrden);

    header.appendChild(carritoDiv);

    document.body.appendChild(header);




};

export const obtenerProductos = async () => {
    const response = await fetch(apiURL);
    const data = await response.json();
    productos = data.amiibo;
    // operador spread (...) para copiar los elementos en un nuevo array
    productosFiltrados = [...productos];
    cargarOpcionesSeries();
    mostrarProductos(productosFiltrados.slice(0, productosMostrados));
};

//Creación de la estructura html con dom de los productos
export const mostrarProductos = (listaProductos) => {
    let contenedor = document.getElementById("productos");

    // Si ya se ha ejecutado esta función existira un contenedor ya creado por lo cual no se necesita otro
    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "productos";
        document.body.appendChild(contenedor);
    } else {
        contenedor.innerHTML = "";
    }

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
        document.body.appendChild(contenedor);
    });
};

// genera el select con las diferentes series 
export const cargarOpcionesSeries = () => {
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

// Función para realizar la busqueda por nombre ( trabajo de la defensa puesto por Sergio)
const filtrarPorNombre = () => {
    const nombreCharacter = document.getElementById("buscadorinput").value.trim().toLowerCase();

    // Si no hay nada escrito se muestran los productos normales
    if (nombreCharacter === "") {
        productosFiltrados = [...productos];
    } else {
        // Filtramos los productos cuyo nombre coincida con el texto del input
        // Con el includes me permite que el buscador busque similitudes en el nombre
        productosFiltrados = productos.filter((p) => p.name.toLowerCase().includes(nombreCharacter));
    }

    document.getElementById("productos").innerHTML = "";
    mostrarProductos(productosFiltrados.slice(0, productosMostrados));
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


export const alternarOrden = () => {
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
