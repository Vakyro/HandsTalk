function toggleLogin() {
  var modal = document.getElementById('popup-modal');
  modal.style.display = 'block';
  setTimeout(() => {
    modal.classList.add('popup-enter');
  }, 0); 
}

function hideLogin(){
  var modal = document.getElementById('popup-modal');
  modal.classList.add('popup-exit');
  setTimeout(() => {
    modal.style.display = 'none';
    modal.classList.remove('popup-enter', 'popup-exit');
  }, 500);
}