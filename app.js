/**
 * CampusMart - Complete E-Commerce Application Engine
 * Renders Pixel-Perfect Layout matching Reference Design
 */

const state = {
  cart: JSON.parse(localStorage.getItem('campusmart_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('campusmart_wishlist')) || [],
  user: JSON.parse(localStorage.getItem('campusmart_user')) || null,
  activeSection: 'all',
  activeCategory: 'all',
  searchQuery: '',
  appliedPromo: null,
  promoDiscountPct: 0
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderHeaderCounters();
  startDealsTimer();
  renderDealsGrid();
  renderProducts();
  setupEventListeners();
}

function renderHeaderCounters() {
  const cartBadge = document.getElementById('cartBadgeCount');
  const totalCartItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) cartBadge.textContent = totalCartItems;

  const topUserBtn = document.getElementById('topBarUserBtn');
  if (topUserBtn && state.user && state.user.isLoggedIn) {
    topUserBtn.textContent = `Hi, ${state.user.name.split(' ')[0]}`;
  }
}

function startDealsTimer() {
  let totalSeconds = 12 * 3600 + 34 * 60 + 56;

  setInterval(() => {
    if (totalSeconds <= 0) totalSeconds = 24 * 3600;
    totalSeconds--;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatted = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    
    document.querySelectorAll('#dealsTimerDigits').forEach(elem => {
      elem.textContent = formatted;
    });
  }, 1000);
}

// Render Deals Of The Day (6 items matching reference layout)
function renderDealsGrid() {
  const dealsGrid = document.getElementById('dealsProductGrid');
  if (!dealsGrid) return;

  const dealsProducts = CAMPUS_PRODUCTS.filter(p => p.isDeal).slice(0, 6);

  dealsGrid.innerHTML = dealsProducts.map(p => {
    const isWishlisted = state.wishlist.includes(p.id);
    return `
      <div class="product-item-card">
        <div class="card-top-img-wrap">
          <span class="discount-badge-green">-${p.discount}%</span>
          <button class="wishlist-heart-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}')" title="Wishlist">
            <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="card-info-body">
          <h4 class="card-item-title">${p.name}</h4>
          <div class="card-item-subtitle">${p.category} • ${p.section.toUpperCase()}</div>
          <div class="card-rating-row">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <span>${p.rating} (${p.reviews})</span>
          </div>
          <div class="card-price-row">
            <span class="price-main">₹${p.price}</span>
            <span class="price-mrp">₹${p.originalPrice}</span>
          </div>
          <button class="btn-card-cart" onclick="addToCart('${p.id}')">Add to Cart</button>
        </div>
      </div>
    `;
  }).join('');
}

// Render Main Product Catalog Grid
function renderProducts() {
  const grid = document.getElementById('mainProductGrid');
  const sectionTitle = document.getElementById('sectionTitleDisplay');
  const countDisplay = document.getElementById('productCountDisplay');
  if (!grid) return;

  let filtered = CAMPUS_PRODUCTS.filter(p => {
    if (state.activeSection === 'boys' && p.section !== 'boys') return false;
    if (state.activeSection === 'girls' && p.section !== 'girls') return false;
    if (state.activeSection === 'student' && p.section !== 'student') return false;
    if (state.activeSection === 'deals' && !p.isDeal) return false;
    if (state.activeSection === 'new' && !p.isNew) return false;
    if (state.activeSection === 'bestsellers' && !p.isBestSeller) return false;
    if (state.activeSection === 'under999' && p.price > 999) return false;

    if (state.activeCategory !== 'all' && p.category !== state.activeCategory) return false;

    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  if (sectionTitle) {
    if (state.activeSection === 'boys') sectionTitle.textContent = 'Boys Collection (50+ Products)';
    else if (state.activeSection === 'girls') sectionTitle.textContent = 'Girls Collection (50+ Products)';
    else if (state.activeSection === 'student') sectionTitle.textContent = 'Student Section (50+ Products)';
    else if (state.activeSection === 'deals') sectionTitle.textContent = 'Deals Of The Day 🔥';
    else if (state.activeSection === 'new') sectionTitle.textContent = 'New Arrivals ✨';
    else if (state.activeSection === 'bestsellers') sectionTitle.textContent = 'Best Sellers ⭐';
    else if (state.activeSection === 'under999') sectionTitle.textContent = 'Offer Zone: Under ₹999 🏷️';
    else sectionTitle.textContent = 'Explore All Campus Products';
  }

  if (countDisplay) {
    countDisplay.textContent = `Showing ${filtered.length} products`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
        <h4 style="font-size: 1.3rem; color: #0f172a;">No Products Found</h4>
        <p style="color: #64748b; margin-bottom: 1rem;">Try another keyword or category.</p>
        <button class="btn-card-cart" style="width: auto; padding: 0.6rem 1.2rem;" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const isWishlisted = state.wishlist.includes(p.id);
    return `
      <div class="product-item-card">
        <div class="card-top-img-wrap">
          <span class="discount-badge-green">-${p.discount}%</span>
          <button class="wishlist-heart-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}')" title="Wishlist">
            <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="card-info-body">
          <h4 class="card-item-title">${p.name}</h4>
          <div class="card-item-subtitle">${p.category} • ${p.section.toUpperCase()}</div>
          <div class="card-rating-row">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <span>${p.rating} (${p.reviews})</span>
          </div>
          <div class="card-price-row">
            <span class="price-main">₹${p.price}</span>
            <span class="price-mrp">₹${p.originalPrice}</span>
          </div>
          <button class="btn-card-cart" onclick="addToCart('${p.id}')">Add to Cart</button>
        </div>
      </div>
    `;
  }).join('');
}

function filterBySection(section) {
  state.activeSection = section;
  state.activeCategory = 'all';
  renderProducts();
  const catalog = document.getElementById('mainCatalog');
  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
}

function filterByCategory(category) {
  state.activeCategory = category;
  renderProducts();
  const catalog = document.getElementById('mainCatalog');
  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
}

function resetFilters() {
  state.activeSection = 'all';
  state.activeCategory = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  renderProducts();
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }
}

// Wishlist Logic
function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from Wishlist ❤️', 'info');
  } else {
    state.wishlist.push(productId);
    showToast('Added to Wishlist ❤️', 'success');
  }
  localStorage.setItem('campusmart_wishlist', JSON.stringify(state.wishlist));
  renderHeaderCounters();
  renderDealsGrid();
  renderProducts();
}

function openWishlistModal() {
  state.activeSection = 'all';
  state.activeCategory = 'all';
  const grid = document.getElementById('mainProductGrid');
  const title = document.getElementById('sectionTitleDisplay');
  if (title) title.textContent = 'Saved Wishlist Items ❤️';

  const wishlisted = CAMPUS_PRODUCTS.filter(p => state.wishlist.includes(p.id));
  if (grid) {
    if (wishlisted.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem;"><h4>Wishlist is Empty ❤️</h4></div>`;
    } else {
      grid.innerHTML = wishlisted.map(p => `
        <div class="product-item-card">
          <div class="card-top-img-wrap">
            <button class="wishlist-heart-btn active" onclick="toggleWishlist('${p.id}')"><i class="fa-solid fa-heart"></i></button>
            <img src="${p.image}">
          </div>
          <div class="card-info-body">
            <h4 class="card-item-title">${p.name}</h4>
            <div class="card-price-row">
              <span class="price-main">₹${p.price}</span>
            </div>
            <button class="btn-card-cart" onclick="addToCart('${p.id}')">Add to Cart</button>
          </div>
        </div>
      `).join('');
    }
    grid.scrollIntoView({ behavior: 'smooth' });
  }
}

// Cart Logic
function addToCart(productId, quantity = 1) {
  const existing = state.cart.find(i => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({ productId, quantity });
  }
  localStorage.setItem('campusmart_cart', JSON.stringify(state.cart));
  renderHeaderCounters();
  showToast('Added to Cart 🛒', 'success');
  openCartDrawer();
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(i => i.productId === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
  }
  localStorage.setItem('campusmart_cart', JSON.stringify(state.cart));
  renderHeaderCounters();
  renderCartDrawer();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.productId !== productId);
  localStorage.setItem('campusmart_cart', JSON.stringify(state.cart));
  renderHeaderCounters();
  renderCartDrawer();
  showToast('Removed from Cart', 'info');
}

function openCartDrawer() {
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    renderCartDrawer();
  }
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (backdrop) backdrop.classList.remove('active');
}

function renderCartDrawer() {
  const listElem = document.getElementById('cartItemsList');
  const subtotalElem = document.getElementById('cartSubtotal');
  const discountElem = document.getElementById('cartDiscount');
  const totalElem = document.getElementById('cartTotal');
  if (!listElem) return;

  if (state.cart.length === 0) {
    listElem.innerHTML = `<div style="text-align:center; padding:2rem; color:#64748b;">Cart is Empty 🛒</div>`;
    if (subtotalElem) subtotalElem.textContent = '₹0';
    if (discountElem) discountElem.textContent = '₹0';
    if (totalElem) totalElem.textContent = '₹0';
    return;
  }

  let subtotal = 0;
  listElem.innerHTML = state.cart.map(item => {
    const p = CAMPUS_PRODUCTS.find(prod => prod.id === item.productId);
    if (!p) return '';
    const itemTotal = p.price * item.quantity;
    subtotal += itemTotal;

    return `
      <div class="cart-item">
        <img src="${p.image}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${p.name}</h4>
          <div class="cart-item-price">₹${p.price}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateCartQty('${p.id}', -1)">-</button>
            <span style="font-weight:700;">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty('${p.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${p.id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
  }).join('');

  let discount = 0;
  if (state.appliedPromo) {
    discount = Math.round(subtotal * (state.promoDiscountPct / 100));
  }

  const grandTotal = Math.max(0, subtotal - discount);
  if (subtotalElem) subtotalElem.textContent = `₹${subtotal}`;
  if (discountElem) discountElem.textContent = `-₹${discount}`;
  if (totalElem) totalElem.textContent = `₹${grandTotal}`;
}

function applyPromoCode() {
  const input = document.getElementById('promoInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (code === 'STUDENT10') {
    state.appliedPromo = 'STUDENT10';
    state.promoDiscountPct = 10;
    showToast('Code STUDENT10 Applied! 10% OFF 🎉');
  } else {
    showToast('Invalid Code! Try STUDENT10', 'info');
  }
  renderCartDrawer();
}

function openAuthModal() {
  const modal = document.getElementById('authModalBackdrop');
  if (modal) modal.classList.add('active');
}

function closeAuthModal() {
  const modal = document.getElementById('authModalBackdrop');
  if (modal) modal.classList.remove('active');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('loginNameInput')?.value || 'Student';
  state.user = { name, isLoggedIn: true };
  localStorage.setItem('campusmart_user', JSON.stringify(state.user));
  renderHeaderCounters();
  closeAuthModal();
  showToast(`Welcome back, ${name}! 🎉`);
}

function openCheckoutModal() {
  if (state.cart.length === 0) return;
  closeCartDrawer();
  const modal = document.getElementById('checkoutModalBackdrop');
  if (modal) modal.classList.add('active');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModalBackdrop');
  if (modal) modal.classList.remove('active');
}

function processOrderSubmit(e) {
  e.preventDefault();
  state.cart = [];
  localStorage.setItem('campusmart_cart', JSON.stringify([]));
  renderHeaderCounters();
  closeCheckoutModal();
  showToast('Order Placed Successfully! 🎉', 'success');
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #2dd4bf;"></i> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
