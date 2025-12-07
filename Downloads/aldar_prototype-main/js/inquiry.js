// Inquiry Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const quantityDecrease = document.getElementById('quantity-decrease');
    const quantityIncrease = document.getElementById('quantity-increase');
    const inquiryForm = document.getElementById('inquiry-form');
    const inquiryDesignsList = document.getElementById('inquiry-designs-list');

    // Load cart items to show in inquiry page
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (cartItems.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        if (inquiryDesignsList) {
            inquiryDesignsList.innerHTML = '';
            cartItems.forEach((item) => {
                const designItem = createDesignItemElement(item);
                inquiryDesignsList.appendChild(designItem);
            });
        }
    }

    // Create design item element for inquiry page
    function createDesignItemElement(item) {
        const designItemDiv = document.createElement('div');
        designItemDiv.className = 'inquiry-design-item';
        designItemDiv.innerHTML = `
            <img src="${item.image || 'assets/images/men thobe.png'}" alt="${item.name || 'Product'}" class="inquiry-design-item-image">
            <div class="inquiry-design-item-details">
                <div class="inquiry-design-item-name">${item.name || 'Product Name'}</div>
                ${item.brand ? `<div class="cart-item-brand">${item.brand}</div>` : ''}
            </div>
        `;
        return designItemDiv;
    }

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

    // Handle form submission
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            if (cartItems.length === 0) {
                alert('Please add at least one design to your cart before sending an inquiry.');
                window.location.href = 'cart.html';
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
            // window.location.href = 'index.html';
        });
    }

    // Initialize page
    loadCartItems();
});

