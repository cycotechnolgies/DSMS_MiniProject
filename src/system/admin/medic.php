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
    
    <title>Admin Dashboard - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-file-medical"></i> Medical Requests</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- search -->
        <div class="md:grid md:grid-cols-2 md:grid-rows-1 gap-4 items-center">
          <div class="flex flex-col justify-between p-4 leading-normal">
            <form action="" method="post">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only"
                >Search</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  name="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 outline-none focus:outline-none rounded-none border-b border-blue-600 bg-gray-50"
                  placeholder="Search Medical Requests info"
                  
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div class="absolute right-0 pr-4">
            <button
              onclick="window.location.href='add_medi.php'" 
              type="button"
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
            >
            <i class="fa-solid fa-hand-holding-medical mr-4"></i> Request Medical 
            </button>
          </div>
        </div>

        <!-- table -->

        <div class="p-4 h-screen mt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

        <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $find = $_POST['search'];

                // Prepare the SQL query with placeholders
                $query = "SELECT *, DATE(date) AS date FROM medic WHERE medId LIKE :find OR  userId LIKE :find OR addr LIKE :find OR fullName LIKE :find OR nic LIKE :find OR tel LIKE :find OR apponite LIKE :find;";
                
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
                $query = "SELECT *, DATE(date) AS date FROM medic ORDER BY medId DESC;";
                $rows = $conn->prepare($query);
                $rows->execute();
                $result = $rows->fetchAll(PDO::FETCH_ASSOC);

                $find = "";
            }

            if ($result) {
                foreach ($result as $row) {
                    // $userId = $row['userId'];
                    $medic = $row['medId'];
                    $day = $row['date'];
                    $apponite = $row['apponite'];
                    $addr = $row['addr'];
                    $tel = $row['tel'];
                    $wa = $row['waNo'];

                    echo '
                        <div class="bg-blue-200 space-y-3 p-4 rounded-lg shadow" onclick="window.location.href=\'medi_details.php?mid='.$medic.'&cGFpZCBhdA\'">
                            <div class="flex items-center space-x-2 text-sm">
                                <div>
                                    <a href="#" class="text-blue-500 font-bold hover:underline">#' . $medic . '</a>
                                </div>
                                <div class="text-gray-500">' . $day . '</div>
                                <div>
                                    <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">' . $apponite . '</span>
                                </div>
                            </div>
                            <div class="text-sm text-gray-700">' . $addr . '</div>
                            <div class="text-sm font-medium text-black">
                                Tel: ' . $tel . ' | WhatsApp: ' . $wa . '
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
  </body>
</html>
