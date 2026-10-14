<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/data/catalog.php';

$region = strtolower($_GET['name'] ?? 'garhwal');
$region = in_array($region, ['garhwal', 'kumaon'], true) ? $region : 'garhwal';
$list = array_values(array_filter($DESTINATIONS, static fn($d) => $d['region'] === $region));

render_header(ucfirst($region));
?>
<section class="hero">
    <div>
        <h1><?= strtoupper(e($region)) ?> Tourism Stories</h1>
        <p>District-wise destinations, hidden gems, treks, temples, lakes, culture, food, festivals and immersive experiences curated for premium travel planning.</p>
    </div>
</section>
<section class="section">
    <div class="hero-actions" style="justify-content:flex-start;">
        <button class="btn" data-filter-region="all">All</button>
        <button class="btn" data-filter-region="<?= e($region) ?>"><?= ucfirst(e($region)) ?></button>
    </div>
    <div class="grid cols-3" style="margin-top:14px;">
        <?php foreach ($list as $d): ?>
            <article class="card" data-region-card="<?= e($d['region']) ?>">
                <h3><?= e($d['name']) ?></h3>
                <p class="meta"><?= e($d['district']) ?> | <?= e($d['altitude']) ?> | <?= e($d['season']) ?></p>
                <p><?= e($d['quote']) ?></p>
                <a class="btn" href="destination.php?slug=<?= e($d['slug']) ?>">Cinematic Page</a>
            </article>
        <?php endforeach; ?>
    </div>
</section>
<?php render_footer(); ?>
