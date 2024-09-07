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
    <title>Staff Profile - RPSMS</title>
    <script src="../../js/stepper.js" defer></script>
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
              
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full border border-gray-400">
                    <img alt="profile pic" src=" />
                  </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li class="p-2">User ID : </li>
                  <li><a href="../phpconfigs/logout.inc.php">Logout</a>
                </ul>
              </div>
            </div>
          </div>
        <!-- main -->
        <div data-theme="none" class="p-4">
          
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Staff Profile</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- profile details -->

        <div class="bg-gray-100">
            <div class="container mx-4 py-8">
                <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div class="col-span-4 sm:col-span-3">
                        <div class="bg-white shadow rounded-lg p-6">
                            <div class="flex flex-col items-center">
                                <img  src="" class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">
        
                                </img>
                                <h1 class="text-xl font-bold"></h1>
                                <p class="text-gray-700">ID : RPSTU - </p>
                                <div class="mt-6 flex flex-wrap gap-4 justify-center">
                                    <button class="px-4 py-2 rounded-md bg-blue-600 text-white "  type="button" id="editBtn" onclick="enableFields()"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                                    <button  class="px-4 py-2 rounded-md bg-green-600 text-white " id="uptBtn"  type="button" onclick="window.location.href='staff_attend.php?std='">Attendent</button>
                                </div>
                                <div class="mt-6 flex flex-wrap gap-4 justify-center">
                                
                                </div>

                            </div>
                            <hr class="my-6 border-t border-gray-300">
                            <div class="flex flex-col">
                                
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
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="fname" name="fname" value="" placeholder="Dissanayaka Mudiyanselage Saman Kumara " required />
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
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="nic" name="nic" maxlength="12" value=""   placeholder="96******* V / 20**********" required />
                                    </div>
                                      <div>
                                      <label for="ppn">Passport No. / විදේශ ගමන් බලපත්‍ර අංකය</label><br>
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="ppn" name="ppn" placeholder="N17******" value=""   maxlength="10" />
                                    </div>
                                    </div>
                                    <div>
                                      <label for="addr">Permenent Address / ස්ථීර ලිපිනය<span class="text-red-500">*</span></label>
                                      <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="addr" name="addr" value=""   placeholder="No. 152, ***********,********" required />
                                    </div>
                                    <div class="cols grid md:grid-cols-2 gap-4">
                                      <div>
                                        <label for="mobi">Mobile No. / දුරකථන අංකය<span class="text-red-500">*</span></label>
                                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="mobi" name="tel" maxlength="10" value=""   placeholder="07* *******" required />
                                      </div>
                                        <div>
                                          <label for="wa">WhatsApp No. / වට්ස්ඇප් අංකය<span class="text-red-500">*</span></label>
                                          <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="wa" name="wa" placeholder="07* *******" value=""   maxlength="10"required />
                                      </div>
                                    </div>
                                    
                                  </div>
                            </form>
                            </div>
                            <div class="flex gap-4 justify-end hidden" id="formBtn">
                                <button onclick="disableAllFields()"  class="px-4 py-2 rounded-md bg-gray-200 border border-gray-400 text-gray-600 " id="cancelupdate"  type="button">Cancel</button>

                                <button onclick="" class="px-4 py-2 rounded-md bg-green-600 text-white " id="editupdate" data-student-id=""  type="button"><i class="fa-solid fa-angles-up"></i> Update</button>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
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
