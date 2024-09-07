<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php';

$uName = $_GET['uName'];
$uid = $_GET['uid'];

// Fetch data from the database
$rows = [];
$search_error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if form is submitted with search parameters
    if(isset($_POST['month']) && isset($_POST['year'])) {
        $month = $_POST['month'];
        $year = $_POST['year'];
        
        try {
            // Prepare and execute the SQL query
            $query = "SELECT * FROM attend WHERE staffId = :userId AND MONTH(dates) = :months AND YEAR(dates) = :years";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':userId', $uid);
            $stmt->bindParam(':months', $month);
            $stmt->bindParam(':years', $year);
            $stmt->execute();

            // Fetch all rows as associative array
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($rows)) {
                $search_error = "No records found.";
            }
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        // Close connection
        $conn = null;
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
    <script src="../../js/modal.js" defer></script>
    <title>Staff - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold ">Attendents of <?php echo $uName ?></h4>
          <hr class="mt-3 border-blue-600">
        </div>

         <!-- search -->
        <div class="w-full mx-auto bg-white p-6">
        <h2 class="text-xl font-semibold mb-4">Search Attendents</h2>
        <form method="POST" class="mb-4">
            <div class="flex items-center gap-4">
                <select  name="month" id="month" class="form-select border border-gray-400 p-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300">
                    <option value="">Select Month</option>
                    <?php
                    $months = [
                        1 => "January", 2 => "February", 3 => "March", 4 => "April",
                        5 => "May", 6 => "June", 7 => "July", 8 => "August",
                        9 => "September", 10 => "October", 11 => "November", 12 => "December"
                    ];
                    foreach ($months as $value => $label) {
                        echo "<option value=\"$value\">$label</option>";
                    }
                    ?>
                </select>
                <input type="text" name="year" id="year" class="form-input border border-gray-400 p-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter Year">
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Search</button>
            </div>
            </form>
        <?php
        // echo $query;
        if($search_error == "No records found."){
          echo '<p class="p-4 bg-gray-400 rounded-md text-gray-600 border border-gray-600">No records found</p>';
      }else{
          echo '
          <table class="table-auto w-full divide-y divide-gray-400 mt-4">
              <thead>
                  <tr>
                      <th class="px-6 py-3 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Time</th>
                      <th class="px-6 py-3 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Updated Time</th>
                  </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">';
                  foreach ($rows as $row){
                      echo '
                      <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-center">'. $row['dates'] .'</td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">'. $row['atttime'] .'</td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">'. $row['upt'] .'</td>
                      </tr>';
                  }
          echo '
              </tbody>
          </table>';
      }
        ?>
        
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
