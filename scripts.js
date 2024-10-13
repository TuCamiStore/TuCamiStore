// Inicializamos el carrito vacío
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto); // Añadir producto al carrito
    alert(`${producto.nombre} ha sido añadido al carrito.`); // Mensaje de confirmación
}

// Función para verificar si el carrito tiene productos y redirigir al pago
function realizarPedido() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Añade productos antes de proceder al pago.');
    } else {
        // Redirigir a la página de pago con el total del carrito
        let total = calcularTotal();
        window.location.href = `pago.html?total=${total}`;  // Redirige a la página de pago
    }
}

// Función para calcular el total del carrito
function calcularTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio; // Sumar precios de los productos
    });
    return total;
}
