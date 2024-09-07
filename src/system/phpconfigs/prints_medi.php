<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php';

$errors = array();

$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";

if (isset($_GET['pid']) && isset($_GET['uid'])) {
    $mId = $_GET['uid'];
    $payId = $_GET['pid'];

    try {
        $query = "SELECT *, DATE(pay_date)
        FROM medic
        LEFT JOIN medi_payments ON medic.medId = medi_payments.mediId
        WHERE medic.medId = :medId  AND medi_payments.mpay_id = :payId
        LIMIT 1;";


        $rows = $conn->prepare($query);
        $rows->bindParam(':medId', $mId);
        $rows->bindParam(':payId', $payId);
        $rows->execute();

        if ($rows->rowCount() > 0) {
            $result = $rows->fetch();

            $uName = $result['fullName'];
            $addr = $result['addr'];
            $tel = $result['tel'];
            $waNo = $result['waNo'];
            $amount = $result['amount'];
            $pdate = $result['pay_date'];
            $pType = $result['payType'];
            $Pstatus = $result['pay_state'];
            $reason = $result['reason'];
            $slip = $result['slip'];

            $ftype = "1";
        } else {
            $errors[] = "No data found for the given User ID and Payment ID.";
        }
    } catch (PDOException $e) {
        $errors[] = "SQL Error: " . $e->getMessage();
    }
} else {
    $errors[] = "Missing User ID or Payment ID.";
}

// Assuming $conn is your PDO connection
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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
    <!-- Error Output -->
    <?php if (!empty($errors)): ?>
        <div class="error">
            <?php foreach ($errors as $error): ?>
                <p><?php echo htmlspecialchars($error); ?></p>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

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
            .save('RPSMS-Payment.pdf');
    }
    </script>

    <div class="btnHead">
    <style>
        /* Define styles for the div */
        .btnHead {
            color: gray;
            text-align: right;
            margin-bottom: 20px;
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
            Invoice No.<br />
            <span style="font-weight: bold; font-size: 12pt;">#00<?php echo $payId; ?></span>
        </td>
    </tr>
</table>
    </div>
<hr>
<h3 style="text-align: center; font-weight: bold;">Medical Payments</h3>
<hr>
<div style="display: flex; justify-content:right; padding-right: 3rem; font-family:Arial;">
    <p>Issued Date : <?php echo date("Y-m-d"); ?></p>
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
                <th class="tableHead" width="40%" >Medical ID </td>
                <td class="tableData" ><?php echo $mId?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Name</td>
                <td class="tableData" ><?php echo $uName?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Address</td>
                <td class="tableData" ><?php echo $addr?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Contact</td>
                <td class="tableData" ><?php echo $tel?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >WhatsApp</td>
                <td class="tableData" ><?php echo $waNo?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Payment Method</td>
                <td class="tableData" ><?php echo $pType?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Amount</td>
                <td class="tableData" ><?php echo $amount?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Payment Status </td>
                <td class="tableData" ><?php echo $Pstatus?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Payment Date</td>
                <td class="tableData" ><?php echo $pdate?></td>
            </tr>
            <tr class="tableRow">
                <th class="tableHead" width="40%" >Reason</td>
                <td class="tableData" ><?php echo $reason?></td>
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