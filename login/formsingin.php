<?php
    include("../configuracion.php");
    $accion = (isset($_GET['accion'])) ? $_GET['accion'] : null;
    if($accion == "ErrorUser"){
      include(NEU);
    }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HandStalk | Traductor de lenguaje de señas</title>
    <link rel="shortcut icon" href="<?=IMAGES?>favicon.ico" type="image/x-icon">
    <link rel="icon" href="<?=IMAGES?>favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="<?=CSS?>myStyle.css" /> 
    <script src="https://cdn.tailwindcss.com"></script>
  </head>

  <body class="bg-[#8fb2fc]">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl text-white">Crea una cuenta</h1>
        <p class="mt-4 text-gray-500">
          Crea una cuenta para ponerte en contacto con nosotros!
        </p>
      </div>

      <form name="frmRegistro" id="frmRegistro" action="registrarUsuario.php" method="POST" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label for="APaterno" class="sr-only">Apellido Paterno</label>
          <div class="relative">
            <input name="txtAPaterno" id="txtAPaterno" type="text" class="w-full rounded-lg border-white p-4 pe-12 text-sm shadow-sm" placeholder="Apellido Paterno" />
          </div>
        </div>

        <div>
          <label for="AMaterno" class="sr-only">Apellido Materno</label>
          <div class="relative">
            <input name="txtAMaterno" id="txtAMaterno" type="text" class="w-full rounded-lg border-white p-4 pe-12 text-sm shadow-sm" placeholder="Apellido Materno" />
          </div>
        </div>

        <div>
          <label for="Nombre" class="sr-only">Nombre</label>
          <div class="relative">
            <input name="txtNombre" id="txtNombre" type="text" class="w-full rounded-lg border-white p-4 pe-12 text-sm shadow-sm" placeholder="Nombre" />
          </div>
        </div>

        <div>
          <label for="Edad" class="sr-only">Edad</label>
          <div class="relative">
            <input name="txtEdad" id="txtEdad" type="text" class="w-full rounded-lg border-white p-4 pe-12 text-sm shadow-sm" placeholder="Edad" />
          </div>
        </div>

        <div>
          <label for="Nombre de Usuario" class="sr-only">Nombre de Usuario</label>
          <div class="relative">
            <input name="txtUsuario" id="txtUsuario" type="text" class="w-full rounded-lg border-white p-4 pe-12 text-sm shadow-sm" placeholder="Nombre de Usuario" />
          </div>
        </div>

        <div>
          <label for="Contraseña" class="sr-only">Contraseña</label>
          <div class="relative">
            <input name="txtContrasena" id="txtContrasena" type="text" class="w-full rounded-lg border-white p-4 pe-12 text-sm shadow-sm" placeholder="Contraseña" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-500">
            Ya tienes una?
            <a href="<?=ROOTURL?>" class="underline text-[#ffec9e]" href="">Regresa al inicio</a>
          </p>
          <button type="submit" class="inline-block rounded-lg bg-[#3873A6] px-5 py-3 text-sm font-medium text-white hover:bg-[#ffec9e] hover:text-[#3873A6] transform duration-500" name="btnregistrarUsuario" id="btnregistrarUsuario">
            Sign in
          </button>
        </div>
      </form>
    </div>
	</body>
</html>
