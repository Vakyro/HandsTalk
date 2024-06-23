<?php
	$listaSenas = ObtenerListaSenas();
  $listaUsuarios = ObtenerListaUsuarios();
  $listaCategorias = ObtenerListaCategorias();
?>

<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <form name = "frmFavoritos" id = "frmFavoritos" action = "favoritos/addFavorito.php" method = "POST"  class="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div  class="mb-4 text-2xl leadi pl-50 font-bold text-[#8fb2fc]">
      <span class="text-5xl mr-8"> + Favorito</span>
    </div>

    <div>
      <label for="setIdUsuario" class="sr-only">IdUsuario</label>
      <div class="relative">
        <select name="setIdUsuario" id="setIdUsuario" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400" required>
<?php     foreach($listaUsuarios as $renglon => $campo) { ?>
            <option value="<?=$campo['IdUsuario']?>"><?=$campo['Nombre']?></option>
<?php     } ?>					
        </select>
      </div>
    </div>

    <div>
      <label for="setIdSena" class="sr-only">IdSena</label>
      <div class="relative">
        <select name="setIdSena" id="setIdSena" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400" required>
<?php     foreach($listaSenas as $renglon => $campo) { ?>
            <option value="<?=$campo['IdSena']?>"><?=$campo['Nombre']?></option>
<?php     } ?>					
        </select>
      </div>
    </div>

    <div>
      <label for="setIdCategoria" class="sr-only">IdCategoria</label>
      <div class="relative">
        <select name="setIdCategoria" id="setIdCategoria" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400" required>
<?php     foreach($listaCategorias as $renglon => $campo) { ?>
            <option value="<?=$campo['IdCategoria']?>"><?=$campo['Nombre']?></option>
<?php     } ?>					
        </select>
      </div>
    </div>

    <div class="flex flex-col items-center justify-between">
      <button type="submit" class="inline-block rounded-lg transition-colors bg-[#8fb2fc] hover:bg-[#df8181] duration-500 px-5 py-3 text-sm font-medium text-white" name="btnregistrarFavorito" id="btnregistrarFavorito">
          Guardar
      </button>
    </div>
  </form>
</div>