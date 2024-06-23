<?php
	include("../ConfiguracionAdmin.php");
	include("../conexionDB.php");

	$IdFavorito = $_POST['txtIdFavorito'];
	$IdUsuario = $_POST['setIdUsuario'];
	$IdSena = $_POST['setIdSena'];
	$IdCategoria = $_POST['setIdCategoria'];
	
	$query = "UPDATE favoritos SET IdUsuario='$IdUsuario',
								IdSena='$IdSena',
								IdCategoria='$IdCategoria'
								WHERE IdFavorito = '$IdFavorito'";

	if(!$resultado = mysqli_query($miConexion, $query)) {
    header("Location: " . ROOTURL . "?accion=verlistaFavoritos&Error");
		exit();
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaFavoritos&mensaje=Favorito");
		exit();
	}
?>
