<!DOCTYPE html>
<?php
session_start();

$userId = $_SESSION['uid'];
$name = $_SESSION['fname'].' '.$_SESSION['lname'];

require_once '../phpconfigs/session_manager.php';
require_once '../phpconfigs/conn.php'; 
require_once '../phpconfigs/expier.php';

$errors = array();

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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-regular fa-calendar-days"></i> Training Cards</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- search -->
        

        <!-- table -->

        <div class="p-4 h-screen mt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

        <?php
            
                $query = "SELECT cards.*, schedule.*
                FROM cards
                INNER JOIN schedule ON cards.ClassId = schedule.schedId
                WHERE cards.userId = :uid;";
                $rows = $conn->prepare($query);
                $rows->bindParam(':uid', $userId); 
                $rows->execute();
                $result = $rows->fetchAll(PDO::FETCH_ASSOC);

                $find = "";
            
            if ($result) {
                foreach ($result as $row) {
                    // Assuming $shedId, $day, $branch, $clsName, $typ, $inst, $vehi are columns in the result row
                    $shedId = $row['ClassId'];
                    $types = $row['Types'];
                    $branch = $row['branch'];
                    $inst = $row['instructor'];
                    $exp = $row['Exp_Date'];
                    $day = $row['dateTime'];
                    $expH = $row['Hrs'];
                    $cdate = $row['created'];
                    $valid =  $row['Validity'];
                    
                    if($valid == 'Expierd'){

                      echo '
                          <div class="bg-blue-400 space-y-3 p-4 rounded-lg shadow" >
                              <div class="flex items-center space-x-2 text-sm">
                                  <div>
                                      <span  class="text-blue-500 font-bold">#' . $shedId . '</span>
                                  </div>
                                  <div class="text-gray-500 font-bold">' . $types . '</div>
                                  <div>
                                      <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">' . $branch . '</span>
                                  </div>
                              </div>
                              <div class="text-base text-gray-700"> Name : ' . $name . '</div>
                              <div class="text-base text-gray-700"> Instructor: ' . $inst . '</div>
                              <div class="text-lg text-gray-700 font-bold"> Class Date: ' . $day . '</div>
                              <div class="flex items-center space-x-2 text-sm">
                                  <div>
                                      <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-red-600 rounded-lg bg-opacity-50">Expire Date: ' . $exp . '</span>
                                  </div>
                                  <div>
                                      <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-green-600 rounded-lg bg-opacity-50">Expire Date: ' . $val . '</span>
                                  </div>
                              </div>
                          </div>
                      ';

                    }else{
                      if($types == 'Full'){
                        echo '<div class="bg-blue-600 space-y-3 p-4 rounded-lg shadow">';
                      }elseif($types == 'Half'){
                        echo '<div class="bg-orange-400 space-y-3 p-4 rounded-lg shadow" >';
                      }elseif($types == 'One Day'){
                        echo '<div class="bg-yellow-400 space-y-3 p-4 rounded-lg shadow" >';
                      }
  
  
                      echo '
                              <div class="flex items-center space-x-2 text-sm">
                                  <div>
                                      <span  class="text-white font-bold">#' . $shedId . '</span>
                                  </div>
                                  <div class="text-white font-bold">' . $types . '</div>
                                  <div>
                                      <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-red-600 bg-white rounded-lg bg-opacity-50">' . $branch . '</span>
                                  </div>
                              </div>
                              <div class="text-lg font-semibold text-white"> Name : ' . $name . '</div>
                              <div class="text-base text-white"> Instructor: ' . $inst . '</div>
                              <div class="text-lg text-white font-bold"> Class Date: ' . $day . '</div>
                              <div class="flex items-center space-x-2 text-sm">
                                  <div>
                                      <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-red-600 rounded-lg bg-opacity-50">Expire Date: ' . $exp . '</span>
                                  </div>
                                  <div>
                                      <span class="p-1.5 text-xs font-medium uppercase tracking-wider z-10 text-red-600 bg-white rounded-lg bg-opacity-50">' . $valid . '</span>
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
        <div>
            <h4 class="text-2xl font-bold mb-2 text-blue-700">RPSMS</h4>
            <hr class="mb-4 border-blue-600" >
        </div>
        <?php include 'sidebar.php'?>
        </ul>
      </div>
      </div>
    </div>
  </body>
</html>
