<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    if (!db()) {
        flash('error', 'Database not connected. Import schema.sql first.');
    } else {
        $stmt = db()->prepare('SELECT id, password_hash FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password_hash'])) {
            $_SESSION['user_id'] = (int) $user['id'];
            header('Location: dashboard.php');
            exit;
        }
        flash('error', 'Invalid credentials.');
    }
}
render_header('Login');
?>
<section class="section form-wrap">
    <h2>Welcome Back</h2>
    <?php if ($msg = flash('ok')): ?><div class="alert ok"><?= e($msg) ?></div><?php endif; ?>
    <?php if ($msg = flash('error')): ?><div class="alert warn"><?= e($msg) ?></div><?php endif; ?>
    <form method="post">
        <input name="email" type="email" placeholder="Email" required>
        <input name="password" type="password" placeholder="Password" required>
        <button class="cta" type="submit">Login</button>
    </form>
</section>
<?php render_footer(); ?>
