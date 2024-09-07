<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php'; 

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
    <title>Payments - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-file-invoice-dollar"></i> Payments</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- search -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <div class="flex justify-start items-center gap-4 flex-row">
              <form action="" method="post" class="flex items-center w-full">
                <input
                  class="border rounded-md p-2 w-full"
                  type="search"
                  name="search"
                  id=""
                  placeholder="Search Payments"
                />
                <button
                  class="bg-blue-600 p-2 text-xl ml-2 text-white rounded-md flex items-center justify-center"
                  type="submit"
                  name=""
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>

            <div class="flex justify-end">
              <button class="bg-green-600 text-white px-4 py-2 rounded-md font-semibold w-full md:w-1/2" onclick="window.location.href='add_pay.php'" >Make Payment</button>
            </div>
        </div>
        <!-- filters -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div class="flex gap-4 flex-shrink">
                <button class="bg-green-200 text-green-600 px-4 w-full md:w-1/2 md:text-xs py-2 rounded-md" onclick="window.location.href='payment_medi.php'">Medical Payments</button>
                <button class="bg-blue-200 text-blue-600 px-4 py-2 rounded-md w-full md:w-1/2 md:text-xs" onclick="window.location.href='payment.php'">Course Payments</button>
            </div>
            <div></div>
        </div>

        <!-- table -->

        <div class="p-4 h-screen">
       
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">
          <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $find = $_POST['search'];

                // Prepare the SQL query with placeholders
                $query = "SELECT *, DATE(date) AS date FROM payments WHERE payId LIKE :find OR  userId LIKE :find OR payType LIKE :find OR branch LIKE :find OR branch LIKE :find OR amount LIKE :find OR reason LIKE :find OR pay_state LIKE :find AND userId = :uids;";
                
                // Prepare the statement
                $rows = $conn->prepare($query);

                // Bind the parameter
                $searchParam = '%' . $find . '%';
                $rows->bindParam(':find', $searchParam);
                $rows->bindParam(':uids', $_SESSION['uid']);

                // Execute the statement
                $rows->execute();

                // Fetch results
                $result = $rows->fetchAll(PDO::FETCH_ASSOC);

                $find = "";
            } else {
                // If search form is not submitted, fetch all records
                $query = "SELECT *, DATE(date) AS date FROM payments WHERE userId = :uids ORDER BY payId DESC;";
                $rows = $conn->prepare($query);
                $rows->bindParam(':uids', $_SESSION['uid']);
                $rows->execute();
                $result = $rows->fetchAll(PDO::FETCH_ASSOC);

                $find = "";
            }

            if ($result) {
                foreach ($result as $row) {
                    $userId = $row['userId'];
                    $payId = $row['payId'];
                    $day = $row['date'];
                    $payType = $row['payType'];
                    $state = $row['pay_state'];
                    $amount = $row['amount'];
                    $branch = $row['branch'];
                    $reason = $row['reason'];


                    echo '
                        <div class="bg-blue-200 rounded-xl shadow-md overflow-hidden" onclick="window.location.href=\'pay_details.php?uid='.$userId.'&bm90bnVsbA&pid='.$payId.'&cGFpZCBhdA\'">
                          <div class="p-4 flex items-center">
                            <div class="bg-gray-600 w-16 h-16 p-4 rounded-full text-center">
                              <p class="text-xl font-bold text-white">'.$payId.'</p>
                            </div>
                            <div class="ml-4">
                              <div class="flex items-center space-x-2 text-sm">
                                <div class="text-gray-500">' . $day . ' <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">' . $state . '</span></div>
                                
                              </div>
                              <p class="mt-2 text-gray-600">'.$branch.'</p>
                              <p class="mt-2 font-bold text-gray-600">Rs.'.$amount.'/-</p>
                            </div>
                          </div>
                        </div>
                    ';

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
        <?php 
            include('sidebar.php')
          ?>
        </ul>
      </div>
      </div>
    </div>
    
  </body>
</html>
