/*! Função que cria os cards de itens */
const images = [ 
    {'category' : 'Waffle', 'name' : 'Waffle with Berries', 'price' : 6.50, 'image' : 'assets/images/image-waffle-desktop.jpg'},
    {'category' : 'Crème Brûlée', 'name' : 'Vanilla Bean Crème Brûlée', 'price' : 7.00, 'image' : 'assets/images/image-creme-brulee-desktop.jpg'},
    {'category' : 'Macaron', 'name' : 'Macaron Mix of Five', 'price' : 8.00, 'image' : 'assets/images/image-macaron-desktop.jpg'},
    {'category' : 'Tiramisu', 'name' : 'Classic Tiramisu', 'price' : 5.50, 'image' : 'assets/images/image-tiramisu-desktop.jpg'},
    {'category' : 'Baklava', 'name' : 'Pistachio Baklava', 'price' : 4.00, 'image' : 'assets/images/image-baklava-desktop.jpg'},
    {'category' : 'Pie', 'name' : 'Lemon Meringue Pie', 'price' : 5.00, 'image' : 'assets/images/image-meringue-desktop.jpg'},
    {'category' : 'Cake', 'name' : 'Red Velvet Cake', 'price' : 4.50, 'image' : 'assets/images/image-cake-desktop.jpg'},
    {'category' : 'Brownie', 'name' : 'Salted Caramel Brownie', 'price' : 4.50, 'image' : 'assets/images/image-brownie-desktop.jpg'},
    {'category' : 'Panna Cotta', 'name' : 'Vanilla Panna Cotta', 'price' : 6.50, 'image' : 'assets/images/image-panna-cotta-desktop.jpg'},
]

const loadImages = (images, container) => { 
        images.forEach(image => {
            container.innerHTML += `
            <div class="card">
                <div class="img-card">
                <img src="${image.image}" alt="${image.name}">
                <button class="addCart"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
                </div>
                <div class="txt-card">
                    <p>${image.category}</p>
                    <h2>${image.name}</h2>
                    <span class="product-price">$${image.price.toFixed(2)}</span>
                </div>
            </div>
            `;
        });
    };
loadImages(images, document.querySelector('.container-card')); 
/*Fim função que cria os cards de itens*/ 


const addToCartButtons = document.querySelectorAll('.addCart');
const addedItemsContainer = document.querySelector('.itens-adicionados');
const imgCake = document.querySelector('.cake');
const valorTotal = document.querySelector('.valor-total');
const yourCart = document.getElementById('your-cart');
const copyCart = document.querySelector('.copy-cart');

if (!imgCake || !valorTotal || !yourCart || !copyCart) {
    console.error('One or more elements are missing in the DOM.');
}


let totalValue = 0;
let cartItems = [];
let contadorItens = 0;

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const item = images[index];


        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
        
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity++;
        } else {
            cartItems.push({ ...item, quantity: 1 });
        }

        updateCartDisplay();
        updateTotal();
    });
});

//! Função para atualizar o carrinho na interface
const updateCartDisplay = () => {
    addedItemsContainer.innerHTML = ''; 
    // Atualizando o contador com o total de itens no carrinho (não o número de diferentes produtos, mas o número total de unidades)
    contadorItens = cartItems.reduce((total, item) => total + item.quantity, 0);
    yourCart.innerHTML = `Your Cart (${contadorItens})`;
    
    cartItems.forEach(item => {
        addedItemsContainer.innerHTML += `
        <div class="item">
          <img src="${item.image}" alt="${item.name}">
          <div class="txt-item">
            <h2>${item.name}</h2>
            <p class="quant-item">Quantidade: ${item.quantity}</p>
          </div>
          <i class="fa-solid fa-trash remove" data-item="${item.name}"></i>
        </div>
        `;
    });

    // Adicionar eventos de remoção para os itens
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-item');
            removeItemFromCart(itemName);
        });
    });
};
//! Fim função para atualizar o carrinho na interface

//! Função para remover item do carrinho
const removeItemFromCart = (itemName) => {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        const item = cartItems[itemIndex];
        if (item.quantity > 1) {
            cartItems[itemIndex].quantity--;
        } else {
            cartItems.splice(itemIndex, 1);
        }
        updateCartDisplay();
        updateTotal();
    }
};
//! Fim função para remover item do carrinho


//! Função para atualizar o total do carrinho
const updateTotal = () => {
    totalValue = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    valorTotal.textContent = `Total: $${totalValue.toFixed(2)}`;
    valorTotal.style.display = cartItems.length > 0 ? "block" : "none";
    imgCake.style.display = cartItems.length > 0 ? "none" : "block";
    imgCake.style.textAlign = "center";
    copyCart.style.display = 'block'
};

const copyCartItems = () => {
    // Calcula o total do carrinho
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    // Cria uma string formatada com os itens do carrinho
    const cartText = cartItems.map(item => {
        return `${item.name} - Quantidade: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    }).join('\n');
    
    // Adiciona o total ao final da string
    const totalText = `Total: $${total.toFixed(2)}`;
    
    // Se o carrinho não estiver vazio
    if (cartText) {
        navigator.clipboard.writeText(`${cartText}\n${totalText}`).then(() => {
            alert("Itens do carrinho copiados para a área de transferência!");
        }).catch(err => {
            console.error("Erro ao copiar: ", err);
        });
    } else {
        alert("Seu carrinho está vazio!");
    }
};

// Adiciona o evento de clique no botão "Copy Cart"
copyCart.addEventListener('click', copyCartItems);
