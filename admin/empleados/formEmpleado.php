<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <form name="frmEmpleado" id="frmEmpleado" action="empleados/addEmpleado.php" method="POST" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div  class="mb-4 text-2xl leadi pl-50 font-bold text-[#8fb2fc]">
      <span class="text-5xl mr-8"> + Empleado </span>
    </div>

    <div>
      <label for="Apaterno" class="sr-only">Apellido Paterno</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Apellido Paterno" name="txtAPaterno" id="txtAPaterno" required/>
      </div>
    </div>

    <div>
      <label for="Amaterno" class="sr-only">Apellido Materno</label>
      <div class="relative"> 
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Apellido Materno" name="txtAMaterno" id="txtAMaterno" required/>
      </div>
    </div>

    <div>
      <label for="Nombre" class="sr-only">Nombre</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Nombre" name="txtNombre" id="txtNombre" required/>
      </div>
    </div>

    <div>
      <label for="Edad" class="sr-only">Edad</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Edad" name="txtEdad" id="txtEdad" required/>
      </div>
    </div>

    <div>
      <label for="Sexo" class="sr-only">Sexo</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Sexo" name="txtSexo" id="txtSexo" required/>
      </div>
    </div>

    <div>
      <label for="Puesto" class="sr-only">Puesto</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Puesto" name="txtPuesto" id="txtPuesto" required/>
      </div>
    </div>

    <div>
      <label for="Estado" class="sr-only">Estado</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Estado" name="txtEstado" id="txtEstado" required />
      </div>
    </div>

    <div>
      <label for="Usuario" class="sr-only">Usuario</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Usuario" name="txtUsuario" id="txtUsuario" required />
      </div>
    </div>

    <div>
      <label for="Contrasena" class="sr-only">Contrasena</label>
      <div class="relative">
          <input type="text" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Contrasena" name="txtContrasena" id="txtContrasena" required />
      </div>
    </div>

    <div class="flex flex-col items-center justify-between">
      <button type="submit" class="inline-block rounded-lg transition-colors bg-[#8fb2fc] hover:bg-[#df8181] duration-500 px-5 py-3 text-sm font-medium text-white" name="btnregistrarEmpleado" id="btnregistrarEmpleado">
          Guardar
      </button>
    </div>
  </form>
</div>