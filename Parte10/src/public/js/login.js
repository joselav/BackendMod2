const form = document.getElementById("logForms");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json();
        console.log (data);

        if(response.status === 200){
            window.location.href = '/home';
        } else {
            console.log("Oops.. se ha producido un error", data.response);
        }
    } catch(error) {
        console.error("Error al iniciar sesión", error);
    }

    
});


const log = document.getElementById("btnlog");

log.addEventListener('click', function(){
window.location.href= '/api/sessions/github'
})