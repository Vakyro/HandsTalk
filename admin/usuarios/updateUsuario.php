<?php
	include("../ConfiguracionAdmin.php");
	include("../conexionDB.php");

	$IdUsuario = $_POST['txtIdUsuario'];
	$APaterno = $_POST['txtAPaterno'];
	$AMaterno = $_POST['txtAMaterno'];
	$Nombre = $_POST['txtNombre'];
	$Edad = $_POST['txtEdad'];
	$Region = $_POST['txtRegion'];
	$Usuario = $_POST['txtUsuario'];
	$Contrasena = $_POST['txtContrasena'];

	$query = "UPDATE usuarios SET APaterno='$APaterno',
								AMaterno='$AMaterno',
								Nombre='$Nombre',
								Edad='$Edad',
								Region='$Region',
								Usuario='$Usuario',
								Contrasena='$Contrasena'
								WHERE IdUsuario = '$IdUsuario'";

	if (!$resultado = mysqli_query($miConexion, $query)) {
    header("Location: " . ROOTURL . "?accion=verlistaUsuarios&Error");
		exit();
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaUsuarios&mensaje=Usuario");
		exit();
	}
?>