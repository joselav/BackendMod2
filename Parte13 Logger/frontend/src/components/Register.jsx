import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const datForm = new FormData(formRef.current) //FormData -> transforma un HTML en un objeto iterador.
        const data = Object.fromEntries(datForm) // Objet.fromEntries -> transforma el objeto iterador en un objeto simple de leer.
        console.log(data)

        const response = await fetch('http://localhost:8080/api/sessions/signin', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        console.log(response)

        if(response.status == 200){
            const datos = await response.json()
            console.log(datos)
            navigate('/login')
        }else {console.log(response)}
    }
  return (
<div className='container'>
    <h2>Formulario Registro</h2>
    <form onSubmit={handleSubmit} ref={formRef}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre:</label>
        <input type="text" className="form-control" name="name" placeholder="Nombre" />
    </div>
    <div className="mb-3">
        <label htmlFor="surname" className="form-label">Apellido:</label>
        <input type="text" className="form-control" name="surname" placeholder="Apellido" />
    </div>
    <div className="mb-3">
        <label htmlFor="age" className="form-label">Edad:</label>
        <input type="number" className="form-control" name="age" placeholder="Edad" />
    </div>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" className="form-control" name="email" placeholder="name@example.com" />
    </div>
    <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña:</label>
        <input type="password" name="password" className="form-control" aria-describedby="passwordHelpBlock" />
    </div>
    <button type="submit" className="btn btn-primary">Registrarse</button>
    </form>
</div>
  )
}