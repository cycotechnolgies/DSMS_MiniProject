<!doctype html>
<?php
require_once("phpconfigs/conn.php");

$errors = array(); // Initialize an empty array to store errors.

if (isset($_POST['submit'])) {
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['pwd']);

    // Basic form validation
    if (empty($email) || empty($password)) {
        $errors[] = 'Email and password are required.';
    } else {
        // Fetch the user's data from the database based on the entered email
        $query = "SELECT * FROM users WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            $errors[] = 'Invalid email or password.';
        } else {
            // Verify the entered password with the hashed password stored in the database
            if (password_verify($password, $user['pwd'])) {

                session_start(); // Start the session

                $_SESSION['valid'] = true; // Set a session flag for successful login
                $_SESSION['email'] = $user['email'];
                $_SESSION['fname'] = $user['fname'];
                $_SESSION['lname'] = $user['lname'];
                $_SESSION['gen'] = $user['gen'];
                $_SESSION['uid'] = $user['userId'];
                $_SESSION['user_type'] = $user['types'];

                // Redirect based on user type
                switch ($user['types']) {
                    case 'admin':
                        header('location: admin/dashboard.php');
                        exit;
                    case 'student':
                        header('location: students/dashboard.php');
                        exit;
                    case 'staff':
                        header('location: staff/dashboard.php');
                        exit;
                    case 'sales':
                      header('location: sales/dashboard.php');
                      exit;
                    case 'driver':
                      header('location: driver/dashboard.php');
                      exit;
                    default:
                        $errors[] = 'Invalid user type.';
                }
            } else {
                // Passwords do not match
                $errors[] = 'Invalid email or password.';
            }
        }
    }
}

?>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="icon"
      type="image/svg+xml"
      href="../../images/Logos (Custom).png"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="../css/output.css" rel="stylesheet" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <title>Login - RPSMS</title>
  </head>
  <body class="bg-blue-600">
    <!-- component -->
    <div class="py-6">
      <div
        class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl"
      >
        <div
          class="hidden lg:block lg:w-1/2 bg-cover"
          style="background-image: url(&quot;../images/side.jpg&quot;)"
        ></div>
        <div class="w-full p-8 lg:w-1/2">
          <div class="flex md:flex-row flex-col justify-center items-center">
            <div class="w-[100px] h-[100px]">
              <img src="../images/logo.png" alt="logo" />
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-gray-700 text-center">
                Riyaduru Piyasa<br />
                <span class="text-base line-clamp-1">Driving School</span>
              </h2>
            </div>
          </div>
          <p class="text-xl text-gray-600 text-center mt-2">Welcome back!</p>
          <?php
            if (!empty($error)) {
            foreach ($error as $error_message) {
                echo '<div class="error-msg" style="margin:10px 0;
                display: block;
                font-size: 20px;
                text-align: center;
                padding:10px;">' . $error_message . '</div>';
            }
            }else{
                echo "";
        }
        ?>
          <a
            href="#"
            class="flex items-center justify-center border border-gray-400 mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <div class="px-4 py-3">
              <svg class="h-6 w-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <h1 class="px-2 py-3 w-5/6 text-center text-gray-600 font-bold">
              Sign in with Google
            </h1>
          </a>
          <div class="mt-4 flex items-center justify-between">
            <span class="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" class="text-xs text-center text-gray-500 uppercase"
              >or login with email</a
            >
            <span class="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form  action="" method="post">

          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Email Address</label
            >
            <input
              class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              name="email"
            />
          </div>
          <div class="mt-4">
            <div class="flex justify-between">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Password</label
              >
              <a href="#" class="text-xs text-gray-500">Forget Password?</a>
            </div>
            <input
              class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              name="pwd"
            />
          </div>
          <div class="mt-8">
            <button
              class="bg-blue-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-800"
              type="submit"
              name="submit"
            >
              Login
            </button>
          </form>
          
          </div>
          <div class="mt-4 flex items-center justify-center">
            <!-- <span class="border-b w-1/5 md:w-1/4"></span> -->
            <p class="text-xs text-gray-500 uppercase">
              Don't have an account?
              <a
                href="signup.php"
                class="text-md text-blue-600 uppercase"
                >Sign Up</a
              >
            </p>
            <!-- <span class="border-b w-1/5 md:w-1/4"></span> -->
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
