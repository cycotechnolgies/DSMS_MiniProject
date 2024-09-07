<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/session_manager.php';
require_once '../phpconfigs/conn.php'; 

$errors = array();

if (isset($_POST['submit'])) {

    $paySel = $_POST['paySel'];

        $userId = $_SESSION['uid'];

        if($paySel === 'bank'){
          header("Location: add_pay.php?uid=$userId");
        }
        elseif($paySel === 'online'){
          header("Location: add_paySel.php?uid=$userId");
        }
        elseif($paySel === 'visit'){
          header("Location: success.php");
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
                <div class="text-base mr-4 font-medium">
                <h4>Hi.! <?php echo $_SESSION['fname'].' ( RP-STU-0'.$_SESSION['uid'].' )'?></h4>
              </div>
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
                    <li>
                        <a class="justify-between">
                        Profile
                        </a>
                    </li>
                    <li><a href="../phpconfigs/logout.inc.php">Logout</a>
                    </ul>
                </div>
                </div>
            </div>
        
            <!-- main -->
            <div data-theme="none" class="p-4">
            <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-credit-card"></i> Payments</h4>
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
                <div>
                  <form action="" method="post">
                    <div>
                      <input class="mb-4" type="radio" name="paySel" value="bank" checked required> Bank Payments (බැංකු ගෙවීම්)
                      <div class=" space-y-3 rounded-lg grid md:grid-cols-2 text-justify">
                              <div class="flex items-center space-x-2 text-sm">
                                <div class="flex gap-4 justify-center items-center bg-blue-200 p-4 rounded-lg" >
                                  <div class="w-1/3 rounded-lg">
                                    <img src="../../images/boc logo.png" alt="BOC Logo">
                                  </div>
                                  <div>
                                    <p class="text-xl font-semibold text-blue-800">90969406</p>
                                    <p class="text-sm md:text-base font-semibold text-gray-500">G. G. K. R. Gamage</p>
                                    <p class="text-sm md:text-base font-semibold text-gray-500">BOC</p>
                                    <p class="text-sm md:text-base font-semibold text-gray-500">Dehiaththakandiya</p>
                                  </div>
                                </div>
                              </div>
                              <div class=" font-normal">
                              <p class="text-justify">Pay Rs.1500/= as registration fee and Upload your bank payment slip here.
                              ලියාපදිංචි ගාස්තුව ලෙස රු.1500/= ගෙවා ඔබගේ බැංකු ගෙවීම් පත්‍රිකාව උඩුගත කල යුතුයි.</p>
                            </div>
                      </div>
                    </div>
                      <div>
                        <input class="mb-4 mt-4" type="radio" name="paySel" value="online" > Online Payments (මාර්ගගත ගෙවීම්)
                        <div class="p-4 rounded-lg bg-blue-200">Comming Soon...</div>
                      </div>
                      <div>
                        <input class="mb-4 mt-4" type="radio" name="paySel" value="visit" > Visit Branch (ශාඛාවට පැමිණ ගෙවීම)
                      </div>
                      <div class="w-full flex flex-row butons items-center justify-end my-4 p-4">
                    <!-- <button class="btn btn-md px-10 py-2 rounded-md bg-gray-200  text-gray-400 border border-gray-400 " onclick="window.history.back()" id="cancelBtn"  type="button">Cancel</button> -->
                    <button id="submit" class="btn btn-md bg-green-600 border-none text-white px-10 py-2 rounded-lg shadow-md cursor-pointer font-semibold disabled:bg-green-300 disabled:text-green-400 disabled:cursor-not-allowed hover:bg-green-800" type="submit" name="submit">Submit</button>
                </div>
                  </form>
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
  </body>
</html>
