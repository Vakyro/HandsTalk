<?php
	include("../ConfiguracionAdmin.php");
	include("../conexionDB.php");

	$IdEmpleado = $_POST['txtIdEmpleado'];
	$APaterno = $_POST['txtAPaterno'];
	$AMaterno = $_POST['txtAMaterno'];
	$Nombre = $_POST['txtNombre'];
	$Edad = $_POST['txtEdad'];
	$Sexo = $_POST['txtSexo'];
	$Puesto = $_POST['txtPuesto'];
	$Estado = $_POST['txtEstado'];
	$Usuario = $_POST['txtUsuario'];
	$Contrasena = $_POST['txtContrasena'];
	
	$query = "UPDATE empleados SET APaterno='$APaterno',
								AMaterno='$AMaterno',
								Nombre='$Nombre',
								Edad='$Edad',
								Sexo='$Sexo',
								Puesto='$Puesto',
								Estado='$Estado',
								Usuario='$Usuario',
								Contrasena='$Contrasena'
								WHERE IdEmpleado = '$IdEmpleado'";

	if(!$resultado = mysqli_query($miConexion, $query)) {
    header("Location: " . ROOTURL . "?accion=verlistaEmpleados&Error");
		exit();
	} else {
		header("Location: " . ROOTURL . "?accion=verlistaEmpleados&mensaje=Empleado");
		exit();
	}
?>
