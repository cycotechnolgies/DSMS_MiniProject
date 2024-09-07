<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php';

$errors = array();

$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";
// $userId = $_GET['uid'];
$medId = $_GET['mid'];

// echo $medId;

$query = "SELECT 
medic.*,
DATE(medic.date) AS med_date,
medi_payments.mpay_id,
medi_payments.amount,
medi_payments.pay_state,
medi_payments.userId
FROM 
medic
LEFT JOIN 
medi_payments ON medic.medId = medi_payments.mediId
WHERE 
medic.medId = :medId
LIMIT 1;
";

$rows = $conn->prepare($query);
// $rows->bindParam(':userId', $userId);
$rows->bindParam(':medId', $medId);
$rows->execute();
$result = $rows->fetch(PDO::FETCH_ASSOC);

$uName = $result['fullName'];
$addr = $result['addr'];
$tel = $result['tel'];
$nic = $result['nic'];
$waNo = $result['waNo'];
$gen = $result['gen'];
$passNo = $result['passNo'];
$adate = $result['date'];
$appoint = $result['apponite'];
$refId = $result['refId'];
$branch = $result['branch'];
$medfor = $result['medfor'];
$inst = $result['inst'];
$payAmount = $result['amount'];
$paystatus = $result['pay_state'];
$mpay = $result['mpay_id'];
$userId = $result['userId'];

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
    <title>Medical Details - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Medical Details</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <div class="relative overflow-hidden p-4">
            <table class="table-auto w-full text-left">
                <tbody class="bg-white text-gray-500">
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Medical ID</th>
                        <td class="py-3 border   p-4" ><?php echo $medId; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Name</th>
                        <td class="py-3 border   p-4" ><?php echo $uName; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Gender</th>
                        <td class="py-3 border   p-4" ><?php echo $gen; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >NIC No.</th>
                        <td class="py-3 border   p-4" ><?php echo $nic; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Passport No</th>
                        <td class="py-3 border   p-4" ><?php echo $passNo; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Address</th>
                        <td class="py-3 border   p-4" ><?php echo $addr; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Contact</th>
                        <td class="py-3 border   p-4" ><?php echo $tel; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >WhatsApp</th>
                        <td class="py-3 border   p-4" ><?php echo $waNo; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Requested Date</th>
                        <td class="py-3 border   p-4" ><?php echo $adate; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Requested Branch</th>
                        <td class="py-3 border   p-4" ><?php echo $branch; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Requested Institute</th>
                        <td class="py-3 border   p-4" ><?php echo $inst; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Vehical Class</th>
                        <td class="py-3 border   p-4" ><?php echo $medfor; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Payment ID & Status</th>
                        <td class="py-3 border   p-4" ><?php echo '<a class="text-blue-600 underline font-semibold" href="mpay_details.php?uid='.$userId.'&pid='.$mpay.'" target="_blank">#'.$mpay.'</a> : '. $paystatus; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Payment Amount</th>
                        <td class="py-3 border   p-4" ><?php echo $payAmount; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Reference No.</th>
                        <td class="py-3 border   p-4" ><?php echo $refId; ?></td>
                    </tr>
                    <tr class="py-3">
                        <th class="py-3 border   p-4" >Apointment</th>
                        <td class="py-3 border   p-4" ><?php echo $appoint; ?></td>
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
