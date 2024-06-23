<?php
$conn = mysqli_connect('localhost','root','','handstalk');

if(isset($_POST['buscar'])){
    $texto = $_POST['texto'];
    $letras = str_split($texto); // Dividir el texto en un array de letras

    // Inicializar un array para almacenar las imágenes encontradas
    $imagenes = array();

    // Iterar sobre cada letra y buscarla en la base de datos
    foreach ($letras as $letra) {
        $Sentenciasql = "SELECT Imagen FROM senas WHERE Nombre = '$letra'";
        $result = mysqli_query($conn, $Sentenciasql);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $imagenes[] = $row['Imagen']; // Agregar la imagen encontrada al array
        }
    }
}
?>

<div class="mt-10 pt-5 flex items-center justify-center h-[100%] ">
  <form action="" method="post">  
    <div class="bg-white border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm max-w-[400px] drop-shadow-md">
      <textarea name="texto" placeholder="Hola....." class="bg-gray-100 bg-opacity-50 border border-gray-300 focus:border-[#ffec9e] focus:bg-white focus:ring-2 focus:ring-[#ffec9e] h-36 placeholder:text-slate-600 placeholder:opacity-50 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 text-base  text-gray-700 py-1 px-3 leading-6 transition-colors ease-in-out drop-shadow-md"></textarea>
      <?php
      // Verificar si se encontraron imágenes
      if (!empty($imagenes)) {
          // Mostrar las imágenes encontradas
          echo "<div class='flex flex-wrap justify-center col-span-6'>";
          foreach ($imagenes as $imagen) {
              echo "<img src='" . IMAGES . $imagen . "' alt='Imagen' class='h-20 w-auto'>";
          }
          echo "</div>";
      }
      ?>
      <div class="flex justify-center col-span-6 text-white">
        <button type="submit" name="buscar" class="text-white mt-4 rounded-full bg-[#8fb2fc] hover:bg-[#df8181] font-semibold transition-colors duration-500 drop-shadow-md stroke-slate-600 border flex justify-center p-2 border-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bi bi-arrow-left-right font-bold text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </button>
      </div>
    </div>
  </form>
</div>
