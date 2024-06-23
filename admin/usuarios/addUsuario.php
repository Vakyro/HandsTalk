<?php
	include("../configuracionAdmin.php");
	include("../conexionDB.php");

	$APaterno = $_POST['txtAPaterno'];
	$AMaterno = $_POST['txtAMaterno'];
	$Nombre = $_POST['txtNombre'];
	$Edad = $_POST['txtEdad'];
	$Region = $_POST['txtRegion'];
	$Usuario = $_POST['txtUsuario'];
	$Contrasena = $_POST['txtContrasena'];

	$query = " INSERT INTO usuarios (APaterno, AMaterno, Nombre, Edad, Region, Usuario, Contrasena) VALUES('$APaterno', '$AMaterno', '$Nombre', '$Edad', '$Region', '$Usuario', '$Contrasena')";

	if(!$resultado = mysqli_query($miConexion,$query)){
    header("Location: " . ROOTURL . "?accion=verlistaUsuarios&Error");
		exit();	
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaUsuarios&mensaje2=Usuario");
		exit();		
	}
?>