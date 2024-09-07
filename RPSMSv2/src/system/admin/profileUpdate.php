<?php
require_once '../phpconfigs/conn.php';


try {
    
    // Retrieve data from POST request
    $fullName = $_POST['fname'];
    $studentId = $_POST['studentId'];
    $initName = $_POST['inName'];
    $dob = $_POST['dob'];
    $age = $_POST['age'];
    $gen = $_POST['gen'];
    $nic = $_POST['nic'];
    $ppn = $_POST['ppn'];
    $addr = $_POST['addr'];
    $tel = $_POST['tel'];
    $wa = $_POST['wa'];
    $email = $_POST['email'];
    

    // Prepare and execute the query
    $query = "UPDATE student 
              SET fullName = :fullName, 
                  initName = :initName,
                  dob = :dob,
                  age = :age,
                  gen = :gen,
                  nic = :nic,
                  passNo = :ppn,
                  addr = :addr,
                  tel = :tel,
                  waNo = :wa,
                  email = :email 
              WHERE stuId = :id";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':fullName', $fullName);
    $stmt->bindParam(':initName', $initName);
    $stmt->bindParam(':dob', $dob);
    $stmt->bindParam(':age', $age);
    $stmt->bindParam(':gen', $gen);
    $stmt->bindParam(':nic', $nic);
    $stmt->bindParam(':ppn', $ppn);
    $stmt->bindParam(':addr', $addr);
    $stmt->bindParam(':tel', $tel);
    $stmt->bindParam(':wa', $wa);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':id', $studentId);
    
    $stmt->execute();

    echo "Data updated successfully!";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
?>
