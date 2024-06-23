<?php
	include("../configuracionAdmin.php");
	include("../conexionDB.php");

	$IdUsuario = $_POST['setIdUsuario'];
	$IdSena = $_POST['setIdSena'];
	$IdCategoria = $_POST['setIdCategoria'];

	$query = " INSERT INTO favoritos (IdUsuario, IdSena, IdCategoria) VALUES('$IdUsuario', '$IdSena', '$IdCategoria')";

	if(!$resultado = mysqli_query($miConexion,$query)) {	
    header("Location: " . ROOTURL . "?accion=verlistaFavoritos&Error");
		exit();	
	} else {
    header("Location: " . ROOTURL . "?accion=verlistaFavoritos&mensaje2=Favorito");
		exit();
	}
?>