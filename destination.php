<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';

$slug = strtolower(trim($_GET['slug'] ?? 'kedarnath'));

if ($_SERVER['REQUEST_METHOD'] === 'POST' && is_logged_in() && db()) {
    $rating = max(1, min(5, (int)($_POST['rating'] ?? 5)));
    $comment = trim($_POST['comment'] ?? '');
    if ($comment !== '') {
        $stmt = db()->prepare('INSERT INTO reviews(user_id, destination_slug, rating, comment, status) VALUES(?,?,?,?,?)');
        $stmt->execute([current_user()['id'], $slug, $rating, $comment, 'pending']);
        flash('ok', 'Review submitted for admin approval.');
        header('Location: destination.php?slug=' . urlencode($slug));
        exit;
    }
}

$reviews = [];
if (db()) {
    $stmt = db()->prepare('SELECT rating, comment, created_at FROM reviews WHERE destination_slug = ? AND status = ? ORDER BY id DESC LIMIT 10');
    $stmt->execute([$slug, 'approved']);
    $reviews = $stmt->fetchAll();
}
render_header(ucwords(str_replace('-', ' ', $slug)));
?>
<div id="frontendDestination"></div>
<section class="section layout-2">
    <div class="card">
        <h2>Live Weather</h2>
        <p class="meta" id="weatherStatus" data-weather-city="<?= e($slug) ?>">Loading weather...</p>
        <h3>Nearby Places & Itinerary</h3>
        <p class="meta">Suggested circuit: destination + local villages + sunset viewpoint + cultural market trail.</p>
        <h3>Interactive Assistant</h3>
        <div class="hero-actions" style="justify-content:flex-start;">
            <input id="chatbotInput" placeholder="Ask AI travel assistant...">
            <button class="btn" id="chatbotAskBtn">Ask</button>
        </div>
        <p class="meta" id="chatbotReply">Try: "best time", "trek safety", "budget trip".</p>
    </div>
    <div class="card">
        <h2>User Reviews</h2>
        <?php if ($msg = flash('ok')): ?><div class="alert ok"><?= e($msg) ?></div><?php endif; ?>
        <?php if ($reviews): ?>
            <?php foreach ($reviews as $r): ?>
                <div style="margin-bottom:10px;">
                    <strong><?= str_repeat('★', (int)$r['rating']) ?></strong>
                    <p class="meta"><?= e($r['comment']) ?></p>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p class="meta">No approved reviews yet.</p>
        <?php endif; ?>
        <?php if (is_logged_in()): ?>
            <form method="post">
                <select name="rating">
                    <option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option>
                    <option value="2">2 Stars</option><option value="1">1 Star</option>
                </select>
                <textarea name="comment" placeholder="Share your destination experience"></textarea>
                <button class="btn" type="submit">Submit Review</button>
            </form>
        <?php else: ?>
            <a class="btn" href="login.php">Login to Review</a>
        <?php endif; ?>
    </div>
</section>
<script src="frontend/data/catalog.js"></script>
<script src="assets/js/frontend-render.js"></script>
<?php render_footer(); ?>
