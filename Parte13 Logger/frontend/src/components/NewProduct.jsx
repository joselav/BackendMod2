import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookiesByName } from '../utils/formsUtils.js'


export const NewProduct = () => {

    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const datForm = new FormData(formRef.current) //FormData -> transforma un HTML en un objeto iterador.
        const data = Object.fromEntries(datForm) // Objet.fromEntries -> transforma el objeto iterador en un objeto simple de leer.
        console.log(data)

        const token = getCookiesByName('jwtCookie')

        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        console.log(response)

        if(response.status == 200){
            const datos = await response.json()
            console.log(datos)
        }else {console.log(response)}
    }

  return (
    <div className='container'>
        <h2>Crear un Nuevo Producto</h2>
    <form onSubmit={handleSubmit} ref={formRef}>
    <div className="mb-3">
        <label htmlFor="title" className="form-label">Nombre Producto:</label>
        <input type="text" className="form-control" name="title" placeholder='Nombre del producto' />
    </div>
    <div className="mb-3">
        <label htmlFor="description" className="form-label">Descripción:</label>
        <input type="text" className="form-control" name="description" placeholder='Breve descripción del producto'/>
    </div>
    <div className="mb-3">
        <label htmlFor="price" className="form-label">Precio:</label>
        <input type="number" className="form-control" name="price" placeholder='Precio del producto. Ej: €20'/>
    </div>
    <div className="mb-3">
        <label htmlFor="code" className="form-label">Código:</label>
        <input type="text" className="form-control" name="code" placeholder='Código de referencia del producto'/>
    </div>
    <div className="mb-3">
        <label htmlFor="stock" className="form-label">Stock:</label>
        <input type="number" name="stock" className="form-control" placeholder='Stock en existencia del producto' />
    </div>
    <div className="mb-3">
        <label htmlFor="category" className="form-label">Categoría:</label>
        <input type="text" name="category" className="form-control" placeholder='Categoría del producto'/>
    </div>
    <button type="submit" className="btn btn-primary">Crear Producto</button>
    </form>
    </div>
  )
}


