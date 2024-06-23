<?php
include("../configuracion.php");
include("../conexionDB.php");

$APaterno = $_POST['txtAPaterno'];
$AMaterno = $_POST['txtAMaterno'];
$Nombre = $_POST['txtNombre'];
$Edad = $_POST['txtEdad'];
$Region = "Mexico";
$Usuario = $_POST['txtUsuario'];
$Contrasena = $_POST['txtContrasena'];

// Verificar si el nombre de usuario ya existe en la base de datos
$query_verificacion = "SELECT Usuario FROM usuarios WHERE Usuario = '$Usuario'";
$resultado_verificacion = mysqli_query($miConexion, $query_verificacion);

if (mysqli_num_rows($resultado_verificacion) > 0) {
    // El nombre de usuario ya existe, redirigir con un mensaje de error
    header("Location: " . ROOTURL . "login/formsingin.php?accion=ErrorUser");
    exit();
} else {
    // El nombre de usuario no existe, proceder con la inserción en la base de datos
    $query_insertar = "INSERT INTO usuarios (APaterno, AMaterno, Nombre, Edad, Region, Usuario, Contrasena) VALUES('$APaterno', '$AMaterno', '$Nombre', '$Edad', '$Region', '$Usuario', '$Contrasena')";
    if (!$resultado_insertar = mysqli_query($miConexion, $query_insertar)) {
        // Ocurrió un error al insertar en la base de datos, redirigir con un mensaje de error
        header("Location: " . ROOTURL . "?accion=error");
        exit();
    } else {
        // Redirigir al usuario a la página de inicio de sesión
        $redirectUrl = ROOTURL . "login/login_process2.php?Usuario=" . urlencode($Usuario) . "&Contrasena=" . urlencode($Contrasena) . "&accion=login";
        header("Location: " . $redirectUrl);
        exit();
    }
}
?>
