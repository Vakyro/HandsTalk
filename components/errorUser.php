<div id="alertDiv" role="alert" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden custom-fade-in-out">
  <div class="flex items-start gap-2 p-2 bg-white border border-gray-100 rounded-xl sm:p-4">
    <span class="text-red-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 sm:h-6 sm:w-6">
        <circle cx="12" cy="12" r="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 7l10 10M7 17l10-10" />
      </svg>
    </span>
    <div class="flex-1">
      <strong class="block font-medium text-red-600 text-xs sm:text-base">Error al Registrarse</strong>
      <p class="mt-1 text-xs text-red-600 sm:text-sm">
        Ese nombre de usuario ya esta en uso
      </p>
    </div>
    <button onclick="hideAlert()" class="text-gray-500 transition hover:text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 sm:h-6 sm:w-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>

<script type="text/javascript" src="<?=JS?>Noti.js"></script>