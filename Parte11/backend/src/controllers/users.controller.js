import { userModel } from "../models/users.models.js";

export const getUser = async (req,res)=>{
    try{
        const users = await userModel.find()
        res.status(200).send({respuesta: 'Se ha encontrado usuarios', mensaje: users})

    }catch(error){
        res.status(400).send({respuesta: "Error al consultar usuario", mensaje: error})
    }
}