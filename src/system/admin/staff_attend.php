<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php'; 

$stid = $_GET['std'];
$norec = "";

// attend submit 
if(isset($_POST['mark'])){
  $dates = $_POST['dates'];
  $times = $_POST['times'];
  $opts = $_POST['opts'];

  if($opts === 'In'){
    $outs = "";

    $sql = "INSERT INTO attend(staffId, dates, atttime, outtime) VALUES(:stid, :dates, :ins, :outs);";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':stid', $stid);
    $stmt->bindParam(':dates', $dates);
    $stmt->bindParam(':ins', $times);
    $stmt->bindParam(':outs', $outs);

    if($stmt->execute()){
      header('Location: staff_attend.php?std='.$stid);
    }
    
  }elseif($opts === 'Out'){

    $sql = "UPDATE attend SET outtime = :outs WHERE dates = :dates AND staffId = :stid";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':outs', $times);
    $stmt->bindParam(':dates', $dates);
    $stmt->bindParam(':stid', $stid);

    if($stmt->execute()){
      header('Location: staff_attend.php?std='.$stid);
    }else{
      $_SESSION['errors'] = "No recode Found..!";
    }
    
  }
}

//search
if(isset($_POST['search'])){
  $year = $_POST['year'];
  $month = $_POST['month'];

  $query = "SELECT * FROM attend WHERE staffId = :userId AND MONTH(dates) = :months AND YEAR(dates) = :years";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(':userId', $stid);
  $stmt->bindParam(':months', $month);
  $stmt->bindParam(':years', $year);
  $stmt->execute();

  // Fetch all rows as associative array
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if (empty($rows)) {
    $norec = "1";
  }

}else{
  $querys = "SELECT * FROM attend WHERE staffId = :userId ORDER BY id DESC LIMIT 10;";
  $stmt = $conn->prepare($querys);
  $stmt->bindParam(':userId', $stid);
  $stmt->execute();

  // Fetch all rows as associative array
  $datas = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if (empty($datas)) {
    $norec = "1";
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
    
    <title>Renewal - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-regular fa-calendar-xmark"></i> Attendance</h4>
          <hr class="mt-3 border-blue-600">
          <?php
            if(!empty($_SESSION['errors'])){
              echo '
              <div>
                <p class="p-4 bg-red-200 text-red-400 font-semibold">'.$_SESSION['errors'].'</p>
              </div>
              ';
            }
          ?>
        </div>
        <!-- submit form -->
        <form action="" method="post">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div class="grid grid-cols- md:grid-cols-2 gap-4">
              <div>
                <label for="">Attendance Date</label>
                <input type="date" name="dates" id="" class="p-2 border border-gray-400 rounded-md w-full" required/>
              </div>
              <div>
                <label for="">Attendance Time</label>
                <input type="time" name="times" id="" class="p-2 border border-gray-400 rounded-md w-full" required/>
              </div>
            </div>
            <div class="grid grid-cols- md:grid-cols-2 gap-4">
              <div>
                <label for="">Attend Option</label>
                <select name="opts" id="" class="p-2 border border-gray-400 rounded-md w-full" required>
                  <option value="">--Select Option--</option>
                  <option value="In">In</option>
                  <option value="Out">Out</option>
                </select>
              </div>
              <div class="flex justify-end items-center m-4">
                <button class="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg" name="mark">Mark Attendance</button>
              </div>
            </div>
          </div>
          
        </form>
        <hr class="border-gray-200 border mx-4">
        <!-- search and table -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mx-4">
            <h4 class="font-bold text-xl text-left mt-4">Search Attendance</h4>
            <form action="" method="post">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="">Year</label>
                  <input type="number" min="2020" max="2100" name="year" id="" class="p-2 border border-gray-400 rounded-md w-full" required>
                </div>
                <div>
                  <label for="">Month</label>
                  <select name="month" id="" class="p-2 border border-gray-400 rounded-md w-full" required>
                    <option value="">--Select month--</option>
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
                </div>
              </div>
              <div class="flex justify-end items-center mt-4 gap-2">
                <button class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg" name="search">Search</button>
              </div>
            </form>
          </div>
          <div>
            <!-- table with search -->
        <div class="container mx-auto px-4 sm:px-4">
          <h4 class="font-semibold text-gray-400 text-sm text-left mt-4">Last 10 Attendance</h4>
          <div class="pb-4">
            <div>
              <table>
                <thead>
                  <tr>
                    <th class="px-4 py-4 border-b-2 border-gray-200 bg-blue-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Staff Id</th>
                    <th class="px-4 py-4 border-b-2 border-gray-200 bg-blue-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th class="px-4 py-4 border-b-2 border-gray-200 bg-blue-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Attend Time</th>
                    <th class="px-4 py-4 border-b-2 border-gray-200 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Leave Time</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                    if($norec == '1'){
                      echo '
                      <tr>
                        <td colspan="4" class="bg-red-200 text-center"> No Recode Found</td>
                      </tr>
                      ';
                    }elseif(!empty($rows)){
                      foreach ($rows as $row){
                        echo '
                        <tr>
                          <td class="px-4 py-4 border-b text-center border-gray-200 bg-white text-sm">
                            '.$row['staffId'].'
                          </td>
                          <td class="px-4 py-4 border-b text-center border-gray-200 bg-white text-sm">
                            '.$row['dates'].'
                          </td>
                          <td class="px-4 py-4 border-b text-center border-gray-200 bg-white text-sm">
                          '.$row['atttime'].'
                          </td>
                          <td class="px-4 py-4 border-b text-center border-gray-200 bg-white text-sm">
                          '.$row['outtime'].'
                          </td>
                        </tr>
                        ';
                      }
                    }else{
                      foreach ($datas as $data){
                        echo '
                        <tr>
                          <td class="px-4 py-4 border-b text-center border-gray-200 bg-white text-sm">
                            '.$data['staffId'].'
                          </td>
                          <td class="px-4 py-4 border-b text-center border-gray-200 bg-white text-sm">
                            '.$data['dates'].'
                          </td>
                          <td class="px-4 py-4 border-b text-center border-gray-200 bg-white text-sm">
                          '.$data['atttime'].'
                          </td>
                          <td class="px-4 py-4 border-b text-center border-gray-200 bg-white text-sm">
                          '.$data['outtime'].'
                          </td>
                        </tr>
                        ';
                      }
                    }
                  ?>
                </tbody>
              </table>
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
