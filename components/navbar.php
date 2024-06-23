<?php 
  include(FRMLOG);
  if(isset($_SESSION['Cient_session'])) {   
    include(FAV);
    include(PERFIL);
  }
?>

<header class="bg-white w-full pt-2 fixed top-0 left-0 right-0 z-50">
  <div class="mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between border-b-2 border-[75%] py-4 pb-5">
      <a class="flex-1 md:flex md:items-center md:gap-12 max-w-16" href="<?=ROOTURL?>">
        <img class="w-auto h-14 drop-shadow-md" src="<?=IMAGES?>image.png" alt="Logo">
      </a>
      <div class="md:flex md:items-center md:gap-4">
        <nav aria-label="Global" class="hidden md:block">
          <ul class="flex items-center gap-1 text-sm">
            <li><a class="text-[#8fb2fc] hover:text-[#df8181] font-bold px-4 py-3 transition-colors duration-700 rounded-md hover:bg-black/5 drop-shadow-md" href = "<?=ROOTURL?>?accion=Traductor2">Texto a Seña</a></li>
            <li><a class="text-[#8fb2fc] hover:text-[#df8181] font-bold px-4 py-3 transition-colors duration-700 rounded-md hover:bg-black/5 drop-shadow-md" href = "<?=ROOTURL?>?accion=Nosotros">Nosotros</a></li>
          </ul>
        </nav>
        <div class="flex items-center gap-4">
            <div class="hidden md:flex md:gap-4">
              <?php if(isset($_SESSION['Cient_session'])) { ?>
                <button class="relative w-10 h-10 cursor-pointer text-[#8fb2fc] filter drop-shadow-md" onclick="toggleMenu()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-bookmark-heart-fill transition-colors duration-500 hover:text-[#df8181]" viewBox="0 0 16 16">
                    <path class="shadow" d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                  </svg>
                </button>
              <?php } ?>
              <?php if(isset($_SESSION['Cient_session'])) { ?>
                <a class="rounded-md bg-[#8fb2fc] hover:bg-[#df8181] font-semibold transition-colors duration-500 px-7 py-2.5 text-sm text-white drop-shadow-md" href="<?=ROOTURL?>login/logout.php">
                  Cerrar sesión
                </a>
              <?php } ?>
            </div>
            <?php if(!isset($_SESSION['Cient_session'])) { ?>
              <div class="sm:flex sm:gap-4">
                <button class=" rounded-md bg-[#8fb2fc] hover:bg-[#df8181] font-semibold transition-colors duration-500 px-7 py-2.5 text-sm  text-white drop-shadow-md" onclick="toggleLogin()">
                  Inicia Sesion
                </button>
              </div>
            <?php } ?>
            <div class="block md:hidden z-30">
              <nav class="text-[#3873A6] Nav hidden mobile-menu md:hidden fixed left-0 top-0 w-[50%] h-full border-r border-[#3873A6] bg-white ease-in-out duration-300 transform -translate-x-full animate-fade-right animate-once text-center items-center align-middle">
                <div class="w-full text-center">
                  <div class="mt-6 flex justify-center items-center ">
                    <img class="w-auto h-24 drop-shadow-md" src="<?=IMAGES?>image.png" alt="Logo">
                  </div>
                </div>
                <ul class="[&>li]:p-4 [&>li]:border-b [&>li]:border-[#3873A6] p-4 uppercase mb-5">
                  <li><a class="text-[#8fb2fc] hover:text-[#df8181] font-bold transition-colors duration-700 text-sm" href="<?=ROOTURL?>?accion=Traductor2">Texto a seña</a></li>
                  <li><a class="text-[#8fb2fc] hover:text-[#df8181] font-bold transition-colors duration-700 text-sm" href="<?=ROOTURL?>?accion=Nosotros">Nosotros</a></li>
                  <?php if(isset($_SESSION['Cient_session'])) { ?>
                    <li><button class="text-[#8fb2fc] hover:text-[#df8181] font-bold transition-colors duration-700 text-sm uppercase" onclick="toggleFavMenu()">Favoritos</button></li>
                  <?php } ?>
                </ul>
                <?php if(isset($_SESSION['Cient_session'])) { ?>
                  <a class="rounded-md bg-[#8fb2fc] hover:bg-[#df8181] font-semibold transition-colors duration-500 px-7 py-2.5 text-sm text-white drop-shadow-md" href="<?=ROOTURL?>login/logout.php">Cerrar sesión</a>
                <?php } ?>
              </nav>
              <button class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 relative mobile-menu-button">
                <svg xmlns="http://www.w3.org/2000/svg" id="o" class="h-5 w-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="x" class="h-5 w-5 icon hidden" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
              </button>
            </div>
            <?php include(FMM) ?>
        </div>
      </div>
    </div>
  </div>
</header>

<script type="text/javascript" src="<?=JS?>NavbarMobil.js"></script>
<script type="text/javascript" src="<?=JS?>favMenu.js"></script>
