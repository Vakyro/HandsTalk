<?php
	$listaSenas = ObtenerListaSenas();
?>

<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <form name = "frmConsejo" id = "frmConsejo" action = "consejos/addConsejo.php" method = "POST" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div  class="mb-4 text-2xl leadi pl-50 font-bold text-[#8fb2fc]">
      <span class="text-5xl mr-8"> + Consejo</span>
    </div>

    <div>
      <label for="setIdSena" class="sr-only">IdSena</label>
      <div class="relative">
        <select name="setIdSena" id="setIdSena" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400" required>
<?php     foreach($listaSenas as $renglon => $campo) { ?>
            <option value="<?=$campo['IdSena']?>"><?=$campo['Nombre']?></option>
<?php     }   ?>					
        </select>
      </div>
    </div>

    <div>
      <label for="texto" class="sr-only">Texto</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Texto" name="txtTexto" id="txtTexto" required/>
      </div>
    </div>

    <div>
      <label for="Porcentaje" class="sr-only">Porcentaje</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Porcentaje" name="txtPorcentaje" id="txtPorcentaje" required/>
      </div>
    </div>

    <div class="flex flex-col items-center justify-between">
      <button type="submit" class="inline-block rounded-lg transition-colors bg-[#8fb2fc] hover:bg-[#df8181] duration-500 px-5 py-3 text-sm font-medium text-white" name="btnregistrarConsejo" id="btnregistrarConsejo">
          Guardar
      </button>
    </div>
  </form>
</div>