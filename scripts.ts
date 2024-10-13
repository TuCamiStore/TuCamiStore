const cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        const productElement = e.target.closest(".producto");
        const productName = productElement.querySelector("h3").textContent;
        const productPrice = parseFloat(productElement.querySelector("p").textContent.replace('Precio: $', ''));

        cart.push({ name: productName, price: productPrice });
        updateCart();
    });
});

function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("p");
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
    } else {
        alert("Gracias por tu compra.");
        cart.length = 0;
        updateCart();
    }
});
