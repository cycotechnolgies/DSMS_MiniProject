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
                      <p class="font-semibold text-center md:text-left text-xl"></p>
                      <p class="font-semibold text-center md:text-left text-sm"></p>
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
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="" type="text" name="fname" id="">
                      </div>
                      <div class="">
                        <lable for="">Name with initials</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="" name="Iname" id="">
                      </div>
                      
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
                      <div class="">
                        <label for="">Date of Birth</label>
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="" type="text" name="dob" id="">
                      </div>
                      <div class="">
                        <lable for="age">Age</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="" name="age" id="">
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
                      </div>
                    </div>
                    <div class="">
                        <lable for="">NIC No.</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="" type="text"  name="nic" id="">
                      </div>
                      <div class="">
                        <lable for="">Passport No.</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="" type="text" name="ppno" id="">
                      </div>
                      <div class="">
                        <lable for="">Email</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" value="" type="email" name="email" id="">
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div class="">
                        <lable for="">Mobile No.</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="" name="tel" id="">
                      </div>
                      <div class="">
                        <lable for="">WhatsApp No.</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="" name="wano" id="">
                      </div>
                      </div>
                      
                </div>
                      <div class="">
                        <lable for="">Address</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="" name="addr" id="">
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
                              <option value="new" >New</option>
                              <option value="extend" >Extend</option>
                              <option value="renew" >Renew</option>
                              <option value="copy" >Copy</option>
                              <option value="Translate" >Translate</option>
                              <option value="Correction" >Correction</option>
                              <option value="Extend(PT)" >Extend (Public Transport)</option>
                        </select>
                      </div>
                      <div class="">
                        <lable for="">Vehical Class</lable>
                        <select class="p-2 border w-full border-gray-600 rounded-md" type="text" name="cls" id="">
                              <option value="">--Select Class--</option>
                              <option value="light vehicle">Light Vehicle</option>
                              <option value="heavy vehicle" >Heavy Vehicle</option>
                              <option value="custom">Custom</option>
                        </select>
                      </div>
                      <div class="">
                        <lable for="">Request Vehicals</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="" name="reqvehi" id="">
                      </div>
                      <div class="">
                        <lable for="">Old Licence No</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="" name="olno" id="">
                      </div>
                      <div class="">
                        <lable for="">Training Request</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="" name="trainreq" id="">
                      </div>
                      <div class="">
                        <lable for="">Training For</lable>
                        <input class="p-2 border w-full border-gray-600 rounded-md" type="text" value="" name="trainfor" id="">
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
