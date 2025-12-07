// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartActions = document.getElementById('cart-actions');

    // Load cart items from localStorage
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartItemsList = document.getElementById('cart-items-list');
        const cartEmptyMessage = document.getElementById('cart-empty-message');
        const cartActions = document.getElementById('cart-actions');
        
        if (cartItems.length === 0) {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
            if (cartActions) cartActions.style.display = 'none';
            if (cartItemsList) cartItemsList.innerHTML = cartEmptyMessage.outerHTML;
            return;
        }

        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
        if (cartActions) cartActions.style.display = 'block';

        if (cartItemsList) {
            cartItemsList.innerHTML = '';
            cartItems.forEach((item, index) => {
                const cartItem = createCartItemElement(item, index);
                cartItemsList.appendChild(cartItem);
            });
        }
    }

    // Create cart item element with larger images and formatted text
    function createCartItemElement(item, index) {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.image || 'assets/images/men thobe.png'}" alt="${item.name || 'Product'}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name || 'Product Name'}</h3>
                <p class="cart-item-brand">${item.brand || 'Al-Dar'}</p>
                <p class="product-description">${item.description || 'Product description and details.'}</p>
                <div class="quantity-control">
                    <label for="quantity-${index}">Quantity (Min. 1000):</label>
                    <div class="quantity-input-group">
                        <button type="button" class="quantity-btn decrease" data-index="${index}">-</button>
                        <input type="number" id="quantity-${index}" class="quantity-input" 
                               min="1000" step="100" value="1000" data-index="${index}">
                        <button type="button" class="quantity-btn increase" data-index="${index}">+</button>
                    </div>
                    <p class="quantity-note">Minimum order: 1,000 pieces</p>
                </div>
                <button type="button" class="cart-item-remove" data-index="${index}">Remove</button>
            </div>
        `;

        // Add quantity control functionality
        const quantityInput = cartItemDiv.querySelector(`#quantity-${index}`);
        const decreaseBtn = cartItemDiv.querySelector('.decrease');
        const increaseBtn = cartItemDiv.querySelector('.increase');

        decreaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value) || 1000;
            if (value > 1000) {
                quantityInput.value = value - 100;
                updateCartItemQuantity(index, value - 100);
            }
        });

        increaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value) || 1000;
            quantityInput.value = value + 100;
            updateCartItemQuantity(index, value + 100);
        });

        quantityInput.addEventListener('change', (e) => {
            let value = parseInt(e.target.value) || 1000;
            if (value < 1000) {
                value = 1000;
                e.target.value = 1000;
                alert('Minimum order quantity is 1,000 pieces.');
            }
            updateCartItemQuantity(index, value);
        });

        // Add remove functionality
        const removeBtn = cartItemDiv.querySelector('.cart-item-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                removeCartItem(index);
            });
        }

        return cartItemDiv;
    }

    function updateCartItemQuantity(index, quantity) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems[index]) {
            cartItems[index].quantity = quantity;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }

    // Remove item from cart
    function removeCartItem(index) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
        updateCartCount();
    }

    // Update cart count in navbar
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(cartCount => {
            if (cartCount) {
                cartCount.textContent = cartItems.length;
                if (cartItems.length === 0) {
                    cartCount.style.display = 'none';
                } else {
                    cartCount.style.display = 'flex';
                }
            }
        });
    }

    // Initialize page
    loadCartItems();
    updateCartCount();
});

