<?php
	include("../configuracionAdmin.php");
	include("../conexionDB.php");

	$IdSena = $_POST['setIdSena'];
	$Texto = $_POST['txtTexto'];
	$Porcentaje = $_POST['txtPorcentaje'];

	$query = " INSERT INTO consejos (IdSena, Texto, Porcentaje) VALUES('$IdSena', '$Texto', '$Porcentaje')";
		
	if(!$resultado = mysqli_query($miConexion,$query)) {
    header("Location: " . ROOTURL . "?accion=verlistaConsejos&Error");
		exit();		
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaConsejos&mensaje2=Consejo");
		exit();			
	}
?>