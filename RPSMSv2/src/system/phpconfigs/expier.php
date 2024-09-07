<?php

require_once '../phpconfigs/conn.php'; 

try {
    $sql = "SELECT * FROM cards";
    $result = $conn->query($sql);

    if ($result) {
        // Output data of each row
        while($row = $result->fetch()) {
            $cardId = $row['cardId'];
            $validity = $row['Validity'];
            $timestamp = $row['created'];
            $expire_date = $row['Exp_Date'];
            $expire_hours = $row['Hrs'];

            // Calculate expiration time
            $expiration_time = date('Y-m-d H:i:s', strtotime($timestamp . " + $expire_hours hours"));

            // Get current time
            $current_time = date('Y-m-d H:i:s');
            $current_date = date('Y-m-d');

            if($expiration_time != $expire_date && $expire_hours = '0'){
                $expiration_time = $expire_date;
            }

            
            // Determine if expired
            if ($current_time > $expiration_time || $current_date > $expire_date) {
                
                if ($validity != "Expired") {
                    $status = "Expired";

                    // Update the specific card's validity
                    $sql = "UPDATE cards SET validity = :val WHERE cardId = :cardId";

                    $stmt = $conn->prepare($sql);

                    $stmt->bindParam(':val', $status);
                    $stmt->bindParam(':cardId', $cardId);

                    $stmt->execute();
                }
            } else {
                
                if ($validity != "Active") {
                    $status = "Active";

                    // Update the specific card's validity
                    $sql = "UPDATE cards SET validity = :val WHERE cardId = :cardId";

                    $stmt = $conn->prepare($sql);

                    $stmt->bindParam(':val', $status);
                    $stmt->bindParam(':cardId', $cardId);

                    $stmt->execute();
                }
            }
        }
    } else {
        echo "0 results";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>
