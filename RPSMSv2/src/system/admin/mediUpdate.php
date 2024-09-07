<?php
// Assuming you have a database connection already established
// For demonstration purposes, let's assume you're using PDO
require_once '../phpconfigs/conn.php';

// Get data from POST request
$data = json_decode(file_get_contents('php://input'), true);

// Here you can perform your database update with the received data
$textInput = $data['textInput'];
$dateInput = $data['dateInput'];
$timeInput = $data['timeInput'];
$medId = $data['medId']; // Get the medId from the request data

$appoint = $dateInput .' ' . $timeInput;

// Perform database update with medId in the WHERE clause
$stmt = $conn->prepare("UPDATE medic SET refId = :text, apponite = :apponite WHERE medId = :medId");
$stmt->execute(array(
    ':text' => $textInput,
    ':apponite' => $appoint,
    ':medId' => $medId, // Bind the medId parameter
));

// Send response
echo json_encode(['success' => true]);
?>
