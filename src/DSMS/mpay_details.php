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
    <title>Pay Details - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Payment Details</h4>
          <hr class="mt-3 border-blue-600">
        </div>
        <div class="p-4">
        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <form action="" method="post">
                      <select class="w-full p-2 rounded-md border border-gray-600" name="payupdate" id="" required>
                        <option value="">--Select Update</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Canceled">Canceled</option>
                        <option value="Bank Slip Not Valid">Bank Slip Not Valid</option>
                      </select>
                
              </div>
              <div>
                <button  class="w-full px-4 py-2 rounded-md bg-green-600 text-white " id="uptBtn" name="uptPay"  type="submit">Update</button>
              </div>
              </form>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
 
                  <button class="px-4 py-2 rounded-md bg-blue-600 text-white w-full">Print</button>
                </a>
              <div>
                <form action="" method="post">
                  <input type="text" name="payid" value="" hidden> 
                  <button  name="delbtn"  class="px-4 py-2 rounded-md bg-red-600 text-white w-full">Delete</button>
                </form>
              </div>
            </div>

          </div>                    
            <hr class="border border-gray-400 my-4">
            
          <div class="relative overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="payId" class="font-semibold">Payment ID</label><br>
                    <input type="text" name="" id="PayId" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                  <div>
                    <label for="Uid" class="font-semibold">Medical ID</label><br>
                    <input type="text" name="" id="Uid" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <label for="fname" class="font-semibold">Full Name</label><br>
                  <input type="text" name="" id="fname" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                </div>
              </div>
              <div>
                <div>
                  <label for="addr" class="font-semibold">Address</label><br>
                  <input type="text" name="" id="addr" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                </div>
              </div>
              <div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="mob" class="font-semibold">Mobile</label><br>
                    <input type="text" name="" id="mob" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                  <div>
                    <label for="wa" class="font-semibold">WhatsApp</label><br>
                    <input type="text" name="" id="wa" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                </div>
              </div>
              <div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="br" class="font-semibold">Reason</label><br>
                    <input type="text" name="" id="br" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                  <div>
                    <label for="pt" class="font-semibold">Payment Method</label><br>
                    <input type="text" name="" id="pt" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                </div>
              </div>
              <div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="am" class="font-semibold">Amount (Rs.)</label><br>
                    <input type="text" name="" id="am" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                  <div>
                    <label for="st" class="font-semibold">Status</label><br>
                    <input type="text" name="" id="st" value="" class="w-full py-2 px-4 mt-2 bg-gray-200 border border-blue-600 rounded-md" readonly />
                  </div>
                </div>
              </div>
              <div>
                <p class="font-semibold mb-2">Slip</p>
                
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
