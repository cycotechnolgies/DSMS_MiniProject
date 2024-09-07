<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php';

$errors = array();

$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";

if (isset($_GET['cardId'])) {  
    $cardId = $_GET['cardId'];

    // Corrected SQL query with proper syntax
    $query = "SELECT cards.*, DATE(cards.created) AS date_only, schedule.*
              FROM cards
              INNER JOIN schedule ON cards.ClassId = schedule.schedId 
              WHERE cards.cardId = :sids;";
    
    // Prepare the statement
    $rows = $conn->prepare($query);
    $rows->bindParam(':sids', $cardId);
    $rows->execute();

    // Fetch the result
    $result = $rows->fetch(PDO::FETCH_ASSOC);  

    if ($result) {  
        $create = $result['date_only'];
        $shedId = $result['ClassId'];
        $date = $result['dateTime'];
        $userId = $result['userId'];
        $types = $result['Types'];
        $branch = $result['branch'];
        $inst = $result['instructor'];
        $exp = $result['Exp_Date'];
        $day = $result['dateTime'];
        $expH = $result['Hrs'];
        $cdate = $result['created'];
        $valid = $result['validity'];

        // Query for user data
        $user_q = "SELECT users.*, student.*, requests.* 
                   FROM users 
                   INNER JOIN student ON users.userId = student.userId 
                   INNER JOIN requests ON users.userId = requests.userId 
                   WHERE users.userId = :usrId;";
        $ustmt = $conn->prepare($user_q);
        $ustmt->bindParam(':usrId', $userId);  
        $ustmt->execute();
        $user_result = $ustmt->fetch(PDO::FETCH_ASSOC);

        if ($user_result) {
            $name = $user_result['fname'] . ' ' . $user_result['lname'];
            $nic = $user_result['nic'];
            $vehi = !empty($user_result['vehiClass']) ? $user_result['vehiClass'] : "All Vehicles";
            $tel = $user_result['tel'];

            // Query for payment data
            $pay_q = "SELECT SUM(amount) AS total_paid 
                      FROM payments 
                      WHERE pay_state = 'paid' AND userId = :usrId;";
            $pstmt = $conn->prepare($pay_q);
            $pstmt->bindParam(':usrId', $userId);  
            $pstmt->execute();
            $pay_result = $pstmt->fetch(PDO::FETCH_ASSOC);
            $paid = $pay_result['total_paid'];

            // Query for performance data
            $pre_q = "SELECT * FROM preforme 
                      WHERE stuId = :usrId 
                      ORDER BY Dates DESC LIMIT 3;";
            $pestmt = $conn->prepare($pre_q);
            $pestmt->bindParam(':usrId', $userId, PDO::PARAM_INT);  // Ensure userId is an integer
            $pestmt->execute();
            $pre_result = $pestmt->fetchAll(PDO::FETCH_ASSOC);

            // You can now use $pre_result as needed
        }
    } else {
        echo "No data found for the given card ID.";
    }
} else {
    echo "No card ID provided.";
}
?>


<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Print & Download</title>
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.3/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
</head>
<body>
    <script>
        function printContent() {
            var printContent = document.getElementById("printableContent").innerHTML;
            var originalContent = document.body.innerHTML;
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
        }
        function downloadPDF() {
        var element = document.getElementById('printableContent');
        html2pdf()
            .from(element)
            .save('RPSMS-Training Card.pdf');
    }
    </script>

    <div class="btnHead">
    <style>
        /* Define styles for the div */
        .btnHead {
            color: gray;
            text-align: right;
            margin-bottom: 20px;
            background-color: gray;
        }

        /* Define styles for the buttons */
        button {
            padding: 8px 16px; /* Adjust padding as needed */
            border: none;
            cursor: pointer;
            border-radius: 4px;
        }

        /* Print button specific styles */
        button.print {
            background-color: blue;
            color: white;
            margin-right: 10px; /* Add right margin to create space between buttons */
        }

        /* Download button specific styles */
        button.download {
            background-color: red;
            color: white;
        }
    </style>
        <button class="print" onclick="printContent();"><i class="fa-solid fa-print"></i> Print</button>
        <button class="download" onclick="downloadPDF()" style="margin: 20px;">Download PDF</button>
    </div>
    <div id="printableContent">
    <div style="padding-top: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem">
    <table width="100%" style=" font-family: sans-serif;">
    <tr>
        <td>
            <img src="../../images/logo.png" width="100px" alt="">
         </t    d>
         <td width="75%" style="line-height: 22px;">
            <span style="font-weight: bold; font-size: 14pt;">Riyaduru Piyasa Driving School</span><br />
            Ampara | Dehiaththakandiya<br />
            Tel: 070 7930930 / 070 6312979 | WhatsApp : 070 7930930<br />
            Email : riyadurupiyasad2020@gmail.com <br />
         </td>
        <td width="50%" style="text-align: right; vertical-align: top;">
            Card No.<br />
            <span style="font-weight: bold; font-size: 12pt;">#00<?php echo $cardId; ?></span>
        </td>
    </tr>
</table>
    </div>
<hr>
<h3 style="text-align: center; font-weight: bold; ">Training Card</h3>
<hr>
<div style="display: flex; justify-content:right; padding-right: 3rem; font-family:Arial;">
    <p>Issued Date : <?php echo $create; ?></p>
</div>
<div>
<style>
    .tableArea{
        overflow: hidden;
        display: flex;
        justify-items: center;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .tableBase{
        width: 100%; 
        text-align: left; 
        table-layout: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        
    }
    .tableRow{
        padding-top: 1.25rem;
        padding-bottom: 1.25rem; 
    }
    .tableHead{
        /* padding: 0.5rem;  */
        font-family: Arial;
        padding-left: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem; 
        text-align: left;
        background-color: #E5E7EB;
    }
    .tableData{
        /* padding: 0.5rem;  */
        font-family: Arial;
        padding-left: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem; 
        text-align: left;
        background-color: #F3F4F6;
    }
</style>
<div class="tableArea">
    <table class="tableBase">
        <tbody class="bg-white text-gray-500">
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Register No </td>
                <td class="tableData" ><?php echo $userId?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Name</td>
                <td class="tableData" ><?php echo $name?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >NIC No.</td>
                <td class="tableData" ><?php echo $nic?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Vehicle Class</td>
                <td class="tableData" ><?php echo $vehi?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Total Payment (Paid)</td>
                <td class="tableData" ><?php echo $paid?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Branch</td>
                <td class="tableData" ><?php echo $branch?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Training Type</td>
                <td class="tableData" ><?php echo $types ?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Trining Date</td>
                <td class="tableData" ><?php echo $day ?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Card Status </td>
                <td class="tableData" ><?php echo $valid ?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Expire Date</td>
                <td class="tableData" ><?php echo $exp?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Last Trainings</td>
                <td class="tableData" ><?php 
                    if (!empty($pre_result)) {
                        echo "<ul>";  // Start of the HTML list
                        foreach ($pre_result as $row) {
                            // Replace 'column_name' with the actual column you want to display in the list
                            echo "<li>" . $row['vehi'] . " - ".$row['preform']. " - ".$row['hrs']."hrs</li>";  // Ensure to use htmlspecialchars to prevent XSS
                        }
                        echo "</ul>";  // End of the HTML list
                    } else {
                        echo "<p>No results found.</p>";
                    }
                
                ?></td>
            </tr>
        </tbody>
    </table>
</div>
</div>
<div style="text-align: center; font-family: Arial;">
<p>Generated by RPSMS online. If any issue contact branch..!</p>
<h4>Thank You..!</h4>
</div>
</div>
</body>
</html>