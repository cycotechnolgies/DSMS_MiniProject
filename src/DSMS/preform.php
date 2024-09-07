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
    <title>Grades - RPSMS</title>
    <script src="../../js/stepper.js" defer></script>
    <script src="../../js/sidebar.js" defer></script>
    <script src="../../js/checks.js" defer></script>
    <script src="../../js/modal.js" ></script>
    <!-- <script src="../../js/interaction.js" ></script> -->
    
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
          
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Update User Performance</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- profile details -->
            
            <div class="flex flex-col items-center w-full">
                
                <form id="form2" action="" method="post">
                <div class="cols grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="w-auto" for="status">Preform: </label><br>
                        <select name="stats" id="stats" class="p-2 border border-gray-400 rounded-md my-4 w-full" required>
                            <option value="Forward">Forward</option>
                            <option value="Reverse">Reverse</option>
                            <option value="L Turn">L Turn</option>
                            <option value="L Turn">L Turn Reverse</option>
                            <option value="Road Drive">Road Drive</option>
                            <option value="Clutch Balance">Clutch Balance</option>
                        </select>
                    </div>
                    <div>
                    <label class="w-auto" for="status">Vehicle </label><br>
                    <select name="vehi" class="p-2 border border-gray-400 rounded-md my-4 w-full">
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Three Wheeler">Three Wheeler</option>
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                        <option value="Bus">Bus</option>
                        <option value="Lorry">Lorry</option>
                    </select>
                    </div>

                </div>
                    <div class="cols grid md:grid-cols-2 gap-4">
                      <div>
                          <label class="" for="hrs">Hours </label><br>
                          <input class="w-full p-2 border border-gray-400 rounded-md my-4" type="number" name="hrs" id="hrs" required>
                      </div>
                    
                      <div>
                          <label class="" for="dates">Grade(?/10)</label><br>
                          <select class="p-2 border border-gray-400 rounded-md my-4 w-full" name="grade" required>
                          
                          </select>
                      </div>
                    </div>
                    <div>
                          <label class="" for="des">Description (if any) </label><br>
                          <input class="w-full p-2 border border-gray-400 rounded-md my-4" type="text" name="des" id="des">
                      </div>
                    
                    <div class="flex justify-between gap-4">
                        <button class="px-4 py-2 rounded-md bg-gray-200 border border-gray-400 text-gray-600 " onclick="window.history.back()" id="cancelBtn"  type="button">Cancel</button>
                        <button class="px-4 py-2 rounded-md bg-green-600 text-white " id="uptSub"  type="submit"><i class="fa-solid fa-angles-up"></i> Update</button>
                    </div>
                </form>
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
        <?php 
            include('sidebar.php')
          ?>

        </ul>
      </div>
      </div>
    </div>
    <!-- modal start -->
  
    <!-- modal end -->
  </body>
</html>
