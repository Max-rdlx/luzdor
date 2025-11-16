document.addEventListener('DOMContentLoaded', () => {
    // Elementos del carrito
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Mostrar/Ocultar carrito (si existen elementos)
    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener('click', () => cartSidebar.classList.add('active'));
    }
    if (closeCart && cartSidebar) {
        closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));
    }

    // Agregar productos al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            const productName = button.dataset.name;
            const productPrice = parseFloat(button.dataset.price) || 0;

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            showAddedToCartMessage(productName);
        });
    });

    // Actualizar visualización del carrito
    function updateCartDisplay() {
        if (!cartItems) return;
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="qty">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">&times;</button>
            `;

            cartItems.appendChild(itemElement);

            // listeners
            const minusBtn = itemElement.querySelector('.minus');
            const plusBtn = itemElement.querySelector('.plus');
            const removeBtn = itemElement.querySelector('.cart-item-remove');

            if (minusBtn) minusBtn.addEventListener('click', () => updateQuantity(item.id, -1));
            if (plusBtn) plusBtn.addEventListener('click', () => updateQuantity(item.id, 1));
            if (removeBtn) removeBtn.addEventListener('click', () => removeFromCart(item.id));
        });

        if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    function updateQuantity(productId, change) {
        const idx = cart.findIndex(i => i.id === productId);
        if (idx === -1) return;
        cart[idx].quantity += change;
        if (cart[idx].quantity <= 0) cart.splice(idx, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // Mensaje de producto agregado
    function showAddedToCartMessage(productName) {
        const message = document.createElement('div');
        message.classList.add('added-to-cart-message');
        message.textContent = `¡${productName} agregado al carrito!`;
        Object.assign(message.style, { position: 'fixed', right: '1rem', bottom: '1rem', background: 'var(--accent-blue)', color: '#fff', padding: '0.6rem 1rem', borderRadius: '6px', zIndex: 2000 });
        document.body.appendChild(message);

        setTimeout(() => message.remove(), 1800);
    }

    // Checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) { alert('Tu carrito está vacío'); return; }
            alert('¡Gracias por tu compra!');
            cart = [];
            localStorage.removeItem('cart');
            updateCartDisplay();
            if (cartSidebar) cartSidebar.classList.remove('active');
        });
    }

    // Inicializar visualización
    updateCartDisplay();

    // Galería de miniaturas (si existen)
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('mainImage');
    if (thumbs && mainImage) {
        thumbs.forEach(btn => {
            btn.addEventListener('click', () => {
                const src = btn.dataset.src || (btn.querySelector('img') && btn.querySelector('img').src);
                if (src) mainImage.src = src;
            });
        });
    }
});
const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const products = document.querySelectorAll('.product-card');

        function searchProducts() {
            const term = searchInput.value.toLowerCase();
            products.forEach(product => {
                const name = product.getAttribute('data-name').toLowerCase();
                product.style.display = name.includes(term) ? 'block' : 'none';
            });
        }

        searchBtn.addEventListener('click', searchProducts);
        searchInput.addEventListener('input', searchProducts);