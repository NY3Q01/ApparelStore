function renderCart() {
	const cart = getCart();
	const cartSection = document.querySelector('.cart-section');
	if (!cartSection) return;
	const items = Object.values(cart);
	cartSection.innerHTML = `<h1>Your Cart</h1>`;
	if (items.length === 0) {
		cartSection.innerHTML += `
			<div class="cart-empty">
				<p>Your cart is currently empty. Start shopping to add motivational gear to your collection!</p>
				<img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" class="cart-img">
			</div>
			<div class="cart-actions">
				<a href="shop.html" class="cart-shop-btn">Go to Shop</a>
			</div>
		`;
		return;
	}
	let subtotal = 0;
	cartSection.innerHTML += `<div class="cart-items"></div>`;
	const cartItemsDiv = cartSection.querySelector('.cart-items');
	items.forEach(item => {
		subtotal += item.price * item.qty;
		cartItemsDiv.innerHTML += `
			<div class="cart-item">
				<img src="${item.img}" alt="${item.name}" class="cart-item-img">
				<div class="cart-item-info">
					<div class="cart-item-name">${item.name}</div>
					<div class="cart-item-price">$${item.price.toFixed(2)}</div>
					<div class="cart-item-qty">
						<button onclick="updateQty('${item.id}', ${item.qty - 1})">-</button>
						<span>${item.qty}</span>
						<button onclick="updateQty('${item.id}', ${item.qty + 1})">+</button>
					</div>
					<button class="cart-remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
				</div>
			</div>
		`;
	});
	const tax = subtotal * 0.07;
	const shipping = subtotal > 0 ? 6.99 : 0;
	const total = subtotal + tax + shipping;
	cartSection.innerHTML += `
		<div class="cart-summary">
			<div>Subtotal: <span>$${subtotal.toFixed(2)}</span></div>
			<div>Tax (7%): <span>$${tax.toFixed(2)}</span></div>
			<div>Shipping & Handling: <span>$${shipping.toFixed(2)}</span></div>
			<div class="cart-total">Total: <span>$${total.toFixed(2)}</span></div>
		</div>
	`;
}
// Cart functionality for Motiv8 Apparel
// Cart functionality for Motiv8 Apparel
function getCart() {
	const cart = localStorage.getItem('motiv8_cart');
	return cart ? JSON.parse(cart) : {};
}

function saveCart(cart) {
	localStorage.setItem('motiv8_cart', JSON.stringify(cart));
}

function addToCart(itemId) {
	const cart = getCart();
	if (cart[itemId]) {
		cart[itemId].qty += 1;
	} else {
		const item = SHOP_ITEMS.find(i => i.id === itemId);
		cart[itemId] = { ...item, qty: 1 };
	}
	saveCart(cart);
	alert('Added to cart!');
}

function removeFromCart(itemId) {
	const cart = getCart();
	delete cart[itemId];
	saveCart(cart);
	renderCart();
}

const SHOP_ITEMS = [
	{
		id: 'tee',
		name: '"No Excuses" Tee',
		price: 24.99,
		img: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'hoodie',
		name: '"Stronger Every Day" Hoodie',
		price: 39.99,
		img: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'tank',
		name: '"Beast Mode" Tank',
		price: 19.99,
		img: 'https://images.pexels.com/photos/4666752/pexels-photo-4666752.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'leggings',
		name: 'Motiv8 Flex Leggings',
		price: 29.99,
		img: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'shorts',
		name: 'Sprint Training Shorts',
		price: 21.99,
		img: 'https://images.pexels.com/photos/3757374/pexels-photo-3757374.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'sportsbra',
		name: 'Empower Sports Bra',
		price: 18.99,
		img: 'https://images.pexels.com/photos/1552243/pexels-photo-1552243.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'joggers',
		name: 'Performance Joggers',
		price: 34.99,
		img: 'https://images.pexels.com/photos/532221/pexels-photo-532221.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'ziphoodie',
		name: 'Zip-Up Hoodie',
		price: 42.99,
		img: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'cap',
		name: 'Motiv8 Cap',
		price: 14.99,
		img: 'https://images.pexels.com/photos/404168/pexels-photo-404168.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'socks',
		name: 'Performance Socks',
		price: 9.99,
		img: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&w=400&q=80',
	},
	{
		id: 'duffle',
		name: 'Motiv8 Duffle Bag',
		price: 44.99,
		img: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'headband',
		name: 'Sweat-Wick Headband',
		price: 7.99,
		img: 'https://images.pexels.com/photos/1552244/pexels-photo-1552244.jpeg?auto=compress&w=400&q=80',
	},
	{
		id: 'windbreaker',
		name: 'Windbreaker Jacket',
		price: 49.99,
		img: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&w=400&q=80',
	},
];

document.addEventListener('DOMContentLoaded', function() {
	// Hamburger menu
	const hamburger = document.getElementById('hamburgerBtn');
	const navLinks = document.getElementById('navLinks');
	if (hamburger && navLinks) {
		hamburger.addEventListener('click', () => {
			navLinks.classList.toggle('active');
		});
		hamburger.addEventListener('keypress', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				navLinks.classList.toggle('active');
			}
		});
	}

	// Shop page add to cart
	if (window.location.pathname.endsWith('shop.html')) {
		const btns = document.querySelectorAll('.product-card button');
		btns.forEach((btn) => {
			btn.onclick = () => addToCart(btn.getAttribute('data-id'));
		});
	}
	// Cart page render
	if (window.location.pathname.endsWith('cart.html')) {
		renderCart();
	}
});
