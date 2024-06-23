<?php
	include("../ConfiguracionAdmin.php");
	include("../conexionDB.php");

	$IdCategoria = $_POST['txtIdCategoria'];
	$Nombre = $_POST['txtNombre'];
	
	$query = "UPDATE categorias SET Nombre='$Nombre'
								WHERE IdCategoria = '$IdCategoria'";

	if(!$resultado = mysqli_query($miConexion, $query)) {
    header("Location: " . ROOTURL . "?accion=verlistaCategorias&Error");
		exit();
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaCategorias&mensaje=Categoria");
		exit();
	}
?>
