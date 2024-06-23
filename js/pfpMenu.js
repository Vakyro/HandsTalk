var modal = document.getElementById('pfps');

function pfpToggle() {
  modal.style.display = 'block';
  setTimeout(() => {
    modal.classList.add('popup-enter');
  }, 0);
}

function hidePfps() {
  modal.classList.add('popup-exit');
  setTimeout(() => {
    modal.style.display = 'none';
    modal.classList.remove('popup-enter', 'popup-exit');
  }, 500);
}
