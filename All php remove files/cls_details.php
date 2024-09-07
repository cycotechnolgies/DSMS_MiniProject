<!DOCTYPE html>
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
    <title>Training Card - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Training Card Details</h4>
          <hr class="mt-3 border-blue-600">
        </div>
        
        <div class="p-4 flex justify-start gap-4">
          <p class="text-xl font-bold uppercase"><span class="text-blue-600">#<?php echo $userId; ?> </span><?php echo $name; ?></p>
        </div>
        <hr>
        <div class="relative overflow-hidden m-4">
          <div class="cols grid md:grid-cols-2 gap-4">
                <div class="cols">
                  <label for="">NIC / Passport No.</label>
                  <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="" id="" value="<?php 
                    if($nic == ""){
                      echo $ppNo;
                    }else{
                      echo $nic;
                    }
                  ?>" disabled />
                </div>
                <div class="cols">
                    <label for="branch">Branch</label>
                  <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="" id="" value="<?php echo $branch;?>" disabled />
                </div>
          </div>
          <div class="cols grid md:grid-cols-2 gap-4">
                <div class="cols">
                  <label for="">Requested For</label>
                  <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="" id="" value="<?php echo $types;?>" disabled />
                </div>
                <div class="cols">
                    <label for="branch">Contact</label>
                  <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="" id="" value="<?php echo $tel;?>" disabled />
                </div>
          </div>
        </div>
        <hr>
        <h4 class="text-xl font-bold text-center py-2">Enter Training Details</h4>
        <hr>
        <div class="relative overflow-hidden m-4">
          <form method="POST">
          <div class="cols grid md:grid-cols-2 gap-4">
                <div class="cols">
                  <label for="">Training Type </label>
                  <select class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" name="Trains" id="" required>
                    <option value="">--Select Option--</option>
                    <option value="Full">Full</option>
                    <option value="Half">Half</option>
                    <option value="One Day">One Day</option>
                  </select>
                </div>
                <div class="cols">
                <label for="branch">Class Date <span class="text-red-600">*</span></label>
                  <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="" id="" value="<?php echo $Times;?>" disabled />
                </div>
          </div>
          <div class="cols grid md:grid-cols-2 gap-4">
                <div class="cols">
                  <label for="">Expire Date <span class="text-red-600">*</span></label>
                  <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="date" name="Exp" id="" value="" required/>
                </div>
                <div class="cols">
                <label for="">Valid Hours</label>
                    <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="number" name="hrs" id="" value=""/>
                </div>
          </div>
          <div class="flex flex-row justify-end items-center">
            <button class="px-4 py-2 text-white font-bold bg-green-600 rounded-md" type="submit" name="submit">Submit</button>
          </div>
          </form>
        </div>
        <div>
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
