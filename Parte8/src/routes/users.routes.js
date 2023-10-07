import { Router } from "express";
import { userModel } from "../models/users.models.js";

const userRouter= Router();

userRouter.get('/', async (req,res)=>{
    try{
        const users = await userModel.find()
        res.status(200).send({respuesta: 'Se ha encontrado usuarios', mensaje: users})

    }catch(error){
        res.status(400).send({respuesta: "Error al consultar usuario", mensaje: error})
    }
})

userRouter.post('/', async (req,res)=>{
    const {name, surname, age, email, password} = req.body;
    
    try{
        const newUser = await userModel.create({name, surname, age, email, password})
        res.status(200).send({respuesta: 'Se ha creado exitosamente el nuevo usuario', mensaje: newUser})
    }catch(error){
        res.status(400).send({respuesta: 'Error al agregar usuario', mensaje: error})
    }
})

