<?php
    include ('conexionDB.php');
    $IdObjeto = $_GET['IdObjeto'];
    $Tabla = $_GET['Tabla'];
    $Id = $_GET['Id'];
    $Accion = $_GET['Accion'];
    $respuesta = "Confirmar";

    if ($respuesta == "Confirmar") {
        $query = "DELETE FROM $Tabla WHERE $Id = $IdObjeto";
        if (!$resultado = mysqli_query($miConexion, $query)) {
          echo "Error en la consulta: " . mysqli_error($miConexion);
          exit();
        } else {
?>
          <meta http-equiv="refresh" content="0;URL=http://localhost/HandsTalk/admin/?accion=<?=$Accion?>&notDelete=<?=substr($Tabla, 0, -1)?>">
<?php
        }
    }
?>