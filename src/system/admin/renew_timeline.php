<!DOCTYPE html>
<?php
require_once '../phpconfigs/conn.php';

$pro_query = "SELECT * FROM re_status WHERE reId=:reId";

$p_rows = $conn->prepare($pro_query);
$p_rows->bindParam(':reId', $reId);
$p_rows->execute();
$pr_result = $p_rows->fetchAll(PDO::FETCH_ASSOC);
// var_dump($pr_result);

?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <title>Timeline</title>
</head>
<body>
    <div class="flex justify-start">
    <div class="p-8 bg-white">
        
        <ol class="items-center sm:flex">               
        <?php
            if($pr_result){
                      foreach($pr_result as $rows){
                        $events = $rows['reState'];
                        $edate = $rows['dates'];

                       echo '
                       <li class="relative mb-6 sm:mb-0">
                            <div class="flex items-center">
                                <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-whiteshrink-0">
                                    <svg class="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <div class="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
                            </div>
                            <div class="mt-3 sm:pe-8">
                                <h3 class="text-sm font-semibold text-gray-900 ">'.$events.'</h3>
                                <time class="block mb-2 text-sm font-normal leading-none text-gray-400 ">'.$edate.'</time>
                            </div>
                        </li>

                       ';
                      }
                  }
        ?>               
        </ol>
        
    </div>
    </div>
</body>
</html>

