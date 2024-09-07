<?php
require_once '../phpconfigs/conn.php';

try {
    // Retrieve data from POST request
    $fullName = $_POST['fname'];
    $staffId = $_POST['studentId'];
    $gen = $_POST['gen'];
    $nic = $_POST['nic'];
    $ppn = $_POST['ppn'];
    $addr = $_POST['addr'];
    $tel = $_POST['tel'];
    $wa = $_POST['wa'];
    
    // Validate inputs (Example: you can use more specific validation functions)
    if (empty($fullName) || empty($staffId)) {
        throw new InvalidArgumentException("Full Name and Staff ID are required fields.");
    }
    // Add more validation as needed for other fields

    // Prepare and execute the query
    $query = "UPDATE staff 
              SET fullName = :fullName,
                  gen = :gen,
                  nic = :nic,
                  passNo = :ppn,
                  addr = :addr,
                  tel = :tel,
                  waNo = :wa
              WHERE userId = :id";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':fullName', $fullName);
    $stmt->bindParam(':gen', $gen);
    $stmt->bindParam(':nic', $nic);
    $stmt->bindParam(':ppn', $ppn);
    $stmt->bindParam(':addr', $addr);
    $stmt->bindParam(':tel', $tel);
    $stmt->bindParam(':wa', $wa);
    $stmt->bindParam(':id', $staffId);
    
    $stmt->execute();

    echo "Data updated successfully!".$staffId;
} catch(PDOException $e) {
    // Log the error for debugging
    error_log("Error: " . $e->getMessage());
    // Display a user-friendly error message
    echo "An error occurred while updating data. Please try again later.".$e;
} catch(InvalidArgumentException $e) {
    // Display a user-friendly validation error message
    echo $e->getMessage();
} finally {
    // Close the database connection
    $conn = null;
}
?>
