<?php
	include("../ConfiguracionAdmin.php");
	include("../conexionDB.php");

	$IdConsejo = $_POST['txtIdConsejo'];
	$IdSena = $_POST['setIdSena'];
	$Texto = $_POST['txtTexto'];
	$Porcentaje = $_POST['txtPorcentaje'];
	
	$query = "UPDATE consejos SET IdSena='$IdSena',
								Texto='$Texto',
								Porcentaje='$Porcentaje'
								WHERE IdConsejo = '$IdConsejo'";

	if(!$resultado = mysqli_query($miConexion, $query)) {
    header("Location: " . ROOTURL . "?accion=verlistaConsejos&Error");
		exit();
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaConsejos&mensaje=Consejo");
		exit();
	}
?>
