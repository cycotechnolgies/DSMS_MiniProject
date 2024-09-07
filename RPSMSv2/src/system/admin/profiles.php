<!DOCTYPE html>
<?php
session_start();
$userId = $_GET['uid'];
$name = $_GET['vxc']. ' '. $_GET['zxb'] ;

require_once '../phpconfigs/conn.php';

          $query = "SELECT s.*, r.oldNo AS oldNo, r.training AS tr, r.req AS req, r.course AS course, r.branch AS branch, r.train_type AS train, r.vehiClass AS clss
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
            $Clss = $result['clss'];
            $oldNo = $result['oldNo'];
            $req = $result['req'];
            $tr = $result['tr'];

          }else {
            // No rows fetched
            echo "No rows fetched.";
          
          }
        }else{
          echo "Error executing query.";
        }
        
          $pay_query = "SELECT *, DATE(date) AS day FROM payments WHERE userId=:userId ORDER BY payId DESC LIMIT 5";

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
    <title>PROFILE - RPSMS</title>
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
            
                  <li><a href="../phpconfigs/logout.inc.php">Logout</a>
                </ul>
              </div>
            </div>
          </div>
        <!-- main -->
            <div data-theme="none" class="p-4 bg-gray-100">
            <section class="relative">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <div class="p-4 bg-white rounded-md">
                    <div class="flex justify-center item-center">
                      <img class="rounded-full bg-blue-200 border border-blue-600" src="../../images/avatars/man.png" alt="">
                    </div>
                    <div>
                      <p class="font-semibold text-center md:text-left text-xl"><?php echo $name; ?></p>
                      <p class="font-semibold text-center md:text-left text-sm"><?php echo 'Reg. No. RP - '. $userId; ?></p>
                    </div>

                  </div>
                  <div class="p-4 bg-white rounded-md">
                      <div class="bg-blue-200 text-blue-600 font-semibold px-4 py-2 rounded-md mb-2 text-center">
                        <p><i class="fa-regular fa-image"></i> instruction is here for image upload</p>
                      </div>
                      <form action="post">
                      <div  class="flex items-center justify-center md:justify-start gap-4 " >
                          <div class="bg-black text-nowrap uppercase px-4 py-2 text-white text-sm font-semibold rounded-md">
                            <input type="file" name="profile" value="" id="ppimg" hidden>
                            <label for="ppimg" >Select</label>
                          </div>
                          <div>
                            <button class="bg-orange-600 px-4 py-2 text-white text-sm font-semibold rounded-md">UPLOAD</button>
                          </div>
                        
                      </div>
                    </form>
                </div>
                </div>
                <!-- PERSONAL -->
                <div class="w-full max-w-7xl mx-auto p-4 bg-white rounded-md mb-4">
                    <div>
                      <h4 class="font-semibold text-xl mb-2">PERSONAL DETAILS</h4>
                      <hr class="mb-2">
                    </div>
                    <form method="post">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div class="">
                        <label for="">Full Name</label>
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="<?php echo $fullName; ?>" type="text" name="fname" id="">
                      </div>
                      <div class="">
                        <lable for="">Name with initials</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="<?php echo $initName; ?>" name="Iname" id="">
                      </div>
                      
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
                      <div class="">
                        <label for="">Date of Birth</label>
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="<?php echo $dob; ?>" type="text" name="dob" id="">
                      </div>
                      <div class="">
                        <lable for="age">Age</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="<?php echo $age; ?>" name="age" id="">
                      </div>
                      </div>
                      <div class="">
                      <label for="gen">Gender / ස්ත්‍රී පුරුෂ භාවය</label>
                        <div class="py-2">
                          <input
                          class="hidden peer/male"
                          type="radio"
                          id="male"
                          name="gen"
                          value="male"
                          <?php 
                            if($gen == 'male'){
                              echo 'checked';
                            }
                
                          ?>
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
                          <?php 
                            if($gen == 'female'){
                              echo 'checked';
                            }
                
                          ?>
                          value="female"
                          
                        />
                        <label for="female" class="border border-gray-400 px-2 py-2 rounded-md text-gray-400 peer-checked/female:border-none peer-checked/female:bg-blue-600 peer-checked/female:text-white peer-checked/female:font-semibold">
                          <i class="fa-solid fa-circle-check"></i> Female / ස්ත්‍රී
                        </label>
                      </div>
                    </div>
                    <div class="">
                        <lable for="">NIC No.</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="<?php echo $nic; ?>" type="text"  name="nic" id="">
                      </div>
                      <div class="">
                        <lable for="">Passport No.</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="<?php echo $passNo; ?>" type="text" name="ppno" id="">
                      </div>
                      <div class="">
                        <lable for="">Email</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="<?php echo $email; ?>" type="email" name="email" id="">
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div class="">
                        <lable for="">Mobile No.</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="<?php echo $tel; ?>" name="tel" id="">
                      </div>
                      <div class="">
                        <lable for="">WhatsApp No.</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="<?php echo $waNo; ?>" name="wano" id="">
                      </div>
                      </div>
                      
                </div>
                      <div class="">
                        <lable for="">Address</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="<?php echo $addr; ?>" name="addr" id="">
                      </div>
                <div class="flex justify-end items-center mt-4">
                      <button class="bg-green-600 text-white font-semibold px-4 py-2 m-2 rounded-md" name="personal" >Update</button>
                </div>
                </form>
                </div>
                
                <!-- Course -->
                <div class="w-full max-w-7xl mx-auto p-4 bg-white rounded-md">
                  <div>
                      <h4 class="font-semibold text-xl mb-2">COURSE DETAILS</h4>
                      <hr class="mb-2">
                  </div>
                  <form action="" method="post">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      <div class="">
                        <lable for="">Request</lable>
                        <select class="p-2 border w-full border-gray-600 rounded-md" type="text" name="req" id="">
                              <option value="">-- Select Option --</option>
                              <option value="new" <?php if ($req == 'new') echo 'selected'; ?>>New</option>
                              <option value="extend" <?php if ($req == 'extend') echo 'selected'; ?>>Extend</option>
                              <option value="renew" <?php if ($req == 'renew') echo 'selected'; ?>>Renew</option>
                              <option value="copy" <?php if ($req == 'copy') echo 'selected'; ?>>Copy</option>
                              <option value="Translate" <?php if ($req == 'Translate') echo 'selected'; ?>>Translate</option>
                              <option value="Correction" <?php if ($req == 'Correction') echo 'selected'; ?>>Correction</option>
                              <option value="Extend(PT)" <?php if ($req == 'Extend(PT)') echo 'selected'; ?>>Extend (Public Transport)</option>
                        </select>
                      </div>
                      <div class="">
                        <lable for="">Vehical Class</lable>
                        <select class="p-2 border w-full border-gray-600 rounded-md" type="text" name="cls" id="">
                              <option value="">--Select Class--</option>
                              <option value="light vehicle" <?php if ($course == 'light vehicle') echo 'selected'; ?>>Light Vehicle</option>
                              <option value="heavy vehicle" <?php if ($course == 'heavy vehicle') echo 'selected'; ?>>Heavy Vehicle</option>
                              <option value="custom" <?php if ($course == 'custom') echo 'selected'; ?>>Custom</option>
                        </select>
                      </div>
                      <div class="">
                        <lable for="">Request Vehicals</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="<?php echo $Clss; ?>" name="reqvehi" id="">
                      </div>
                      <div class="">
                        <lable for="">Old Licence No</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="<?php echo $oldNo; ?>" name="olno" id="">
                      </div>
                      <div class="">
                        <lable for="">Training Request</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="<?php echo $tr; ?>" name="trainreq" id="">
                      </div>
                      <div class="">
                        <lable for="">Training For</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="<?php echo $train; ?>" name="trainfor" id="">
                      </div>
                  </div>
                  <div class="flex justify-end items-center mt-4">
                      <button class="bg-green-600 text-white font-semibold px-4 py-2 m-2 rounded-md" name="course" >Update</button>
                </div>
                  </form>
                </div>
                <div class="w-full max-w-7xl mx-auto p-4 rounded-md">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        <div class="bg-white rounded-md p-4">
                          <div>
                          <p class="font-semibold text-xl">PAYMENTS</p>
                          <hr class="mb-2">
                          </div>
                          <div>
                          <table class="table-auto w-full text-left">
                                        <thead class="text-gray-600 uppercase bg-gray-300">
                                            <tr>
                                                <td class="py-2 border text-center text-sm font-bold p-4" >Pay-ID</td>
                                                <td class="py-2 border text-center  text-sm font-bold p-4" >Date</td>
                                                <td class="py-2 border text-center text-sm font-bold p-4" >Amount (Rs.)</td>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white text-gray-500">
                                            <?php
                                              if($p_result){
                                                  foreach($p_result as $rows){
                                                   echo '
                                                   <tr class="py-3">
                                                   <td class="py-3 border text-center text-sm  p-4" >'.$rows['payId'].'</td>
                                                   <td class="py-3 border text-center text-sm  p-4" >'.$rows['day'].'</td>
                                                   <td class="py-3 border text-center text-sm  p-4" >'.$rows['amount'].'</td>
                                                   </tr>
                                                   ';
                                                  }
                                              }
                                            ?>
                                            
                                        </tbody>
                                    </table>
                          </div>
                        </div>
                        <div>
                          <?php
                            include_once 'progress.php';
                          ?>
                        </div>
                      </div>
                </div>
            </section>
                                            
                                            
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
