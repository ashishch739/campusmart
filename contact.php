<?php
// ==========================================
// CampusMart - Contact Us Page (contact.php)
// ==========================================

require_once 'config/db.php';
require_once 'includes/header.php';

$success_message = '';
$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = trim($_POST['name']);
    $email   = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {
        $stmt = $conn->prepare("INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $subject, $message);

        if ($stmt->execute()) {
            $success_message = "Thank you! Your message has been sent successfully.";
        } else {
            $error_message = "Failed to send message. Please try again.";
        }
    } else {
        $error_message = "Please fill in all fields.";
    }
}
?>

<div class="container" style="padding: 4rem 1rem;">
    <!-- Header Title -->
    <div style="text-align: center; margin-bottom: 3rem;">
        <h1 style="color: var(--text-main); font-size: 2.3rem;"><i class="fa-solid fa-paper-plane" style="color: var(--primary-color);"></i> Contact Us</h1>
        <p style="color: var(--text-muted); font-size: 1.05rem;">Have any questions or need support? Reach out to our campus team</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; max-width: 1000px; margin: 0 auto;">
        
        <!-- Contact Information Cards -->
        <div>
            <div style="background: #ffffff; padding: 2rem; border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                <i class="fa-solid fa-location-dot" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 0.75rem;"></i>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Campus Office</h3>
                <p style="color: var(--text-muted); font-size: 0.92rem;">Student Activity Center (SAC), Hostel Block A, University Campus</p>
            </div>

            <div style="background: #ffffff; padding: 2rem; border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                <i class="fa-solid fa-envelope" style="font-size: 2rem; color: #0284c7; margin-bottom: 0.75rem;"></i>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Email Support</h3>
                <p style="color: var(--text-muted); font-size: 0.92rem;">support@campusmart.com<br>info@campusmart.com</p>
            </div>

            <div style="background: #ffffff; padding: 2rem; border-radius: var(--radius); border: 1px solid var(--border-color); box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                <i class="fa-solid fa-phone" style="font-size: 2rem; color: var(--secondary-color); margin-bottom: 0.75rem;"></i>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Phone Helpline</h3>
                <p style="color: var(--text-muted); font-size: 0.92rem;">+91 98765 43210<br>(Mon - Sat: 9:00 AM - 7:00 PM)</p>
            </div>
        </div>

        <!-- Contact Form -->
        <div class="form-card" style="padding: 2rem;">
            <h3 style="margin-bottom: 1.25rem; color: var(--text-main);"><i class="fa-solid fa-envelope-open-text"></i> Send Us a Message</h3>

            <?php if (!empty($success_message)): ?>
                <div class="alert alert-success">
                    <i class="fa-solid fa-circle-check"></i> <?php echo htmlspecialchars($success_message); ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($error_message)): ?>
                <div class="alert alert-danger">
                    <i class="fa-solid fa-circle-exclamation"></i> <?php echo htmlspecialchars($error_message); ?>
                </div>
            <?php endif; ?>

            <form action="contact.php" method="POST">
                <div class="form-group">
                    <label for="name"><i class="fa-solid fa-user"></i> Full Name</label>
                    <input type="text" id="name" name="name" class="form-control" placeholder="Rahul Sharma / Priya Singh" required>
                </div>

                <div class="form-group">
                    <label for="email"><i class="fa-solid fa-envelope"></i> Email Address</label>
                    <input type="email" id="email" name="email" class="form-control" placeholder="student@university.edu" required>
                </div>

                <div class="form-group">
                    <label for="subject"><i class="fa-solid fa-tag"></i> Subject</label>
                    <input type="text" id="subject" name="subject" class="form-control" placeholder="Product query / Technical help" required>
                </div>

                <div class="form-group">
                    <label for="message"><i class="fa-solid fa-comment-dots"></i> Message</label>
                    <textarea id="message" name="message" class="form-control" rows="4" placeholder="Write your message here..." required></textarea>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.75rem;">
                    <i class="fa-solid fa-paper-plane"></i> Send Message
                </button>
            </form>
        </div>

    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
