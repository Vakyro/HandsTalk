<?php
	include("../configuracionAdmin.php");
	include("../conexionDB.php");

	$IdCategoria = $_POST['setIdCategoria'];
	$Nombre = $_POST['txtNombre'];
	$Imagen = $_POST['txtImagen'];

	$query = " INSERT INTO senas (IdCategoria, Nombre, Imagen) VALUES('$IdCategoria', '$Nombre', '$Imagen')";
		
	if(!$resultado = mysqli_query($miConexion,$query)) {
    header("Location: " . ROOTURL . "?accion=verlistaSenas&Error");
		exit();
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaSenas&mensaje2=Seña");
		exit();		
	}
?>