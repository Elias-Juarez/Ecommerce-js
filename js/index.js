// ----DOM---

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


// SE RENDERIZAN LOS PRODUCTOS

const renderizarProductos = (productos) => {
	contenedorProductos.innerHTML = "";
	productos.forEach((producto) => {
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
	});
	actualizarBotonesAgregar();
};

function cargarProductos() {
	fetch("./js/productos.json")
		.then((response) => response.json())
		.then((productosElegidos) => {
			console.log(productosElegidos);
			renderizarProductos(productosElegidos);
		});
}

cargarProductos();


//SE CARGAN LOS PRODUCTOS EN LOS APARTADOS DE MENU CORRESPONDIENTES

botonesCategoria.forEach(boton => {

        boton.addEventListener("click", (e) => {
            botonesCategoria.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
    
            fetch("./js/productos.json")
            .then((response) => response.json())
            .then((productosElegidos) => {
                if(e.target.id != "todos"){
                    const productoCategoria = productosElegidos.find(producto => producto.categoria.id === e.target.id);
                    tituloPrincipal.innerText = productoCategoria.categoria.nombre;
        
                    const productosBoton = productosElegidos.filter( producto => producto.categoria.id === e.target.id);
                    renderizarProductos(productosBoton);
                }else{
                    tituloPrincipal.innerText = "todos los productos";
                    renderizarProductos(productosElegidos);
                }
            })
    
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
	fetch("./js/productos.json")
		.then((response) => response.json())
		.then((productosElegidos) => {
			console.log(productosElegidos);
            const productoAgregado = productosElegidos.find(producto => producto.id === idBoton);
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

		});

}


//SE ACTUALIZA EL NUMERITO DE LA PAGINA EN EL APARTADO "CARRITO"
function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}