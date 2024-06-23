<?php
	include("../ConfiguracionAdmin.php");
	include("../conexionDB.php");

	$IdReto = $_POST['txtIdReto'];
	$Reto = $_POST['txtReto'];
	$Puntuacion = $_POST['txtPuntuacion'];
	$Dificultad = $_POST['txtDificultad'];
	
	$query = "UPDATE retos SET Reto='$Reto',
								Puntuacion='$Puntuacion',
								Dificultad='$Dificultad'
								WHERE IdReto = '$IdReto'";

	if(!$resultado = mysqli_query($miConexion, $query)) {
    header("Location: " . ROOTURL . "?accion=verlistaRetos&Error");
		exit();
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaRetos&mensaje=Reto");
		exit();
	}
?>
