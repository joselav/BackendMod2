import React, { useEffect, useState } from 'react';

export const Products = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/products', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.docs);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
        setLoading(false);
      });

   
  }, []);

  

  return (
    <>
     <div>Productos</div>
     <div className="App">
      <h1>Lista de Productos</h1>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ul>
          {product.map((producto) => (
            <li key={producto._id}>
              {producto.title} - Precio: {producto.price}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
   
    
  )
}


