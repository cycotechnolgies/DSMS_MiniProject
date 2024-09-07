<!DOCTYPE html>
<?php
session_start();
require_once '../phpconfigs/conn.php';

$errors = array();
$genf = "../../images/avatars/woman.png";
$genm = "../../images/avatars/man.png";
$sId = $_GET['sid'];

$query = "SELECT * FROM schedule WHERE schedId = :sids LIMIT 1;";
$rows = $conn->prepare($query);
$rows->bindParam(':sids', $sId);

if ($rows->execute()) {
    $result = $rows->fetch(PDO::FETCH_ASSOC);
    $cName = $result['clsName'];
    $branch = $result['branch'];
    $inst = $result['instructor'];
    $vehi = $result['vehi'];
    $types = $result['vehiType'];
    $dateTime = $result['dateTime'];
}

if (isset($_POST['del'])) {
    $uids = $_POST['del_uid'];
    
    if (!$uids) {
        $_SESSION['stu_alert'] = array('message' => 'No user ID provided.', 'type' => 'error');
        header('Location: ' . $_SERVER['PHP_SELF'] . '?sid=' . $sId);
        exit;
    }

    try {
        $conn->beginTransaction();
        $sqlClass = "DELETE FROM class WHERE stuId = :stids AND schedId = :sids";
        $stmtClass = $conn->prepare($sqlClass);
        $stmtClass->bindParam(':stids', $uids, PDO::PARAM_INT);
        $stmtClass->bindParam(':sids', $sId, PDO::PARAM_INT);
        $stmtClass->execute();

        $sqlProf = "DELETE FROM preforme WHERE stuId = :stids AND schId = :sids";
        $stmtProf = $conn->prepare($sqlProf);
        $stmtProf->bindParam(':stids', $uids, PDO::PARAM_INT);
        $stmtProf->bindParam(':sids', $sId, PDO::PARAM_INT);
        $stmtProf->execute();

        $sqlCard = "DELETE FROM cards WHERE userId = :stu AND ClassId = :cls";
        $stmtCard = $conn->prepare($sqlCard);
        $stmtCard->bindParam(':stu', $uids, PDO::PARAM_INT);
        $stmtCard->bindParam(':cls', $sId, PDO::PARAM_INT);
        $stmtCard->execute();

        $conn->commit();
        $_SESSION['stu_alert'] = array('message' => 'Student and related records deleted successfully.', 'type' => 'success');
    } catch (Exception $e) {
        $conn->rollBack();
        $_SESSION['stu_alert'] = array('message' => 'Transaction failed: ' . $e->getMessage(), 'type' => 'error');
    }
    header('Location: ' . $_SERVER['PHP_SELF'] . '?sid=' . $sId);
    exit;
}

if (isset($_POST['del_sched'])) {
    $sId = $_POST['sids'];
    if (filter_var($sId, FILTER_VALIDATE_INT) !== false) {
        try {
            $conn->beginTransaction();
            $sqlClass = "DELETE FROM class WHERE schedId = :sids";
            $stmtClass = $conn->prepare($sqlClass);
            $stmtClass->bindParam(':sids', $sId, PDO::PARAM_INT);
            $stmtClass->execute();

            $sqlCard = "DELETE FROM cards WHERE ClassId = :sids";
            $stmtCard = $conn->prepare($sqlCard);
            $stmtCard->bindParam(':sids', $sId, PDO::PARAM_INT);
            $stmtCard->execute();

            $sqlSchedule = "DELETE FROM schedule WHERE schedId = :sids";
            $stmtSchedule = $conn->prepare($sqlSchedule);
            $stmtSchedule->bindParam(':sids', $sId, PDO::PARAM_INT);
            $stmtSchedule->execute();

            $conn->commit();
            $_SESSION['alert'] = array('message' => 'Schedule deleted successfully.', 'type' => 'success');
        } catch (PDOException $e) {
            $_SESSION['alert'] = array('message' => 'Database error: ' . $e->getMessage(), 'type' => 'error');
        }
    } else {
        $_SESSION['alert'] = array('message' => 'Invalid schedule ID.', 'type' => 'error');
    }
    header('Location: ' . $_SERVER['PHP_SELF'] . '?sid=' . $sId);
    exit;
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
    <script src="../../js/update.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.6/dist/sweetalert2.all.min.js" integrity="sha256-dyw4h6gMbTk1vSiOqcs/wqhyqydsuILBl78WhcD44lY=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.6/dist/sweetalert2.min.css" integrity="sha256-h2Gkn+H33lnKlQTNntQyLXMWq7/9XI2rlPCsLsVcUBs=" crossorigin="anonymous">
    <title>Class Details - RPSMS</title>
</head>
<body>
<div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col ">

        <div class="navbar bg-base-100 shadow- shadow-blue-400/50">
            <div class="flex-1">
                <label for="my-drawer-2" class="btn drawer-button btn-md bg-blue-400 btn-square lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5">
                        <path fill="white" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                    </svg>
                </label>
            </div>
            <div class="flex-none">
                
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
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                    <li class="p-2">User ID : <?php echo $_SESSION['uid']; ?></li>
                        <li><a href="../phpconfigs/logout.inc.php">Logout</a>
                    </ul>
                </div>
            </div>
        </div>

        <div data-theme="none" class="p-4">
            <h4 class=" text-xl md:text-xl lg:text-2xl font-bold text-center ">Class Details</h4>
            <hr class="mt-3 border-blue-600">
        </div>

        <div class="p-4 flex justify-start gap-4">
            <p class="text-xl font-bold uppercase"><span class="text-blue-600">#<?php echo $sId; ?> </span><?php echo $cName; ?></p>
        </div>
        <hr>
        <div class="p-4 flex justify-end gap-4">
            <a href="train_card.php?cid=<?php echo $sId;?>" ><button class="px-4 py-2 rounded-md bg-blue-600 text-white">Cards</button></a>
            <a href="add_clsStu.php?cid=<?php echo $sId;?>" ><button class="px-4 py-2 rounded-md bg-green-600 text-white">Add</button></a>
            <form method="post" action="">
                <input type="hidden" name="sids" value="<?php echo htmlspecialchars($sId); ?>">
                <button class="px-4 py-2 rounded-md bg-red-600 text-white"  name="del_sched">Delete</button>
            </form>

        </div>
        <div class="relative overflow-hidden m-4">
            <div class="cols grid md:grid-cols-2 gap-4">
                <div class="cols">
                    <label for="">Instructor</label>
                    <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="" id="" value="<?php echo $inst;?>" disabled />
                </div>
                <div class="cols">
                    <label for="branch">Branch</label>
                    <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="" id="" value="<?php echo $branch;?>" disabled />
                </div>
            </div>
            <div class="cols grid md:grid-cols-2 gap-4">
                <div class="cols">
                    <label for="">Vehicle Class</label>
                    <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="" id="" value="<?php echo $types;?>" disabled />
                </div>
                <div class="cols">
                    <label for="branch">Assigned Vehicles</label>
                    <input class="border my-2 border-gray-400 rounded-md w-full p-2 focus:border-blue-500 focus:outline-none" type="text" name="" id="" value="<?php echo $vehi;?>" disabled />
                </div>
            </div>
        </div>
        <div>
            <div class="relative overflow-hidden p-4">
                <table class="table-auto w-full text-left">
                    <thead class="text-gray-200 uppercase bg-gray-600">
                        <tr>
                            <td class="py-1 border text-center  p-4">Stu-ID</td>
                            <td class="py-1 border text-center  p-4">Name</td>
                            <td class="py-1 border text-center  p-4">Controls</td>
                        </tr>
                    </thead>
                    <tbody class="bg-white text-gray-500">
                        <?php
                        $sql = "SELECT s.userId, s.initName FROM class c JOIN student s ON c.stuId = s.userId WHERE c.schedId = :sids;";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':sids', $sId, PDO::PARAM_INT);
                        $stmt->execute();
                        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

                        if ($results) {
                            foreach ($results as $result) {
                                echo '<tr class="py-2">
                                    <td class="py-2 border text-center  p-4">' . $result['userId'] . '</td>
                                    <td class="py-2 border text-center  p-4">' . $result['initName'] . '</td>
                                    <td class="py-2 border text-center  p-4">
                                        <div class="flex flex-row gap-2">
                                            <a href="preform.php?sid=' . $result['userId'] . '&cid=' . $sId . '">
                                                <button class="px-4 py-2 rounded-md bg-green-600 text-white">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </a>
                                            <form method="post">
                                                <input type="hidden" value="'.$result['userId'].'" name="del_uid">
                                                <button class="px-4 py-2 rounded-md bg-red-600 text-white" name="del">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>';
                            }
                        } else {
                            echo '<tr class="py-2">
                                <td class="py-2 border text-center  p-4 bg-red-200 font-semibold" colspan="3">No Records found</td>
                            </tr>';
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-60 min-h-full bg-white gap-4 ">
            <?php include('sidebar.php') ?>
        </ul>
    </div>
</div>

<?php
if (isset($_SESSION['alert'])) {
    echo '<script>
        Swal.fire({
            title: "' . ($_SESSION['alert']['type'] === 'success' ? 'Success' : 'Error') . '",
            text: "' . $_SESSION['alert']['message'] . '",
            icon: "' . $_SESSION['alert']['type'] . '",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "schedule.php";
            }
        });
    </script>';
    unset($_SESSION['alert']);
}
?>

<?php
if (isset($_SESSION['stu_alert'])) {
    echo '<script>
        Swal.fire({
            title: "' . ($_SESSION['stu_alert']['type'] === 'success' ? 'Success' : 'Error') . '",
            text: "' . $_SESSION['stu_alert']['message'] . '",
            icon: "' . $_SESSION['stu_alert']['type'] . '",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
    </script>';
    unset($_SESSION['stu_alert']);
}
?>


<!-- <script>
    function confirmDeletion(event) {
        event.preventDefault();
        const form = event.target;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                alert('Form is being submitted');
                form.submit();
                
            }
        });
    }
</script> -->
</body>
</html>