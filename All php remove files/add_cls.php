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
    <!-- <script src="/src/js/interaction.js" defer></script> -->
    <title>Add Class - RPSMS</title>
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
                    <li><a href="../phpconfigs/logout.inc.php">Logout</a></li>
                    </ul>
                </div>
                </div>
            </div>
        
            <!-- main -->
            <div data-theme="none" class="p-4">
            <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-regular fa-calendar-days mr-4"></i>Add Schedules
            <hr class="mt-3 border-blue-600">
            </div>
            <div class="p-4">
                <form action="" method="post">
                    <div>
                        <div class="cols grid md:grid-cols-2 gap-4">
                            <div>
                              <label for="addr">Class Name<span class="text-red-500">*</span></label>
                              <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="cls" name="cls" placeholder="Class 01" required/>
                            </div>
                            <div class="cols">
                            <label for="branch">Select Branch<span class="text-red-500">*</span></label>
                            <select name="branch" name="branch" id="branch" class="w-full my-2 p-2 rounded-md border border-gray-400" required>
                                <option value="">--Select a Branch--</option>
                                <option value="Ampara">Ampara</option>
                                <option value="Dehiaththakandiya">Dehiaththakandiya</option>
                            </select>
                        </div>
                        </div>
                        <div class="cols grid md:grid-cols-2 gap-4">
                          <div>
                            <label for="instructor">Instructor<span class="text-red-500">*</span></label>

                          </div>
                            <div>
                              <label for="vehiNo">Vehical No.<span class="text-red-500">*</span></label>
                              <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="vehiNo" name="vehiNo" placeholder="ABC-0010" maxlength="10" required/>
                          </div>
                        </div>
                        <div class="cols grid md:grid-cols-2 gap-4">
                          <div>
                            <label for="medfor">Vehicle Class<span class="text-red-500">*</span></label>
                            <select name="medifor" id="medfor" class="w-full my-2 p-2 rounded-md border border-gray-400" required>
                              <option value="">--select option--</option>
                              <option value="Light vehicle">Light Vehicle</option>
                              <option value="Heavy vehical">Heavy Vehical</option>
                              <option value="Morter Bike">Morter Bike</option>
                                <option value="Car & Van">Car & Van</option>
                                <option value="Three Wheeler">Three Wheeler</option>
                                <option value="Lorry">Lorry</option>
                                <option value="Bus">Bus</option>
                                <option value="Ground Vehicles">Ground Vehicles</option>

                            </select>
                          </div>
                            <div class="grid md:grid-cols-2 gap-4">
                              <div>
                              <label for="date">Date<span class="text-red-500">*</span></label>
                              <input type="date" name="sheDate" class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" id="" required>
                              </div>
                              <div>
                              <label for="insti">Time<span class="text-red-500">*</span></label>
                              <input type="time" name="sheTime" class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" id="" required>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div class="w-full flex flex-row butons items-center justify-between my-4 p-2">
                    <button class="btn btn-md px-10 py-2 rounded-md bg-gray-200  text-gray-400 border border-gray-400 " onclick="window.history.back()" id="cancelBtn"  type="button">Cancel</button>
                    <button id="submit" class="btn btn-md bg-green-600 border-none text-white px-12 py-2 rounded-lg shadow-md cursor-pointer font-semibold disabled:bg-green-300 disabled:text-green-400 disabled:cursor-not-allowed hover:bg-green-800" type="submit" name="addclass">Submit</button>
                </div>
                </form>
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
