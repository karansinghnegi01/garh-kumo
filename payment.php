<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';
require_auth();

$pending = $_SESSION['pending_booking'] ?? null;
if (!$pending) {
    flash('error', 'No pending booking found. Start booking first.');
    header('Location: destinations.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && db()) {
    $stmt = db()->prepare('INSERT INTO bookings(user_id, booking_type, item_slug, guests, total_amount) VALUES(?,?,?,?,?)');
    $stmt->execute([
        current_user()['id'],
        $pending['booking_type'],
        $pending['item_slug'],
        (int)$pending['guests'],
        (int)$pending['total_amount'],
    ]);
    unset($_SESSION['pending_booking']);
    flash('ok', 'Payment successful. Booking confirmed.');
    header('Location: dashboard.php');
    exit;
}

render_header('Payment');
?>
<section class="section form-wrap">
    <h2>Payment - Step 2 of 2</h2>
    <p class="meta">Booking: <?= e($pending['item_slug']) ?> | Type: <?= e($pending['booking_type']) ?> | Guests: <?= (int)$pending['guests'] ?></p>
    <p class="meta">Total: INR <?= number_format((int)$pending['total_amount']) ?></p>
    <form method="post">
        <input name="card_name" placeholder="Card Holder Name" required>
        <input name="card_number" placeholder="Card Number" required>
        <div class="layout-2">
            <input name="expiry" placeholder="MM/YY" required>
            <input name="cvv" placeholder="CVV" required>
        </div>
        <button class="cta" type="submit">Pay and Confirm Booking</button>
    </form>
</section>
<?php render_footer(); ?>
