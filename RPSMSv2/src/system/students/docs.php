<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/session_manager.php';
require_once '../phpconfigs/conn.php'; 

$errors = array();

$userId = $_SESSION['uid'];

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
    
    <title>Medicals - RPSMS</title>
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
                <h4>Hi.! <?php echo $_SESSION['fname'].' ( RP-STU-0'.$_SESSION['uid'].' )'?></h4>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-file-medical"></i> Papers</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- search -->
        

        <!-- table -->

        <div class="p-4 h-screen mt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

        <?php
// If search form is not submitted, fetch all records
$query = "SELECT SUM(amount) AS total FROM payments WHERE userId = :userId AND pay_state = 'paid';";
$rows = $conn->prepare($query);
$rows->bindParam(':userId', $userId);
$rows->execute();
$result = $rows->fetchAll(PDO::FETCH_ASSOC);

// Check if the result is not empty and the total amount is greater than or equal to 8000
if(!empty($result) && $result[0]['total'] >= 4000){
    echo '
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="max-w-sm bg-white border border-gray-200 p-4">
            <img class="rounded-t-lg" src="downloads/image.jpg" alt="" />
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-blue-600">PAPER 01</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Download this and Practice</p>
                <a href="../downloads/paper01.pdf" download  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"><i class="fa-solid fa-download mr-4"></i> Download</a>
            </div>
        </div>
        <div class="max-w-sm bg-white border border-gray-200 p-4">
            <img class="rounded-t-lg" src="downloads/image.jpg" alt="" />
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-blue-600">PAPER 02</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Download this and Practice</p>
                <a href="../downloads/paper02.pdf" download  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"><i class="fa-solid fa-download mr-4"></i> Download</a>
            </div>
        </div>
    </div>';
} else {
    echo '<div class="bg-blue-200 p-4 rounded-md text-red-600">Papers are not Enrolled yet for you...</div>';
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
