<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/data/catalog.php';
render_header('Hotels & Stays');
?>
<section class="hero">
    <div>
        <h1>Premium Hotels Across Uttarakhand</h1>
        <p>Luxury resorts, budget hotels, riverside stays, camps, homestays, snow resorts, family and couple-friendly options.</p>
    </div>
</section>
<section class="section">
    <div class="grid cols-3">
        <?php foreach ($HOTELS as $h): ?>
            <article class="card">
                <span class="badge"><?= e($h['category']) ?></span>
                <h3><?= e($h['name']) ?></h3>
                <p class="meta"><?= e($h['location']) ?> | Rating <?= e((string)$h['rating']) ?></p>
                <p>INR <?= number_format((int)$h['price']) ?> / night</p>
                <div class="hero-actions" style="justify-content:flex-start;">
                    <a class="btn" href="toggle_wishlist.php?slug=<?= urlencode(strtolower(str_replace(' ', '-', $h['name']))) ?>&type=hotel">Save</a>
                    <a class="cta" href="book.php?slug=<?= urlencode(strtolower(str_replace(' ', '-', $h['name']))) ?>&type=hotel">Book Now</a>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>
<?php render_footer(); ?>
