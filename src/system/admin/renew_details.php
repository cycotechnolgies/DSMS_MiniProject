<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php';

$errors = array();

$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";
$reId = $_GET['rid'];
$errors = "";
// $userId = "";


// echo $payId;

$query = "SELECT * FROM renew WHERE reId = :rid";


$rows = $conn->prepare($query);
// $rows->bindParam(':userId', $userId);
$rows->bindParam(':rid', $reId);
$rows->execute();
$result = $rows->fetch(PDO::FETCH_ASSOC);

  $fname = $result['fname'];
  // $userId = $result['userId'];
  $barcode = $result['barcode'];
  $reId = $result['reId'];
  $exp = $result['exp'];
  $opens = $result['opens'];
  $tel = $result['tel'];
  $waNo = $result['waNo'];
  $vehi = $result['vehi'];
  $nic = $result['nic'];
  $reType = $result['reType'];
  $exp = $result['exp'];
  $branch = $result['branch'];
  $colls = $result['collectedBy'];
  $col_name = $result['collectorName'];
  $col_nic = $result['collectorNIC'];

  //update logics and queries
if (isset($_POST['update'])) {

    $event = $_POST['event'];
    
    if($_POST['event'] === 'Send to renew'){
      $event = $_POST['event'];
      $dates = $_POST['dates'];
      
      $sql = "INSERT INTO re_status(reId, reState, dates) VALUES(:reId, :reState, :dates);";

      $stmt = $conn->prepare($sql);

      $stmt->bindParam(':reId', $reId);
      $stmt->bindParam(':reState', $event);
      $stmt->bindParam(':dates', $dates);

      if($stmt->execute()){
        
        $upt_state = 'UPDATE renew SET opens ="In Progress" WHERE reId = :reid';

        $uptStmt = $conn->prepare($upt_state);

        $uptStmt->bindParam(':reid', $reId);

        $uptStmt->execute();

        header("Location: renew_details.php?rid=$reId&cGFpZCBhdA");
        exit();
      }else{
        $errors = "Update Failed";
      }
    }elseif($_POST['event'] === 'Renewed' && !empty($_POST['exp'])){
      $event = $_POST['event'];
      $dates = $_POST['dates'];
      $exp = $_POST['exp'];
      
      $sql = "INSERT INTO re_status(reId, reState, dates) VALUES(:reId, :reState, :dates);";

      $stmt = $conn->prepare($sql);

      $stmt->bindParam(':reId', $reId);
      $stmt->bindParam(':reState', $event);
      $stmt->bindParam(':dates', $dates);

      if($stmt->execute()){
        
        $upt_state = 'UPDATE renew SET opens =:exp WHERE reId = :reid';

        $uptStmt = $conn->prepare($upt_state);

        $uptStmt->bindParam(':exp', $exp);
        $uptStmt->bindParam(':reid', $reId);

        $uptStmt->execute();

        header("Location: renew_details.php?rid=$reId&cGFpZCBhdA");
        exit();
      }else{
        $errors = "Update Failed...! Invalid Expire Date.";
      }
    }elseif($_POST['event'] === 'Collected' && !empty($_POST['col-name']) && !empty($_POST['col-id']) && !empty($_POST['collect'])){
      $event = $_POST['event'];
      $dates = $_POST['dates'];
      $collector = $_POST['collect'];
      $collectorName = $_POST['col-name'];
      $collectorNic = $_POST['col-id'];
      
      $sql = "INSERT INTO re_status(reId, reState, dates) VALUES(:reId, :reState, :dates);";

      $stmt = $conn->prepare($sql);

      $stmt->bindParam(':reId', $reId);
      $stmt->bindParam(':reState', $event);
      $stmt->bindParam(':dates', $dates);

      if($stmt->execute()){
        
        // Update statement
        $upt_state = "UPDATE renew SET collectedBy = :collector, collectorName = :collectorName, collectorNIC = :collectorNic WHERE reId = :reid";
        $uptStmt = $conn->prepare($upt_state);

        // Bind parameters correctly
        $uptStmt->bindParam(':collector', $collector); 
        $uptStmt->bindParam(':collectorName', $collectorName);
        $uptStmt->bindParam(':collectorNic', $collectorNic); 
        $uptStmt->bindParam(':reid', $reId);

        $uptStmt->execute();

        header("Location: renew_details.php?rid=$reId&cGFpZCBhdA");
        exit();
      }else{
        $errors = "Update Failed. User Data is Not Valid";
      }
    }
}

// delete logics and queries
if(isset($_POST['del'])){
  $del = "DELETE FROM renew WHERE reId = :reid";

  $delStmt = $conn->prepare($del);

  $delStmt->bindParam(':reid', $reId);

  if($delStmt->execute()){
    $delrec = "DELETE FROM re_status WHERE reId = :reid";

    $delrecStmt = $conn->prepare($delrec);

    $delrecStmt->bindParam(':reid', $reId);

    $delrecStmt->execute();

    header("Location: renewal.php");
    exit();
    
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
    <!-- Include SweetAlert2 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="../../js/sidebar.js" defer></script>
    <title>Renew Details - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Renewal Details</h4>
          <hr class="mt-3 border-blue-600">
        </div>
        <?php
        
        if(!empty($errors)){
          echo '
          <div class="px-2">
            <p class="bg-red-200 text-red-600 font-semibold p-4 mt-2 rounded-lg"><i class="fa-solid fa-circle-exclamation"></i> Error : '.$errors.'</p>
          </div>
          ';
        }

        ?>
        <form action="" method="post">
          <div class="grid grid-cols-1 md:grid-cols-2 p-2">
            
            <div class="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="" for="dates">Update Events: </label>
                  <select name="event" id="" class="p-2 border border-gray-400 rounded-md w-full" required>
                    <option value="">--Select Event--</option>
                    <option value="Send to renew">Send to renew</option>
                    <option value="Renewed">Renewed</option>
                    <option value="Collected">Collected By customer</option>
                  </select>
                </div>
                <div>
                  <label class="" for="dates">Update Date: </label>
                  <input class="p-2 border border-gray-400 rounded-md w-full" type="date" name="dates" id="dates" required>
                </div>
            </div>
            <div class="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="" for="dates">New Exp. Date: </label>
                <input class="p-2 border border-gray-400 rounded-md w-full" type="date" name="exp" id="exp" >
              </div>
              <div>
                  <label class="" for="dates">Collected By: </label>
                  <select name="collect" id="" class="p-2 border border-gray-400 rounded-md w-full" >
                    <option value="">--Select Event--</option>
                    <option value="Owner">Owner</option>
                    <option value="Not Owner">Not Owner</option>
                  </select>
                </div>
            </div>
            <div class="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="" for="dates">Collector's Name: </label>
                <input class="p-2 border border-gray-400 rounded-md w-full" type="text" name="col-name" id="exp">
              </div>
              <div>
                  <label class="" for="dates">Collector NIC: </label>
                  <input class="p-2 border border-gray-400 rounded-md w-full" type="text" maxlength="12" name="col-id" id="exp">
              </div>
            </div>
            
            <div class="p-4 gap-4 flex flex-row justify-end items-baseline">
              <button name="update" class="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg">Update</button>
              </form>
              <form method="post">
                <button type="submit" name="del" class="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg">Delete</button>
              </form>
            </div>
          </div>
          

        <!-- Timeline -->
        <div>
          <?php include "renew_timeline.php"; ?>
        </div>

        <!-- details -->
        <div class="p-4">
        <div class="relative overflow-hidden">
        <div class="p-4">
            
        </div>
    <table class="table-auto w-full text-left">
        <tbody class="bg-white text-gray-500">
            <tr class="py-3">
                <th class="py-3 border   p-4" >Renew ID</th>
                <td class="py-3 border   p-4" ><?php echo $reId; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >User Name</th>
                <td class="py-3 border   p-4" ><?php echo $fname; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Contact</th>
                <td class="py-3 border   p-4" ><?php echo $tel; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >WhatsApp</th>
                <td class="py-3 border   p-4" ><?php echo $waNo; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Branch</th>
                <td class="py-3 border   p-4" ><?php echo $branch; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Vehical Class</th>
                <td class="py-3 border   p-4" ><?php echo $vehi; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Barcode</th>
                <td class="py-3 border   p-4" ><?php echo $barcode; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border  p-4" >Exp. Date</th>
                <td class="py-3 border   p-4" ><?php echo $exp; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >New Exp. Date</th>
                <td class="py-3 border   p-4" ><?php echo $opens; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Collected By</th>
                <td class="py-3 border   p-4" ><?php echo $colls; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Collector Name</th>
                <td class="py-3 border   p-4" ><?php echo $col_name; ?></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Collector NIC</th>
                <td class="py-3 border   p-4" ><?php echo $col_nic; ?></td>
            </tr>
            
        </tbody>
    </table>
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
    <!-- Include SweetAlert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../../js/renew.js"></script>
  </body>
</html>
