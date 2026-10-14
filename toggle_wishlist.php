<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/bootstrap.php';
if (!is_logged_in()) {
    flash('error', 'Please login first.');
    header('Location: login.php');
    exit;
}
if (!db()) {
    flash('error', 'Database not connected.');
    header('Location: dashboard.php');
    exit;
}

$slug = trim($_GET['slug'] ?? '');
$type = trim($_GET['type'] ?? 'destination');
$type = in_array($type, ['destination', 'hotel', 'trek', 'wedding'], true) ? $type : 'destination';

if ($slug !== '') {
    $stmt = db()->prepare('INSERT IGNORE INTO wishlist(user_id, item_slug, item_type) VALUES(?,?,?)');
    $stmt->execute([$_SESSION['user_id'], $slug, $type]);
    flash('ok', 'Saved to wishlist.');
}

header('Location: ' . ($_SERVER['HTTP_REFERER'] ?? 'wishlist.php'));
exit;
