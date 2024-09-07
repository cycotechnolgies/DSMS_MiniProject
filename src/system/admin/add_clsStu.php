<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php';
require_once '../phpconfigs/session_manager.php';

$cid = $_GET['cid'];

// Initialize variables
$rows = [];
$search_error = "";
$error = "";

// If the search form is submitted
if (isset($_POST['find'])) {
    $find = $_POST['find'];
    $findpara = '%' . $_POST['find'] . '%';

    try {
        // Prepare and execute the SQL query
        $query = "SELECT * FROM student WHERE stuId = :find OR userId = :find OR initName LIKE :findpara OR fullName LIKE :findpara";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':find', $find);
        $stmt->bindParam(':findpara', $findpara);
        $stmt->execute();

        // Fetch all rows as an associative array
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($rows)) {
            $search_error = "No records found.";
        }
    } catch (PDOException $e) {
        $error = "Error: " . $e->getMessage();
    }
}

// If the add form is submitted
if (isset($_POST['add'])) {
    $stuId = $_POST['stuId'];
    $userId = $_POST['userId'];

    try {
        // Insert the student into the class
        $query = "INSERT INTO class(schedId, stuId) VALUES(:schedId, :stuId)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':schedId', $cid);
        $stmt->bindParam(':stuId', $userId);
        $stmt->execute();

        // Check if the user is enrolled in the class
        $query = "SELECT * FROM class WHERE schedId = :cid";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':cid', $cid);
        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($row)) {
            $search_error = "No records found.";
        } else {
            // Check for an active full training card
            $card_check = "SELECT * FROM cards WHERE userId = :uids AND validity = 'Active' AND Types = 'Full'";
            $stmt = $conn->prepare($card_check);
            $stmt->bindParam(':uids', $userId);
            $stmt->execute();
            $rows = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!empty($rows)) {
                // Update the card's schedule ID
                $update_card = "UPDATE cards SET ClassId = :cid WHERE cardId = :cardId";
                $stmt = $conn->prepare($update_card);
                $stmt->bindParam(':cid', $cid);
                $stmt->bindParam(':cardId', $rows['cardId']);
                $stmt->execute();

                // Update the student's class schedule ID
                // $update_student_class = "UPDATE class SET schedId = :cid WHERE stuId = :uids";
                // $stmt = $conn->prepare($update_student_class);
                // $stmt->bindParam(':cid', $cid);
                // $stmt->bindParam(':uids', $userId);
                // $stmt->execute();

                // Redirect to the class student page
                header('Location: cls_detail.php?sid=' . $cid);
                exit;
            } else {
              header('Location: add_Tcard.php?cid=' . $cid.'&uid='.$userId);
              exit;
            }
        }
    } catch (PDOException $e) {
        $error = "Error: " . $e->getMessage();
    }
}
?>
<html>
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="../../images/Logos (Custom).png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="../../css/output.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="../../js/sidebar.js" defer></script>
    <script src="../../js/modal.js" defer></script>
    <title>Staff - RPSMS</title>
</head>
<body>
<div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
        <!-- Page content -->

        <!-- Navbar -->
        <div class="navbar bg-base-100 shadow- shadow-blue-400/50">
            <div class="flex-1">
                <label for="my-drawer-2" class="btn drawer-button btn-md bg-blue-400 btn-square lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5">
                        <path fill="white"
                              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                    </svg>
                </label>
            </div>
            <div class="flex-none">

                <!-- Profile -->
                
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full border border-blue-600">
                            <img alt="profile pic" src="<?php
                            if ($_SESSION['gen'] === 'male') {
                                echo "../../images/avatars/man.png";
                            } elseif ($_SESSION['gen'] === 'female') {
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

        <!-- Main Content -->
        <div data-theme="none" class="p-4">
            <h4 class="text-xl md:text-xl lg:text-2xl font-bold">Add Student to Class</h4>
            <hr class="mt-3 border-blue-600">
        </div>

        <!-- Display Errors -->
        <?php
        if (!empty($error)) {
            echo '<div class="bg-red-200 border-l-4 border-red-600 text-red-600 p-4" role="alert">
                    <p class="font-bold">Error</p>
                    <p>' . $error . '</p>
                  </div>';
        }
        ?>

        <!-- Search Form -->
        <div class="w-full mx-auto bg-white p-6">
            <h2 class="text-xl font-semibold mb-4">Search Attendants</h2>
            <form method="POST" class="mb-4">
                <div class="flex items-center gap-4">
                    <input type="text" name="find" id="find"
                           class="form-input border border-gray-400 p-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                           placeholder="Search Student">
                    <button type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Search
                    </button>
                </div>
            </form>

            <!-- Display Search Results -->
            <?php
            if ($search_error == "No records found.") {
                echo '<p class="p-4 bg-gray-400 rounded-md text-gray-600 border border-gray-600">No records found</p>';
            } else {
                echo '<table class="table-auto w-full divide-y divide-gray-400 mt-4">
                      <thead>
                          <tr>
                              <th class="px-6 py-3 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Stu-ID</th>
                              <th class="px-6 py-3 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">User-ID</th>
                              <th class="px-6 py-3 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                              <th class="px-6 py-3 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Controls</th>
                          </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">';
                if (is_array($rows)) {
                    foreach ($rows as $row) {
                        echo '<tr>
                              <td class="px-6 py-4 whitespace-nowrap text-center">' . $row['stuId'] . '</td>
                              <td class="px-6 py-4 whitespace-nowrap text-center">' . $row['userId'] . '</td>
                              <td class="px-6 py-4 whitespace-nowrap text-center">' . $row['initName'] . '</td>
                              <td class="px-6 py-4 whitespace-nowrap text-center">
                                  <form method="POST" action="">
                                      <input type="hidden" name="stuId" value="' . $row['stuId'] . '">
                                      <input type="hidden" name="userId" value="' . $row['userId'] . '">
                                      <button class="px-4 py-2 rounded-md bg-green-600 text-white" type="submit" name="add">Add</button>
                                  </form>
                              </td>
                          </tr>';
                    }
                }
                echo '</tbody>
                  </table>';
            }
            ?>
        </div>
    </div>

    <!-- Sidebar -->
    <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-60 min-h-full bg-white gap-4">
            <?php include('sidebar.php') ?>
        </ul>
    </div>
</div>
</body>
</html>
