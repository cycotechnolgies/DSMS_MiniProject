<?php
// Include your PDO configuration file or create a new PDO connection here
    require_once 'conn.php';

    if(isset($_GET['userId'])) {
        $userId = $_GET['userId'];

        try {
            $conn->beginTransaction();

            $query2 = "DELETE FROM staff WHERE userId = :userId";
            $stmt2 = $conn->prepare($query2);
            $stmt2->bindParam(':userId', $userId, PDO::PARAM_INT);
            $stmt2->execute();

            $query3 = "DELETE FROM users WHERE userId = :userId";
            $stmt3 = $conn->prepare($query3);
            $stmt3->bindParam(':userId', $userId, PDO::PARAM_INT);
            $stmt3->execute();

            $conn->commit();

            header("Location: ../students.php");
            exit();
        } catch (PDOException $e) {
            $conn->rollBack();
            echo "Error: " . $e->getMessage();
        }
    } elseif(isset($_GET['staffId'])) {
        try{
        $query2 = "DELETE FROM staff WHERE userId = :userId";
        $stmt2 = $conn->prepare($query2);
        $stmt2->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt2->execute();

        $query3 = "DELETE FROM users WHERE id = :userId";
        $stmt3 = $conn->prepare($query3);
        $stmt3->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt3->execute();
        
        $conn->commit();

        header("Location: ../staff.php");
        exit();

         }catch (PDOException $e) {
            $conn->rollBack();
            echo "Error: " . $e->getMessage();
        }
    }else{
        echo "User ID not provided";
    }
?>

?>
