<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/session_manager.php';
require_once '../phpconfigs/conn.php';

$errors = array();

$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";
$userId = $_SESSION['uid'];

$query = "SELECT *FROM users WHERE userId = :userId LIMIT 1;";
$rows = $conn->prepare($query);
$rows->bindParam(':userId', $userId);
$rows->execute();
$result = $rows->fetch(PDO::FETCH_ASSOC);

$fname = $result['fname'];
$lname = $result['lname'];



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
    <title>User Profile - RPSMS</title>
    <!-- <script src="../../js/stepper.js" defer></script> -->
    <script src="../../js/sidebar.js" defer></script>
    <script src="../../js/checks.js" defer></script>
    <script src="../../js/modal.js" ></script>
    <script src="../../js/interaction.js" ></script>
    
  </head>
  <body>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <!-- Page content -->
        
        <!-- navbar -->
        <div class="navbar bg-white z-[100] shadow- shadow-blue-400/50 sticky top-0">
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
              <h4>Hi.! <?php echo $_SESSION['fname'].' ( RP-0'.$_SESSION['uid'].' )'?></h4>
              </div>
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full border border-gray-400">
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
                  <!-- <li>
                    <a class="justify-between">
                      Profile
                    </a>
                  </li> -->
                  <li><a href="../phpconfigs/logout.inc.php">Logout</a>
                </ul>
              </div>
            </div>
          </div>
        <!-- main -->
        <div data-theme="none" class="p-4">
          
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Student Profile</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- profile details -->

        <?php
          $query = "SELECT s.*, r.course AS course, r.branch AS branch, r.train_type AS train, r.vehiClass AS clss
          FROM student s 
          INNER JOIN requests r ON s.userId = r.userId 
          WHERE s.userId = :userId LIMIT 1;";

          $rows = $conn->prepare($query);
          $rows->bindParam(':userId', $userId);
          $rows->execute();
          $result = $rows->fetch(PDO::FETCH_ASSOC);
          // var_dump($result);
          
          if ($rows->execute()) {
            // echo "Executed Query: " . $query . "<br>";
          if ($result) {

            $fullName = $result['fullName'];
            $stu = $result['stuId'];
            $initName = $result['initName'];
            $gen = $result['gen'];
            $dob = $result['dob'];
            $age = $result['age'];
            $addr = $result['addr'];
            $nic = $result['nic'];
            $passNo = $result['passNo'];
            $tel = $result['tel'];
            $waNo = $result['waNo'];
            $email = $result['email'];
            $branch = $result['branch'];
            $course = $result['course'];
            $train = $result['train'];
            $refId = $result['refId'];
            $Clss = $result['clss'];

          }else {
            // No rows fetched
            $fullName = "";
            $stu = "";
            $initName = "";
            $gen = "";
            $dob = "";
            $age = "";
            $addr = "";
            $nic = "";
            $passNo = "";
            $tel = "";
            $waNo = "";
            $email = "";
            $branch = "";
            $course = "";
            $train = "";
            $refId = "";
            $Clss = "";
          
          }
        }else{
          echo "Error executing query.";
        }
        
          $pay_query = "SELECT *, DATE(date) FROM payments WHERE userId=:userId";

          $prows = $conn->prepare($pay_query);
          $prows->bindParam(':userId', $userId);
          $prows->execute();
          $p_result = $prows->fetchAll(PDO::FETCH_ASSOC);

          $pro_query = "SELECT * FROM progress WHERE userId=:userId";

          $p_rows = $conn->prepare($pro_query);
          $p_rows->bindParam(':userId', $userId);
          $p_rows->execute();
          $pr_result = $p_rows->fetchAll(PDO::FETCH_ASSOC);
          // var_dump($pr_result);
        

        ?>

        <div class="bg-gray-100">
            <div class="container mx-4 py-8">
                <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div class="col-span-4 sm:col-span-3">
                        <div class="bg-white shadow rounded-lg p-6">
                            <div class="flex flex-col items-center">
                                <img  src="<?php echo (($gen === 'male') ? $genm : $genf) ?>" class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">
        
                                </img>
                                <h1 class="text-xl font-bold"><?php echo $fname.' '.$lname; ?></h1>
                                <p class="text-gray-700">ID : RPSTU - <?php echo $userId; ?></p>
                            </div>
                            <hr class="my-6 border-t border-gray-300">
                              <?php
                                if(!empty($refId)){
                                  echo 'Reg. By Sales Ref: No. '.$refId.'<br><hr class="my-6 border-t border-gray-300">';
                                }
                              ?>
                            
                            <div class="flex flex-col">
                                <h4 class="text-base font-semibold uppercase">Your Course</h4>
                                <hr class="mb-2 border-t border-gray-300">
                                <p class="ml-4"><i class="fa-solid fa-taxi"></i>  <?php echo $course; ?></p>

                                <h4 class="mt-4 text-base font-semibold uppercase">Requested Vehicles</h4>
                                <hr class="mb-2 border-t border-gray-300">
                                <p class="ml-4"><i class="fa-solid fa-taxi"></i> <?php echo $Clss; ?></p>

                                <h4 class="mt-4 text-base font-semibold uppercase">Branch</h4>
                                <hr class="mb-2 border-t border-gray-300">
                                <p class="ml-4"><i class="fa-regular fa-calendar-days"></i>  <?php echo $branch; ?></p>

                                <h4 class="mt-4 text-base font-semibold uppercase">Training</h4>
                                <hr class="mb-2 border-t border-gray-300">
                                <p class="ml-4"><i class="fa-solid fa-chalkboard-user"></i> <?php echo $train; ?></p>

                                
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4 sm:col-span-9">
                        <div class="bg-white shadow rounded-lg p-2">
                            <h2 class="text-xl font-bold mb-4">General Details</h2>
                            <div id="specificPart">
                            <form action="" method="post" id="form1">
                                <div>
                                    <div class="cols">
                                      <label for="fname">Full Name / සම්පූර්ණ නම<span class="text-red-500">*</span></label><br>
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="fname" name="fname" value="<?php echo $fullName; ?>" placeholder="Dissanayaka Mudiyanselage Saman Kumara " required />
          
                                    </div>
                                    <div class="cols">
                                      <label for="InName"
                                        >Name with Initials / මුලකුරු සමග නම<span class="text-red-500">*</span></label
                                      ><br>
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="InName" name="inName" placeholder="D.M. Saman Kumara" value="<?php echo $initName; ?>"  required />
                                    </div>
                                    <div class="cols grid md:grid-cols-2 gap-4">
                                      <div>
                                        <label for="dob">Birth Day / උපන් දිනය <span class="text-red-500">*</span></label><br>
                                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="date" id="dob" name="dob" maxlength="10" value="<?php echo $dob; ?>"  placeholder="2001/05/25" required />
                                      </div>
                                        <div>
                                        <label for="age">Age / වයස <span class="text-red-500">*</span></label><br>
                                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="age" name="age" maxlength="2" value="<?php echo $age; ?>"  placeholder="22" required />
                                      </div>
                                      </div>
                                    <div class="cols flex flex-col">
                                      <label for="gen">Gender / ස්ත්‍රී පුරුෂ භාවය<span class="text-red-500">*</span></label>
                                      <div class="py-4">
                                        <input
                                        class="hidden peer/male"
                                        type="radio"
                                        id="male"
                                        name="gen"
                                        value="male"
                                        <?php if($gen === 'male'){
                                          echo 'checked';
                                        } ?> 
                                        required 
                                      />
                                      <label for="male" class="border border-gray-400 px-2 py-2 mr-4 rounded-md text-gray-400 peer-checked/male:border-none peer-checked/male:bg-blue-600 peer-checked/male:text-white peer-checked/male:font-semibold">
                                        <i class="fa-solid fa-circle-check"></i> Male / පුරුෂ
                                      </label>
                                      
                                      <input
                                        class="hidden peer/female"
                                        type="radio"
                                        id="female"
                                        name="gen"
                                        
                                        value="female"
                                        <?php if($gen === 'female'){
                                          echo 'checked';
                                        } ?>
                                      />
                                      <label for="female" class="border border-gray-400 px-2 py-2 rounded-md text-gray-400 peer-checked/female:border-none peer-checked/female:bg-blue-600 peer-checked/female:text-white peer-checked/female:font-semibold">
                                        <i class="fa-solid fa-circle-check"></i> Female / ස්ත්‍රී
                                      </label>
                                      
                                      <!-- <input class="ml-4" type="radio" id="gen" name="gen" value="other" />
                                      Other / වෙනත් -->
                                      </div>
                                    </div>
                                    <div class="cols grid md:grid-cols-2 gap-4">
                                    <div>
                                      <label for="nic">NIC No. / හැඳුනුම්පත් අංකය<span class="text-red-500">*</span></label><br>
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="nic" id="nic" maxlength="12" value="<?php echo $nic; ?>"   placeholder="96******* V / 20**********" required />
                                    </div>
                                      <div>
                                      <label for="ppn">Passport No. / විදේශ ගමන් බලපත්‍ර අංකය</label><br>
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="ppn" id="ppn" placeholder="N17******" value="<?php echo $passNo; ?>"   maxlength="10" />
                                    </div>
                                    </div>
                                    <div>
                                      <label for="addr">Permenent Address / ස්ථීර ලිපිනය<span class="text-red-500">*</span></label>
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="addr" id="addr"value="<?php echo $addr; ?>"   placeholder="No. 152, ***********,********" required />
                                    </div>
                                    <div class="cols grid md:grid-cols-2 gap-4">
                                      <div>
                                        <label for="mobi">Mobile No. / දුරකථන අංකය<span class="text-red-500">*</span></label>
                                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="tel" id="mobi" maxlength="10" value="<?php echo $tel; ?>"   placeholder="07* *******" required />
                                      </div>
                                        <div>
                                          <label for="wa">WhatsApp No. / වට්ස්ඇප් අංකය<span class="text-red-500">*</span></label>
                                          <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="wa" id="wa"  placeholder="07* *******" value="<?php echo $waNo; ?>"   maxlength="10"required />
                                      </div>
                                    </div>
                                    <div>
                                      <label for="email">Email Address / ඊමේල් ලිපිනය<span class="text-red-500">*</span></label>
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="email" name="email" id="email" value="<?php echo $email; ?>"   placeholder="example@gmail.com" required />
                                    </div>
                                  </div>
                            </form>
                            </div>
                            <div class="flex gap-4 justify-end hidden" id="formBtn">
                                <button onclick="disableAllFields()"  class="px-4 py-2 rounded-md bg-gray-200 border border-gray-400 text-gray-600 " id="cancelupdate"  type="button">Cancel</button>

                                <button onclick="" class="px-4 py-2 rounded-md bg-green-600 text-white " id="editupdate" data-student-id="<?php echo $stu;?>"  type="button"><i class="fa-solid fa-angles-up"></i> Update</button>
                                
                            </div>
        
                            <h2 class="text-xl font-bold mt-6 mb-4">Payments</h2>
                            <hr class="mb-2 border-t border-gray-300">
                            <div>
                                <div class="relative overflow-hidden shadow-md rounded-lg">
                                    <table class="table-auto w-full text-left">
                                        <thead class="text-gray-600 uppercase bg-gray-300">
                                            <tr>
                                                <td class="py-2 border text-center font-bold p-4" >Payment-ID</td>
                                                <td class="py-2 border text-center font-bold p-4" >Date</td>
                                                <td class="py-2 border text-center font-bold p-4" >amount</td>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white text-gray-500">
                                            <?php
                                              if($p_result){
                                                  foreach($p_result as $rows){
                                                   echo '
                                                   <tr class="py-3">
                                                   <td class="py-3 border text-center  p-4" >'.$rows['payId'].'</td>
                                                   <td class="py-3 border text-center  p-4" >'.$rows['date'].'</td>
                                                   <td class="py-3 border text-center  p-4" >'.$rows['amount'].'</td>
                                                   </tr>
                                                   ';
                                                  }
                                              }
                                            ?>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <h2 class="text-xl font-bold mt-6 mb-4">Other</h2>
                            <hr class="mb-2 border-t border-gray-300">
                            <div>
                            <div class="flex flex-row gap-4">
                                <div class="relative overflow-hidden">
                                <a href="progress.php?uid=<?php echo $userId;?>"><button  class="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold" id="prog"  type="button"><i class="fa-regular fa-hourglass-half"></i> Timeline</button></a>
                                </div>
                                <div class="relative overflow-hidden">
                                <a href="cls_details.php?uid=<?php echo $userId;?>"><button  class="px-4 py-2 rounded-md bg-green-600 text-white font-semibold" id="prog"  type="button"><i class="fa-solid fa-chalkboard-user"></i> Training</button></a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end of profile details -->

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
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
    document.getElementById("editupdate").addEventListener("click", function() {
    var studentId = this.getAttribute("data-student-id");
    var formData = new FormData(document.getElementById("form1"));
    formData.append("studentId", studentId);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "profileUpdate.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
             if (xhr.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: xhr.responseText
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Reload the page
                        window.location.reload();
                    }
                });
            } else {
                console.error("Error:", xhr.statusText);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }
        }
    };
    xhr.send(formData);
});
</script>
  </body>
</html>
