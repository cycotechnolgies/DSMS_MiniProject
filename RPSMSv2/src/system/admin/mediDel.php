<?php
// Assuming you have a database connection already established
// For demonstration purposes, let's assume you're using PDO
require_once '../phpconfigs/conn.php';

// Get data from POST request
$data = json_decode(file_get_contents('php://input'), true);

// Check if 'medId' is provided
if(isset($data['medId'])) {
    // Get the medId from the request data
    $medId = $data['medId'];

    // Perform your database delete operation based on medId
    $stmt = $conn->prepare("DELETE FROM medic WHERE medId = :medId");
    $stmt->execute(array(
        ':medId' => $medId
    ));

    // Send response
    echo json_encode(['success' => true]);
} else {
    // Send response if medId is not provided
    echo json_encode(['success' => false, 'message' => 'medId not provided']);
}
?>
