<?php
require_once '../phpconfigs/conn.php';
// require_once '../phpconfigs/session_manager.php';

if (isset($_POST['del'])) {
    $cardId = $_POST['cardId'];

    try {
        $query = "DELETE FROM cards WHERE cardId = :cardId";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':cardId', $cardId, PDO::PARAM_INT);
        $stmt->execute();

        // Redirect to the previous page or show a success message
        header("Location: ../admin/train_card.php");
    } catch (PDOException $e) {
        // Handle the error
        echo "Error: " . $e->getMessage();
    }
} else {
    // If cardId is not set
    header("Location: ../path/to/your/page.php?status=error");
}
?>
