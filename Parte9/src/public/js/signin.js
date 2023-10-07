const socket = io();
const form = document.getElementById("userForms");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const user = Object.fromEntries(dataForm)
    console.log(user)
    socket.emit("newUser", user)
    e.target.reset();
})

socket.on('user', (user)=>{
    console.log('Usuario logeado, redirigiendo a página de login', user)
    window.location.href = '/login'
})

const log = document.getElementById("btnsign");

log.addEventListener('click', function(){
window.location.href= '/api/sessions/github'
})