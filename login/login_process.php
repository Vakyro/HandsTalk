<?php
	require_once("../configuracion.php");
	include('../conexionDB.php');

	$accion = $_POST['accion'];
	$NombreUsuario = $_POST['txtNombreUsuario'];
	$Contrasena = $_POST['txtContrasena'];

	$query = "SELECT * FROM usuarios WHERE Usuario='$NombreUsuario' AND Contrasena='$Contrasena' ";

	if($accion == "login") {
		if(!$resultado = mysqli_query($miConexion,$query)) { 
      header("Location: " . ROOTURL . "?accion=error");
		}else {
      $datosUsuario = mysqli_fetch_assoc($resultado);
			if($NombreUsuario==$datosUsuario['Usuario'] && $Contrasena==$datosUsuario['Contrasena'] && mysqli_num_rows($resultado)>0) {
				$_SESSION['Cient_session'] = $datosUsuario;
        header("Location: " . ROOTURL);
			}else { 
        header("Location: " . ROOTURL . "?accion=error");
			}
		}
	}
?>