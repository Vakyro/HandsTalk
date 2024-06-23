<?php
	$listaSenas = ObtenerListaSenas();
  $listaUsuarios = ObtenerListaUsuarios();
  $listaCategorias = ObtenerListaCategorias();
  $IdFavorito = $_GET['IdFavorito'];
	$listFavorito = obtenerDatosFavoritos($IdFavorito);
?>

<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <form name = "frmEditFavoritos" id = "frmEditFavoritos" action = "favoritos/updateFavorito.php" method = "POST"  class="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div  class="mb-4 text-2xl leadi pl-50 font-bold text-[#8fb2fc]">
      <span class="text-5xl mr-8 flex"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-pencil-square mr-2" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        Favorito
      </span>
    </div>

    <div>
      <label for="IdFavorito" class="sr-only">IdFavorito</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" value="<?=$listFavorito['IdFavorito']?>" name="txtIdFavorito" id="txtIdFavorito" readonly/>
      </div>
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
<?php     }  ?>					
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
      <button type="submit" class="inline-block rounded-lg transition-colors bg-[#8fb2fc] hover:bg-[#df8181] duration-500 px-5 py-3 text-sm font-medium text-white" name="btnEditFavorito" id="btnEditFavorito">
          Guardar
      </button>
    </div>
  </form>
</div>