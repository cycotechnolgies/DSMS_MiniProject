<!DOCTYPE html>
<?php
require_once '../phpconfigs/conn.php';

$userId = $_GET['uid'];
$pro_query = "SELECT * FROM progress WHERE userId=:userId";

$p_rows = $conn->prepare($pro_query);
$p_rows->bindParam(':userId', $userId);
$p_rows->execute();
$pr_result = $p_rows->fetchAll(PDO::FETCH_ASSOC);
// var_dump($pr_result);

?>
    <div class="flex justify-center">
    <div class="p-4 bg-white">
        <div class="py-4">
            <h1 class="text-blue-600 text-4xl font-bold">Timeline</h1>
            <hr>
        </div>
        <ol class="relative border-s-4 border-blue-200">
        <?php
            if($pr_result){
                      foreach($pr_result as $rows){
                        $events = $rows['events'];
                        $edate = $rows['eventDate'];
                        $progs = $rows['events'];
                        
                        if(empty($rows['des'])){
                          $des = "";
                        }else{
                          $des = '( '.$rows['des'].' )';
                        }

                        
                       echo '
                       <li class="mb-10 ms-6">            
                            <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                                <svg class="w-2.5 h-2.5 text-blue-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </span>
                            <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900">'.$progs.' '.$edate.' '.$des.'</h3>
                        </li>
                       ';
                      }
                  }
        ?>               
        </ol>
    </div>
    </div>

