// Inicializamos el carrito vacío
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto); // Añadir producto al carrito
    alert(`${producto.nombre} ha sido añadido al carrito.`); // Mensaje de confirmación
}

// Función para verificar si el carrito tiene productos y redirigir a Stripe
async function realizarPedido() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Añade productos antes de proceder al pago.');
    } else {
        // Calcular total
        let total = calcularTotal();
        
        // Redirigir a Stripe para el pago
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: carrito })
        });

        const session = await response.json();
        window.location.href = session.url; // Redirige a la URL de Stripe
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
