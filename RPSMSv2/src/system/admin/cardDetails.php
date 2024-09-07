<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php';
require_once '../phpconfigs/session_manager.php';

$errors = array();

$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";

// $userId = $_GET['uid'];
$cardId = $_GET['cid'];

// echo $medId;

$card_query = "SELECT *
FROM cards
WHERE cardId = :cId";


$rows = $conn->prepare($card_query);
$rows->bindParam(':cId', $cardId);
$rows->execute();
$result = $rows->fetch(PDO::FETCH_ASSOC);

$classId = $result['ClassId'];
$userId = $result['userId'];
$TType = $result['Types'];
$exp_Date = $result['Exp_Date'];
$Hrs = $result['Hrs'];
$validity = $result['validity'];

$sch_query = "SELECT *
FROM schedule
WHERE schedId = :schId";


$row = $conn->prepare($sch_query);
$row->bindParam(':schId', $classId);
$row->execute();
$results = $row->fetch(PDO::FETCH_ASSOC);

$ClassDate = $results['dateTime'];

$sch_query = "SELECT *
FROM requests
WHERE userId = :uIds";


$row = $conn->prepare($sch_query);
$row->bindParam(':uIds', $userId);
$row->execute();
$results = $row->fetch(PDO::FETCH_ASSOC);

$vehiClass = $results['course'].' - '.$results['vehiClass'];

$stu_query = "SELECT *
FROM student
WHERE userId = :uIds";


$row = $conn->prepare($stu_query);
$row->bindParam(':uIds', $userId);
$row->execute();
$results = $row->fetch(PDO::FETCH_ASSOC);

$initName = $results['initName'];
$nic = $results['nic'];
$tel = $results['tel'];

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
    <script src="../../js/update.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.6/dist/sweetalert2.all.min.js" integrity="sha256-dyw4h6gMbTk1vSiOqcs/wqhyqydsuILBl78WhcD44lY=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.6/dist/sweetalert2.min.css" integrity="sha256-h2Gkn+H33lnKlQTNntQyLXMWq7/9XI2rlPCsLsVcUBs=" crossorigin="anonymous">
    <title>Card Details - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Card Details</h4>
          <hr class="mt-3 border-blue-600">
        </div>
        <div class="p-4 flex justify-end gap-4">
          <button  class="px-4 py-2 rounded-md bg-red-600 text-white " id="delBtn"  type="submit" data-medid="<?php echo $cardId;?>"><i class="fa-solid fa-trash-can"></i> Delete</button>
          <a href="../phpconfigs/cardPrint.php?pid=<?php echo $cardId;?>&uid=<?php echo $userId;?>" target="_blank"  class="px-4 py-2 rounded-md bg-blue-600 text-white "><i class="fa-solid fa-print"></i></a>
        </div>
        <div class="relative overflow-hidden p-4">
            <table class="table-auto w-full text-left">
                <tbody class="bg-white text-gray-500">
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Card ID</th>
                        <td class="py-3 border   p-4" ><?php echo $cardId; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Class Date</th>
                        <td class="py-3 border   p-4" ><?php echo $ClassDate; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Train Type</th>
                        <td class="py-3 border   p-4" ><?php echo $TType; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Student ID</th>
                        <td class="py-3 border   p-4" ><?php echo $userId; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Name</th>
                        <td class="py-3 border   p-4" ><?php echo $initName; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >NIC No.</th>
                        <td class="py-3 border   p-4" ><?php echo $nic; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Mobile No.</th>
                        <td class="py-3 border   p-4" ><?php echo $tel; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Vehicle Class</th>
                        <td class="py-3 border   p-4" ><?php echo $vehiClass; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Exp. Date</th>
                        <td class="py-3 border   p-4" ><?php echo $exp_Date; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Valid No. Hrs</th>
                        <td class="py-3 border   p-4" ><?php echo $Hrs; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Validity</th>
                        <td class="py-3 border   p-4" ><?php echo $validity; ?></td>
                    </tr>
                </tbody>
            </table>
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
    <script>
        document.getElementById('delBtn').addEventListener('click', function() {
            // Get the medical request ID from the data attribute
            var medId = this.getAttribute('data-medid');
        
            // Show SweetAlert2 confirmation dialog
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // If user confirms deletion, send AJAX request to delete
                    deleteMedicalRequest(medId);
                }
            });
        });
        
        function deleteMedicalRequest(medId) {
            // Send AJAX request to delete the medical request
            fetch('mediDel.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ medId: medId })
            })
            .then(response => response.json())
            .then(data => {
                // Handle response from server
                if (data.success) {
            // If deletion is successful, show success message
            Swal.fire({
                title: 'Deleted!',
                text: 'Your medical request has been deleted.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                // After clicking OK, redirect to medic.php
                if (result.isConfirmed) {
                    window.location.href = 'medic.php';
                }
            });
                } else {
                    // If deletion fails, show error message
                    Swal.fire(
                        'Error!',
                        'Failed to delete the medical request.',
                        'error'
                    );
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Show error message if AJAX request fails
                Swal.fire(
                    'Error!',
                    'An error occurred while processing your request.',
                    'error'
                );
            });
        }
    </script>

  </body>
</html>
