<!DOCTYPE html>
<?php
session_start();

require_once '../phpconfigs/conn.php'; 

$errors = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $userId = htmlspecialchars($_POST['stu_id']);
    $mediId = htmlspecialchars($_POST['mid_id']);
    $pay_day = htmlspecialchars($_POST['date_paid']);
    $amount = htmlspecialchars($_POST['amount']);
    $reason = htmlspecialchars($_POST['reason']);
    if(isset($_GET['mid'])){
        $pay_state = "Pending";
        $payType = "Bank";
    }else{
        $pay_state = "Paid";
        $payType = "Branch";
    }

    // Initialize filedir to a default value in case no file is uploaded
    $filedir = "No Slip Uploaded";

    // Check if a file was uploaded
    if(isset($_FILES['file']) && $_FILES['file']['error'] !== UPLOAD_ERR_NO_FILE) {
        $file = $_FILES['file'];

        $fileName = $_FILES['file']['name'];
        $fileTmpName = $_FILES['file']['tmp_name'];
        $fileSize = $_FILES['file']['size'];
        $fileError = $_FILES['file']['error'];
        $fileType = $_FILES['file']['type'];

        $fileExt = explode('.', $fileName);
        $fileActExt = strtolower(end($fileExt));

        $allowed = array('jpg', 'jpeg', 'png');

        // Check if the file extension is allowed
        if(in_array($fileActExt, $allowed)){
            // Check if there is no error during file upload
            if($fileError === 0){
                // Check if the file size is within the allowed limit
                if ($fileSize < 2000000) {
                    $fileNameNew = uniqid('', true).".".$fileActExt;
                    $filedir = 'upload/'.$fileNameNew;
                    move_uploaded_file($fileTmpName, $filedir);
                } else {
                    $errors[] = 'Your file is larger than 5mb';
                }
            } else {
                $errors[] = 'Error Uploading your file';
            }
        } else {
            $errors[] = 'Please Upload only jpg, jpeg, png files';
        }
    } 

    if(empty($errors)) {
        try {
            $query = "INSERT INTO medi_payments(userId, mediId, payType, pay_state, amount, pay_date, reason, slip) 
            VALUES (:userid, :medi_id, :payType, :pay_state, :amount, :dates, :reason, :slip);";
            
            $stmt = $conn->prepare($query);

            $stmt->bindParam(':userid', $userId);
            $stmt->bindParam(':medi_id', $mediId);
            $stmt->bindParam(':payType', $payType);
            $stmt->bindParam(':pay_state', $pay_state); 
            $stmt->bindParam(':amount', $amount); 
            $stmt->bindParam(':dates', $pay_day); 
            $stmt->bindParam(':reason', $reason);
            $stmt->bindParam(':slip', $filedir);
            
            // Execute the prepared statement
            $stmt->execute();

            // Redirect to a success page or do any other post-submission operations
            header("Location: success.php");
            exit();

        } catch(PDOException $e) {
            // Handle errors
            echo "Error: " . $e->getMessage();
        }
    }
}
?>

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
    <title>Medical Appointment - RPSMS</title>
</head>
<div>
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
                </label>
            
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
        <h4 class=" text-xl md:text-xl lg:text-2xl font-bold "><i class="fa-solid fa-file-invoice-dollar"></i> New Payment</h4>
        <hr class="mt-3 border-blue-600">
        </div>
        <div class="p-4">
            <?php
            
            if (!empty($errors)): ?>
                <div>
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?php echo $error; ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif;
            
            ?>
            <form action="" method="post" enctype="multipart/form-data">
                <div>
                    <div class="cols grid md:grid-cols-2 gap-4 my-4">
                        <div>
                            <label for="stu_id">Medical ID<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="uidInput" name="mid_id" value="<?php if(isset($_GET['mid'])){ echo $_GET['mid'];}?>" <?php if(isset($_GET['mid'])){ echo 'readonly';} ?>>
                        </div>
                        <div>
                            <label for="stu_id">Student ID<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="uidInput" name="stu_id" value="<?php if(isset($_GET['uid'])){ echo $_GET['uid'];}?>" <?php if(isset($_GET['uid'])){ echo 'readonly';} ?>>
                        </div>
                    </div>
                    
                    <div class="cols grid md:grid-cols-2 gap-4 my-4">
                        <div>
                        <label for="amount">Payment Amount (Rs.) / මුදල් ප්‍රමාණය (රු.)<span class="text-red-500">*</span></label>
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="amount" name="amount" maxlength="12" placeholder="1000" required/>
                        </div>
                        <div>
                        <div> 
                        <label for="branch">Paid Date / ගෙවීම කල දිනය<span class="text-red-500">*</span></label>
                            <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="date" id="dates" name="date_paid" required/>
                        </div>
                        </div>
                    </div>

                    <div class="cols grid md:grid-cols-2 gap-4 my-4">
                        <div>
                        <label for="amount">Payment Receipt / ගෙවීම් වව්චරය<span class="text-red-500">*</span></label>
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="file" id="file" name="file" enctype="multipart/form-data"/>
                        </div>
                        <div>
                        <div> 
                        <label for="reason">Reason / ගෙවීමට හේතුව<span class="text-red-500">*</span></label>
                        <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" id="reason" name="reason" value="Medical Payment" readonly>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            <div class="w-full flex flex-row butons items-center justify-between my-4 p-4">
                <?php if(!isset($_GET['mid'])){ echo '
                <button class="btn btn-md px-10 py-2 rounded-md bg-gray-200  text-gray-400 border border-gray-400 " onclick="window.history.back()" id="cancelBtn"  type="button">Cancel</button>';} ?>
                <button id="submit" class="btn btn-md bg-green-600 border-none text-white px-10 py-2 rounded-lg shadow-md cursor-pointer font-semibold disabled:bg-green-300 disabled:text-green-400 disabled:cursor-not-allowed hover:bg-green-800" type="submit" name="submit">Submit</button>
            </div>
            </form>
        
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
