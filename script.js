/**
 * CampusMart - Interactive UI & Responsive Mobile Navigation JavaScript
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Logic
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const navLinks = document.getElementById('navLinks');
    const navActions = document.getElementById('navActions');

    if (mobileToggleBtn && navLinks) {
        mobileToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-open');
            if (navActions) {
                navActions.classList.toggle('mobile-open');
            }
            const icon = mobileToggleBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('mobile-open')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar-header')) {
                navLinks.classList.remove('mobile-open');
                if (navActions) navActions.classList.remove('mobile-open');
                const icon = mobileToggleBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // 2. Client-side Live Search & Filter for Product Grid (if search box present)
    const productSearchInput = document.getElementById('productSearchInput');
    if (productSearchInput) {
        productSearchInput.addEventListener('keyup', () => {
            const query = productSearchInput.value.toLowerCase().trim();
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';
                const category = card.querySelector('.badge-group')?.textContent.toLowerCase() || '';

                if (title.includes(query) || desc.includes(query) || category.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 3. Category Filter Buttons (if present on products page)
    const categoryButtons = document.querySelectorAll('.category-filter-btn');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const selectedCat = btn.getAttribute('data-category').toLowerCase();
                const productCards = document.querySelectorAll('.product-card');

                productCards.forEach(card => {
                    const cardCat = card.getAttribute('data-category')?.toLowerCase() || '';
                    if (selectedCat === 'all' || cardCat === selectedCat || card.innerText.toLowerCase().includes(selectedCat)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
