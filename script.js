// script.js

// --- MOBILE HAMBURGER MENU ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// --- PREMIUM SCROLL ANIMATIONS ---
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});

// --- DYNAMIC WHATSAPP BOOKING SYSTEM ---
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const branchSelect = document.getElementById('branch');
        const selectedBranchNumber = branchSelect.value;
        const selectedBranchName = branchSelect.options[branchSelect.selectedIndex].text;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const message = `*New Appointment Request*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Branch Selected:* ${selectedBranchName}%0A*Service:* ${service}%0A*Date:* ${date}%0A*Time:* ${time}%0A%0AHello Beauty Hut! I would like to confirm this booking.`;

        window.open(`https://wa.me/${selectedBranchNumber}?text=${message}`, '_blank');
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
            cartDisplay.innerHTML = '<p style="color: #777;">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                cartDisplay.innerHTML += `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                        <span>${item.name}</span>
                        <span>Rs ${item.price} 
                            <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer; margin-left:15px; font-weight:bold; font-size: 1.1rem;">X</button>
                        </span>
                    </div>
                `;
            });
        }
        cartTotal.innerText = total.toFixed(2);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});