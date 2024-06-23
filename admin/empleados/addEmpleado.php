<?php
	include("../configuracionAdmin.php");
	include("../conexionDB.php");

	$APaterno = $_POST['txtAPaterno'];
	$AMaterno = $_POST['txtAMaterno'];
	$Nombre = $_POST['txtNombre'];
	$Edad = $_POST['txtEdad'];
	$Sexo = $_POST['txtSexo'];
	$Puesto = $_POST['txtPuesto'];
	$Estado = $_POST['txtEstado'];
	$Usuario = $_POST['txtUsuario'];
	$Contrasena = $_POST['txtContrasena'];

	$query = " INSERT INTO empleados (APaterno, AMaterno, Nombre, Edad, Sexo, Puesto, Estado, Usuario, Contrasena) VALUES('$APaterno', '$AMaterno', '$Nombre', '$Edad', '$Sexo', '$Puesto', '$Estado', '$Usuario', '$Contrasena')";

	if(!$resultado = mysqli_query($miConexion,$query)) {
    header("Location: " . ROOTURL . "?accion=verlistaEmpleados&Error");
		exit();	
	} else {
    header("Location: " . ROOTURL . "?accion=verlistaEmpleados&mensaje2=Empleado");
		exit();		
	}
?>