<?php
require_once("phpconfigs/conn.php");

$errors = array(); // Initialize an empty array to store errors.

if (isset($_POST['submit'])) {
    // Use mysqli_real_escape_string for input values to prevent SQL injection
    $fname = htmlspecialchars($_POST['fname']);
    $lname = htmlspecialchars($_POST['lname']);
    $email = htmlspecialchars($_POST['email']);
    $tel = htmlspecialchars($_POST['tel']);
    $gen = htmlspecialchars($_POST['gen']);
    $types = htmlspecialchars('student');
    // $wano = htmlspecialchars($_POST['wano']);
    
    // Passwords are not hashed, but should be sanitized
    $pass = htmlspecialchars($_POST['pwd']);
    $cpass = htmlspecialchars($_POST['cpwd']);
    $hpass = password_hash($pass, PASSWORD_DEFAULT);

    // Basic form validation
    if (empty($fname)) {
        $errors[] = 'First Name is required.';
    }
    if (empty($lname)) {
        $errors[] = 'Last Name is required.';
    }
    if (empty($email)) {
        $errors[] = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email format.';
    }
    if (empty($tel)) {
        $errors[] = 'Contact is required.';
    }
    if (empty($pass)) {
        $errors[] = 'Password is required.';
    } elseif ($pass !== $cpass) {
        $errors[] = 'Passwords do not match.';
    }

    if (empty($errors)) {
        // Check if the user already exists in the database
        $query = "SELECT * FROM users WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $errors[] = 'User already exists!';
        } else {
            // Insert user into the database
            $query = "INSERT INTO users(fname, lname, email, tel, gen, pwd, types) VALUES (:fname, :lname, :email, :tel, :gen, :pwd, :types)";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(":fname", $fname);
            $stmt->bindParam(":lname", $lname);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":tel", $tel);
            $stmt->bindParam(":gen", $gen);
            $stmt->bindParam(":pwd", $hpass); // Binding password directly
            // $types = ""; // You might need to set this value
            $stmt->bindParam(":types", $types);
            $stmt->execute();

            // Redirect to login page after successful registration
            header('location: login.php');
            exit(); // Ensure no further code execution after redirection.
        }
    }
}
?>


<!doctype html>
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
    <title>Sign Up - RPSMS</title>
  </head>
  <body class="bg-blue-600">
    <!-- component -->
    <div class="py-6">
      <div
        class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl"
      >
        <div class="w-full p-8 lg:w-[full]">
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
          <!-- <p class="text-xl font-semibold text-gray-600 text-center mt-2">Learn Safe... Safe Drive...!</p> -->
          <hr class="border border-gray-200 mt-4">

          <?php
        if (!empty($errors)) {
            foreach ($errors as $error) {
                echo '<span class="error-msg">' . $error . '</span>';
            }
        }
        ?>

          <form action="" method="post">
          <div class="cols grid md:grid-cols-2 gap-4 my-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2"
              >First Name</label
            >
            <input
              class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text" required
              name="fname"
            />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2"
            >Last Name</label
          >
          <input
            class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="text" required
            name="lname"
          />
          </div>
          </div>
          <div class="cols grid md:grid-cols-2 gap-4 my-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2"
              >Email</label
            >
            <input
              class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email" required
              name="email"
            />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2"
            >Mobile No.</label
          >
          <input
            class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="text" required
            name="tel"
            maxlength="10"
          />
          </div>
          </div>
          <div class="cols grid md:grid-cols-2 gap-4 my-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2"
              >Password</label
            >
            <input
              class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password" required
              name="pwd"
            />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2"
            >Confirm Password</label
          >
          <input
            class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="password" required
            name="cpwd"
          />
          </div>
          </div>
          <div class="mt-8">
            <label for="gen" class="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            <input type="radio" name="gen" id="male" value="male" checked required> Male
            <input type="radio" name="gen" id="female" value="female" class="ml-4"> Female
          </div>
          <div class="mt-8">
            <button type="submit"
              class="bg-green-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-green-800"
              name = "submit"
            >
              Sign Up
            </button>
          </div>
          </form>
          <div class="mt-4 flex items-center justify-center">
            <!-- <span class="border-b w-1/5 md:w-1/4"></span> -->
            <p class="text-xs text-gray-500 uppercase">
              Already have an account?
              <a href="login.php" class="text-md text-blue-600 uppercase">Log In</a>
            </p>
            <!-- <span class="border-b w-1/5 md:w-1/4"></span> -->
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
