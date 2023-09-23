import { Router } from "express";
import { userModel } from "../models/users.models.js";

const sessionRouter = Router();

sessionRouter.post('/login', async (req,res)=> {
    const {email, password} = req.body;

    try{
        if(req.session.login){
            res.status(200).send('Login ya existente')
        }

        const user = await userModel.findOne({email: email})

        if(user){
            if(user.password == password){
                req.session.login = true;
                req.session.username = user.name;
                req.session.userrol = user.rol;
                res.status(200).send({resultado:'Bienvenido', mensaje: user})
            }else{
                res.status(401).send({resultado: 'Contraseña o Usuario no válido, vuelva a intentarlo'})
            }


        }else {
            res.status(404).send({resultado:'El usuario no es válido.', mensaje: user})
        }

    }catch(error) {
        res.status(400).send({respuesta: 'Error al realizar el Login', mensaje: error})
    }
})

sessionRouter.get('/logout', async (req, res) => {
    if (req.session.login) {
        req.session.destroy(function (err) {
            if (err) {
                console.error('Error al destruir la sesión:', err);
                res.status(500).send({ mensaje: 'Error al cerrar la sesión' });
            } else {
                res.status(200).send({ mensaje: 'Sesión cerrada' });
            }
        });
    } else {
        res.status(401).send({ mensaje: 'No se pudo cerrar la sesión' });
    }
});


export default sessionRouter