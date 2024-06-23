<div id="drawer-navigation" class="border-r border-[#3873A6] fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white" tabindex="-1" aria-labelledby="drawer-navigation-label">
  <h5 id="drawer-navigation-label" class="text-base font-semibold text-[#ffec9e] uppercase">Menu</h5>

  <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:text-[#df8181] transition-colors duration-500  rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" onclick="hideMenu()">
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
  </button>

  <div class="py-4 overflow-y-auto">
    <ul class="space-y-2 font-medium">
<?php if($_SESSION['user_session']['Puesto'] == "SuperAdmin"  || $_SESSION['user_session']['Puesto'] == "Jefe" || $_SESSION['user_session']['Puesto'] == "Admin" || $_SESSION['user_session']['Puesto'] == "Supervisor"  || $_SESSION['user_session']['Puesto'] == "Secretario"){ ?>
        <li>
          <a href="<?=ROOTURL?>?accion=verlistaUsuarios" class="text-[#3873A6] py-5 hover:text-[#df8181] font-bold transition-colors duration-700 flex items-center p-2 border-b border-[#3873A6] group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
            </svg>
            <span class="ml-3 text-[#8fb2fc]">Usuarios</span>
          </a>
        </li>
<?php } ?>

<?php if($_SESSION['user_session']['Puesto'] == "SuperAdmin" || $_SESSION['user_session']['Puesto'] == "Diseñador" || $_SESSION['user_session']['Puesto'] == "Admin"  || $_SESSION['user_session']['Puesto'] == "Secretario"){ ?>
        <li>
          <a href="<?=ROOTURL?>?accion=verlistaSenas" class="text-[#3873A6] py-5 hover:text-[#df8181] font-bold transition-colors duration-700 flex items-center p-2 border-b border-[#3873A6] group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-index-thumb-fill" viewBox="0 0 16 16">
              <path d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716.075.09.141.175.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0z"/>
            </svg>
            <span class="ml-3 text-[#8fb2fc]">Señas</span>
          </a>
        </li>
<?php } ?>

<?php if($_SESSION['user_session']['Puesto'] == "SuperAdmin" || $_SESSION['user_session']['Puesto'] == "Jefe"  || $_SESSION['user_session']['Puesto'] == "Supervisor"){ ?>
        <li>
          <a href="<?=ROOTURL?>?accion=verlistaEmpleados" class="text-[#3873A6] py-5 hover:text-[#df8181] font-bold transition-colors duration-700 flex items-center p-2 border-b border-[#3873A6] group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge-fill" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"/>
            </svg>
            <span class="ml-3 text-[#8fb2fc]">Empleados</span>
          </a>
        </li>
<?php } ?>

<?php if($_SESSION['user_session']['Puesto'] == "SuperAdmin" || $_SESSION['user_session']['Puesto'] == "Diseñador" || $_SESSION['user_session']['Puesto'] == "Admin"){ ?>
        <li>
          <a href="<?=ROOTURL?>?accion=verlistaCategorias" class="text-[#3873A6] py-5 hover:text-[#df8181] font-bold transition-colors duration-700 flex items-center p-2 border-b border-[#3873A6] group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
              <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap text-[#8fb2fc]">Categorias</span>
          </a>
        </li>
<?php } ?>

<?php if($_SESSION['user_session']['Puesto'] == "SuperAdmin" || $_SESSION['user_session']['Puesto'] == "Admin"  || $_SESSION['user_session']['Puesto'] == "Secretario"){ ?>
        <li>
          <a href="<?=ROOTURL?>?accion=verlistaConsejos" class="text-[#3873A6] py-5 hover:text-[#df8181] font-bold transition-colors duration-700 flex items-center p-2 border-b border-[#3873A6] group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cone-striped" viewBox="0 0 16 16">
              <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap text-[#8fb2fc]">Consejos</span>
          </a>
        </li>
<?php } ?>

<?php if($_SESSION['user_session']['Puesto'] == "SuperAdmin" || $_SESSION['user_session']['Puesto'] == "Admin"){ ?>
        <li>
          <a href="<?=ROOTURL?>?accion=verlistaFavoritos" class="text-[#3873A6] py-5 hover:text-[#df8181] font-bold transition-colors duration-700 flex items-center p-2 border-b border-[#3873A6]  group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">
              <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>
              <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap text-[#8fb2fc]">Favoritos</span>
          </a>
        </li>
<?php } ?>

<?php if($_SESSION['user_session']['Puesto'] == "SuperAdmin" || $_SESSION['user_session']['Puesto'] == "Admin"){ ?>
        <li>
          <a href="<?=ROOTURL?>?accion=verlistaRetos" class="text-[#3873A6] py-5 hover:text-[#df8181] font-bold transition-colors duration-700 flex items-center p-2 border-b border-[#3873A6] group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wrench-adjustable" viewBox="0 0 16 16">
              <path d="M16 4.5a4.492 4.492 0 0 1-1.703 3.526L13 5l2.959-1.11c.027.2.041.403.041.61Z"/>
              <path d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.49 4.49 0 0 0 11.5 9Zm-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376ZM3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap text-[#8fb2fc]">Retos</span>
          </a>
        </li>
<?php } ?>

      <li>
        <a href="<?=ROOTURL?>login/logout.php" class="text-[#3873A6] py-5 hover:text-[#df8181] font-bold transition-colors duration-700 flex items-center p-2  border-b border-[#3873A6] group">
          <svg class="flex-shrink-0 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
          </svg>
          <span class="flex-1 ml-3 whitespace-nowrap text-[#8fb2fc]">Cerrar Sesion</span>
        </a>
      </li>
    </ul>
  </div>
</div>

<script type="text/javascript" src="<?=JS?>navbar.js"></script>