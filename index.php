<?php
  include("configuracion.php");
  $accion = (isset($_GET['accion'])) ? $_GET['accion'] : null;
?>

<!DOCTYPE html>
<html lang="en">
  <head>  
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Traductor de lenguaje de señas">
    <meta name="keywords" content="traductor, lenguaje, señas">
    <meta name="author" content="<?=AUTOR?>">
    <title><?=SITENAME?> | Traductor de lenguaje de señas</title>
    <link rel="shortcut icon" href="<?=IMAGES?>favicon.ico" type="image/x-icon">
    <link rel="icon" href="<?=IMAGES?>favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="<?=CSS?>myStyle.css" /> 
    <link rel="stylesheet" href="<?=CSS?>output.css">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="pt-8 bg-white">

<?php
  switch ($accion) {
    // Inicio
    default:
      include("home.php");
      break;

    // Nosotros
    case 'Nosotros':
      include("nosotros.php");
      break;

    // Traductor2
    case 'Traductor2':
      include("Pagina2.php");
      break;
  }
  include(FOOTER); 
?>

<script>
  // Bloquear el desplazamiento horizontal en dispositivos móviles
  window.addEventListener('touchmove', function(e) {
    if (e.touches.length == 2) {
      e.preventDefault();
    }
  }, { passive: false });
</script>
