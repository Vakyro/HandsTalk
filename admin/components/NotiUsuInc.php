<div id="alertDiv" role="alert" class="anim rounded-xl border border-gray-100 bg-white p-4 w-[34%] mx-auto mt-5">
  <div class="flex items-start gap-4">
    <span class="text-red-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
        <circle cx="12" cy="12" r="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 7l10 10M7 17l10-10" />
      </svg>
    </span>
    <div class="flex-1">
      <strong class="block font-medium text-gray-900"> Usuario Incorrecto </strong>
      <p class="mt-1 text-sm text-gray-700">
        Parece que el usuario que proporcionaste no existe
      </p>
    </div>
    <button onclick="hideAlert()" class="text-gray-500 transition hover:text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>

<script type="text/javascript" src="<?=JS?>hideNot.js"></script>