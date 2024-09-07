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
              <button class="bg-green-600 text-white px-4 py-2 rounded-md font-semibold w-full md:w-1/2" onclick="window.location.href='add_pay_medi.php'" >Make Payment</button>
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
                $query = "SELECT *, DATE(date) AS date FROM medi_payments WHERE mpayId LIKE :find OR mediId LIKE :find OR  userId LIKE :find OR payType LIKE :find OR mpay_id LIKE :find OR amount LIKE :find OR reason LIKE :find OR pay_state LIKE :find;";
                
                // Prepare the statement
                $rows = $conn->prepare($query);

                // Bind the parameter
                $searchParam = '%' . $find . '%';
                $rows->bindParam(':find', $searchParam);

                // Execute the statement
                $rows->execute();

                // Fetch results
                $result = $rows->fetchAll(PDO::FETCH_ASSOC);

                $find = "";
            } else {
                // If search form is not submitted, fetch all records
                $query = "SELECT *, DATE(pay_date) AS date FROM medi_payments ORDER BY mpay_id DESC;";
                $rows = $conn->prepare($query);
                $rows->execute();
                $result = $rows->fetchAll(PDO::FETCH_ASSOC);

                $find = "";
            }

            if ($result) {
                foreach ($result as $row) {
                    $userId = $row['userId'];
                    $payId = $row['mpay_id'];
                    $day = $row['pay_date'];
                    $payType = $row['payType'];
                    $state = $row['pay_state'];
                    $amount = $row['amount'];
                    $mid = $row['mediId'];
                    $reason = $row['reason'];
                    $medId = $row['mediId'];


                    echo '
                        <div class="bg-blue-200 rounded-xl shadow-md overflow-hidden" onclick="window.location.href=\'mpay_details.php?mid='.$medId.'&bm90bnVsbA&pid='.$payId.'&cGFpZCBhdA\'">
                          <div class="p-4 flex items-center">
                            <div class="bg-gray-600 w-16 h-16 p-4 rounded-full text-center">
                              <p class="text-xl font-bold text-white">'.$payId.'</p>
                            </div>
                            <div class="ml-4">
                              <div class="flex items-center space-x-2 text-sm">
                                <div class="text-gray-500">' . $day . ' <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">' . $state . '</span></div>
                                
                              </div>
                              <p class="mt-2 text-gray-600">Medical ID : '.$mid.'</p>
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
        <?php 
            include('sidebar.php')
          ?>
        </ul>
      </div>
      </div>
    </div>
    <div id="uptModal" class="fixed top-0 right-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center z-[200] hidden opacity-0 transition-opacity duration-500">
      <div class="bg-white lg:w-[30%] xl:w-[30%] md:w-[30%] w-[90%] p-4 shadow-md rounded-md">
          <div class="flex flex-col items-center">
              <h4 class="text-xl font-semibold uppercase">Payment Details</h4>
              <hr class="mt-3 border-blue-600">
          </div>
          <div class="flex flex-col">
            <div class="flex gap-4 items-center my-4">
              <div>
                          <label for="stu_id">Student ID / ශිෂ්‍ය අංකය<span class="text-red-500">*</span></label>
                          <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="stu_id" maxlength="12" placeholder="001" required/>
                      </div>
                      <div class="cols">
                          <label for="branch">Select Branch / ශාඛාව තෝරන්න<span class="text-red-500">*</span></label>
                          <select name="branch" id="branch" class="w-full my-2 p-2 rounded-md border border-gray-400" required>
                              <option value="">--Select a Branch--</option>
                              <option value="Ampara">Ampara</option>
                              <option value="Dehiaththakandiya">Dehiaththakandiya</option>
                          </select>
                      </div>
                      </div>
                        
                        <div class="cols grid md:grid-cols-2 gap-4 my-4">
                           <div>
                            <label for="amount">Payment Amount (Rs.) / මුදල් ප්‍රමාණය (රු.)<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="amount" maxlength="12" placeholder="1000" required/>
                           </div>
                           <div>
                            <label for="amount">Bank Slip / ගෙවීම් ලදුපත (බැංකු ගෙවීමක් නම් පමණී)</label>
                            <input type="file" class="file-input file-input-md w-full" name="slip" value="slip" />
                           </div>
                        </div>
                        <div>
                            <label for="reason">Reason / ගෙවීමට හේතුව<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="reason" placeholder="001" required/>
                        </div>
                        <div class="cols">
                          <label for="status">Status / තත්වය<span class="text-red-500">*</span></label>
                          <select name="status" id="status" class="w-full my-2 p-2 rounded-md border border-gray-400" required>
                              <!-- <option value="">--Select a Branch--</option> -->
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                          </select>
                      </div>
            </div>
            <div class="flex justify-end gap-4">
              <button class="px-4 py-2 rounded-md bg-blue-600  text-white " onclick="closeModal()" id="cancelBtn"  type="button">Cancel</button>
              <button class="px-4 py-2 rounded-md bg-red-600 text-white " id="uptSub"  type="button"><i class="fa-solid fa-angles-up"></i> Update</button>
          </div>
          </div>
      </div>
    </div>
  </body>
</html>
