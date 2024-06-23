<?php
	$miConexion = new mysqli('localhost','root','','handstalk');

	if($miConexion->connect_error){
		die("Error en la conexión".$miConexion->connect_error);
	} else{ }
?>