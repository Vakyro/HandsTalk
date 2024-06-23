const button = document.querySelector('.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.Nav');

button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  if (menu.classList.contains('hidden')) {
    nav.style.transform = 'translateX(-100%)';
  } else {
    nav.style.transform = 'translateX(0)';
  }
});