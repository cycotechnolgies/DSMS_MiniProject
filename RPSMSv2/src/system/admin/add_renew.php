<!DOCTYPE html>

<?php

session_start();

require_once '../phpconfigs/conn.php'; 

$errors = array();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form data
    $fullname = $_POST['fname'];
    $exp = $_POST['exp'];
    $nic = $_POST['nic'];
    $passport = $_POST['ppn'];
    $barcode = $_POST['barcode'];
    $mobile = $_POST['mobi'];
    $whatsapp = $_POST['wa'];
    $vehi = $_POST['vehi'];
    $branch = $_POST['branch'];
    $reType = $_POST['reType'];
    $opens = "pending";

    

    // Prepare an SQL statement to insert data into the database
    $query = "INSERT INTO renew(fname, nic, ppn, reType, branch, barcode, vehi, tel, waNo, exp, opens) 
    VALUES (:fullName, :nic, :ppn, :reType, :branch, :barcode, :vehi, :tel, :waNo, :exp, :opens);";

    $stmt = $conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(':fullName', $fullname);
    $stmt->bindParam(':nic', $nic);
    $stmt->bindParam(':ppn', $passport); 
    $stmt->bindParam(':reType', $reType);
    $stmt->bindParam(':branch', $branch);
    $stmt->bindParam(':barcode', $barcode);
    $stmt->bindParam(':vehi', $vehi);
    $stmt->bindParam(':tel', $mobile); 
    $stmt->bindParam(':waNo', $whatsapp); 
    // $stmt->bindParam(':userId', $uid);
    $stmt->bindParam(':exp', $exp);
    $stmt->bindParam(':opens', $opens);

    // Execute the prepared statement
    try {
      if($stmt->execute()){
          $pquery = "SELECT * FROM renew WHERE barcode = :barcode;";
          $prows = $conn->prepare($pquery);
          $prows->bindParam(':barcode', $barcode); // Bind the barcode parameter
          $prows->execute();
          $presult = $prows->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
  
          if($presult){
              $reId = $presult['reId']; // Ensure that $reId exists in $presult
              $req = "Submitted";
              $dates = date('Y-m-d');
  
              $ins = "INSERT INTO re_status(reId, reState, dates) VALUES(:reId, :reState, :dates);";
  
              $stmt = $conn->prepare($ins);
  
              // Bind parameters
              $stmt->bindParam(':reId', $reId);
              $stmt->bindParam(':reState', $req);
              $stmt->bindParam(':dates', $dates);
  
              // Execute the prepared statement
              if ($stmt->execute()) {
                  echo "New record created successfully";
                  header("Location: success.php");
                  exit();
              } else {
                  echo "Error: Unable to insert record.";
              }
          } else {
              echo "Error: No matching record found for barcode.";
          }
      }
  } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
  }
  catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
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
    <!-- <script src="/src/js/interaction.js" defer></script> -->
    <title>Renewal - RPSMS</title>
  </head>
  <div>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
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
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li class="p-2">User ID : <?php echo $_SESSION['uid']; ?></li>
                    <li><a href="../phpconfigs/logout.inc.php">Logout</a></li>
                    </ul>
                </div>
                </div>
            </div>
        
            <!-- main -->
            <div data-theme="none" class="p-4">
            <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-retweet"></i> Renewal</h4>
            <hr class="mt-3 border-blue-600">
            </div>
            <div class="p-4">
                <form action="" method="post">
                    <div>
                      <div class="cols">
                        <label for="fname">Full Name / සම්පූර්ණ නම<span class="text-red-500">*</span></label><br>
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="fname" name="fname" placeholder="Dissanayaka Mudiyanselage Saman Kumara " required/>
                      </div>
                      <div class="cols grid md:grid-cols-2 gap-4">
                        <div>
                          <label for="nic">NIC No. / හැඳුනුම්පත් අංකය<span class="text-red-500">*</span></label><br>
                          <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="nic" name="nic" maxlength="12" placeholder="96******* V / 20**********" required/>
                        </div>
                          <div>
                          <label for="ppn">Passport No. / විදේශ ගමන් බලපත්‍ර අංකය</label><br>
                          <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="ppn" name="ppn" placeholder="N17******" maxlength="10"/>
                        </div>
                        </div>
                        
                        <div class="cols grid md:grid-cols-2 gap-4">
                            <div>
                            <label for="branch">Renewal Type / අලුත් කිරීමේ වර්ගය<span class="text-red-500">*</span></label>
                            <select name="reType" id="reType" class="w-full my-2 p-2 rounded-md border border-gray-400" required>
                                <option value="">--Select a type--</option>
                                <option value="L prrmit">L Permit</option>
                                <option value="Temporary License">Temporary License</option>
                            </select>
                            </div>
                            <div class="cols">
                            <label for="branch">Select Branch / ශාඛාව තෝරන්න<span class="text-red-500">*</span></label>
                            <select name="branch" name="branch" id="branch" class="w-full my-2 p-2 rounded-md border border-gray-400" required>
                                <option value="">--Select a Branch--</option>
                                <option value="Ampara">Ampara</option>
                                <option value="Dehiaththakandiya">Dehiaththakandiya</option>
                            </select>
                        </div>
                        </div>
                        <div class="cols grid md:grid-cols-2 gap-4">
                          <div>
                            <label for="barcode">barcode No. / බාර්කෝඩ් අංකය<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="barcode" name="barcode" placeholder="011125366" required/>
                          </div>
                            <div>
                              <label for="exp">Expierd Date / කල්ඉකුත්වීමේ දිනය<span class="text-red-500">*</span></label>
                              <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="date" id="exp" name="exp" required/>
                          </div>
                        </div>
                        <div>
                          <label for="vehi">Vehical Class / වාහන පන්ති<span class="text-red-500">*</span></label><br>
                          <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="vehi" name="vehi" placeholder="A, A1, ..." required/>
                        </div>
                        <div class="cols grid md:grid-cols-2 gap-4">
                          <div>
                            <label for="mobi">Mobile No. / දුරකථන අංකය<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="mobi" name="mobi" maxlength="10" placeholder="07* *******" required/>
                          </div>
                            <div>
                              <label for="wa">WhatsApp No. / වට්ස්ඇප් අංකය<span class="text-red-500">*</span></label>
                              <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="wa" name="wa" placeholder="07* *******" maxlength="10" required/>
                          </div>
                        </div>
                    </div>
                    <div class="w-full flex flex-row butons items-center justify-between my-4 p-2">
                    <button class="btn btn-md px-10 py-2 rounded-md bg-gray-200  text-gray-400 border border-gray-400 " onclick="window.history.back()" id="cancelBtn"  type="button">Cancel</button>
                    <button id="submit" class="btn btn-md bg-green-600 border-none text-white px-12 py-2 rounded-lg shadow-md cursor-pointer font-semibold disabled:bg-green-300 disabled:text-green-400 disabled:cursor-not-allowed hover:bg-green-800" type="submit">Submit</button>
                </div>
                </form>
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
