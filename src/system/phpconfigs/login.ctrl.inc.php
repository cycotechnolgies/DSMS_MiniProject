<?php
session_start();

function check_login($conn)
{

	if (isset($_SESSION['email'])) {

		$id = $_SESSION['email'];
		$query = "SELECT * FROM users WHERE email = '$id' LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

		if ($result && mysqli_num_rows($result) > 0) {

			$user_data = mysqli_fetch_assoc($result);

			return $user_data;
		}
	}

	//redirect to login
	header("Location: ..\login.php");
	die;
}