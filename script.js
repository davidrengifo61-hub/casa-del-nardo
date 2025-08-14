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
    
totalElem.textContent = total.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP"
});

document.getElementById('finalizar-compra').addEventListener('click', function () {
  // Usamos la variable total directamente, no el textContent
  let mensaje = `Hola, quiero finalizar mi compra. El total es: $${total.toLocaleString("es-CO")}`;

  let telefono = "573001112233"; // Cambia por tu número
  let url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
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

