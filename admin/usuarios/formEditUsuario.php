<?php
  $IdUsuario = $_GET['IdUsuario'];
	$listUsuario = obtenerDatosUsuarios($IdUsuario);
?>

<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <form name="frmEditUsuario" id="frmEditUsuario" action="usuarios/updateUsuario.php" method="POST" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div  class="mb-4 text-2xl leadi pl-50 font-bold text-[#8fb2fc] ">
        <span class="text-5xl mr-8 flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-pencil-square mr-2" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
          Usuario
        </span>
      </div>

      <div>
        <label for="IdUsuario" class="sr-only">IdUsuario</label>
        <div class="relative">
            <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" value="<?=$listUsuario['IdUsuario']?>" name="txtIdUsuario" id="txtIdUsuario" readonly/>
        </div>
      </div>

      <div>
        <label for="Apaterno" class="sr-only">Apellido Paterno</label>
        <div class="relative">
            <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" value="<?=$listUsuario['APaterno']?>" name="txtAPaterno" id="txtAPaterno" required/>
        </div>
      </div>

      <div>
        <label for="AMaterno" class="sr-only">Apellido Materno</label>
        <div class="relative">
            <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" value="<?=$listUsuario['AMaterno']?>" name="txtAMaterno" id="txtAMaterno" required/>
        </div>
      </div>

      <div>
        <label for="Nombre" class="sr-only">Nombre</label>
        <div class="relative">
            <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" value="<?=$listUsuario['Nombre']?>" name="txtNombre" id="txtNombre" required/>
        </div>
      </div>

      <div>
        <label for="Edad" class="sr-only">Edad</label>
        <div class="relative">
            <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" value="<?=$listUsuario['Edad']?>" name="txtEdad" id="txtEdad" required/>
        </div>
      </div>

      <div>
        <label for="Region" class="sr-only">Región</label>
        <div class="relative">
            <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" value="<?=$listUsuario['Region']?>" name="txtRegion" id="txtRegion" required/>
        </div>
      </div>

      <div>
        <label for="Usuario" class="sr-only">Usuario</label>
        <div class="relative">
            <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" value="<?=$listUsuario['Usuario']?>" name="txtUsuario" id="txtUsuario" required/>
        </div>
      </div>

      <div>
        <label for="Contrasena" class="sr-only">Contrasena</label>
        <div class="relative">
            <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" value="<?=$listUsuario['Contrasena']?>" name="txtContrasena" id="txtContrasena" required />
        </div>
      </div>

      <div class="flex flex-col items-center justify-between">
        <button type="submit" class="inline-block rounded-lg px-5 py-3 text-sm font-medium text-white transition-colors bg-[#8fb2fc] hover:bg-[#df8181] duration-500" name="btnEditUsuario" id="btnEditUsuario">
            Guardar
        </button>
      </div>
  </form>
</div>