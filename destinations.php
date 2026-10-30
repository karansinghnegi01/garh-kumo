<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';
render_header('All Destinations');
?>
<section class="hero">
    <div>
        <h1>All Uttarakhand Destination Detail Pages</h1>
        <p>Browse every major Garhwal and Kumaon destination and open its full cinematic detail page with quick info, budget, guide, weather, and reviews.</p>
    </div>
</section>
<section class="section">
    <div class="hero-actions" style="justify-content:flex-start;">
        <a class="btn" href="destinations.php?region=all">All</a>
        <a class="btn" href="destinations.php?region=garhwal">Garhwal</a>
        <a class="btn" href="destinations.php?region=kumaon">Kumaon</a>
    </div>
    <div class="grid cols-3" style="margin-top:14px;" id="frontendDestinationsList"></div>
</section>
<script src="frontend/data/catalog.js"></script>
<script src="assets/js/frontend-render.js"></script>
<?php render_footer(); ?>
