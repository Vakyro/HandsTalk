let Camara = 1;
let cameratext = "Encender Cámara"
const URL = "https://teachablemachine.withgoogle.com/models/bgfCH4MRY/";
let model, webcam, labelContainer, maxPredictions;
let lastPrediction = "";
let isPaused = false;
let facingMode = 'user';
let Altura, Anchura;
document.getElementById("cameratext").textContent = cameratext;

// Función para detectar si estamos en un dispositivo móvil
function esDispositivoMovil() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

if (esDispositivoMovil()) {
  Altura = 200;
  Anchura = 300;
} else {
  Altura = 370;
  Anchura = 550;
}

document.addEventListener('DOMContentLoaded', function() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    tmImage.load(modelURL, metadataURL)
    .then((loadedModel) => {
        model = loadedModel;
        maxPredictions = model.getTotalClasses();
    })
    .catch(error => {
        console.error('Error al cargar el modelo:', error);
    });
});

function savePrediction() {
  var predictionValue = lastPrediction;

  fetch('components/Guardar_Sena.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'lastPrediction=' + encodeURIComponent(predictionValue),
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
      if (predictionValue.trim() !== "") {
        window.location.href = 'components/Guardar_Sena.php?lastPrediction=' + encodeURIComponent(predictionValue);
      } else {
        console.error('La variable predictionValue está vacía.');
      }
  })
  .catch(error => {
    console.error('Error al enviar la predicción:', error);
  });
}

function init() {
  if (Camara == 1) {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    tmImage.load(modelURL, metadataURL)
    .then((loadedModel) => {
      model = loadedModel;
      maxPredictions = model.getTotalClasses();
      const flip = true;
      webcam = new tmImage.Webcam(Anchura, Altura, flip);
      return webcam.setup();
    })
    .then(() => webcam.play())
    .then(() => {
      window.requestAnimationFrame(loop);
      document.getElementById("webcam-container").appendChild(webcam.canvas);
      labelContainer = document.getElementById("label-container");
      for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
      }
      Camara = 2;
      cameratext = "Apagar Cámara";
      document.getElementById("cameratext").textContent = cameratext;
    })
    .catch(error => {
      console.error('Error al inicializar la cámara:', error);
    });
  } else {
    location.reload();
  }
}

function pauseTraductor() {
  if (!isPaused) {
      // Congelar la imagen
      freezeImage();
      // Indicar que la imagen está congelada
      isPaused = true;
  } else {
      // Reanudar el video
      webcam.play();
      // Ocultar la capa de superposición
      document.getElementById('overlay').classList.add('hidden');
      // Indicar que la imagen no está congelada
      isPaused = false;
  }
}

function freezeImage() {
  // Mostrar la capa de superposición
  document.getElementById('overlay').classList.remove('hidden');
  
  // Aplicar el filtro de escala de grises a la capa de superposición
  document.getElementById('overlay').style.filter = 'grayscale(100%)';
  
  // Pausar el video para congelar la imagen
  webcam.pause();
}

function switchCamera() {
  // Verificar si la cámara está activa
  if (webcam && webcam.stream) {
    // Obtener la pista de video actual
    const videoTrack = webcam.stream.getVideoTracks()[0];
    // Obtener el modo de enfoque actual
    const currentFacingMode = videoTrack.getSettings().facingMode;

    // Cambiar el modo de enfoque a 'user' si actualmente es 'environment', y viceversa
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

    // Obtener las restricciones actuales de la cámara
    const constraints = {
      video: {
        facingMode: newFacingMode
      }
    };

    // Detener el stream actual de la cámara
    webcam.pause();
    videoTrack.stop();

    // Obtener un nuevo stream con las nuevas restricciones
    navigator.mediaDevices.getUserMedia(constraints)
      .then(newStream => {
        // Asignar el nuevo stream a la webcam
        webcam.stream = newStream;
        // Volver a iniciar la webcam
        webcam.play();
      })
      .catch(error => {
        console.error('Error al cambiar la cámara:', error);
      });
  } else if (webcam && webcam.webcamList.length > 1) {
    // Detener la cámara actual
    webcam.pause();

    // Cambiar al siguiente dispositivo de cámara
    webcam.setCamera(--webcam.activeCamera);

    // Reiniciar la cámara con la nueva configuración
    webcam.play();
  } else {
    console.error('No se encontraron múltiples cámaras disponibles.');
  }
}


function loop() {
  webcam.update();
  predict();
  window.requestAnimationFrame(loop);
}

function predict() {
  model.predict(webcam.canvas)
  .then(prediction => {
    let maxIndex = 0;
    let maxProbability = 0;
    for (let i = 0; i < maxPredictions; i++) {
      if (prediction[i].probability > maxProbability) {
        maxProbability = prediction[i].probability;
        maxIndex = i;
      }
    }
    const classPrediction = prediction[maxIndex].className + ": " + maxProbability.toFixed(2);
    labelContainer.innerHTML = classPrediction;
    lastPrediction = classPrediction.slice(0, -6);
  })
  .catch(error => {
    console.error('Error al realizar la predicción:', error);
  });
}

function Hablar(){
  decir(lastPrediction);
}

function decir(texto){
  texto = texto.toLowerCase();
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(texto);
  utterThis.lang = 'es-ES';
  synth.speak(utterThis);
}