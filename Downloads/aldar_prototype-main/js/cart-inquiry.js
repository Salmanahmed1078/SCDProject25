// Cart & Inquiry Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const quantityDecrease = document.getElementById('quantity-decrease');
    const quantityIncrease = document.getElementById('quantity-increase');
    const inquiryForm = document.getElementById('inquiry-form');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    // Quantity controls
    if (quantityDecrease) {
        quantityDecrease.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value) || 1000;
            if (currentValue > 1000) {
                quantityInput.value = Math.max(1000, currentValue - 100);
            }
        });
    }

    if (quantityIncrease) {
        quantityIncrease.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value) || 1000;
            quantityInput.value = currentValue + 100;
        });
    }

    // Ensure minimum quantity
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value) || 1000;
            if (value < 1000) {
                this.value = 1000;
                alert('Minimum order quantity is 1,000 pieces.');
            }
        });

        quantityInput.addEventListener('input', function() {
            let value = parseInt(this.value);
            if (value && value < 1000) {
                this.setCustomValidity('Minimum order quantity is 1,000 pieces.');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Load cart items from localStorage
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (cartItems.length === 0) {
            if (cartEmptyMessage) {
                cartEmptyMessage.style.display = 'block';
            }
            return;
        }

        if (cartEmptyMessage) {
            cartEmptyMessage.style.display = 'none';
        }

        if (cartItemsList) {
            cartItemsList.innerHTML = '';
            cartItems.forEach((item, index) => {
                const cartItem = createCartItemElement(item, index);
                cartItemsList.appendChild(cartItem);
            });
        }
    }

    // Create cart item element
    function createCartItemElement(item, index) {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.image || 'assets/images/men thobe.png'}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name || 'Product Name'}</div>
                <button type="button" class="cart-item-remove" data-index="${index}">Remove</button>
            </div>
        `;

        // Add remove functionality
        const removeBtn = cartItemDiv.querySelector('.cart-item-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                removeCartItem(index);
            });
        }

        return cartItemDiv;
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
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartItems.length;
            if (cartItems.length === 0) {
                cartCount.style.display = 'none';
            } else {
                cartCount.style.display = 'flex';
            }
        }
    }

    // Handle form submission
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            if (cartItems.length === 0) {
                alert('Please add at least one design to your cart before sending an inquiry.');
                return;
            }

            const quantity = parseInt(quantityInput.value) || 1000;
            
            if (quantity < 1000) {
                alert('Minimum order quantity is 1,000 pieces.');
                return;
            }

            // Collect form data
            const formData = {
                companyName: document.getElementById('company-name').value,
                contactPerson: document.getElementById('contact-person').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                country: document.getElementById('country').value,
                additionalNotes: document.getElementById('additional-notes').value,
                quantity: quantity,
                cartItems: cartItems,
                timestamp: new Date().toISOString()
            };

            // Here you would typically send this data to a server
            console.log('Inquiry Form Data:', formData);

            // Show success message
            alert('Thank you for your inquiry! We will contact you shortly with more information.');

            // Optionally clear the cart after successful submission
            // localStorage.removeItem('cartItems');
            // loadCartItems();
            // updateCartCount();
        });
    }

    // Initialize page
    loadCartItems();
    updateCartCount();
});

