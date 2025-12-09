// Product Data Configuration
const PRODUCTS = {
    men: {
        'man1': {
            id: 'man1',
            name: 'Men Thobe 1',
            brand: 'Al-Dar Apparel',
            price: 'AED 1,805',
            image: 'assets/images/man1.jpg',
            backImage: 'assets/images/man_back_image1.jpg',
            category: 'men',
            description: 'Premium quality thobe crafted with meticulous attention to detail. Traditional design meets modern comfort.'
        },
        'man2': {
            id: 'man2',
            name: 'Men Thobe 2',
            brand: 'Al-Dar Apparel',
            price: 'AED 1,805',
            image: 'assets/images/man2.jpg',
            backImage: 'assets/images/man_back_image2.jpg',
            category: 'men',
            description: 'Premium quality thobe crafted with meticulous attention to detail. Traditional design meets modern comfort.'
        },
        'man3': {
            id: 'man3',
            name: 'Men Thobe 3',
            brand: 'Al-Dar Apparel',
            price: 'AED 1,805',
            image: 'assets/images/man3.jpg',
            backImage: 'assets/images/man_back_image3.jpg',
            category: 'men',
            description: 'Premium quality thobe crafted with meticulous attention to detail. Traditional design meets modern comfort.'
        },
        'man4': {
            id: 'man4',
            name: 'Men Thobe 4',
            brand: 'Al-Dar Apparel',
            price: 'AED 1,805',
            image: 'assets/images/man4.jpg',
            backImage: 'assets/images/man_back_image4.jpg',
            category: 'men',
            description: 'Premium quality thobe crafted with meticulous attention to detail. Traditional design meets modern comfort.'
        },
        'man5': {
            id: 'man5',
            name: 'Men Thobe 5',
            brand: 'Al-Dar Apparel',
            price: 'AED 1,805',
            image: 'assets/images/man5.jpg',
            backImage: 'assets/images/man_back_image5.jpg',
            category: 'men',
            description: 'Premium quality thobe crafted with meticulous attention to detail. Traditional design meets modern comfort.'
        },
        'man6': {
            id: 'man6',
            name: 'Men Thobe 6',
            brand: 'Al-Dar Apparel',
            price: 'AED 1,805',
            image: 'assets/images/man6.jpg',
            backImage: 'assets/images/man_back_image6.jpg',
            category: 'men',
            description: 'Premium quality thobe crafted with meticulous attention to detail. Traditional design meets modern comfort.'
        },
        'man7': {
            id: 'man7',
            name: 'Men Thobe 7',
            brand: 'Al-Dar Apparel',
            price: 'AED 1,805',
            image: 'assets/images/man7.jpg',
            backImage: 'assets/images/man_back_image7.jpg',
            category: 'men',
            description: 'Premium quality thobe crafted with meticulous attention to detail. Traditional design meets modern comfort.'
        }
    },
    women: {
        'women1': {
            id: 'women1',
            name: 'Women Thobe',
            brand: 'Al-Dar Apparel',
            price: 'AED 1,805',
            image: 'assets/images/Women Thobe.png',
            backImage: 'assets/images/Women thobe 2.png',
            category: 'women',
            description: 'Elegant abaya crafted with premium materials. Traditional design with modern elegance.'
        }
    }
};

// Get URL parameters
function getURLParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
        productId: params.get('id'),
        category: params.get('category') || 'men'
    };
}

// Get product data by ID and category
function getProductData(productId, category = 'men') {
    if (PRODUCTS[category] && PRODUCTS[category][productId]) {
        return PRODUCTS[category][productId];
    }
    return null;
}

// Load product details on product detail page
function loadProductDetails() {
    console.log('=== loadProductDetails START ===');
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const category = urlParams.get('category') || 'men';
    
    console.log('URL Product ID:', productId);
    console.log('URL Category:', category);
    console.log('Full URL:', window.location.href);
    
    // If no product ID, show default or return
    if (!productId) {
        console.warn('No product ID in URL');
        return null;
    }
    
    // Get product data
    const product = getProductData(productId, category);
    
    if (!product) {
        console.error('Product not found:', productId, 'in category:', category);
        console.log('Available products:', Object.keys(PRODUCTS[category] || {}));
        return null;
    }
    
    console.log('Product found:', product);
    console.log('Front image:', product.image);
    console.log('Back image:', product.backImage);
    
    // Get image elements
    const frontImg = document.getElementById('product-front-image');
    const backImg = document.getElementById('product-back-image');
    
    console.log('Front image element found:', !!frontImg);
    console.log('Back image element found:', !!backImg);
    
    if (!frontImg || !backImg) {
        console.error('Image elements not found in DOM!');
        console.log('Front img:', frontImg);
        console.log('Back img:', backImg);
        return null;
    }
    
    // Update front image - clear first, then set new
    console.log('Updating front image from:', frontImg.src, 'to:', product.image);
    
    // Remove old src completely
    frontImg.removeAttribute('src');
    frontImg.src = '';
    
    // Update attributes
    frontImg.alt = product.name + ' - Front View';
    frontImg.style.display = 'block';
    frontImg.style.visibility = 'visible';
    frontImg.style.opacity = '0';
    
    // Hide placeholder
    const frontPlaceholder = frontImg.parentElement.querySelector('.placeholder-content');
    if (frontPlaceholder) {
        frontPlaceholder.style.display = 'none';
    }
    
    // Create new image to force reload
    const newFrontImg = new Image();
    newFrontImg.onload = function() {
        console.log('Front image loaded successfully');
        frontImg.src = this.src;
        frontImg.style.opacity = '1';
        if (frontPlaceholder) {
            frontPlaceholder.style.display = 'none';
        }
    };
    newFrontImg.onerror = function() {
        console.error('Failed to load front image:', product.image);
        frontImg.style.opacity = '1';
        if (frontPlaceholder) {
            frontPlaceholder.style.display = 'block';
        }
    };
    newFrontImg.src = product.image;
    
    // Update back image - clear first, then set new
    console.log('Updating back image from:', backImg.src, 'to:', product.backImage);
    
    // Remove old src completely
    backImg.removeAttribute('src');
    backImg.src = '';
    
    // Update attributes
    backImg.alt = product.name + ' - Back View';
    backImg.style.display = 'block';
    backImg.style.visibility = 'visible';
    backImg.style.opacity = '0';
    
    // Hide placeholder
    const backPlaceholder = backImg.parentElement.querySelector('.placeholder-content');
    if (backPlaceholder) {
        backPlaceholder.style.display = 'none';
    }
    
    // Create new image to force reload
    const newBackImg = new Image();
    newBackImg.onload = function() {
        console.log('Back image loaded successfully');
        backImg.src = this.src;
        backImg.style.opacity = '1';
        if (backPlaceholder) {
            backPlaceholder.style.display = 'none';
        }
    };
    newBackImg.onerror = function() {
        console.error('Failed to load back image:', product.backImage);
        backImg.style.opacity = '1';
        if (backPlaceholder) {
            backPlaceholder.style.display = 'block';
        }
    };
    newBackImg.src = product.backImage;
    
    // Update product information
    const productName = document.querySelector('.product-detail-name');
    if (productName) {
        productName.textContent = product.name;
        console.log('Updated product name:', product.name);
    }
    
    const productBrand = document.querySelector('.product-detail-brand');
    if (productBrand) {
        productBrand.textContent = product.brand;
        console.log('Updated product brand:', product.brand);
    }
    
    const productPrice = document.querySelector('.product-detail-price');
    if (productPrice) {
        productPrice.textContent = product.price;
        console.log('Updated product price:', product.price);
    }
    
    // Update product description
    const detailsContent = document.querySelector('.details-content p:last-child');
    if (detailsContent) {
        detailsContent.textContent = product.description;
    }
    
    // Store product data for cart
    window.currentProduct = product;
    
    console.log('=== loadProductDetails COMPLETE ===');
    return product;
}

// Initialize when page loads
(function() {
    console.log('=== Products.js script loaded ===');
    console.log('Current URL:', window.location.href);
    console.log('Document ready state:', document.readyState);
    
    let hasLoaded = false;
    
    function initialize() {
        if (hasLoaded) {
            console.log('Already initialized, but reloading anyway...');
        }
        
        console.log('Initializing product detail page...');
        
        // Check if we're on a product detail page
        const productSection = document.querySelector('.product-detail-section');
        if (!productSection) {
            console.log('Not on product detail page - skipping');
            return;
        }
        
        console.log('Product detail section found');
        
        // Function to try loading product details
        function tryLoadProduct() {
            const frontImg = document.getElementById('product-front-image');
            const backImg = document.getElementById('product-back-image');
            
            console.log('Checking for image elements...');
            console.log('Front image element:', frontImg);
            console.log('Back image element:', backImg);
            
            if (frontImg && backImg) {
                console.log('✓ Image elements found! Loading product details...');
                hasLoaded = true;
                loadProductDetails();
            } else {
                console.log('✗ Image elements not found yet, retrying...');
                // Retry up to 20 times (2 seconds total)
                if (tryLoadProduct.retries === undefined) {
                    tryLoadProduct.retries = 0;
                }
                tryLoadProduct.retries++;
                if (tryLoadProduct.retries < 20) {
                    setTimeout(tryLoadProduct, 100);
                } else {
                    console.error('Failed to find image elements after 20 attempts');
                }
            }
        }
        
        // Start trying to load
        tryLoadProduct();
    }
    
    // Run immediately if DOM is ready
    if (document.readyState === 'loading') {
        console.log('DOM is loading, waiting for DOMContentLoaded...');
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOMContentLoaded fired');
            initialize();
        });
    } else {
        console.log('DOM already ready, initializing immediately');
        initialize();
    }
    
    // Also run on window load as backup
    window.addEventListener('load', function() {
        console.log('Window load event fired - forcing reload');
        const productSection = document.querySelector('.product-detail-section');
        if (productSection) {
            console.log('Reloading product details on window load');
            loadProductDetails();
        }
    });
    
    // Handle page visibility change (for browser back/forward)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            console.log('Page became visible, reloading product details');
            const productSection = document.querySelector('.product-detail-section');
            if (productSection) {
                loadProductDetails();
            }
        }
    });
    
    // Handle pageshow event (for browser back/forward cache)
    window.addEventListener('pageshow', function(event) {
        console.log('Pageshow event fired, persisted:', event.persisted);
        if (event.persisted) {
            console.log('Page loaded from cache, reloading product details');
            const productSection = document.querySelector('.product-detail-section');
            if (productSection) {
                setTimeout(function() {
                    loadProductDetails();
                }, 100);
            }
        }
    });
    
    // Make functions available globally for debugging
    window.loadProductDetails = loadProductDetails;
    window.getURLParameters = getURLParameters;
    window.PRODUCTS = PRODUCTS;
    
    console.log('Products.js initialized. Debug commands:');
    console.log('  - window.loadProductDetails()');
    console.log('  - window.getURLParameters()');
    console.log('  - window.PRODUCTS');
    console.log('=== Products.js initialization complete ===');
})();

