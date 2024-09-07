<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php'; 

$errors = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  

    $reqFor = htmlspecialchars($_POST['reqfor']);
    $train = htmlspecialchars($_POST['train']);
    $branch = htmlspecialchars($_POST['branch']);
    $train_type = htmlspecialchars($_POST['types']);
    $course = htmlspecialchars($_POST['course']);

    if($train == 'no'){
      $train_type = "No";
    }else{
      $train_type = htmlspecialchars($_POST['types']);
    }
  
    if($_POST["course"] === 'custom'){
        $selectedVehicleClasses = $_POST["vehicls"]; // Retrieve selected vehicle classes
        $Vclasses = implode(", ", $selectedVehicleClasses); // Convert array to comma-separated string
    } else {
        $course = htmlspecialchars($_POST['course']);
    }

    $selTrain = $_POST["reqTrain"];
    $trainReq = implode(", ", $selTrain);

    $training = $train_type." training for Class ". $trainReq;

    if (isset($_GET['uid'])) {
        $userId = $_GET['uid'];

        if(empty($errors)) {
            try {
                $req_query = "INSERT INTO requests(userid, req, course, vehiClass,  branch, training, train_type) 
                VALUES (:userid, :req, :course, :vehiClass,  :branch, :training, :train_type);";
                $req_stmt = $conn->prepare($req_query);
                
                $req_stmt->bindParam(":userid", $userId);
                $req_stmt->bindParam(":req", $reqFor);
                $req_stmt->bindParam(":course", $course);
                $req_stmt->bindParam(":vehiClass", $Vclasses); // Bind the concatenated string
                $req_stmt->bindParam(":branch", $branch);
                $req_stmt->bindParam(":training", $train);
                $req_stmt->bindParam(":train_type", $training);
                
                if($req_stmt->execute()){
                  header("Location: add_paysel.php?uid=$userId");
                  exit();
                }else{
                  var_dump($_POST["vehicls"]);
                  echo $Vclasses;
                }        
                
            } catch(PDOException $e) {
                echo "Error creating staff record: " . $e->getMessage(). "\n";
            }
        }
    } else {
        echo "No id Passed";
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
    <script src="../../js/checks.js" defer></script>

    <!-- <script src="/src/js/interaction.js" defer></script> -->
    <title>Online Registration - RPSMS</title>
  </head>
  <div>
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
            <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-user-graduate"></i> Online Registration</h4>
            <hr class="mt-3 border-blue-600">
            </div>
            <div class="p-4">
                <?php
                
                if (!empty($errors)): ?>
                  <div>
                      <ul>
                          <?php foreach ($errors as $error): ?>
                              <li><?php echo $error; ?></li>
                          <?php endforeach; ?>
                      </ul>
                  </div>
              <?php endif;
                
                ?>
                <form action="" method="post">
                    <div>
                    <div class="cols grid md:grid-cols-2 gap-4 my-4">
                          <div class="cols">
                          <label for="reqfor" class="my-4">Applying For / අයදුම් කරන්නේ<span class="text-red-500">*</span></label><br>
                          <div class="mt-4">
                           <select name="reqfor" name="reqFor" id="req" class="w-full p-2 rounded-md border border-gray-400" required>
                              <option value="">-- Select Option --</option>
                              <option value="new">New</option>
                              <option value="extend">Extend</option>
                              <option value="renew">Renew</option>
                              <option value="copy">Copy</option>
                              <option value="Translate">Translate</option>
                              <option value="Correction">Correction</option>
                              <option value="Extend(PT)">Extend (Public Transport)</option>
                           </select>
                          </div>
                        </div>
                        <div class="cols">
                          <label for="course"  class="my-4">Select Course / පාඨමාලාව තෝරන්න<span class="text-red-500">*</span></label><br>
                          <div class="mt-4">
                            <select name="course" name="course" id="course" class="w-full p-2 rounded-md border border-gray-400" required>
                              <option value="">--Select Course--</option>
                              <option value="light vehicle">Light Vehicle</option>
                              <option value="heavy vehicle">Heavy Vehicle</option>
                              <option value="custom">Custom</option>
                            </select>
                          </div>
                          
                      </div>
                      </div>
                        <div class="cols grid md:grid-cols-2 gap-4 my-4">
                          <div class="cols">
                            <label for="olno">Previous License No. / පැරණි බලපත්‍ර අංකය.</label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="olNo" id="olno" />
                          </div>
                        <div class="cols">
                            <label for="branch">Select Branch / ශාඛාව තෝරන්න<span class="text-red-500">*</span></label>
                            <select name="branch" name="branch" id="branch" class="w-full my-2 p-2 rounded-md border border-gray-400" required>
                                <option value="">--Select a Branch--</option>
                                <option value="Ampara">Ampara</option>
                                <option value="Dehiaththakandiya">Dehiaththakandiya</option>
                            </select>
                        </div>
                        </div>
                        <div name="vehiCls" id="checkboxes" class="mb-4 hidden">
                            <label for="cls">Select Vehicle Classes / වාහන පන්ති තෝරන්න <span class="text-red-500">*</span></label>
                            <div name="" id="checkboxGrid" class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-4">
                              
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsA" value="A" />
                                <label for="clsA">Motorcycle</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsB1" value="B1" />
                                <label for="clsB1">Three Wheel</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsB" value="B" />
                                <label for="clsB">Car & Van</label>
                              </div>  
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsC1" value="C1" />
                                <label for="clsC1">Light Lorry</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsC" value="C" />
                                <label for="clsC">Lorry</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsCE" value="CE" />
                                <label for="clsCE">Heavy Lorry</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsD1" value="D1" />
                                <label for="clsD1">Light Bus</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsD" value="D" />
                                <label for="clsD">Bus</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsDE" value="DE" />
                                <label for="clsDE">Heavy Bus</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsG1" value="G1" />
                                <label for="clsG1">LandMaster</label>
                              </div>
                        
                              <div>
                              <input type="checkbox" name="vehicls[]" id="clsG2" value="G" />
                                <label for="clsG2">Tractors</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsJ" value="J" />
                                <label for="clsJ">Special Vehicles</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="vehicls[]" id="clsPT" value="PT" />
                                <label for="clsPT">Public Transport</label>
                              </div>
                            </div>
                        </div>
                        <div>
                          <label for="train" class="mb-4 mt-4">Do You Need Training ? / ඔබට පුහුණුවක් අවශ්‍යද?<span class="text-red-500">*</span></label><br>
                          <div class=" py-4">
                            <input
                            class="hidden peer/male"
                            type="radio"
                            id="y"
                            name="train"
                            value="yes"
                            checked
                            required
                          />
                          <label for="y" class="border border-gray-400 px-2 py-2 mr-4 rounded-md text-gray-400 peer-checked/male:border-none peer-checked/male:bg-blue-600 peer-checked/male:text-white peer-checked/male:font-semibold">
                            <i class="fa-solid fa-circle-check"></i> Yes
                          </label>
                          
                          <input
                            class="hidden peer/female"
                            type="radio"
                            id="n"
                            name="train"
                            value="no"
                          />
                          <label for="n" class="border border-gray-400 px-2 py-2 rounded-md text-gray-400 peer-checked/female:border-none peer-checked/female:bg-blue-600 peer-checked/female:text-white peer-checked/female:font-semibold">
                            <i class="fa-solid fa-circle-check"></i> No
                          </label>
                          
                          <!-- <input class="ml-4" type="radio" name="" id="gen" name="gen" value="other" />
                          Other / වෙනත් -->
                          </div>
                        </div>

                        <div id ="types"  class="types">
                          <label for="types" class="mb-4 mt-4">Training packages / පුහුණු පැකේජ<span class="text-red-500">*</span></label><br>
                          <div class="py-4">
                              <input
                                  class="hidden peer/full"
                                  type="radio"
                                  id="full"
                                  name="types"
                                  value="Full"
                              />
                              <label for="full" class="border border-gray-400 px-2 py-2 mr-4 rounded-md text-gray-400 peer-checked/full:border-none peer-checked/full:bg-blue-600 peer-checked/full:text-white peer-checked/full:font-semibold">
                                  <i class="fa-solid fa-circle-check"></i> Full
                              </label>
                              
                              <input
                                  class="hidden peer/half"
                                  type="radio"
                                  id="half"
                                  name="types"
                                  value="Half"
                              />
                              <label for="half" class="border border-gray-400 px-2 py-2 rounded-md text-gray-400 peer-checked/half:border-none peer-checked/half:bg-blue-600 peer-checked/half:text-white peer-checked/half:font-semibold">
                                  <i class="fa-solid fa-circle-check"></i> Half
                              </label>
                      
                              <input
                                  class="hidden peer/oneday"
                                  type="radio"
                                  id="oneday"
                                  name="types"
                                  value="Oneday"
                              />
                              <label for="oneday" class="border border-gray-400 ml-4 px-2 py-2 mr-4 rounded-md text-gray-400 peer-checked/oneday:border-none peer-checked/oneday:bg-blue-600 peer-checked/oneday:text-white peer-checked/oneday:font-semibold">
                                  <i class="fa-solid fa-circle-check"></i> One Day
                              </label>
                          </div>
                      </div>
                      <!-- train options -->
                      
                       <div name="" id="Lcheckboxes" class="mb-4 hidden">
                            <label for="cls">I need Training for / පුහුණුව අවශ්‍ය වාහන පන්ති <span class="text-red-500">*</span></label>
                            <div name="" id="checkboxGrid" class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-4">
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsA" value="All" />
                                <label for="clsA">All</label>
                              </div>

                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsA" value="A" />
                                <label for="clsA">Motorcycle</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsB1" value="B1" />
                                <label for="clsB1">Three Wheel</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsB" value="B" />
                                <label for="clsB">Car & Van</label>
                              </div>  
                              
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsC1" value="C1" />
                                <label for="clsC1">Light Lorry</label>
                              </div>
                              
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsC" value="C" />
                                <label for="clsC">Lorry</label>
                              </div>
                              
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsG1" value="G1" />
                                <label for="clsG1">LandMaster</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsG" value="G" />
                                <label for="clsG2">Tractors</label>
                              </div>

                              
                            </div>
                      </div>
                      
                      <div name="" id="Hcheckboxes" class="mb-4 hidden">
                            <label for="cls">I need Training for / පුහුණුව අවශ්‍ය වාහන පන්ති <span class="text-red-500">*</span></label>
                            <div name="" id="checkboxGrid" class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-4">
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsA" value="All" />
                                <label for="clsA">All</label>
                              </div>

                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsCE" value="CE" />
                                <label for="clsCE">Heavy Lorry</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsD1" value="D1" />
                                <label for="clsD1">Light Bus</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsD" value="D" />
                                <label for="clsD">Bus</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsDE" value="DE" />
                                <label for="clsDE">Heavy Bus</label>
                              </div>
                        
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsJ" value="J" />
                                <label for="clsJ">Special Vehicles</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsPT" value="PT" />
                                <label for="clsPT">Public Transport</label>
                              </div>
                            </div>
                      </div>

                      <div name="" id="Ccheckboxes" class="mb-4 hidden">
                            <label for="cls">I need Training for / පුහුණුව අවශ්‍ය වාහන පන්ති <span class="text-red-500">*</span></label>
                            <div name="" id="checkboxGrid" class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-4">
                              
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsA" value="A" />
                                <label for="clsA">Motorcycle</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsB1" value="B1" />
                                <label for="clsB1">Three Wheel</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsB" value="B" />
                                <label for="clsB">Car & Van</label>
                              </div>  
                              
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsC1" value="C1" />
                                <label for="clsC1">Light Lorry</label>
                              </div>
                              
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsC" value="C" />
                                <label for="clsC">Lorry</label>
                              </div>
                              
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsG1" value="G1" />
                                <label for="clsG1">LandMaster</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsG" value="G" />
                                <label for="clsG2">Tractors</label>
                              </div>

                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsCE" value="CE" />
                                <label for="clsCE">Heavy Lorry</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsD1" value="D1" />
                                <label for="clsD1">Light Bus</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsD" value="D" />
                                <label for="clsD">Bus</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsDE" value="DE" />
                                <label for="clsDE">Heavy Bus</label>
                              </div>
                        
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsJ" value="J" />
                                <label for="clsJ">Special Vehicles</label>
                              </div>
                        
                              <div>
                                <input type="checkbox" name="reqTrain[]" id="clsPT" value="PT" />
                                <label for="clsPT">Public Transport</label>
                              </div>
                            </div>
                      </div>
                      <!-- end of train option -->
                    </div>
                    </div>
                <div class="w-full flex flex-row butons items-center justify-end my-4 p-4">
                    <!-- <button class="btn btn-md px-10 py-2 rounded-md bg-gray-200  text-gray-400 border border-gray-400 " onclick="window.history.back()" id="cancelBtn"  type="button">Cancel</button> -->
                    <button id="submit" class="btn btn-md bg-green-600 border-none text-white px-10 py-2 rounded-lg shadow-md cursor-pointer font-semibold disabled:bg-green-300 disabled:text-green-400 disabled:cursor-not-allowed hover:bg-green-800" type="submit" name="submit">Submit</button>
                </div>
                </form>
            
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
