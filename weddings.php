<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';
$venues = ['Mussoorie', 'Nainital', 'Auli', 'Rishikesh', 'Tehri Lake', 'Kausani', 'Almora', 'Mukteshwar', 'Lansdowne', 'Jim Corbett', 'Chopta', 'Harsil', 'Kanatal'];
render_header('Destination Weddings');
?>
<section class="hero">
    <div>
        <h1>Destination Weddings in Uttarakhand</h1>
        <p>Luxury mountain weddings, riverside ceremonies, snowfall concepts, royal venues, drone shoots, honeymoon planning, and AI-assisted wedding itinerary support.</p>
    </div>
</section>
<section class="section">
    <h2 class="section-title">Wedding Venues</h2>
    <div class="grid cols-3">
        <?php foreach ($venues as $v): ?>
            <article class="card">
                <h3><?= e($v) ?></h3>
                <p class="meta">Packages: Budget, Premium, Royal, Traditional Pahadi, Snowfall, Riverside.</p>
                <div class="hero-actions" style="justify-content:flex-start;">
                    <a class="btn" href="planner.php">Wedding Budget Planner</a>
                    <a class="cta" href="book.php?slug=<?= urlencode(strtolower(str_replace(' ', '-', $v))) ?>&type=wedding">Book Venue</a>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>
<?php render_footer(); ?>
