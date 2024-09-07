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
    <!-- Include SweetAlert2 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="../../js/sidebar.js" defer></script>
    <title>Renew Details - RPSMS</title>
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
                    <img alt="profile pic"  />
                  </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                  <li class="p-2">User ID :</li>
                  <li><a href="../phpconfigs/logout.inc.php">Logout</a>
                </ul>
              </div>
            </div>
          </div>
        <!-- main -->
        <div data-theme="none" class="p-4">
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Renewal Details</h4>
          <hr class="mt-3 border-blue-600">
        </div>
       
          <div class="px-2">
            <p class="bg-red-200 text-red-600 font-semibold p-4 mt-2 rounded-lg"><i class="fa-solid fa-circle-exclamation"></i>  </p>
          </div>
          

       
        <form action="" method="post">
          <div class="grid grid-cols-1 md:grid-cols-2 p-2">
            
            <div class="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="" for="dates">Update Events: </label>
                  <select name="event" id="" class="p-2 border border-gray-400 rounded-md w-full" required>
                    <option value="">--Select Event--</option>
                    <option value="Send to renew">Send to renew</option>
                    <option value="Renewed">Renewed</option>
                    <option value="Collected">Collected By customer</option>
                  </select>
                </div>
                <div>
                  <label class="" for="dates">Update Date: </label>
                  <input class="p-2 border border-gray-400 rounded-md w-full" type="date" name="dates" id="dates" required>
                </div>
            </div>
            <div class="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="" for="dates">New Exp. Date: </label>
                <input class="p-2 border border-gray-400 rounded-md w-full" type="date" name="exp" id="exp" >
              </div>
              <div>
                  <label class="" for="dates">Collected By: </label>
                  <select name="collect" id="" class="p-2 border border-gray-400 rounded-md w-full" >
                    <option value="">--Select Event--</option>
                    <option value="Owner">Owner</option>
                    <option value="Not Owner">Not Owner</option>
                  </select>
                </div>
            </div>
            <div class="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="" for="dates">Collector's Name: </label>
                <input class="p-2 border border-gray-400 rounded-md w-full" type="text" name="col-name" id="exp">
              </div>
              <div>
                  <label class="" for="dates">Collector NIC: </label>
                  <input class="p-2 border border-gray-400 rounded-md w-full" type="text" maxlength="12" name="col-id" id="exp">
              </div>
            </div>
            
            <div class="p-4 gap-4 flex flex-row justify-end items-baseline">
              <button name="update" class="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg">Update</button>
              </form>
              <form method="post">
                <button type="submit" name="del" class="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg">Delete</button>
              </form>
            </div>
          </div>
          

        <!-- Timeline -->
        <div>
          <?php include "renew_timeline.php"; ?>
        </div>

        <!-- details -->
        <div class="p-4">
        <div class="relative overflow-hidden">
        <div class="p-4">
            
        </div>
    <table class="table-auto w-full text-left">
        <tbody class="bg-white text-gray-500">
            <tr class="py-3">
                <th class="py-3 border   p-4" >Renew ID</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >User Name</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Contact</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >WhatsApp</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Branch</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Vehical Class</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Barcode</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border  p-4" >Exp. Date</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >New Exp. Date</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Collected By</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Collector Name</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            <tr class="py-3">
                <th class="py-3 border   p-4" >Collector NIC</th>
                <td class="py-3 border   p-4" ></td>
            </tr>
            
        </tbody>
    </table>
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
    <!-- Include SweetAlert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../../js/renew.js"></script>
  </body>
</html>
