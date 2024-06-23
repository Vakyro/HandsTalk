<?php
	require_once("../configuracionAdmin.php");
	include('../conexionDB.php');

	$accion = $_POST['accion'];
	$NombreUsuario = $_POST['txtNombreUsuario'];
	$Contrasena = $_POST['txtContrasena'];

	$query = "SELECT IdEmpleado, Nombre, Puesto, Estado, Sexo, Usuario, Contrasena FROM empleados WHERE Usuario='$NombreUsuario' AND Contrasena='$Contrasena' AND Estado='Activo'";

	if($accion == "login") {
		if(!$resultado = mysqli_query($miConexion,$query)){ 
		} else {
			$datosUsuario = mysqli_fetch_assoc($resultado);
			if($NombreUsuario==$datosUsuario['Usuario'] && $Contrasena==$datosUsuario['Contrasena'] && 'Activo'==$datosUsuario['Estado'] && mysqli_num_rows($resultado)>0) {
				$_SESSION['user_session']=$datosUsuario;
        header("Location: http://localhost/HandsTalk/admin/");
			} else { 
        header("Location: http://localhost/HandsTalk/admin/?accion=&error");
			}
		}
	}
?>