// Enhanced Flipkart Clone JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            title: "Realme Narzo 50i (Mint Green, 32 GB)",
            image: "https://rukminim1.flixcart.com/image/312/312/ktketu80/mobile/s/l/c/narzo-50i-rmx3231-realme-original-imag6yp6fzqhyqfr.jpeg",
            price: "₹7,499",
            originalPrice: "₹8,999",
            discount: "16% off",
            offer: "Bank Offer",
            rating: 4.2,
            reviews: 1245,
            inStock: true
        },
        {
            id: 2,
            title: "boAt Rockerz 255 Pro+ Bluetooth Headset",
            image: "https://rukminim1.flixcart.com/image/312/312/kq18n0w0/headphone/j/z/q/rockerz-255-pro-boat-original-imag4q9mhzvxghzh.jpeg",
            price: "₹1,299",
            originalPrice: "₹2,990",
            discount: "56% off",
            offer: "Special Price",
            rating: 4.0,
            reviews: 5621,
            inStock: true
        },
        // Add more products as needed
    ];

    // DOM Elements
    const dealsContainer = document.querySelector('.deals-container');
    const offersContainer = document.querySelector('.offers-container');
    const loginBtn = document.querySelector('.login-btn');
    const modal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-container button');
    const cartBtn = document.querySelector('.cart');
    const viewAllDealsBtn = document.querySelector('.deals-section .view-all');
    const viewAllOffersBtn = document.querySelector('.offers-section .view-all');

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    updateCartCount();

    // Render products
    function renderProducts(products, container) {
        container.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="product-title">${product.title}</div>
                <div class="product-price">${product.price} <span class="original-price">${product.originalPrice}</span></div>
                <div class="product-discount">${product.discount}</div>
                <div class="product-offer">${product.offer}</div>
                <div class="product-rating">${generateStarRating(product.rating)} (${product.reviews})</div>
                <button class="add-to-cart">ADD TO CART</button>
            `;
            container.appendChild(productCard);
        });

        // Add event listeners to all "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.closest('.product-card').dataset.id);
                addToCart(productId);
            });
        });
    }

    // Generate star rating HTML
    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
        if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < emptyStars; i++) stars += '<i class="far fa-star"></i>';
        
        return stars;
    }

    // Add to cart function
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        cartCount += 1;
        updateCartCount();
        saveCartToLocalStorage();
        showAddedToCartNotification(product.title);
    }

    // Update cart count display
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart span');
        if (cartCountElement) {
            cartCountElement.textContent = `Cart ${cartCount > 0 ? `(${cartCount})` : ''}`;
        }
    }

    // Save cart to localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Show notification when item is added to cart
    function showAddedToCartNotification(productTitle) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productTitle} added to cart</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // In a real app, this would call an API or filter products
            alert(`Searching for: ${searchTerm}`);
            // You would implement actual search functionality here
        }
    }

    // Modal functionality
    loginBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // View All buttons
    viewAllDealsBtn.addEventListener('click', () => {
        alert('View all deals clicked!');
        // In a real app, this would navigate to a deals page
    });

    viewAllOffersBtn.addEventListener('click', () => {
        alert('View all offers clicked!');
        // In a real app, this would navigate to an offers page
    });

    // Cart button click
    cartBtn.addEventListener('click', () => {
        if (cartCount > 0) {
            alert(`You have ${cartCount} items in your cart!`);
            // In a real app, this would show a cart modal or navigate to cart page
        } else {
            alert('Your cart is empty!');
        }
    });

    // Initialize the page
    renderProducts(products.slice(0, 6), dealsContainer); // Show first 6 products in deals
    renderProducts(products.slice(2, 8), offersContainer); // Show different products in offers

    // Add CSS for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 10px;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
        }
        .notification.show {
            opacity: 1;
        }
        .notification i {
            font-size: 20px;
        }
        .original-price {
            text-decoration: line-through;
            color: #878787;
            font-size: 14px;
            margin-left: 5px;
        }
        .product-rating {
            color: #2874f0;
            font-size: 12px;
            margin: 5px 0;
        }
        .add-to-cart {
            background-color: #ff9f00;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 2px;
            cursor: pointer;
            font-weight: 500;
            width: 100%;
            margin-top: 5px;
        }
        .add-to-cart:hover {
            background-color: #ff8400;
        }
    `;
    document.head.appendChild(style);
});