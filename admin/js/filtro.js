function filtrarObjetos() {
  var input = document.getElementById('search').value.toLowerCase();
  var rows = document.getElementsByClassName('Objeto');

  for (var i = 0; i < rows.length; i++) {
      var value = rows[i].textContent.toLowerCase();
      if (value.indexOf(input) > -1) {
          rows[i].parentNode.style.display = '';
      } else {
          rows[i].parentNode.style.display = 'none';
      }
  }
}