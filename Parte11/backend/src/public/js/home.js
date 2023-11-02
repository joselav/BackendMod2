const logoutButton = document.getElementById("btn_logout");

logoutButton.addEventListener("click", function () {
    // Realiza aquí la lógica para cerrar sesión y redirigir al usuario a la ruta de logout.
    // Puedes usar window.location.href para redirigir al usuario.

    fetch('/api/sessions/logout', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        // Maneja el error de cierre de sesión aquí, si es necesario.
      });
  });