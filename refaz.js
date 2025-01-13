const items = document.querySelectorAll('.item');
const cartItems = document.getElementById('cart-items');
const total = document.getElementById('total');
const clearCartButton = document.getElementById('clear-cart');
let cart = [];
let cartTotal = 0;

items.forEach(item => {
    item.addEventListener('click', () => {
        const price = parseInt(item.getAttribute('data-price'));
        cart.push(price);
        updateCart();
    });
});

clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});

function updateCart() {
    cartItems.innerHTML = '';
    cartTotal = 0;
    cart.forEach((price, index) => {
        if (index < 10) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `Item ${index + 1} - $${price} <button onclick="removeItem(${index})">Remove</button>`;
            cartItems.appendChild(cartItem);
        }
        cartTotal += price;
    });

    if (cart.length > 10) {
        const showMore = document.createElement('div');
        showMore.classList.add('show-more');
        showMore.innerText = 'Show more';
        showMore.addEventListener('click', () => {
            cartItems.innerHTML = '';
            cart.forEach((price, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `Item ${index + 1} - $${price} <button onclick="removeItem(${index})">Remove</button>`;
                cartItems.appendChild(cartItem);
            });
        });
        cartItems.appendChild(showMore);
    }

    total.innerText = `Total: $${cartTotal}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}