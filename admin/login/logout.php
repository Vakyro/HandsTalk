<?php
	require_once("../configuracionAdmin.php");

	unset($_SESSION['user_session']);

	if(isset($_COOKIE[session_name()])) {
		setcookie(session_name(),'',time()-4200,'/');
	}

	if(session_destroy()) {
		header("Location: ".ROOTURL);
	}
?>