<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';
require_auth();

$slug = trim($_GET['slug'] ?? 'custom-package');
$bookingType = trim($_GET['type'] ?? 'package');
$bookingType = in_array($bookingType, ['hotel', 'wedding', 'package'], true) ? $bookingType : 'package';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && db()) {
    $_SESSION['pending_booking'] = [
        'booking_type' => $_POST['booking_type'] ?? $bookingType,
        'item_slug' => $slug,
        'guests' => (int)($_POST['guests'] ?? 2),
        'total_amount' => (int)($_POST['total_amount'] ?? 0),
    ];
    header('Location: payment.php');
    exit;
}

render_header('Book Experience');
?>
<section class="section form-wrap">
    <h2>Book: <?= e($slug) ?></h2>
    <p class="meta">Step 1 of 2: Enter booking details, then continue to payment.</p>
    <form method="post">
        <select name="booking_type">
            <option value="hotel" <?= $bookingType === 'hotel' ? 'selected' : '' ?>>Hotel</option>
            <option value="wedding" <?= $bookingType === 'wedding' ? 'selected' : '' ?>>Wedding</option>
            <option value="package" <?= $bookingType === 'package' ? 'selected' : '' ?>>Travel Package</option>
        </select>
        <input type="number" name="guests" min="1" value="2" placeholder="Guests">
        <input type="number" name="total_amount" min="0" value="15000" placeholder="Total Amount (INR)">
        <button class="cta" type="submit">Continue to Payment</button>
    </form>
</section>
<?php render_footer(); ?>
