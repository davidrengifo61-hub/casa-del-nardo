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
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Crear mensaje con detalle de productos
  let mensaje = "Hola, quiero finalizar mi compra. Estos son los productos:\n\n";

  carrito.forEach((item) => {
    mensaje += `- ${item.nombre}: $${item.precio.toLocaleString("es-CO")}\n`;
  });

  // Calcular total
  let total = carrito.reduce((acc, item) => acc + item.precio, 0);
  mensaje += `\nTotal: $${total.toLocaleString("es-CO")}`;

  // Número de WhatsApp con formato internacional (sin +)
  let telefono = "573172211077"; // Cambia por tu número

  // Crear URL y abrir WhatsApp
  let url = `https://wa.me/${3172211077}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');

  // Opcional: vaciar carrito después de finalizar
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito(); // vuelve a renderizar el carrito vacío
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

