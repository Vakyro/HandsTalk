<?php
	include("../ConfiguracionAdmin.php");
	include("../conexionDB.php");;

	$IdSena = $_POST['txtIdSena'];
	$IdCategoria = $_POST['setIdCategoria'];
	$Nombre = $_POST['txtNombre'];
	$Imagen = $_POST['txtImagen'];
	
	$query = "UPDATE senas SET IdCategoria='$IdCategoria',
								Nombre='$Nombre',
								Imagen='$Imagen'
								WHERE IdSena = '$IdSena'";

	if(!$resultado = mysqli_query($miConexion, $query)) {
    header("Location: " . ROOTURL . "?accion=verlistaSenas&Error");
		exit();
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaSenas&mensaje=Seña");
		exit();
	}
?>
