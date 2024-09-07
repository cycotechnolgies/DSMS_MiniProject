<!DOCTYPE html>
<?php
session_start();

// require_once '../phpconfigs/session_manager.php';
require_once '../phpconfigs/conn.php';
$classId = $_GET['cid'];

$errors = array();

$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";

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
    <title>Training Cards - RPSMS</title>
  </head>
  <body>
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
                  <li><a href="../phpconfigs/logout.inc.php">Logout</a>
                </ul>
              </div>
            </div>
          </div>
        <!-- main -->
        <div data-theme="none" class="p-4">
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold ">Training Cards</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- table -->

        <div class="p-4 h-screen mt-4">
          <div class="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4">
          
            <?php
              
              $query = "SELECT cards.*, schedule.*
              FROM cards
              INNER JOIN schedule ON cards.ClassId = schedule.schedId WHERE cards.ClassId = :sids;";
              $rows = $conn->prepare($query);
              $rows->bindParam(':sids', $classId);
              $rows->execute();
              $result = $rows->fetchAll(PDO::FETCH_ASSOC);

              $find = "";
          
                if ($result) {
                    foreach ($result as $row) {
                        // Assuming $shedId, $day, $branch, $clsName, $typ, $inst, $vehi are columns in the result row
                        $cardId = $row['cardId'];
                        $shedId = $row['ClassId'];
                        $date = $row['dateTime'];
                        $userId = $row['userId'];
                        $types = $row['Types'];
                        $branch = $row['branch'];
                        $inst = $row['instructor'];
                        $exp = $row['Exp_Date'];
                        $day = $row['dateTime'];
                        $expH = $row['Hrs'];
                        $cdate = $row['created'];
                        $valid =  $row['validity'];

                        $user_q = "SELECT users.*, student.*, requests.* FROM users 
                        INNER JOIN student ON users.userId = student.userId 
                        INNER JOIN requests ON users.userId = requests.userId 
                        WHERE users.userId = :usrId;";

                        $ustmt = $conn->prepare($user_q);
                        $ustmt->bindParam(':usrId', $userId);  
                        $ustmt->execute();
                        $user_result = $ustmt->fetch(PDO::FETCH_ASSOC);

                        $name = $user_result['fname'] .' '. $user_result['lname'];
                        $nic = $user_result['nic'];
                        if($user_result['vehiClass'] == ""){
                          $vehi = "All Vehicles";
                        }else{
                          $vehi = $user_result['vehiClass'];
                        }
                        $tel = $user_result['tel'];
                        
                        $pay_q = "SELECT SUM(amount) AS total_paid FROM payments WHERE pay_state = 'paid' AND userId = :usrId;";

                        $pstmt = $conn->prepare($pay_q);
                        $pstmt->bindParam(':usrId', $userId);  
                        $pstmt->execute();
                        $pay_result = $pstmt->fetch(PDO::FETCH_ASSOC);

                        $paid = $pay_result['total_paid'];

                        $pre_q = "SELECT * FROM preforme WHERE stuId = :usrId ORDER BY Dates DESC LIMIT 3;";

                        // Prepare the SQL statement
                        $pestmt = $conn->prepare($pre_q);
                        $pestmt->bindParam(':usrId', $userId, PDO::PARAM_INT);  // Ensure userId is an integer
                        $pestmt->execute();
                    
                        // Fetch all results
                        $pre_result = $pestmt->fetchAll(PDO::FETCH_ASSOC);


                        if($types == 'Full'){
                          echo '
                          
                              <div
                                class="bg-white border border-green-600 rounded-lg text-center shadow items-center overflow-hidden mt-2 mx-4"
                              >
                              ';
                                if($valid == 'Expired'){
                                  echo '
                                  
                                  <!-- Overlay for the expired image -->
                                  <div class="absolute inset-0 flex items-center justify-center z-10">
                                    <div class="flex w-full h-full justify-center items-center">
                                      <img src="../../images/EXPIRED.png" alt="Expired" class="w-1/2 sm:w-1/3 md:w-full lg:w-48 opacity-80" />
                                    </div>
                                  </div>

                                  ';
                                }
                                echo '<div
                                  class="item-center bg-green-200 p-0 m-0 flex items-center justify-center"
                                >
                                  <img src="../../images/logo.png" class="w-32 h-32" alt="" />
                                </div>
                                <h3 class="text-2xl uppercase font-bold mt-4">Training Card</h3>
                                <div class="mt-4">
                                  <span
                                    class="text-white font-bold text-2xl bg-green-600 px-4 rounded-full"
                                    >'.$types.'</span
                                  >
                                </div>
                                <div class="mt-4">
                                  <span class="font-bold text-base">Class Date: </span>
                                  <span class="text-gray-600 font-semibold">'.$date.'</span>
                                </div>
                                <div class="mt-2">
                                  <span class="font-bold text-base">Expired Date: </span>
                                  <span class="text-gray-600 font-semibold">'.$exp.'</span>
                                </div>
                                <hr class="m-4 border border-green-600" />
                                <div class="mt-4 ml-4">
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">Reg. No. : RP-</div>
                                    <div>'.$userId.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start items-start space-x-2"
                                  >
                                    <div class="font-bold">Name : </div>
                                    <div class="break-all">'.$name.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">NIC No. :</div>
                                    <div>'.$nic.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">Vehicle Class : </div>
                                    <div>'.$vehi.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">Contact : </div>
                                    <div>'.$tel.'</div>
                                  </div>
                                  <hr class="mr-4 mt-4 border border-gray-600" />
                                  <div class="mt-2 flex flex-col justify-center item-center">
                                    <div class="font-bold">Last Training</div>
                                    <div>
                                    ';
                                    
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
                                    
                                    echo '
                                    </div>
                                  </div>
                                </div>
                                <div class="my-4 mx-4">
                                  <div class="bg-green-600 text-white font-bold py-2 px-4 rounded">
                                    Paid: Rs. '.$paid.'
                                  </div>
                                  <div class="flex flex-row justify-center items-center gap-4 w-full">
                                  <a
                                  href="../phpconfigs/cardPrint.php?cardId='.$cardId.'"
                                  class="px-4 py-2 w-full my-4 rounded-lg bg-green-600 text-white font-bold inline-block text-center"
                                >
                                <i class="fa-solid fa-download"></i> &nbsp; Download
                                </a>
                                
                                    
                                  </div>
                                </div>
                              </div>

                          ';
                        }
                        elseif($types == 'Half'){
                          echo '
                          
                              <div
                                class="bg-white border border-blue-600 rounded-lg text-center shadow items-center overflow-hidden mt-2 mx-4"
                              >
                              ';
                                if($valid == 'Expired'){
                                  echo '
                                  
                                  <!-- Overlay for the expired image -->
                                  <div class="absolute inset-0 flex items-center justify-center z-10">
                                    <div class="flex w-full h-full justify-center items-center">
                                      <img src="../../images/EXPIRED.png" alt="Expired" class="w-1/2 sm:w-1/3 md:w-full lg:w-48 opacity-80" />
                                    </div>
                                  </div>

                                  ';
                                }
                                echo '<div
                                  class="item-center bg-blue-200 p-0 m-0 flex items-center justify-center"
                                >
                                  <img src="../../images/logo.png" class="w-32 h-32" alt="" />
                                </div>
                                <h3 class="text-2xl uppercase font-bold mt-4">Training Card</h3>
                                <div class="mt-4">
                                  <span
                                    class="text-white font-bold text-2xl bg-blue-600 px-4 rounded-full"
                                    >'.$types.'</span
                                  >
                                </div>
                                <div class="mt-4">
                                  <span class="font-bold text-base">Class Date: </span>
                                  <span class="text-gray-600 font-semibold">'.$date.'</span>
                                </div>
                                <div class="mt-2">
                                  <span class="font-bold text-base">Expired Date: </span>
                                  <span class="text-gray-600 font-semibold">'.$exp.'</span>
                                </div>
                                <hr class="m-4 border border-blue-600" />
                                <div class="mt-4 ml-4">
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">Reg. No. : RP-</div>
                                    <div>'.$userId.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start items-start space-x-2"
                                  >
                                    <div class="font-bold">Name : </div>
                                    <div class="break-all">'.$name.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">NIC No. :</div>
                                    <div>'.$nic.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">Vehicle Class : </div>
                                    <div>'.$vehi.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">Contact : </div>
                                    <div>'.$tel.'</div>
                                  </div>
                                  <hr class="mr-4 mt-4 border border-gray-600" />
                                  <div class="mt-2 flex flex-col justify-center item-center">
                                    <div class="font-bold">Last Training</div>
                                    <div>
                                    ';
                                    
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
                                    
                                    echo '
                                    </div>
                                  </div>
                                </div>
                                <div class="my-4 mx-4">
                                  <div class="bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Paid: Rs. '.$paid.'
                                  </div>
                                  <div class="flex w-full flex-row justify-center items-center gap-4">
                                  <a
                                  href="../phpconfigs/cardPrint.php?cardId='.$cardId.'"
                                  class="px-4 py-2 w-full my-4 rounded-lg bg-green-600 text-white font-bold inline-block text-center"
                                >
                                <i class="fa-solid fa-download"></i> &nbsp; Download
                                </a>
                                
                                    
                                  </div>
                                </div>
                              </div>

                          ';
                        }
                        elseif($types == 'One Day'){
                          echo '
                          
                              <div
                                class="bg-white border border-red-600 rounded-lg text-center shadow items-center overflow-hidden mt-2 mx-4"
                              >
                              ';
                                if($valid == 'Expired'){
                                  echo '
                                  
                                  <!-- Overlay for the expired image -->
                                  <div class="absolute inset-0 flex items-center justify-center z-10">
                                    <div class="flex w-full h-full justify-center items-center">
                                      <img src="../../images/EXPIRED.png" alt="Expired" class="w-1/2 sm:w-1/3 md:w-full lg:w-48 opacity-80" />
                                    </div>
                                  </div>

                                  ';
                                }
                                echo '<div
                                  class="item-center bg-red-200 p-0 m-0 flex items-center justify-center"
                                >
                                  <img src="../../images/logo.png" class="w-32 h-32" alt="" />
                                </div>
                                <h3 class="text-2xl uppercase font-bold mt-4">Training Card</h3>
                                <div class="mt-4">
                                  <span
                                    class="text-white font-bold text-2xl bg-red-600 px-4 rounded-full"
                                    >'.$types.'</span
                                  >
                                </div>
                                <div class="mt-4">
                                  <span class="font-bold text-base">Class Date: </span>
                                  <span class="text-gray-600 font-semibold">'.$date.'</span>
                                </div>
                                <div class="mt-2">
                                  <span class="font-bold text-base">Expired Date: </span>
                                  <span class="text-gray-600 font-semibold">'.$exp.'</span>
                                </div>
                                <hr class="m-4 border border-red-600" />
                                <div class="mt-4 ml-4">
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">Reg. No. : RP-</div>
                                    <div>'.$userId.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start items-start space-x-2"
                                  >
                                    <div class="font-bold">Name : </div>
                                    <div class="break-all">'.$name.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">NIC No. :</div>
                                    <div>'.$nic.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">Vehicle Class : </div>
                                    <div>'.$vehi.'</div>
                                  </div>
                                  <div
                                    class="mt-3 px-4 flex flex-row justify-start item-center space-x-2"
                                  >
                                    <div class="font-bold">Contact : </div>
                                    <div>'.$tel.'</div>
                                  </div>
                                  <hr class="mr-4 mt-4 border border-gray-600" />
                                  <div class="mt-2 flex flex-col justify-center item-center">
                                    <div class="font-bold">Last Training</div>
                                    <div>
                                    ';
                                    
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
                                    
                                    echo '
                                    </div>
                                  </div>
                                </div>
                                <div class="my-4 mx-4">
                                  <div class="bg-red-600 text-white font-bold py-2 px-4 rounded">
                                    Paid: Rs. '.$paid.'
                                  </div>
                                  <div class="flex flex-row justify-center items-center gap-4 w-full">
                                  <a
                                  href="../phpconfigs/cardPrint.php?cardId='.$cardId.'"
                                  class="px-4 w-full py-2 my-4 rounded-lg bg-green-600 text-white font-bold inline-block text-center"
                                >
                                <i class="fa-solid fa-download"></i> &nbsp; Download
                                </a>
                                
                                    
                                  </div>
                                </div>
                              </div>

                          ';
                        }
                    }
                }
            ?>
          </div>
          
        </div>
        <!-- table-end -->

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
