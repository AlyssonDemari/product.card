const buttons = document.querySelectorAll('button');
function addItemToCart(item) {
    const cart = document.querySelector('.cart');
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <p>${item}</p>
    `;
    cart.appendChild(cartItem);
}

const yourCart = document.querySelector('h1#your-cart');

buttons.forEach(button => {
    button.innerHTML = `
        <div class="escolher">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </div>
    `;

    button.addEventListener('click', (event) => {

        if (!button.classList.contains('clicked')) {
            button.innerHTML = `
            <div class="escolher">
                <i class="fa-solid fa-minus media"></i>
                <p class="contador">0</p>
                <i class="fa-solid fa-plus media"></i>
            </div>
            `;
            button.classList.add('clicked');
        }
        const p = button.querySelector('.contador');
        let currentValue = Number(p.innerHTML); 

        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;

        if (x < button.clientWidth / 2) {
            if (currentValue > 0) {
                currentValue--;
            }
        } else {
            currentValue++;
        }

        p.innerHTML = currentValue;
        let totalItems = 0;
        document.querySelectorAll('.contador').forEach(contador => {
            totalItems += Number(contador.innerHTML);
        });
        yourCart.innerHTML = `Your Cart: ${totalItems}`;

        button.style.backgroundColor = 'var(--Red)';
    });
});

