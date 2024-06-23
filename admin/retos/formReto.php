<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <form name = "frmReto" id = "frmReto" action = "retos/addReto.php" method = "POST" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div  class="mb-4 text-2xl leadi pl-50 font-bold text-[#8fb2fc]">
      <span class="text-5xl mr-8"> + Reto</span>
    </div>

    <div>
      <label for="Reto" class="sr-only">Reto</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Reto" name="txtReto" id="txtReto" required/>
      </div>
    </div>

    <div>
      <label for="Puntuacion" class="sr-only">Puntuacion</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Puntuacion" name="txtPuntuacion" id="txtPuntuacion" required/>
      </div>
    </div>

    <div>
      <label for="Dificultad" class="sr-only">Dificultad</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Dificultad" name="txtDificultad" id="txtDificultad" required/>
      </div>
    </div>

    <div class="flex flex-col items-center justify-between">
      <button type="submit" class="inline-block rounded-lg transition-colors bg-[#8fb2fc] hover:bg-[#df8181] duration-500 px-5 py-3 text-sm font-medium text-white" name="btnregistrarReto" id="btnregistrarReto">
          Guardar
      </button>
    </div>
  </form>
</div>