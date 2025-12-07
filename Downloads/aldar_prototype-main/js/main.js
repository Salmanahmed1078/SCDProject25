// Main JavaScript functionality

// Cart management
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const count = cartItems.length;
    
    cartCounts.forEach(cartCount => {
        if (count > 0) {
            cartCount.textContent = count;
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    });
}

function addToCart(productData) {
    cartItems.push(productData);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

// Make openCart globally accessible - redirects to cart page
window.openCart = function() {
    window.location.href = 'cart.html';
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count on page load
    updateCartCount();
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Category filter functionality (for products page)
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Placeholder for future filter functionality
        });
    });

    // Wishlist toggle (placeholder)
    const wishlistButtons = document.querySelectorAll('.product-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Placeholder for wishlist functionality
            console.log('Wishlist clicked');
        });
    });

    // Form submission handling (placeholder)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Placeholder for form submission
            alert('Thank you for your message! This is a prototype.');
        });
    }

    // Add to Bag functionality
    const addToBagButton = document.querySelector('.add-to-bag-button');
    if (addToBagButton) {
        addToBagButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get selected size
            const sizeSelect = document.getElementById('size-select');
            const selectedSize = sizeSelect ? sizeSelect.value : null;
            
            // Check if size is selected
            if (!selectedSize || selectedSize === '') {
                alert('Please select a size before adding to bag.');
                if (sizeSelect) {
                    sizeSelect.focus();
                    sizeSelect.style.borderColor = 'var(--accent-pink)';
                    setTimeout(() => {
                        sizeSelect.style.borderColor = '';
                    }, 2000);
                }
                return;
            }
            
            // Get product information
            const productName = document.querySelector('.product-detail-name')?.textContent || 'Product';
            const productPrice = document.querySelector('.product-detail-price')?.textContent || '';
            const productBrand = document.querySelector('.product-detail-brand')?.textContent || 'Al-Dar Apparel';
            
            // Get product image from current product data (loaded by products.js)
            let productImage = 'assets/images/men thobe.png'; // Default fallback
            let productDescription = 'Product description and details.';
            
            if (window.currentProduct) {
                productImage = window.currentProduct.image;
                productDescription = window.currentProduct.description || productDescription;
            } else {
                // Try to get image from page
                const productImageElement = document.querySelector('.product-detail-image');
                if (productImageElement && productImageElement.src) {
                    // Extract relative path from absolute URL if needed
                    const imgSrc = productImageElement.src;
                    const url = new URL(imgSrc, window.location.origin);
                    productImage = url.pathname;
                    // Remove leading slash if present
                    if (productImage.startsWith('/')) {
                        productImage = productImage.substring(1);
                    }
                }
            }
            
            // Show success message
            const buttonText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = 'var(--accent-pink-dark)';
            
            // Add to cart
            const productData = {
                name: productName,
                brand: productBrand,
                size: selectedSize,
                price: productPrice,
                image: productImage,
                description: productDescription,
                id: window.currentProduct ? window.currentProduct.id : Date.now(),
                quantity: 1000 // Default quantity
            };
            
            addToCart(productData);
            
            // Log to console (for development)
            console.log('Added to bag:', productData);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = buttonText;
                this.style.backgroundColor = '';
            }, 2000);
            
            // Update cart icon animation
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartIcon.style.transform = '';
                }, 300);
            }
        });
    }

    // Wishlist button on product detail page
    const wishlistButtonDetail = document.querySelector('.wishlist-button-detail');
    if (wishlistButtonDetail) {
        wishlistButtonDetail.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = this.textContent === '♡' ? '♥' : '♡';
            this.style.color = this.textContent === '♥' ? 'var(--accent-pink-dark)' : '';
            console.log('Wishlist toggled');
        });
    }
});

