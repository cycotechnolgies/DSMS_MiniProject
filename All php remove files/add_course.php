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
    <title>Online Registration - RPSMS</title>
  </head>
  <body>
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
                <form action="" method="post">
                    <div>
                    <div class="cols grid md:grid-cols-2 gap-4">
                        <div>
                        <label for="fname">First Name / මුල් නම <span class="text-red-500">*</span></label><br>
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="fname" name="fname" placeholder="Saman" required/>
                        </div>
                        <div>
                        <label for="lname">Last Name / අවසන් නම<span class="text-red-500">*</span></label><br>
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="lname" name="lname" placeholder="Kumara" required/>
                        </div>
                        </div>
                        <div class="cols">
                        <label for="fname">Full Name / සම්පූර්ණ නම<span class="text-red-500">*</span></label><br>
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="fullname" name="fullName" placeholder="Dissanayaka Mudiyanselage Saman Kumara " required/>
                        </div>
                        <div class="cols">
                            <label for="InName"
                              >Name with Initials / මුලකුරු සමග නම<span class="text-red-500">*</span></label
                            ><br>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="initName" id="InName" placeholder="D.M. Saman Kumara" required/>
                          </div>
                        <div class="cols grid md:grid-cols-2 gap-4">
                        <div>
                            <label for="dob">Birth Day / උපන් දිනය <span class="text-red-500">*</span></label><br>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="date" id="dob" name="dob" maxlength="10" placeholder="2001/05/25" required/>
                        </div>
                            <div>
                            <label for="age">Age / වයස <span class="text-red-500">*</span></label><br>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="age" id="age" maxlength="2" placeholder="22" required/>
                        </div>
                        </div>
                        <div class="cols">
                        <label for="gen">Gender / ස්ත්‍රී පුරුෂ භාවය<span class="text-red-500">*</span></label><br>
                        <div class="py-4">
                            <input
                            class="hidden peer/male"
                            type="radio"
                            id="male"
                            name="gen"
                            value="male"
                            checked
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
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="nic" name="nic" maxlength="12" placeholder="96******* V / 20**********" required/>
                        </div>
                        <div>
                        <label for="ppn">Passport No. / විදේශ ගමන් බලපත්‍ර අංකය</label><br>
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="ppn" name="ppn" placeholder="N17******" maxlength="10"/>
                        </div>
                        </div>
                        <div>
                        <label for="addr">Permenent Address / ස්ථීර ලිපිනය<span class="text-red-500">*</span></label>
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="addr" name="addr" placeholder="No. 152, ***********,********" required/>
                        </div>
                        <div class="cols grid md:grid-cols-2 gap-4">
                        <div>
                            <label for="mobi">Mobile No. / දුරකථන අංකය<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="mobi" name="mobi" maxlength="10" placeholder="07* *******" required/>
                        </div>
                            <div>
                            <label for="wa">WhatsApp No. / වට්ස්ඇප් අංකය<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="wa" id="wa" placeholder="07* *******" maxlength="10"required/>
                        </div>
                    </div>
                    
                        <div>
                            <label for="email">Email Address / ඊමේල් ලිපිනය<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="email" name="email" id="email" placeholder="example@gmail.com" required/>
                        </div>
                        
                    <div class="cols grid md:grid-cols-2 gap-4">
                        <div>
                            <label for="pwd">Password / මුරපදය<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="password" name="pwd" id="pwd" placeholder="*******" required/>
                        </div>
                        <div>
                            <label for="cpwd">Confirm Password / මුරපදය තහවුරැ කිරීම<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="password" id="cpwd"  name="cpwd" placeholder="*******" required/>
                        </div>
                    </div>
                    <div class="w-full flex flex-row butons items-center justify-between my-4">
                    <button class="px-10 py-2 rounded-md bg-gray-200  text-gray-400 border border-gray-400 " onclick="window.history.back()" id="cancelBtn"  type="button">Cancel</button>
                    <button id="submit" class="btn btn-md bg-green-600 border-none text-white px-12 py-2 rounded-lg shadow-md cursor-pointer font-semibold disabled:bg-green-300 disabled:text-green-400 disabled:cursor-not-allowed hover:bg-green-800" type="submit" name="submit">Submit</button>
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
