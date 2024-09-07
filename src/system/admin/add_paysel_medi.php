<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php'; 

$errors = array();

if (isset($_POST['submit'])) {

    $paySel = $_POST['paySel'];

        if($paySel === 'bank'){
          $medId = $_GET['mid'];
          header("Location: add_pay_medi.php?mid=".$medId."&uid=".$_SESSION['uid']);
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
    <title>Medical Appointment - RPSMS</title>
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
            <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-cash-register"></i> Payment Method</h4>
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
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                        <div class="p-2">
                        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">
                          <div class="p-2 flex justify-center items-center">
                            <img  src="../../images/Peoples-bank-logo.jpg" alt="BOC LOGO">
                          </div>
                          <div class=" p-2">
                            <div class="capitalize tracking-wide text-base font-semibold ">Beneficent Name :<br> <span class="font-bold capitalize">G. G. B. S. Gamage</span></div>
                            <div class="capitalize tracking-wide text-base font-semibold ">Account Number : <br><span class="font-bold capitalize">330200100113585</span></div>
                            <div class="capitalize tracking-wide text-base font-semibold ">Branch : <br><span class="font-bold capitalize">Dehiaththakandiya</span></div>
                          </div>
                        </div> 
                        </div>
                        <div class="p-2 place-items-center place-content-center ">
                          <p class="text-justify">Pay Rs.1800/= as registration fee and Upload your bank payment slip here.
                              ලියාපදිංචි ගාස්තුව ලෙස රු.1800/= ගෙවා ඔබගේ බැංකු ගෙවීම් පත්‍රිකාව උඩුගත කල යුතුයි.</p>
                        </div>
                      </div>
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
        <?php 
            include('sidebar.php')
          ?>
        </ul>
      </div>
      </div>
    </div>
  </body>
</html>
