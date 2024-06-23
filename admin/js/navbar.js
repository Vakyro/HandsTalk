const drawer = document.getElementById('drawer-navigation');

document.addEventListener('mousemove', (event) => {
  if (event.clientX < 50) {
    drawer.classList.remove('-translate-x-full');
  }
});

document.addEventListener('mouseleave', (event) => {
  drawer.classList.add('-translate-x-full');
});

function showMenu() {
  const target = document.getElementById('drawer-navigation');
  target.classList.remove('-translate-x-full');
}

function hideMenu() {
  const target = document.getElementById('drawer-navigation');
  target.classList.add('-translate-x-full');
}

const showMenuButton = document.querySelector('[data-drawer-show="drawer-navigation"]');
showMenuButton.addEventListener('click', showMenu);

const hideMenuButton = document.querySelector('[data-drawer-hide="drawer-navigation"]');
hideMenuButton.addEventListener('click', hideMenu)


