<?php
	$listaSenas = ObtenerListaSenas();
?>

<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <form name = "frmCategoria" id = "frmCategoria" action = "categorias/addCategoria.php" method = "POST" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div  class="mb-4 text-2xl leadi pl-50 font-bold text-[#8fb2fc]">
      <span class="text-5xl mr-8"> + Categoría</span>
    </div>

    <div>
      <label for="Nombre" class="sr-only">Nombre</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Nombre" name="txtNombre" id="txtNombre" required/>
      </div>
    </div>

    <div class="flex flex-col items-center justify-between">
      <button type="submit" class="inline-block rounded-lg transition-colors bg-[#8fb2fc] hover:bg-[#df8181] duration-500 px-5 py-3 text-sm font-medium text-white" name="btnregistrarCategoria" id="btnregistrarCategoria">
          Guardar
      </button>
    </div>
  </form>
</div>