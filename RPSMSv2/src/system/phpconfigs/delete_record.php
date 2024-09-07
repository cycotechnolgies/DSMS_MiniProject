<?php
// Include your PDO configuration file or create a new PDO connection here
require_once 'conn.php';

if(isset($_GET['reId'])){
    $reId = $_GET['reId'];
}else{
    $reId = 0;
}

if (isset($_GET['staffId']) && isset($_GET['userId'])) { // Added a closing parenthesis and fixed logic
    $staffId = $_GET['staffId'];
    $userId = $_GET['userId'];

    try {
        $conn->beginTransaction();

        $query1 = "DELETE FROM staff WHERE staffId = :staffId"; // Corrected column name
        $stmt1 = $conn->prepare($query1);
        $stmt1->bindParam(':staffId', $staffId, PDO::PARAM_INT); // Corrected parameter name
        $stmt1->execute();

        $query2 = "DELETE FROM users WHERE userId = :userId"; // Assuming 'id' is the correct column name for users
        $stmt2 = $conn->prepare($query2);
        $stmt2->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt2->execute();

        $conn->commit();
        if($reId == 1){
            header("Location: ../staff/staff.php");
        }else{
            header("Location: ../admin/staff.php");
        }
        
        exit();
    } catch (PDOException $e) {
        $conn->rollBack();
        echo "Error: " . $e->getMessage();
    }
} elseif (isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    try {
        $conn->beginTransaction();

        $query1 = "DELETE FROM payments WHERE userId = :userId";
        $stmt1 = $conn->prepare($query1);
        $stmt1->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt1->execute();

        $query2 = "DELETE FROM student WHERE userId = :userId";
        $stmt2 = $conn->prepare($query2);
        $stmt2->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt2->execute();

        $query3 = "DELETE FROM users WHERE userId = :userId";
        $stmt3 = $conn->prepare($query3);
        $stmt3->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt3->execute();

        $query4 = "DELETE FROM requests WHERE userId = :userId";
        $stmt4 = $conn->prepare($query4);
        $stmt4->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt4->execute();

        $query5 = "DELETE FROM progress WHERE userId = :userId";
        $stmt5 = $conn->prepare($query5);
        $stmt5->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt5->execute();

        $conn->commit();
        
        if($reId == 1){
            header("Location: ../staff/students.php");
        }else{
            header("Location: ../admin/students.php");
        }

        exit();
    } catch (PDOException $e) {
        $conn->rollBack();
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "User ID not provided";
}
?>
