<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/data/catalog.php';
require_auth();
$user = current_user();

$wishlistCount = 0;
if (db()) {
    $stmt = db()->prepare('SELECT COUNT(*) c FROM wishlist WHERE user_id = ?');
    $stmt->execute([$user['id']]);
    $wishlistCount = (int) ($stmt->fetch()['c'] ?? 0);
}

render_header('My Dashboard');
?>
<section class="section">
    <h2 class="section-title">Welcome, <?= e($user['full_name']) ?></h2>
    <div class="grid cols-3">
        <div class="card"><h3>Saved Places</h3><p class="meta"><?= $wishlistCount ?> items in your wishlist</p></div>
        <div class="card"><h3>Travel History</h3><p class="meta">Session-ready timeline and booking tracking enabled.</p></div>
        <div class="card"><h3>Personalized Picks</h3><p class="meta">Based on your region interests and saved destinations.</p></div>
    </div>
</section>
<section class="section">
    <h2 class="section-title">Recommended for You</h2>
    <div class="grid cols-3">
        <?php foreach (array_slice($DESTINATIONS, 0, 6) as $d): ?>
            <div class="card">
                <h3><?= e($d['name']) ?></h3>
                <p class="meta"><?= e($d['type']) ?> | <?= e($d['district']) ?></p>
                <a class="btn" href="destination.php?slug=<?= e($d['slug']) ?>">View Destination</a>
            </div>
        <?php endforeach; ?>
    </div>
</section>
<?php render_footer(); ?>
