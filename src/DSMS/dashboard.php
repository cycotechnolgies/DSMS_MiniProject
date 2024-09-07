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
    <title>Admin Dashboard - RPSMS</title>
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
          <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fas fa-solid fa-chart-bar"></i> Admin Dashboard</h4>
          <hr class="mt-3 border-blue-600">
        </div>
        <div class="p-4">
          <img  src="../../images/webbanner.jpg" alt="">
        </div>
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 p-4">
          <!-- Medical -->
          <div
            class="flex items-center p-4 rounded-lg shadow-lg border border-blue-600"
          >
            <div
              class="p-3 mr-4 text-white bg-green-600 rounded-full"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5"><path fill="currentColor" d="M96 352V96c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V293.5c0 17-6.7 33.3-18.7 45.3l-58.5 58.5c-12 12-28.3 18.7-45.3 18.7H160c-35.3 0-64-28.7-64-64zM272 128c-8.8 0-16 7.2-16 16v48H208c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V256h48c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H320V144c0-8.8-7.2-16-16-16H272zm24 336c13.3 0 24 10.7 24 24s-10.7 24-24 24H136C60.9 512 0 451.1 0 376V152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 224c0 48.6 39.4 88 88 88H296z"/></svg>
            </div>
            <div>
              <p
                class="mb-2 font-semibold text-gray-800"
              >
                Medical Requests
              </p>
              <p
                class="text-lg font-semibold text-gray-700"
              >
              </p>
            </div>
          </div>
          <!-- Payments -->
          <div
            class="flex items-center p-4 rounded-lg shadow-lg border border-blue-600"
          >
            <div
              class="p-3 mr-4 text-white bg-orange-600 rounded-full"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-5 h-5"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5 .1 0 0 0 0c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16V422.2c-11.2-2.1-21.7-5.7-30.9-8.9l0 0 0 0c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5 .8 4.8 1.6 7.1 2.4l0 0 0 0 0 0c13.6 4.6 24.6 8.4 36.3 8.7c9.1 .3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5 0 0c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z"/></svg>
            </div>
            <div>
              <p
                class="mb-2 font-semibold text-gray-800"
              >
                Pending Payments
              </p>
              <p
                class="text-lg font-semibold text-gray-700"
              >
              </p>
            </div>
          </div>
          <!-- Sales -->
          <div
            class="flex items-center p-4 rounded-lg shadow-lg border border-blue-600"
          >
            <div
              class="p-3 mr-4 text-white bg-red-600 rounded-full"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5"><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/></svg>
            </div>
            <div>
              <p
                class="mb-2 font-semibold text-gray-800"
              >
                Students
              </p>
              <p
                class="text-lg font-semibold text-gray-700"
              >
              </p>
            </div>
          </div>
          <!-- Staff -->
          <div
            class="flex items-center p-4 rounded-lg shadow-lg border border-blue-600"
          >
            <div
              class="p-3 mr-4 text-white bg-purple-600 rounded-full"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-5 h-5"><path fill="currentColor" d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM128 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM80 432c0-44.2 35.8-80 80-80h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16z"/></svg>
            </div>
            <div>
              <p
                class="mb-2 font-semibold text-gray-800"
              >
                Staff Attendants
              </p>
              <p
                class="text-lg font-semibold text-gray-700"
              >
              </p>
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
