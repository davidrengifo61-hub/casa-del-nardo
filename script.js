// ===================== CARRITO ===================== //
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar alerta al agregar producto
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
   const producto = { nombre, precio: 
    Number(precio) };
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarMensaje(`${nombre} agregado al carrito`);
}

// Mostrar productos en carrito.html
function mostrarCarrito() {
    const contenedor = document.getElementById("lista-carrito");
    const totalElem = document.getElementById("total");

   if (!contenedor || !totalElem) {
    console.warn("Elementos del carrito no encontrados en esta página.");
    return;
}

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalElem.textContent = "$0";
        return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        total += Number(producto.precio);
        const item = document.createElement("div");
        item.innerHTML = `
            <span>${producto.nombre}</span>
            <span>$${producto.precio}</span>
            <button onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        contenedor.appendChild(item);
    });

   
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Ejecutar en carrito.html
document.addEventListener("DOMContentLoaded", mostrarCarrito);