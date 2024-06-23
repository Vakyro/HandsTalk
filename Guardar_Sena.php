<?php
  include("../configuracion.php");
  include("../conexionDB.php");

  $phpLastPrediction = isset($_GET['lastPrediction']) ? $_GET['lastPrediction'] : null;
  $IdUsuario = $_SESSION['Cient_session']['IdUsuario'];

  switch ($phpLastPrediction) {
    case 'A':
      $IdSena = 1;
      $IdCategoria = 1;
      break;

    case 'B':
      $IdSena = 2;
      $IdCategoria = 1;
        break;

    case 'C':
      $IdSena = 4;
      $IdCategoria = 1;
      break;

    case 'D':
      $IdSena = 5;
      $IdCategoria = 1;
        break;

    case 'E':
      $IdSena = 6;
      $IdCategoria = 1;
      break;

    case 'F':
      $IdSena = 7;
      $IdCategoria = 1;
        break;

    case 'G':
      $IdSena = 8;
      $IdCategoria = 1;
      break;

    case 'H':
      $IdSena = 9;
      $IdCategoria = 1;
        break;

    case 'I':
      $IdSena = 10;
      $IdCategoria = 1;
      break;

    case 'J':
      $IdSena = 11;
      $IdCategoria = 1;
        break;

    case 'K':
      $IdSena = 13;
      $IdCategoria = 1;
      break;

    case 'L':
      $IdSena = 14;
      $IdCategoria = 1;
        break;

    case 'M':
      $IdSena = 15;
      $IdCategoria = 1;
      break;

    case 'N':
      $IdSena = 16;
      $IdCategoria = 1;
        break;

    case 'O':
      $IdSena = 17;
      $IdCategoria = 1;
      break;

    case 'P':
      $IdSena = 18;
      $IdCategoria = 1;
        break;

    case 'Q':
      $IdSena = 19;
      $IdCategoria = 1;
      break;

    case 'R':
      $IdSena = 20;
      $IdCategoria = 1;
        break;

    case 'S':
      $IdSena = 21;
      $IdCategoria = 1;
      break;

    case 'T':
      $IdSena = 22;
      $IdCategoria = 1;
        break;

    case 'U':
      $IdSena = 23;
      $IdCategoria = 1;
        break;

    case 'V':
      $IdSena = 24;
      $IdCategoria = 1;
      break;

    case 'W':
      $IdSena = 25;
      $IdCategoria = 1;
        break;

    case 'X':
      $IdSena = 26;
      $IdCategoria = 1;
      break;

    case 'Y':
      $IdSena = 27;
      $IdCategoria = 1;
        break;

    case 'Z':
      $IdSena = 29;
      $IdCategoria = 1;
        break;
  }

  if ($IdSena == "" && $IdCategoria = "") {
    header("Location: " . ROOTURL . "?=mensaje2");
    exit();	
  } else {
    $query = "INSERT INTO favoritos (IdUsuario, IdSena, IdCategoria) VALUES ('$IdUsuario', '$IdSena', '$IdCategoria')";

    if(!$resultado = mysqli_query($miConexion,$query)) {	
      header("Location: " . ROOTURL . "?=mensaje2");
      exit();	
    } else {
      header("Location: " . ROOTURL . "?mensaje=Seña");
      exit();
    }
  }
?>