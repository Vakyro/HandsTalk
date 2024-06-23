<?php
	include("configuracionAdmin.php");

	if(isset($_SESSION['user_session'])) {
    include(HEADER);
    include(NAVBAR);

		$accion = (isset($_GET['accion']))?$_GET['accion']:null;

		switch ($accion) {
        //Usuarios
        case 'verlistaUsuarios':
          include("usuarios/listaUsuarios.php");
          break;
        case 'formUsuario':
          include("usuarios/formUsuario.php");
          break;
        case 'formEditUsuario':
          include("usuarios/formEditUsuario.php");
          break;
        case 'deleteUsuario':
          include("usuarios/deleteUsuario.php");
          break;

        //Senas
        case 'verlistaSenas':
          include("senas/listaSenas.php");
          break;
        case 'formSena':
          include("senas/formSena.php");
          break;
        case 'formEditSena':
          include("senas/formEditSena.php");
          break;
        case 'deleteSena':
          include("senas/deleteSena.php");
          break;

        //Empleados
        case 'verlistaEmpleados':
          include("empleados/listaEmpleados.php");
          break;	
        case 'formEmpleado':
          include("empleados/formEmpleado.php");
          break;
        case 'formEditEmpleado':
          include("empleados/formEditEmpleado.php");
          break;
        case 'deleteEmpleado':
          include("empleados/deleteEmpleado.php");
          break;

        //Categorias
        case 'verlistaCategorias':
          include("categorias/listaCategorias.php");
          break;
        case 'formCategoria':
          include("categorias/formCategoria.php");
            break;
        case 'formEditCategoria':
          include("categorias/formEditCategoria.php");
          break;
        case 'deleteCategoria':
          include("categorias/deleteCategoria.php");
          break;

        //Consejos	
        case 'verlistaConsejos':
          include("consejos/listaConsejos.php");
          break;
        case 'formConsejo':
          include("consejos/formConsejo.php");
          break;
        case 'formEditConsejo':
          include("consejos/formEditConsejo.php");
          break;
        case 'deleteConsejo':
          include("consejos/deleteConsejo.php");
          break;

        //Favoritos
        case 'verlistaFavoritos':
          include("favoritos/listaFavoritos.php");
          break;
        case 'formFavorito':
          include("favoritos/formFavorito.php");
          break;
        case 'formEditFavorito':
          include("favoritos/formEditFavorito.php");
          break;
        case 'deleteFavorito':
          include("favoritos/deleteFavorito.php");
          break;

        //Retos
        case 'verlistaRetos':
          include("retos/listaRetos.php");
          break;
        case 'formReto':
          include("retos/formReto.php");
          break;
        case 'formEditReto':
          include("retos/formEditReto.php");
          break;
        case 'deleteReto':
          include("retos/deleteReto.php");
          break;

        default:
          include("home.php");
          break;
		}

    include(FOOTER);
	} 
  else {
		include("login/formlogin.php");
	}
?>
