<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';

render_header('GarhKumo - Premium Uttarakhand Tourism');
?>
<section class="hero">
    <div>
        <h1>Cinematic Uttarakhand, Crafted for Dream Travelers</h1>
        <p>GarhKumo is your premium tourism platform for Garhwal and Kumaon, combining spiritual journeys, adventure, luxury stays, destination weddings, and smart planning in one immersive ecosystem.</p>
        <div class="hero-actions">
            <a class="cta" href="region.php?name=garhwal">Explore Garhwal</a>
            <a class="btn" href="region.php?name=kumaon">Explore Kumaon</a>
            <a class="btn" href="destinations.php">All Destinations</a>
        </div>
        <form class="search-bar" method="get" action="destination.php">
            <input type="text" name="slug" placeholder="Search Kedarnath, Nainital, Rishikesh...">
            <select name="lang">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
            </select>
            <button class="btn" type="submit">Smart Search</button>
        </form>
    </div>
</section>

<section class="section">
    <h2 class="section-title">Trending Destinations</h2>
    <div class="grid cols-3" id="frontendTrending"></div>
</section>
<section class="section">
    <h2 class="section-title">All Destination Pages on Home</h2>
    <p class="meta">Open detailed pages for Auli, Badrinath, Kedarnath, Nainital, Rishikesh and all Uttarakhand destinations.</p>
    <div class="grid cols-3" id="frontendAllDestinations"></div>
</section>
<section class="section">
    <div class="card">
        <h2>Trip Budgets (Quick View)</h2>
        <p class="meta">Budget Traveler (5D): Solo INR 16,500 | Couple INR 26,800 | Family INR 43,500</p>
        <p class="meta">Standard Traveler (5D): Solo INR 24,000 | Couple INR 39,000 | Family INR 62,000</p>
        <p class="meta">Luxury Traveler (5D): Solo INR 41,500 | Couple INR 67,500 | Family INR 108,000</p>
        <a class="btn" href="planner.php">Open Interactive Planner</a>
    </div>
</section>

<section class="section layout-2">
    <div class="card">
        <h2>Live Mood Board</h2>
        <p class="meta">Weather, crowd indicator, and festival alerts are designed for API integration. Add OpenWeather key in backend to activate live cards.</p>
        <ul>
            <li>Cloudy in Auli: ideal for cinematic photography</li>
            <li>Rishikesh crowd level: medium</li>
            <li>Upcoming: Nanda Devi Raj Jat awareness update</li>
        </ul>
    </div>
    <div class="card">
        <h2>Travel Reels + Stories</h2>
        <p>Fullscreen drone showcase slots are ready. Use your existing mp4 assets for destination heroes and reels feed.</p>
        <a class="btn" href="weddings.php">View Destination Weddings</a>
    </div>
</section>
<script src="frontend/data/catalog.js"></script>
<script src="assets/js/frontend-render.js"></script>
<?php render_footer(); ?>
