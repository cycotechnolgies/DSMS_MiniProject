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
    <title>User Progress - RPSMS</title>
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
                  <div class="w-10 rounded-full border border-gray-400">
                    <img alt="profile pic" src="../../images/avatars/man.png" />
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
          
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Update User Progress</h4>
          <hr class="mt-3 border-blue-600">
        </div>

        <!-- form details -->
          <form action="" method="post">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              
              <div class="p-2">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  
                  <label class="w-auto p-2" for="progress">Update Events: </label><br>
                  <select name="event" id="progress" class="p-2 border border-gray-400 rounded-md w-full mt-2" required>
                      <option value="">---select event---</option>
                      <option value="Registerd As a Student">Registerd As a Student</option>
                      <option value="Document Submitted">Document Submitted</option>
                      <option value="You have to get our medical on">You have to get our medical on</option>
                      <option value="You Have a Class On">You Have a Class On</option>
                      <option value="Completed Class">Completed Class</option>
                      <option value="You Have an Exam On">You Have an Exam On</option>
                      <option value="You Have an Exam(2nd Try) On">You Have an Exam(2nd Try) On</option>
                      <option value="You Have an Exam(3rd Try) On">You Have an Exam(3rd Try) On</option>
                      <option value="Congratulations, you Passed Your Exam..!">Congratulations, you Passed Your Exam..!</option>
                      <option value="Sorry, you Failed Your Written Exam..!">Sorry, you Failed Your Written Exam..!</option>
                      <option value="Sorry, you Failed Your Trial Exam..!">Sorry, you Failed Your Trial Exam..!</option>
                      <option value="Collect Your L Permit (visit Branch)">Collect Your L Permit (visit Branch)</option>
                      <option value="Your Training Begins on">Your Training Begins on</option>
                      <option value="Congratulations you Completed Your training..!">Congratulations you Completed Your training..!</option>
                      <option value="You have Trial Exam On">You have Trial Exam On</option>
                      <option value="You have Trial Exam(2nd Try) On">You have Trial Exam(2nd Try) On</option>
                      <option value="You have Trial Exam(3rd Try) On">You have Trial Exam(3rd Try) On</option>
                      <option value="You have failed Trial Exam On">You have failed Trial Exam On</option>
                      <option value="Collect Your Temporary License (Visit Branch)">Collect Your Temporary License (Visit Branch)</option>
                      
                  </select>
                </div>
                <div>
                  <label class="p-2" for="date">Date: </label><br>
                  <input class="w-full p-2 border border-gray-400 rounded-md mt-2" type="date" name="date" id="date" required>
                </div>
              </div>
              </div>
              <div class="p-2">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label class="p-2" for="des">Description: </label><br>
                    <input class="w-full p-2 border border-gray-400 rounded-md mt-2" type="text" name="des" id="des" placeholder="car, Bike,....">
                  </div>
                  <div class="flex justify-start items-center mt-8">
                    <button class=" px-4 py-2 rounded-md bg-green-600 text-white w-full" name="uptSub"  type="submit"><i class="fa-solid fa-angles-up"></i> Update</button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div>
            <div class="relative overflow-hidden p-4">
                <table class="table-auto w-full text-left">
                    <thead class="text-gray-200 uppercase bg-gray-600">
                        <tr>
                            <td class="py-1 border text-center  p-4">Date</td>
                            <td class="py-1 border text-center  p-4">Event</td>
                            <td class="py-1 border text-center  p-4">info</td>
                            <td class="py-1 border text-center  p-4">Controls</td>
                        </tr>
                    </thead>
                    <tbody class="bg-white text-gray-500">
                        <tr class="py-2">
                                    <td class="py-2 border text-center  p-4" ></td>
                                    <td class="py-2 border text-center  p-4"></td>
                                    <td class="py-2 border text-center  p-4"></td>
                                    <td class="py-2 border text-center  p-4">
                                        <div class="flex flex-row gap-2">
                                            <form method="post">
                                                <input type="hidden" value="'.$result['proId'].'" name="del_id">
                                                <button class="px-4 py-2 rounded-md bg-red-600 text-white" name="del">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>';
                            
                         <tr class="py-2">
                                <td class="py-2 border text-center  p-4 bg-red-200 font-semibold" colspan="4">No Records found</td>
                            </tr>';
                       
                    </tbody>
                </table>
            </div>
        </div>
        <!-- end of form details -->

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
