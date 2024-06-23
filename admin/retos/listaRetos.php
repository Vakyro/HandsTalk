<?php
  $listaRetos = ObtenerListaRetos();
  if (isset($_GET['mensaje'])) {
    include(NOTIACT); 
  }
  if (isset($_GET['mensaje2'])) {
    include(NOTIADD); 
  }
  if (isset($_GET['Error'])) {
    include(ERROR); 
  }
  if (isset($_GET['eliminar'])) {
    include(DELETES);
  }
  if (isset($_GET['notDelete'])) {
    include(NOTIDELETE);
  }

  $Tabla = "retos";
  $Id = "IdReto";
  $Accion = "verlistaRetos";
?>

<div class="mb-4 text-2xl leadi pl-56 font-bold text-[#8fb2fc]">
  <h2 class="flex items-center">
    <span class="text-5xl mr-8">Retos</span>
    <a href="<?=ROOTURL?>?accion=formReto" class="inline-block pt-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-plus-circle text-[#8fb2fc] hover:text-[#df8181] transition-colors duration-500" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </a>
  </h2>
  <?php include(FILTRO); ?>
</div>

<div class="w-[70%] relative overflow-x-auto shadow-md sm:rounded-lg mx-auto mb-16">
  <table class="w-full text-xs text-gray-700 uppercase bg-gray-50 ">
    <thead class="text-xs text-white uppercase bg-[#8fb2fc]">
      <tr>
        <th scope="col" class="px-6 py-3">
          IdReto
        </th>
        <th scope="col" class="px-6 py-3">
          Reto
        </th>
        <th scope="col" class="px-6 py-3">
          Puntuacion
        </th>
        <th scope="col" class="px-6 py-3">
          Dificultad
        </th>
        <th colspan="3" scope="col" class="px-6 py-3">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody>
<?php foreach ($listaRetos as $renglon => $campo) { ?>
        <tr class="bg-white border-b font-bold text-[#8fb2fc] hover:text-[#5077ca] transition-colors duration-700 cursor-default text-center">			
          <th class="Objeto" scope="row" class="px-6 py-4 font-medium whitespace-nowrap ">
            <?= $campo['IdReto'] ?>
          </th>
          <td class="px-6 py-4">
            <?= $campo['Reto'] ?>
          </td>
          <td class="px-6 py-4">
            <?= $campo['Puntuacion'] ?>
          </td>
          <td class="px-6 py-4">
            <?= $campo['Dificultad'] ?>
          </td>
          <td class="px-6 py-4 text-right text-" colspan="2">
            <a href="<?=ROOTURL?>?accion=formEditReto&IdReto=<?=$campo['IdReto']?>" class=" text-[#8fb2fc] hover:text-[#df8181] transition-colors duration-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </a>
          </td>
          <td class="px-6 py-4 text-right " colspan="2">
            <button type="button" onclick="toggleDeleteModal()"  class=" text-[#8fb2fc] hover:text-[#df8181] transition-colors duration-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg>
            </button>
            <?php $Objeto = $campo['IdReto']; ?>
          </td>
        </tr>
<?php } ?>
    </tbody>
  </table>
</div>

<?php include(POPUP); ?>


