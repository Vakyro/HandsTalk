<div id="popup-modal" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 rounded-lg sm:p-5 md:w-[90%] bg-[#3873A6] text-white hidden">
  <button class="absolute top-2 right-2 text-white hover:text-gray-200 transform duration-300" onclick="hideLogin()">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  </button>
  <div class="mb-8 text-center">
    <h1 class="my-3 text-4xl font-bold">Inicia Sesion</h1>
    <p class="text-sm">Inicia Sesion con tu Cuenta</p>
  </div>

  <form name="formLogin" id="formLogin" action="login/login_process.php" method="POST" class="space-y-12">
    <input type="hidden" name="accion" id="accion" value="login" />
    <div class="space-y-4">
      <div>
        <label for="usuario" class="block mb-2 text-sm">Usuario</label>
        <input id="NombreUsuario" name="txtNombreUsuario" type="text" required="" placeholder="Vakyro123_" class="w-full px-3 py-2 border rounded-md border-white bg-[#3873A6] text-white placeholder-white">
      </div>
      <div>
        <label for="Contraseña" class="text-sm">Contraseña</label>
        <input id="Contrasena" name="txtContrasena" type="password" autocomplete="current-password" required="" placeholder="*****" class="w-full px-3 py-2 border rounded-md border-white bg-[#3873A6] text-white placeholder-white">
      </div>
    </div>
    <div class="space-y-2">
      <div>
        <button type="submit" name="btnLogin" id="btnLogin" class="w-full px-8 py-3 font-semibold rounded-md bg-[#ffec9e] text-[#3873A6] hover:bg-[#df8181] transform duration-500">Iniciar Sesion</button>
      </div>
      <p class="px-6 text-sm text-center">No tienes cuenta?
        <a rel="noopener noreferrer" href="login/formsingin.php" class="hover:underline text-[#ffec9e]">Regístrate</a>.
      </p>
    </div>
  </form>
</div>

<script type="text/javascript" src="<?=JS?>loginAnimation.js"></script>