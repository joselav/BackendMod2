import React from 'react'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx'
import { Products } from './components/Products.jsx'
import { NewProduct } from './components/NewProduct.jsx'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
 
 export const App = () => {
   return (
    <>
    <Router>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/newproduct' element={<NewProduct/>}/>
      </Routes>
    </Router>
    </>
   )
 }
 
 




