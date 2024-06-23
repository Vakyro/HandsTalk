<?php
  $listaFavoritos = ObtenerListaFavoritosPorUsuario($_SESSION['Cient_session']['IdUsuario']);
?>
<div id="drawer-navigation" class="border-y border-l border-[#3873A6] fixed top-0 right-0 z-40 w-64 h-[70%] mt-[8%] p-4 overflow-y-auto transition-transform translate-x-full bg-white rounded-lg rounded-r-none" tabindex="-1" aria-labelledby="drawer-navigation-label">
  <h5 id="drawer-navigation-label" class="text-base font-semibold text-[#ffec9e] uppercase text-center">Señas Guardadas</h5>
  <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:text-[#df8181] transition-colors duration-500 rounded-lg text-sm p-1.5 absolute top-2.5 left-2.5 inline-flex items-center" onclick="toggleMenu()">
    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
  </button>
  <div class="py-4 overflow-y-auto">
    <ul class="space-y-2 font-medium">
      <?php
          foreach($listaFavoritos as $renglon => $campo) { 
            $datosSena = obtenerDatosSenas($campo['IdSena']);
            if ($datosSena['Nombre'] == "" || $datosSena['Imagen'] == ""){
            }else{
      ?>
            <li>
              <div class="text-[#3873A6] py-5 hover:text-[#df8181] font-bold transition-colors duration-700 flex items-center p-2  border-b border-[#3873A6] group">
                <span class="flex-1 ml-3 whitespace-nowrap text-[#8fb2fc]"><?=$datosSena['Nombre']?></span>
                <img class="flex-1 ml-3 whitespace-nowrap text-[#8fb2fc] w-3 h-auto" src="<?=IMAGES?><?=$datosSena['Imagen']?>">
              </div>
            </li>
      <?php 
          }
        } 
      ?>
    </ul>
  </div>
</div>
