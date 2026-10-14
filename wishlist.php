<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';
require_auth();
$user = current_user();
$items = [];
if (db()) {
    $stmt = db()->prepare('SELECT item_slug, item_type, created_at FROM wishlist WHERE user_id = ? ORDER BY created_at DESC');
    $stmt->execute([$user['id']]);
    $items = $stmt->fetchAll();
}
render_header('My Wishlist');
?>
<section class="section">
    <h2 class="section-title">Dream Travel Collection</h2>
    <?php if (!$items): ?>
        <div class="card"><p>No saved items yet. Start from destination or hotel pages.</p></div>
    <?php else: ?>
        <div class="grid cols-3">
            <?php foreach ($items as $item): ?>
                <div class="card">
                    <span class="badge"><?= e($item['item_type']) ?></span>
                    <h3><?= e($item['item_slug']) ?></h3>
                    <p class="meta">Saved on <?= e($item['created_at']) ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
<?php render_footer(); ?>
