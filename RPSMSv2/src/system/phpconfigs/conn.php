<?php
$databaseHost='localhost';
$databaseUser='riyaduru_cyco'; 
$databasePassword='1j6ffk8$VW;?'; 
$databaseName='riyaduru_rpsms';
try {
  $conn = new PDO("mysql:host=".$databaseHost.";dbname=".$databaseName, $databaseUser, $databasePassword);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//   echo 'Database Connected Successfully';
} catch(PDOException $error) {
//   echo "Something went wrong " . $error->getMessage();
}

?>