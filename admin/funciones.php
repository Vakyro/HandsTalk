<?php
        //USUARIOS
        function ObtenerListaUsuarios(){
          include ("conexionDB.php");
          $query = "SELECT IdUsuario,APaterno,AMaterno,Nombre,Edad,Region,Usuario,Contrasena FROM usuarios";

          if(!$resultado = mysqli_query($miConexion,$query)){
              exit(mysqli_error($miConexion));
          }

          $lista = array();

          if (mysqli_num_rows($resultado) > 0){
            while($renglon = mysqli_fetch_assoc($resultado)){
              $lista[] = array(
                              'IdUsuario' => $renglon ['IdUsuario'],
                              'APaterno' => $renglon ['APaterno'],
                              'AMaterno' => $renglon ['AMaterno'],
                              'Nombre' => $renglon ['Nombre'],
                              'Edad' => $renglon ['Edad'],
                              'Region' => $renglon ['Region'],
                              'Usuario' => $renglon ['Usuario'],
                              'Contrasena' => $renglon ['Contrasena']               
                              );
            }
          }
          return $lista;
        }

        function obtenerDatosUsuarios($IdUsuario){
          include ("conexionDB.php");
          $query = "SELECT IdUsuario,APaterno,AMaterno,Nombre,Edad,Region,Usuario,Contrasena FROM usuarios WHERE IdUsuario = $IdUsuario";

          if(!$resultado = mysqli_query($miConexion,$query)){
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if(mysqli_num_rows($resultado)>0){
            while($renglon = mysqli_fetch_assoc($resultado)){
              $listas = array(
                            'IdUsuario' => $renglon ['IdUsuario'],
                            'APaterno' => $renglon ['APaterno'],
                            'AMaterno' => $renglon ['AMaterno'],
                            'Nombre' => $renglon ['Nombre'],
                            'Edad' => $renglon ['Edad'],
                            'Region' => $renglon ['Region'],
                            'Usuario' => $renglon ['Usuario'],
                            'Contrasena' => $renglon ['Contrasena'] 
                            );
            }
          }
          return  $listas;
        }

        //SEÑAS
        function ObtenerListaSenas(){
          include ("conexionDB.php");
          $query = "SELECT IdSena,IdCategoria,Nombre,Imagen FROM senas";

          if(!$resultado = mysqli_query($miConexion,$query)) {
              exit(mysqli_error($miConexion));
          }

          $lista = array();
            
          if (mysqli_num_rows($resultado) > 0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $lista[] = array(
                              'IdSena' => $renglon ['IdSena'],
                              'IdCategoria' => $renglon ['IdCategoria'],
                              'Nombre' => $renglon ['Nombre'],
                              'Imagen' => $renglon ['Imagen']              
                              );
            }
          }
          return $lista;
        }

        function obtenerDatosSenas($IdSena) {
          include ("conexionDB.php");
          $query = "SELECT IdSena,IdCategoria,Nombre,Imagen FROM senas WHERE IdSena = $IdSena";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if(mysqli_num_rows($resultado)>0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $listas = array(
                              'IdSena' => $renglon ['IdSena'],
                              'IdCategoria' => $renglon ['IdCategoria'],
                              'Nombre' => $renglon ['Nombre'],
                              'Imagen' => $renglon ['Imagen']  
                              );
            }
          }
          return  $listas;
        }

        //EMPLEADOS
        function ObtenerListaEmpleados() {
          include ("conexionDB.php");
          $query = "SELECT IdEmpleado,APaterno,AMaterno,Nombre,Edad,Sexo,Puesto,Estado,Usuario,Contrasena FROM empleados";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if (mysqli_num_rows($resultado) > 0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $lista[] = array(
                                'IdEmpleado' => $renglon ['IdEmpleado'],
                                'APaterno' => $renglon ['APaterno'],
                                'AMaterno' => $renglon ['AMaterno'],
                                'Nombre' => $renglon ['Nombre'],
                                'Edad' => $renglon ['Edad'],
                                'Sexo' => $renglon ['Sexo'],
                                'Puesto' => $renglon ['Puesto'],
                                'Estado' => $renglon ['Estado'],  
                                'Usuario' => $renglon ['Usuario'],
                                'Contrasena' => $renglon ['Contrasena']           
                              );
            }
          }
          return $lista;
        }

        function obtenerDatosEmpleados($IdEmpleado) {
          include ("conexionDB.php");
          $query = "SELECT IdEmpleado,APaterno,AMaterno,Nombre,Edad,Sexo,Puesto,Estado,Usuario,Contrasena FROM empleados WHERE IdEmpleado = $IdEmpleado";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if(mysqli_num_rows($resultado)>0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $listas = array(
                              'IdEmpleado' => $renglon ['IdEmpleado'],
                              'APaterno' => $renglon ['APaterno'],
                              'AMaterno' => $renglon ['AMaterno'],
                              'Nombre' => $renglon ['Nombre'],
                              'Edad' => $renglon ['Edad'],
                              'Sexo' => $renglon ['Sexo'],
                              'Puesto' => $renglon ['Puesto'],
                              'Estado' => $renglon ['Estado'],  
                              'Usuario' => $renglon ['Usuario'],
                              'Contrasena' => $renglon ['Contrasena']  
                              );
            }
          }
          return  $listas;
        }

        //CONSEJOS
        function ObtenerListaConsejos() {
          include ("conexionDB.php");
          $query = "SELECT IdConsejo,IdSena,Texto,Porcentaje FROM consejos";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if (mysqli_num_rows($resultado) > 0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $lista[] = array(
                                'IdConsejo' => $renglon ['IdConsejo'],
                                'IdSena' => $renglon ['IdSena'],
                                'Texto' => $renglon ['Texto'],
                                'Porcentaje' => $renglon ['Porcentaje']          
                              );
            }
          }
            return $lista;
        }

        function obtenerDatosConsejos($IdConsejo) {
          include ("conexionDB.php");
          $query = "SELECT IdConsejo,IdSena,Texto,Porcentaje FROM consejos WHERE IdConsejo = $IdConsejo";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if(mysqli_num_rows($resultado)>0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $listas = array(
                              'IdConsejo' => $renglon ['IdConsejo'],
                              'IdSena' => $renglon ['IdSena'],
                              'Texto' => $renglon ['Texto'],
                              'Porcentaje' => $renglon ['Porcentaje'] 
                              );
            }
          }
          return  $listas;
        }

        //FAVORITOS
        function ObtenerListaFavoritos() {
          include ("conexionDB.php");
          $query = "SELECT IdFavorito,IdUsuario,IdSena,IdCategoria FROM favoritos";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if (mysqli_num_rows($resultado) > 0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $lista[] = array(
                              'IdFavorito' => $renglon ['IdFavorito'],
                              'IdUsuario' => $renglon ['IdUsuario'],
                              'IdSena' => $renglon ['IdSena'],
                              'IdCategoria' => $renglon ['IdCategoria']          
                              );
            }
          }
            return $lista;
        }

        function obtenerDatosFavoritos($IdFavorito) {
          include ("conexionDB.php");
          $query = "SELECT IdFavorito,IdUsuario,IdSena,IdCategoria FROM favoritos WHERE IdFavorito = $IdFavorito";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if(mysqli_num_rows($resultado)>0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $listas = array(
                              'IdFavorito' => $renglon ['IdFavorito'],
                              'IdUsuario' => $renglon ['IdUsuario'],
                              'IdSena' => $renglon ['IdSena'],
                              'IdCategoria' => $renglon ['IdCategoria']   
                              );
            }
          }
          return  $listas;
        }

        //RETOS
        function ObtenerListaRetos() {
          include ("conexionDB.php");
          $query = "SELECT IdReto,Reto,Puntuacion,Dificultad FROM retos";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if (mysqli_num_rows($resultado) > 0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $lista[] = array(
                              'IdReto' => $renglon ['IdReto'],
                              'Reto' => $renglon ['Reto'],
                              'Puntuacion' => $renglon ['Puntuacion'],
                              'Dificultad' => $renglon ['Dificultad']          
                              );
            }
          }
            return $lista;
        }

        function obtenerDatosRetos($IdReto) {
          include ("conexionDB.php");
          $query = "SELECT IdReto,Reto,Puntuacion,Dificultad FROM retos WHERE IdReto = $IdReto";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if(mysqli_num_rows($resultado)>0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $listas = array(
                              'IdReto' => $renglon ['IdReto'],
                              'Reto' => $renglon ['Reto'],
                              'Puntuacion' => $renglon ['Puntuacion'],
                              'Dificultad' => $renglon ['Dificultad']    
                              );
            }
          }
          return  $listas;
        }

        //CATEGORIAS
        function ObtenerListaCategorias() {
          include ("conexionDB.php");
          $query = "SELECT IdCategoria,Nombre FROM categorias";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if (mysqli_num_rows($resultado) > 0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $lista[] = array(
                                'IdCategoria' => $renglon ['IdCategoria'],
                                'IdSena' => $renglon ['IdSena'],
                                'Nombre' => $renglon ['Nombre'],
                                'NombreSena' => $renglon ['NombreSena']          
                              );
            }
          }
            return $lista;
        }

        function obtenerDatosCategorias($IdCategoria) {
          include ("conexionDB.php");
          $query = "SELECT IdCategoria,Nombre FROM categorias WHERE IdCategoria = $IdCategoria";

          if(!$resultado = mysqli_query($miConexion,$query)) {
            exit(mysqli_error($miConexion));
          }

          $lista = array();

          if(mysqli_num_rows($resultado)>0) {
            while($renglon = mysqli_fetch_assoc($resultado)) {
              $listas = array(
                              'IdCategoria' => $renglon ['IdCategoria'],
                              'Nombre' => $renglon ['Nombre']
                              );
            }
          }
          return  $listas;
        }
?>