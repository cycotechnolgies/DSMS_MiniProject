<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php'; 

$queries = [
  "SELECT * FROM student",
  "SELECT * FROM payments WHERE pay_state LIKE '%pend%'",
  "SELECT * FROM medic WHERE apponite LIKE '%pend%'",
  "SELECT * FROM staff"
];

// Execute each query and get row count
$row_counts = [];
foreach ($queries as $index => $query) {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $row_counts[$index] = $stmt->rowCount();
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
    <title>Admin Dashboard - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-building-columns"></i> Bank Details</h4>
          <hr class="mt-3 border-blue-600">
          <div class="m-4 bg-blue-200  p-4 text-lg font-semibold rounded-md">
           <p><i class="fa-solid fa-circle-info text-blue-600"></i>&nbsp; මුදල් තැන්පත් කිරීම සදහා ඔබට බැංකුවකට ගොස් හෝ මුදල් තැන්පතු යන්ත්‍රයකින් හෝ online bank transfer යන ක්‍රම 3න් එකක් භාවිතා කල හැක.</p>
          </div>
          <div class="m-4 bg-red-200 p-4 text-lg font-semibold rounded-md">
           <p><i class="fa-solid fa-triangle-exclamation text-red-600"></i>&nbsp; මුදල් තැම්පත් කිරීමෙන් පසු පැය 24 ඇතුලත <a href="payment.php" class="text-blue-600"> Payment </a>  වෙත ගොස් ඔබේ ගෙවීම් රිසිට්පත Upload කර ගෙවීම තහවුරු කරන්න.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
              <div class="bg-gray-100 p-2">
                <h4 class="py-2 font-bold flex justify-center text-white text-xl bg-blue-600">Course Payments</h4>
                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
                  <div class="bg-gray-100 p-2 flex justify-center items-center">
                    <img  src="../../images/boc logo.png" alt="BOC LOGO">
                  </div>
                  <div class="bg-gray-100 p-2">
                    <div class="capitalize tracking-wide text-base font-semibold ">Beneficent Name :<br> <span class="font-bold capitalize">G. G. K. R. Gamage</span></div>
                    <div class="capitalize tracking-wide text-base font-semibold ">Account Number : <br><span class="font-bold capitalize">90969406</span></div>
                    <div class="capitalize tracking-wide text-base font-semibold ">Branch : <br><span class="font-bold capitalize">Dehiaththakandiya</span></div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-100 p-2">
                  <h4 class="py-2 font-bold flex justify-center text-white text-xl bg-green-600">Medical Payments</h4>
                  <div class=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
                    <div class="bg-gray-100 p-2 flex justify-center items-center">
                      <img src="../../images/Peoples-bank-logo.jpg" alt="BOC LOGO">
                    </div>
                    <div class="bg-gray-100 p-2">
                      <div class="capitalize tracking-wide text-base font-semibold ">Beneficent Name :<br> <span class="font-bold capitalize">G. G. B. S. Gamage</span></div>
                      <div class="capitalize tracking-wide text-base font-semibold ">Account Number : <br><span class="font-bold capitalize">330200100113585</span></div>
                      <div class="capitalize tracking-wide text-base font-semibold ">Branch : <br><span class="font-bold capitalize">Dehiaththakandiya</span></div>
                    </div>
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
