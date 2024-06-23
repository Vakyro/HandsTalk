<?php
  if (isset($_GET['error'])) {
    include(NOTUSU); 
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Traductor de lenguaje de señas">
    <meta name="keywords" content="traductor, lenguaje, señas">
    <meta name="author" content="Calderon Castillo Leonado Castañeda Rodriguez Andrea">
    <title>HandStalk | Traductor de lenguaje de señas</title>
    <link rel="shortcut icon" href="<?=IMAGES?>favicon.ico" type="image/x-icon">
    <link rel="icon" href="<?=IMAGES?>favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="<?=CSS?>myStyle.css" /> 
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm/vision_wasm_internal.js" crossorigin="anonymous"></script>
  </head>

	<body>
    <section>
        <div class="flex flex-col justify-center min- py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 class="mt-6 text-3xl font-extrabold text-center text-[#ffec9e]">Admin Panel</h2>
            </div>
            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="px-4 py-8 sm:px-10">
                    <form class="space-y-6" name="formLogin" id="formLogin" action="login/login_process.php" method="POST">
                        <input type="hidden" name="accion" id="accion" value="login" />
                        <div>
                            <label for="user" class="block text-sm font-medium text-gray-700"> Usuario </label>
                            <div class="mt-1">
                                <input id="NombreUsuario" name="txtNombreUsuario" type="text" required="" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
                            </div>
                        </div>
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700"> Contraseña </label>
                            <div class="mt-1">
                                <input id="Contrasena" name="txtContrasena" type="password" autocomplete="current-password" required="" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
                            </div>
                        </div>
                        <div>
                            <button type="submit" name="btnLogin" id="btnLogin" class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-[#8fb2fc] rounded-xl hover:bg-[#df8181] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8fb2fc]">Iniciar Sesion</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
	</body>
</html>