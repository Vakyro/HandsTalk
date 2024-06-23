function hideAlert() {
  var alertDiv = document.getElementById('alertDiv');
  alertDiv.style.animation = 'fadeOut 0.5s ease-in-out forwards';
  setTimeout(function () {
    alertDiv.style.display = 'none';
  }, 500);
}

function showAnimation() {
  var alertDiv = document.getElementById('alertDiv');
  alertDiv.style.display = 'block';
  alertDiv.style.animation = 'fadeIn 0.5s ease-in-out';
}

window.onload = showAnimation;