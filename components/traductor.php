<?php
  if (isset($_GET['mensaje'])) {
    include(SENAGUAR); 
  }
  if($accion == "error"){
    include(NIS);
  }
?>
<div class="text-center py-24 flex flex-col items-center" id="liveView">
  <div class="mb-4">
    <button type="button" onclick="init()" class="mdc-button mdc-button--raised mx-auto px-5 py-2.5 text-sm font-medium text-white bg-[#8fb2fc] hover:bg-[#df8181] transition-colors duration-500 focus:ring-1 focus:outline-none focus:ring-[#3873A6] rounded-lg text-center drop-shadow-md">
      <span class="mdc-button__ripple"></span>
      <span class="mdc-button__label" id="cameratext"></span>
    </button>
  </div>
  <div class="relative inline-block" id="webcamContainer">
    <div class="relative rounded-lg overflow-hidden bg-white">
      <div class="aspect-w-16 aspect-h-9 border-8 border-[#ffec9e] rounded-lg drop-shadow-md ">
        <div id="webcam-container" class="w-[100%] h-[50%] "></div>
        <div id="overlay" class="absolute inset-0 bg-gray-700 opacity-50 hidden grayscale py-2 px-2"></div>
      </div>
    </div>

    <canvas class="output_canvas absolute left-0 top-0 transform -scale-x-100 w-64 h-36 sm:h-16 drop-shadow-md hidden" id="output_canvas"></canvas>
    <div id="label-container" class="output pt-4 text-[#8fb2fc] font-bold rounded-md drop-shadow-md"></div>
    <div class="flex justify-center">
      <?php if(isset($_SESSION['Cient_session'])){ ?>
        <button id="saveGestureButton" type="button" class="p-4 flex items-center text-[#8fb2fc] hover:text-[#df8181] active:text-[#df8181] transition-colors duration-500 drop-shadow-md" onclick="savePrediction()">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-heart-fill " viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>
        </button>
      <?php } ?>
      <button type="button" class="p-4 flex items-center text-[#8fb2fc] hover:text-[#df8181] active:text-[#df8181] transition-colors duration-500 drop-shadow-md" onclick="pauseTraductor()">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
          </svg>
      </button>
      <button type="button" class="md:hidden p-4 flex items-center text-[#8fb2fc] hover:text-[#df8181] active:text-[#df8181] transition-colors duration-500 drop-shadow-md" onclick="switchCamera()">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="28" height="28 fill="currentColor" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
          <path d="M2415 5109 c-898 -44 -1727 -586 -2132 -1394 -143 -285 -229 -570 -263 -880 -13 -116 -13 -434 0 -550 65 -582 322 -1119 734 -1530 406 -405 913 -653 1491 -730 243 -32 582 -18 838 35 387 79 779 266 1094 521 100 81 281 262 362 362 308 381 508 859 560 1339 14 125 14 431 0 556 -92 855 -623 1619 -1388 2002 -411 205 -828 292 -1296 269z m465 -784 c573 -103 1059 -474 1311 -1000 65 -136 80 -189 69 -240 -20 -90 -56 -112 -265 -164 -240 -58 -254 -53 -360 148 -87 164 -134 228 -246 336 -152 147 -329 246 -537 301 -120 32 -326 43 -452 25 -238 -35 -470 -146 -648 -308 l-64 -58 111 -78 c120 -85 141 -107 141 -149 0 -63 -13 -69 -452 -182 -225 -58 -421 -106 -437 -106 -60 0 -118 36 -146 91 -9 17 -25 172 -46 462 -30 409 -31 437 -15 461 18 28 54 41 89 32 13 -3 74 -42 135 -86 62 -44 115 -80 119 -80 3 0 56 48 117 108 287 277 620 441 1016 498 127 18 432 12 560 -11z m1247 -2066 c35 -13 70 -45 89 -81 9 -18 24 -166 45 -461 31 -411 31 -437 16 -461 -19 -29 -55 -41 -91 -32 -13 3 -73 42 -134 86 -61 44 -114 80 -118 80 -4 0 -55 -46 -113 -103 -200 -194 -381 -310 -626 -402 -919 -344 -1937 100 -2310 1005 -45 112 -31 197 43 246 47 32 350 105 394 95 76 -17 95 -38 163 -178 153 -316 436 -547 783 -639 120 -32 326 -43 452 -25 237 35 473 147 648 308 l64 58 -112 80 c-122 86 -140 105 -140 147 0 63 14 69 445 181 220 58 417 106 437 106 20 1 49 -4 65 -10z"/>
        </g>
      </svg>
      </button>
      <?php if(isset($_SESSION['Cient_session'])){ ?>
        <button class="p-2 flex items-center text-[#8fb2fc] hover:text-[#df8181] active:text-[#df8181] transition-colors duration-500 drop-shadow-md" onclick="Hablar()">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89z"/>
            <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
          </svg>
        </button>
      <?php } ?>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>
<script type="text/javascript" src="<?=JS?>traductor.js"></script>
