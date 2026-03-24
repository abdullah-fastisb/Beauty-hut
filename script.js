// script.js

// --- BOOKING SYSTEM ---
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather data
        const newBooking = {
            id: Date.now(),
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };

        // Get existing bookings from local storage or create empty array
        let bookings = JSON.parse(localStorage.getItem('beautyHutBookings')) || [];
        bookings.push(newBooking);
        
        // Save back to local storage
        localStorage.setItem('beautyHutBookings', JSON.stringify(bookings));
        
        alert('Thank you! Your appointment request has been saved locally.');
        bookingForm.reset();
    });
}

// --- CART SYSTEM ---
let cart = JSON.parse(localStorage.getItem('beautyHutCart')) || [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    localStorage.setItem('beautyHutCart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDisplay = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartDisplay && cartTotal) {
        cartDisplay.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            cartDisplay.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                cartDisplay.innerHTML += `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                        <span>${item.name}</span>
                        <span>$${item.price} 
                            <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer; margin-left:10px;">X</button>
                        </span>
                    </div>
                `;
            });
        }
        cartTotal.innerText = total.toFixed(2);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('beautyHutCart', JSON.stringify(cart));
    updateCartDisplay();
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});