<?php
  if ($_SESSION['user_session']['Sexo'] == "F") {
    $saludo = "Bienvenida";
  } else {
    $saludo = "Bienvenido";
  }
?>

<section class="">
  <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div class="mx-auto max-w-xl text-center">
      <h1 class="text-3xl font-extrabold sm:text-5xl text-center text-[#8fb2fc]">
        <?=$saludo?>
        <strong class="font-extrabold text-[#ffec9e] sm:block">
          <?=$_SESSION['user_session']['Nombre'];?>
        </strong>
      </h1>
    </div>
  </div>
</section>
