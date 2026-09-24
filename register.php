<?php
// 1. Session & DB Config Include (MUST BE BEFORE HTML OUTPUT)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/config/db.php';

// 2. Redirect if already logged in
if (isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}

$error_message = '';
$success_message = '';

// 3. Process Registration Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $full_name = trim($_POST['full_name']);
    $email     = trim($_POST['email']);
    $mobile    = trim($_POST['mobile']);
    $password  = trim($_POST['password']);
    $user_type = trim($_POST['user_type']);

    if (!empty($full_name) && !empty($email) && !empty($mobile) && !empty($password) && !empty($user_type)) {
        // Check duplicate email
        $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $check->bind_param("s", $email);
        $check->execute();
        $res = $check->get_result();

        if ($res->num_rows > 0) {
            $error_message = "This email is already registered!";
        } else {
            $hashed_pass = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $conn->prepare("INSERT INTO users (full_name, email, mobile, password, user_type) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $full_name, $email, $mobile, $hashed_pass, $user_type);

            if ($stmt->execute()) {
                $success_message = "Registration successful! <a href='login.php' style='color: #15803d; font-weight: bold; text-decoration: underline;'>Click here to Login</a>";
            } else {
                $error_message = "Failed to create account. Please try again.";
            }
        }
    } else {
        $error_message = "Please fill in all required fields.";
    }
}

// 4. NOW Include Header for UI Rendering
require_once 'includes/header.php';
?>

<div class="container" style="max-width: 520px; padding: 4rem 1rem;">
    <div class="form-card">
        <div style="text-align: center; margin-bottom: 2rem;">
            <i class="fa-solid fa-user-plus" style="font-size: 2.5rem; color: var(--primary-color);"></i>
            <h2 style="margin-top: 0.5rem; color: var(--text-main);">Create an Account</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem;">Join CampusMart to start buying and selling</p>
        </div>

        <?php if (!empty($error_message)): ?>
            <div class="alert alert-danger">
                <i class="fa-solid fa-circle-exclamation"></i> <?php echo htmlspecialchars($error_message); ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($success_message)): ?>
            <div class="alert alert-success">
                <i class="fa-solid fa-circle-check"></i> <?php echo $success_message; ?>
            </div>
        <?php endif; ?>

        <form action="register.php" method="POST">
            <div class="form-group">
                <label for="full_name"><i class="fa-solid fa-id-card"></i> Full Name</label>
                <input type="text" id="full_name" name="full_name" class="form-control" placeholder="Rahul Sharma / Priya Singh" required>
            </div>

            <div class="form-group">
                <label for="email"><i class="fa-solid fa-envelope"></i> Email Address</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="student@university.edu" required>
            </div>

            <div class="form-group">
                <label for="mobile"><i class="fa-solid fa-phone"></i> Mobile Number</label>
                <input type="text" id="mobile" name="mobile" class="form-control" placeholder="9876543210" required>
            </div>

            <div class="form-group">
                <label for="user_type"><i class="fa-solid fa-users"></i> Account Type / Section</label>
                <select id="user_type" name="user_type" class="form-control" required>
                    <option value="student">Student Corner</option>
                    <option value="boys">Boys Section</option>
                    <option value="girls">Girls Section</option>
                </select>
            </div>

            <div class="form-group">
                <label for="password"><i class="fa-solid fa-lock"></i> Password</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="••••••••" required>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.75rem;">
                <i class="fa-solid fa-user-check"></i> Register Now
            </button>
        </form>

        <p style="text-align: center; margin-top: 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
            Already have an account? <a href="login.php" style="color: var(--primary-color); text-decoration: none; font-weight: 600;">Login Here</a>
        </p>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
