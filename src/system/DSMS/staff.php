<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php';

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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-user-tie"></i> Staff</h4>
          <hr class="mt-3 border-blue-600">
        </div>

         <!-- search -->
         <div class="md:grid md:grid-cols-2 md:grid-rows-1 gap-4 items-center">
          <div class="flex flex-col justify-between p-4 leading-normal">
            <form>
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
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 rounded-none focus:outline-none border-b border-blue-600 bg-gray-50"
                  placeholder="Search Staff info"
                  required
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
            <button onclick="window.location.href='add_staff.php'" 
              type="button"
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
            >
              <i class="fas fa-solid fa-user-plus mr-4"></i> Add Staff
            </button>
          </div>
        </div>

        <!-- profile-cards -->
        <div id="uptModal" class="fixed top-0 right-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center z-[200] hidden opacity-0 transition-opacity duration-500">
        <div class="bg-white lg:w-[30%] xl:w-[30%] md:w-[30%] w-[90%] p-4 shadow-md rounded-md" id="confirmationModal" style="display: none;">
          <div class="flex flex-col items-center">
              <h4 class="text-xl font-semibold uppercase">Delete Account</h4>
              <hr class="mt-3 border-blue-600">                    
          </div>
          <div class="flex flex-col">
              <div class="flex gap-4 items-center my-4">
                  <div class="bg-red-600 text-white text-xl rounded-full p-4 w-12 h-12 flex items-center justify-center">
                      <i class="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <div>
                      <p class="text-gray-600 text-lg">Are you sure you want to delete this profile...?</p>
                  </div>
              </div>
              <div class="flex justify-end gap-4">
                  <button class="px-4 py-2 rounded-md bg-gray-200 border border-gray-400 text-gray-600" onclick="closeModal()" id="cancelBtn" type="button">Cancel</button>
                  <button class="px-4 py-2 rounded-md bg-red-600 text-white" id="confirmDeleteBtn" type="button"><i class="fas fa-solid fa-trash-can"></i> Yes, Delete</button>
              </div>
          </div>
      </div>
        </div>
        <div
          class="p-4 md:grid md:grid-cols-2 md:grid-rows-1 lg:grid lg:grid-cols-4 lg:grid-rows-1 gap-4 md:mt-0 mt-8"
        >
        <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $find = $_POST['search'];

                // Prepare the SQL query with placeholders
                $query = "SELECT s.*, u.initName AS name FROM staff s LEFT JOIN users u ON s.userId = u.userID WHERE s.userID LIKE :find OR s.staffId LIKE :find OR s.addr LIKE :find OR s.fullName LIKE :find OR s.nic LIKE :find OR s.tel LIKE :find OR s.passNo LIKE :find OR s.email LIKE :find;";
                
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
                $query = "SELECT s.*, u.fname AS name, u.types AS job FROM staff s LEFT JOIN users u ON s.userId = u.userId ORDER BY s.userId DESC;";
                $rows = $conn->prepare($query);
                $rows->execute();
                $result = $rows->fetchAll(PDO::FETCH_ASSOC);

                $find = "";
            }

            if ($result) {
                foreach ($result as $row) {

                    $ids = $row['userId'];
                    $staffId = $row['staffId'];
                    $job = $row['job'];
                    $name = $row['name'];
                    $gen = $row['gen'];

                    echo '
                    <!-- card -->
                    <div
                      class="shadow-md bg-slate-300 border border-blue-600 h-24 rounded-md flex items-center mb-4"
                    >
                      <!-- DP -->
                      <div class="p-2 align-middle">
                        <img
                          class="w-16 h-16 rounded-full border border-blue-600"
                          src="'. (($gen === 'male') ? $genm : $genf) .'
                        "
                          alt="DP"
                        />
                      </div>
                      <!-- name&btns -->
                      <div class="p-4 font-semibold items-start">
                        <p class="text-xs text-blue-600">RP-'.$ids.' [ '.$job.' ]</p>
                        <p class="text-lg" >'.$name.'</p>
                        <div class="join">
                          <button
                            class="btn btn-xs join-item bg-blue-700 hover:bg-blue-800 border-none text-white"
                          type="button" onclick="window.location.href=\'profile_staff.php?uid='.$ids.'\'">
                            <i class="fas fa-solid fa-eye"></i>View
                          </button>
                          <button
                            class="btn btn-xs bg-red-600 hover:bg-red-700 text-white border-none join-item delete-btn" data-user-id="'.$ids.'" data-staff-id="'.$staffId.'"
                          type="button" onclick="openModal();">
                            <i class="fas fa-solid fa-trash-can"></i>Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    ';
                }
            }
            ?>
          <!-- end of cards -->
        </div>
        <!--endo of  profile-cards -->

        
        <script>
      document.addEventListener("DOMContentLoaded", function() {
          function openModal() {
              document.getElementById("confirmationModal").style.display = "block";
          }

          function closeModal() {
              document.getElementById("confirmationModal").style.display = "none";
          }

          var deleteButtons = document.querySelectorAll(".delete-btn");
          
          deleteButtons.forEach(function(button) {
              button.addEventListener("click", function() {
                  openModal();
                  var staffId = this.getAttribute("data-staff-id");
                  var userId = this.getAttribute("data-user-id");
                  document.getElementById("confirmDeleteBtn").setAttribute("data-user-id", userId);
                  document.getElementById("confirmDeleteBtn").setAttribute("data-staff-id", staffId);
              });
          });

          document.getElementById("confirmDeleteBtn").addEventListener("click", function() {
              var userId = this.getAttribute("data-user-id");
              var staffId = this.getAttribute("data-staff-id");
              window.location.href = "../phpconfigs/delete_record.php?userId=" + userId + "&staffId="+ staffId;
          });

          document.getElementById("cancelBtn").addEventListener("click", function() {
              closeModal();
          });
      });
      </script>
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
