<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/session_manager.php';
require_once '../phpconfigs/conn.php';

$errors = array();

$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";
// $stuId = $_GET['stuid'];
$userId = $_SESSION['uid'];

$query = "SELECT stuId, initName FROM student WHERE userId = :sids LIMIT 1;";


$rows = $conn->prepare($query);
// $rows->bindParam(':userId', $userId);
$rows->bindParam(':sids', $userId);

if($rows->execute()){
  
  $result = $rows->fetch(PDO::FETCH_ASSOC);

  $stuId = $result['stuId'];
  $name = $result['initName'];

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
    <title>Class Details - RPSMS</title>
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
              <div class="text-base mr-4 font-medium">
                <h4>Hi.! <?php echo $_SESSION['fname'].' ( RP-0'.$_SESSION['uid'].' )'?></h4>
              </div>
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
                  <li>
                    <a class="justify-between">
                      Profile
                    </a>
                  </li>
                  <li><a href="../phpconfigs/logout.inc.php">Logout</a>
                </ul>
              </div>
            </div>
          </div>
        <!-- main -->
        <div data-theme="none" class="p-4">
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold ">Performance of <?php echo $name; ?></h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- table -->

        <div class="p-4 h-screen mt-4">
       
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <?php

            $sql = "SELECT * from preforme
                    WHERE stuId = :sids;";
            
            $stmt = $conn->prepare($sql);
            
            // Bind the parameter
            $stmt->bindParam(':sids', $stuId, PDO::PARAM_INT);
            
            // Execute the query
            $stmt->execute();
            
            // Fetch all the results
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            if ($results) {
                foreach ($results as $result) {
                    echo '<div class="bg-blue-200 space-y-3 p-4 rounded-lg shadow" >
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <a href="#" class="text-blue-500 font-bold hover:underline">Class #' . $result['schId'] . '</a>
                        </div>
                        <div>
                            <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">' . $result['vehi'] . '</span>
                        </div>
                        <div>
                            <span>' . $result['hrs'] . ' hrs </span>
                        </div>
                    </div>
                    <div class="text-lg text-gray-700"> Preform : ' . $result['preform'] . ' <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-blue-600 rounded-lg bg-opacity-50"> Marks : ' . $result['grade'] . '/10 </span></div>
                </div>';
                }
            } else {
                echo "No result found";
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
        <div>
            <h4 class="text-2xl font-bold mb-2 text-blue-700">RPSMS</h4>
            <hr class="mb-4 border-blue-600" >
        </div>
        <?php 
            include('sidebar.php');
          ?>
        </ul>
      </div>
      </div>
    </div>
  </body>
</html>
