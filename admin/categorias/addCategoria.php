<?php
	include("../configuracionAdmin.php");
	include("../conexionDB.php");

	$Nombre = $_POST['txtNombre'];

	$query = " INSERT INTO categorias (Nombre) VALUES('$Nombre')";

	if(!$resultado = mysqli_query($miConexion,$query)) {
    header("Location: " . ROOTURL . "?accion=verlistaCategorias&Error");
		exit();	
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaCategorias&mensaje2=Categoria");
		exit();		
	}
?>