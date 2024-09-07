<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php';

$errors = array();

$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";
$userId = $_GET['uid'];
$payId = $_GET['pid'];

// echo $payId;

$query = "SELECT *, DATE(date)
FROM student
LEFT JOIN payments ON student.userId = payments.userId
WHERE student.userId = :userId  AND payments.payId = :payId
LIMIT 1;";


$rows = $conn->prepare($query);
$rows->bindParam(':userId', $userId);
$rows->bindParam(':payId', $payId);
$rows->execute();
$result = $rows->fetch(PDO::FETCH_ASSOC);

$uName = $result['initName'];
$addr = $result['addr'];
$tel = $result['tel'];
$waNo = $result['waNo'];
$branch = $result['branch'];
$amount = $result['amount'];
$pdate = $result['date'];
$pType = $result['payType'];
$Pstatus = $result['pay_state'];
$reason = $result['reason'];
$slip = $result['slip'];

if (isset($_POST['uptPay'])) {

    $payUpdate = $_POST['payupdate'];
    
    $sql = "UPDATE payments SET pay_state = :newPayState WHERE payId = :payId";

    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Bind the parameters
    $stmt->bindParam(':newPayState', $payUpdate, PDO::PARAM_STR);
    $stmt->bindParam(':payId', $payId, PDO::PARAM_INT);

    // Execute the statement
    if ($stmt->execute()) {
        if ($payUpdate == 'Paid') {
            if (file_exists($slip)) { // Check if the file exists
                if (unlink($slip)) { // Attempt to delete the file
                    echo "File deleted successfully.";
                    $fileremove = "Checked and Removed"; // Set to indicate checked and removed
        
                    // Update the database
                    $query = "UPDATE payments SET slip = :slip WHERE payId = :payId";
                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(':slip', $fileremove, PDO::PARAM_STR);
                    $stmt->bindParam(':payId', $payId, PDO::PARAM_INT);
                    $stmt->execute(); // Execute the statement
        
                    header("Location: pay_details.php?uid=$userId&bm90bnVsbA&pid=$payId&cGFpZCBhdAFDS");
                    exit(); // Stop execution after redirection
                } else {
                    echo "Error deleting file.";
                }
            }
        } else {
            header("Location: pay_details.php?uid=$userId&bm90bnVsbA&pid=$payId&cGFpZCBhdA");
            exit(); // Stop execution after redirection
        }
        
    } else {
        echo "Error updating pay state: " . $stmt->errorInfo()[2];
    }
}

if(isset($_POST['delbtn'])){

  $payId = $_POST['payid'];

  $query = "DELETE FROM payments WHERE payId = :payId;";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(':payId', $payId);

  if($stmt->execute()){
    header("Location: payment.php");
    exit();
  }else{
    echo '<h4 class="p-4 bg-red-200 text-red-600 font-semibold"> Error While Deleting Payment...</h4>';
  }
}
?>
<html>
  <head>
    <meta charset="UTF-8" />
    <link
      rel="icon"
      type="image/svg+xml"
      href="../../images/Logos (Custom).png"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="../../css/output.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="../../js/sidebar.js" defer></script>
    <title>Pay Details - RPSMS</title>
  </head>
  <body>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col ">
        <!-- Page content -->
        
        
        <!-- navbar -->
        <div class="navbar bg-base-100 shadow- shadow-blue-400/50">
            <div class="flex-1">
                <label for="my-drawer-2" class="btn drawer-button btn-md bg-blue-400 btn-square lg:hidden"
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5"><path fill="white" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                </label
              >
            </div>
            <div class="flex-none">
              
              <!-- profile -->
              
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full border border-blue-600">
                    <img alt="profile pic" src="<?php
                      if($_SESSION['gen'] === 'male'){
                        echo "../../images/avatars/man.png";
                      }elseif($_SESSION['gen'] === 'female'){
                        echo "../../images/avatars/woman.png";
                      }
                    
                    ?>" />
                  </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                <li class="p-2">User ID : <?php echo $_SESSION['uid']; ?></li>
                  <li><a href="../phpconfigs/logout.inc.php">Logout</a>
                </ul>
              </div>
            </div>
          </div>
        <!-- main -->
        <div data-theme="none" class="p-4">
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Payment Details</h4>
          <hr class="mt-3 border-blue-600">
        </div>
        <div class="p-4">
          <div class="flex justify-end items-end">
                <a href="../phpconfigs/prints.php?pid=<?php echo $payId;?>&uid=<?php echo $userId;?>" target="_blank">
                  <button class="px-4 py-2 rounded-md bg-blue-600 text-white">Print</button>
                </a>
          </div>                
            <hr class="border border-gray-400 my-4">
            
          <div class="relative overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="payId" class="font-semibold">Payment ID</label><br>
                    <input type="text" name="" id="PayId" value="<?php echo $payId; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                  <div>
                    <label for="Uid" class="font-semibold">User ID</label><br>
                    <input type="text" name="" id="Uid" value="<?php echo $userId; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <label for="fname" class="font-semibold">Full Name</label><br>
                  <input type="text" name="" id="fname" value="<?php echo $uName; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                </div>
              </div>
              <div>
                <div>
                  <label for="addr" class="font-semibold">Address</label><br>
                  <input type="text" name="" id="addr" value="<?php echo $addr; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                </div>
              </div>
              <div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="mob" class="font-semibold">Mobile</label><br>
                    <input type="text" name="" id="mob" value="<?php echo $tel; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                  <div>
                    <label for="wa" class="font-semibold">WhatsApp</label><br>
                    <input type="text" name="" id="wa" value="<?php echo $waNo; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                </div>
              </div>
              <div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="br" class="font-semibold">Branch</label><br>
                    <input type="text" name="" id="br" value="<?php echo $branch; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                  <div>
                    <label for="pt" class="font-semibold">Payment Method</label><br>
                    <input type="text" name="" id="pt" value="<?php echo $pType; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                </div>
              </div>
              <div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="am" class="font-semibold">Amount (Rs.)</label><br>
                    <input type="text" name="" id="am" value="<?php echo $amount; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                  <div>
                    <label for="st" class="font-semibold">Status</label><br>
                    <input type="text" name="" id="st" value="<?php echo $Pstatus; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                </div>
              </div>
              <div >
                  <div>
                    <label for="am" class="font-semibold">Reason</label><br>
                    <input type="text" name="" id="am" value="<?php echo $reason; ?>" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
              </div>
              <div>
                <p class="font-semibold mb-2">Slip</p>
                <?php
                  if($slip == "No Slip"){
                    echo '<div class="mt-2 rounded-md w-full bg-blue-200 text-blue-600 font-bold p-2"><p>No Slip Uploaded for this Payment</p></div>';
                  }elseif($slip == "Checked and Removed"){
                    echo '<div class="mt-2 rounded-md w-full bg-blue-200 text-blue-600 font-bold p-2"><p>Uploaded Slip is Checked and Remove</p></div>';
                  }elseif($slip == NULL){
                    echo '<div class="mt-2 rounded-md w-full bg-blue-200 text-blue-600 font-bold p-2"><p>No Slip Uploaded for this Payment</p></div>';
                  }else{
                    echo '<a href="'.$slip.'" target="_blank"><img src="'.$slip.'" alt=""></a>';
                  }
                ?>
              </div>
            </div>
        </div>
        </div>

      </div>
      <div class="drawer-side">
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu p-4 w-60 min-h-full bg-white gap-4 ">
          <!-- Sidebar -->
        <?php 
            include('sidebar.php')
          ?>
        </ul>
      </div>
      </div>
    </div>
  </body>
</html>
