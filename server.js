const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Q9TmvIB4Dgcp5ksErqklLAZHqghJSNKno37Xjn85k8DGk4t5NzflJM98RhApa8xhEuDKUUiQK9KHaFLXstQY7Mi0048cs6Qml'); // Reemplaza con tu clave secreta de Stripe
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Para servir archivos estáticos (HTML, CSS, JS)

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para crear un pago
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body; // Obtén el monto del pedido

        // Crea un PaymentIntent con el monto y la moneda
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd', // Cambia a la moneda que necesites
        });

        res.send({
            clientSecret: paymentIntent.client_secret, // Devuelve el client_secret al frontend
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Inicia el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
