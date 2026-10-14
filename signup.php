<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/layout.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['full_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$name || !$email || strlen($password) < 6) {
        flash('error', 'Enter valid name, email and password (min 6 chars).');
    } elseif (!db()) {
        flash('error', 'Database not connected. Import schema.sql first.');
    } else {
        $stmt = db()->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            flash('error', 'Email already registered.');
        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $ins = db()->prepare('INSERT INTO users(full_name, email, password_hash) VALUES(?,?,?)');
            $ins->execute([$name, $email, $hash]);
            flash('ok', 'Account created. Please login.');
            header('Location: login.php');
            exit;
        }
    }
}

render_header('Sign Up');
?>
<section class="section form-wrap">
    <h2>Create GarhKumo Account</h2>
    <?php if ($msg = flash('error')): ?><div class="alert warn"><?= e($msg) ?></div><?php endif; ?>
    <form method="post">
        <input name="full_name" placeholder="Full Name" required>
        <input name="email" type="email" placeholder="Email" required>
        <input name="password" type="password" placeholder="Password" required>
        <button class="cta" type="submit">Create Account</button>
    </form>
</section>
<?php render_footer(); ?>
