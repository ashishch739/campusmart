<?php
// ==========================================
// CampusMart - About Us Page (about.php)
// ==========================================

require_once 'config/db.php';
require_once 'includes/header.php';
?>

<div class="container" style="padding: 4rem 1rem;">
    <div style="background: #ffffff; padding: 3rem; border-radius: var(--radius); box-shadow: 0 4px 15px rgba(0,0,0,0.04); border: 1px solid var(--border-color); max-width: 900px; margin: 0 auto;">
        
        <!-- About Header -->
        <div style="text-align: center; margin-bottom: 2.5rem;">
            <i class="fa-solid fa-graduation-cap" style="font-size: 3.5rem; color: var(--primary-color);"></i>
            <h1 style="color: var(--text-main); margin-top: 0.5rem; font-size: 2.3rem;">About CampusMart</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem;">Connecting Campus Students for Smart, Safe & Affordable Trading</p>
        </div>

        <!-- Description -->
        <p style="font-size: 1.05rem; color: #334155; line-height: 1.8; margin-bottom: 2rem;">
            <strong>CampusMart</strong> is an exclusive campus marketplace designed for university and college students. Whether you are moving into a hostel, looking for second-hand textbooks, selling stationery, or shopping for skincare, grooming, and personal care products, CampusMart brings everything under one unified, easy-to-use platform.
        </p>

        <!-- 3 Specialized Pillars -->
        <h2 style="font-size: 1.5rem; margin-bottom: 1.25rem; color: var(--text-main);"><i class="fa-solid fa-layer-group"></i> Our Specialized Sections</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--primary-color);">
                <h3 style="color: var(--primary-color); font-size: 1.15rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-book"></i> Student Corner</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted);">Course books, handwritten lecture notes, pens, notebooks, geometry boxes, calculators & lab tools.</p>
            </div>
            
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid #0284c7;">
                <h3 style="color: #0284c7; font-size: 1.15rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-mars"></i> Boys Section</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted);">Hair wax, trimmers, deodorants, perfumes, boys face wash, belts, wallets & men's hosteller essentials.</p>
            </div>

            <div style="background: #f8fafc; padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--secondary-color);">
                <h3 style="color: var(--secondary-color); font-size: 1.15rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-heart"></i> Girls Section</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted);">Skincare, face wash, perfumes, lipsticks, shampoo, cosmetics & hosteller personal care items.</p>
            </div>
        </div>

        <!-- Platform Benefits -->
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-main);"><i class="fa-solid fa-star"></i> Why Students Love CampusMart</h2>
        <ul style="list-style: none; color: #475569; font-size: 1rem; line-height: 2;">
            <li><i class="fa-solid fa-check" style="color: #16a34a; margin-right: 8px;"></i> <strong>Zero Commission:</strong> Buy and sell directly with fellow batchmates without any middleman fees.</li>
            <li><i class="fa-solid fa-check" style="color: #16a34a; margin-right: 8px;"></i> <strong>Instant Hand-to-Hand Pickup:</strong> Meet at your hostel block, canteen, or campus library.</li>
            <li><i class="fa-solid fa-check" style="color: #16a34a; margin-right: 8px;"></i> <strong>Pocket Friendly:</strong> Get second-hand books and essentials at huge student discounts.</li>
        </ul>

    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
