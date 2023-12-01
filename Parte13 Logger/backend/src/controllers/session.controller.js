import { generateToken } from "../utils/jwt.js";

export const cLogin = async (req,res) =>{
    try{
        if(!req.user){
            //Si no me devolvieron el usuario, es decir, "Null, false", se devuelve eror de autenticación:
            return res.status(401).send({respuesta:'Usuario inválido', mensaje: 'No se ha logrado iniciar sesión. Contraseña o Usuario incorrecto.'})
        }

        const token = generateToken(req.user)
        res.status(200).send({token})
    }catch(error){
        res.status(500).send({respuesta:'Error al iniciar sesión', mensaje: error})//sigue ocurriendo un error.
    }
}

export const signIn = async (req,res) =>{
    try{
        if(!req.user){
            //No me devuelve el usuario, no se ha logrado crear. 
            return res.status(400).send({respuesta:'No se ha logrado registrar al usuario', mensaje:'El email ya existe'})
        }

        res.status(200).send({respuesta:'Se ha creado el usuario', mensaje:'Se ha creado el usuario exitosamente'})
    }catch(error){
        res.status(500).send({respuesta:'Error al registrar el usuario', mensaje: error})
    }
}

export const logOut = async (req,res)=>{
            if (err) {
                console.error('Error al destruir la sesión:', err);
                res.status(500).send({ mensaje: 'Error al cerrar la sesión' });
            } else {
                res.clearCookie('jwtCookie')
                res.status(200).send({ mensaje: 'Sesión cerrada' });
            };
}