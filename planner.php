<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';
render_header('Estimated Budget Planner');
?>
<section class="section">
    <h2 class="section-title">Professional Trip Budget Planner</h2>
    <div class="layout-2">
        <div class="card">
            <form id="budgetPlannerForm">
                <label>Trip Type</label>
                <select name="trip_type">
                    <option value="solo">Solo Trip</option>
                    <option value="couple">Couple Trip</option>
                    <option value="family">Family Trip</option>
                    <option value="group">Group Trip</option>
                </select>
                <label>Traveler Type</label>
                <select name="style">
                    <option value="budget">Budget Traveler</option>
                    <option value="standard">Standard Traveler</option>
                    <option value="luxury">Luxury Traveler</option>
                </select>
                <label>Trip Duration</label>
                <select name="days">
                    <option value="1">1 Day</option>
                    <option value="2">Weekend</option>
                    <option value="5" selected>5 Days</option>
                    <option value="7">7 Days</option>
                    <option value="10">Custom (10 days)</option>
                </select>
                <label>Total Travelers</label>
                <input name="travelers" type="number" min="1" value="2">
                <button class="cta" type="submit">Calculate Budget</button>
            </form>
        </div>
        <div id="budgetResult" class="grid">
            <div class="card"><p class="meta">Expense breakdown for hotels, food, transport, trekking, shopping and activities appears here. Use browser print/save as PDF for export.</p></div>
        </div>
    </div>
</section>
<?php render_footer(); ?>
