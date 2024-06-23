<?php
	require_once("../configuracion.php");

	unset($_SESSION['Client_session']);

	if(isset($_COOKIE[session_name()])) {
		setcookie(session_name(),'',time()-4200,'/');
	}

	if(session_destroy()) {
		header("Location: " . ROOTURL);
	}
?>