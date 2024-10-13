// Inicializa Stripe con tu clave pública
const stripe = Stripe('pk_test_51Q9TmvIB4Dgcp5kshdSl1jQYWx1MrBob8qMToLoiht13mUCzC87xUPAASDo24F8GYE5E0wfosQjYlJWLhM7smEfs00lli5eE4c'); // Reemplaza con tu clave pública de Stripe

// Selecciona los elementos del DOM
const buyButtons = document.querySelectorAll('.buy-button');
const paymentForm = document.getElementById('payment-form');
const paymentAmount = document.getElementById('payment-amount');
const paymentResult = document.getElementById('payment-result');

// Crea un elemento de tarjeta de Stripe
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element'); // Asegúrate de tener un div con id="card-element"

// Agrega el evento de click a cada botón de compra
buyButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const amount = button.getAttribute('data-amount');
        paymentAmount.value = amount;
        paymentForm.style.display = 'block'; // Muestra el formulario de pago
    });
});

// Prevenir el comportamiento predeterminado del formulario
paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Crea el PaymentIntent
    const response = await fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: paymentAmount.value }),
    });

    const { clientSecret } = await response.json();

    // Usa el client_secret para confirmar el pago con el método de pago de la tarjeta
    const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
            billing_details: {
                // Puedes agregar detalles de facturación aquí si es necesario
                name: 'Nombre del Cliente', // Reemplaza con el nombre real
            },
        },
    });

    if (error) {
        paymentResult.innerText = error.message; // Muestra el error en el resultado
    } else {
        paymentResult.innerText = 'Pago realizado con éxito!'; // Mensaje de éxito
    }
});
