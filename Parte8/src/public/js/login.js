const form = document.getElementById("logForms");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Envía los datos al servidor utilizando una solicitud HTTP POST
    fetch('/api/sessions/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.resultado === 'Bienvenido') {
            sessionStorage.setItem("username", data.mensaje.name);
            window.location.href = '/home';
        } else {
            console.log("Oops.. se ha producido un error", data.resultado);
        }
    })
    .catch(error => {
        console.error("Error al iniciar sesión", error);
    });
});
