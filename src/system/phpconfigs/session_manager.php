<?php
// Function to check if the session has expired
function isSessionExpired() {
    $session_expiry_time = 12 * 3600; // 12 hours in seconds
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $session_expiry_time)) {
        return true;
    }
    $_SESSION['last_activity'] = time(); // Update last activity time
    return false;
}

// Function to logout user
function logout() {
    // Unset all session variables
    $_SESSION = array();

    // Destroy the session
    session_destroy();

    // Redirect to login page
    header("Location: ../login.php");
    exit;
}

// Function to restrict access through direct URL entry
function restrictAccess() {
    // If user tries to access the page directly without logging in, redirect to login page
    if (!isset($_SESSION['valid']) || $_SESSION['valid'] !== true) {
        header("Location: ../login.php");
        exit;
    }
}

// Check if logout action is requested
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    logout();
}

// Check if session has expired or user is not logged in
if (isset($_SESSION['valid']) && $_SESSION['valid'] === true) {
    if (isSessionExpired()) {
        // Session expired, redirect to login page
        logout();
    }
} else {
    // User not logged in, redirect to login page
    header("Location: ../login.php");
    exit;
}
?>
