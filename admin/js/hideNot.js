function hideAlert() {
  var alertDiv = document.getElementById('alertDiv');
  alertDiv.style.opacity = '0';
  setTimeout(function () {
      alertDiv.style.display = 'none';
  }, 500); 
}

function showAnimation() {
  var alertDiv = document.getElementById('alertDiv');
  alertDiv.style.opacity = '1';
  setTimeout(function () {
      alertDiv.style.display = 'block';
  }, 500); 
}

window.onload = showAnimation;