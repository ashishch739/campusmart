<?php
// 1. Session & DB Config Include (MUST BE BEFORE HTML OUTPUT)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/config/db.php';

// 2. Redirect if user is already logged in -> Direct to respective Section Dashboard
if (isset($_SESSION['user_id'])) {
    $type = isset($_SESSION['user_type']) ? $_SESSION['user_type'] : 'student';
    if (isset($_SESSION['redirect_after_login'])) {
        $target = $_SESSION['redirect_after_login'];
        unset($_SESSION['redirect_after_login']);
        header("Location: " . $target);
    } elseif ($type === 'boys') {
        header("Location: boys/dashboard.php");
    } elseif ($type === 'girls') {
        header("Location: girls/dashboard.php");
    } else {
        header("Location: student/dashboard.php");
    }
    exit();
}

$error_message = '';
$login_notice = '';

if (isset($_SESSION['login_alert'])) {
    $login_notice = $_SESSION['login_alert'];
    unset($_SESSION['login_alert']);
}

// 3. Process Login Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (!empty($email) && !empty($password)) {
        $stmt = $conn->prepare("SELECT id, full_name, password, user_type FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($user = $result->fetch_assoc()) {
            if (password_verify($password, $user['password'])) {
                // Set Session
                $_SESSION['user_id']   = $user['id'];
                $_SESSION['full_name'] = $user['full_name'];
                $_SESSION['user_type'] = $user['user_type'];

                // Direct Redirection (check if user was redirected from buy page)
                if (isset($_SESSION['redirect_after_login'])) {
                    $target = $_SESSION['redirect_after_login'];
                    unset($_SESSION['redirect_after_login']);
                    header("Location: " . $target);
                } elseif ($user['user_type'] === 'boys') {
                    header("Location: boys/dashboard.php");
                } elseif ($user['user_type'] === 'girls') {
                    header("Location: girls/dashboard.php");
                } else {
                    header("Location: student/dashboard.php");
                }
                exit();
            } else {
                $error_message = "Invalid password. Please try again.";
            }
        } else {
            $error_message = "No account registered with this email.";
        }
    } else {
        $error_message = "Please enter both email and password.";
    }
}

// 4. Include Header for UI Rendering
require_once 'includes/header.php';
?>

<div class="container" style="max-width: 460px; padding: 4rem 1rem;">
    <div class="form-card">
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 60px; height: 60px; background: var(--primary-light); color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 1rem;">
                <i class="fa-solid fa-graduation-cap"></i>
            </div>
            <h2 style="color: var(--text-main); font-size: 1.8rem;">Welcome Back</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem;">Log in to access your CampusMart account & buy items</p>
        </div>

        <?php if (!empty($login_notice)): ?>
            <div class="alert alert-warning">
                <i class="fa-solid fa-lock"></i> <?php echo htmlspecialchars($login_notice); ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($error_message)): ?>
            <div class="alert alert-danger">
                <i class="fa-solid fa-circle-exclamation"></i> <?php echo htmlspecialchars($error_message); ?>
            </div>
        <?php endif; ?>

        <form action="login.php" method="POST">
            <div class="form-group">
                <label for="email"><i class="fa-solid fa-envelope"></i> Email Address</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="name@campus.edu" required>
            </div>

            <div class="form-group">
                <label for="password"><i class="fa-solid fa-lock"></i> Password</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="••••••••" required>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.75rem;">
                <i class="fa-solid fa-right-to-bracket"></i> Login & Continue
            </button>
        </form>

        <p style="text-align: center; margin-top: 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
            Don't have an account? <a href="register.php" style="color: var(--primary-color); text-decoration: none; font-weight: 600;">Register Here</a>
        </p>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>