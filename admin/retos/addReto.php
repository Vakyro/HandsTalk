<?php
	include("../configuracionAdmin.php");
	include("../conexionDB.php");

	$Reto = $_POST['txtReto'];
	$Puntuacion = $_POST['txtPuntuacion'];
	$Dificultad = $_POST['txtDificultad'];


	
	$query = " INSERT INTO retos (Reto, Puntuacion, Dificultad) VALUES('$Reto', '$Puntuacion', '$Dificultad')";
		
	if(!$resultado = mysqli_query($miConexion,$query)) {
    header("Location: " . ROOTURL . "?accion=verlistaRetos&Error");
		exit();	
	} else {
    header("Location: " . ROOTURL . "?accion=verlistaRetos&mensaje2=Reto");
		exit();	
	}
?>