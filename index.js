// ------PRODUCTOS------ 

const productos = [
    // ----Abrigos----

    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./img/abrigo-01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 7000
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./img/abrigo-02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 6000
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./img/abrigo-03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 6000
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./img/abrigo-04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 7500
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./img/abrigo-05.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 7500
    },

    // ----REMERAS----
    {
        id: "remera-01",
        titulo: "Remera-01",
        imagen: "./img/remera-01.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 3000
    },
    {
        id: "remera-02",
        titulo: "Remera-02",
        imagen: "./img/remera-02.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 3000
    },
    {
        id: "remera-03",
        titulo: "Remera-03",
        imagen: "./img/remera-03.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 3000
    },
    {
        id: "remera-04",
        titulo: "Remera-04",
        imagen: "./img/remera-04.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 3000
    },

    // ----PANTALONES----
    {
        id: "pantalon-01",
        titulo: "pantalon-01",
        imagen: "./img/pantalon-01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 4500
    },
    {
        id: "pantalon-02",
        titulo: "pantalon-02",
        imagen: "./img/pantalon-02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 4700
    },
    {
        id: "pantalon-03",
        titulo: "pantalon-03",
        imagen: "./img/pantalon-03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 4500
    },
    {
        id: "pantalon-04",
        titulo: "pantalon-04",
        imagen: "./img/pantalon-04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 4700
    }
];

// ----DOM---
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    //SE CARGAN LOS PRODUCTOS
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

//SE CARGAN LOS PRODUCTOS EN LOS APARTADOS DE MENU CORRESPONDIENTES
botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter( producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "todos los productos";
            cargarProductos(productos);
        }

    })
});


//AGREGAR AL CARRITO

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}


function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    
    //LOCALSTORAGE
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


//SE ACTUALIZA EL NUMERITO DE LA PAGINA EN EL APARTADO "CARRITO"
function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}