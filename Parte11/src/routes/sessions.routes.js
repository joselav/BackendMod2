import { Router } from "express";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";

const sessionRouter = Router();


sessionRouter.post('/login', passport.authenticate('login'), async(req, res)=>{
    try{
        if(!req.user){
            //Si no me devolvieron el usuario, es decir, "Null, false", se devuelve eror de autenticación:
            return res.status(401).send({respuesta:'Usuario inválido', mensaje: 'No se ha logrado iniciar sesión. Contraseña o Usuario incorrecto.'})
        }

        req.session.user= {
            name: req.user.name,
            surname: req.user.surname,
            age: req.user.ager,
            email:req.user.email,
            rol: req.user.rol
        }

        const token = generateToken(req.user)
        res.cookie('jwtCookie',token, {
            maxAge: 43200000 //12h en ms
        })
        res.status(200).send({payload: req.user})
    }catch(error){
        res.status(500).send({respuesta:'Error al iniciar sesión', mensaje: error})//sigue ocurriendo un error.
    }
})

sessionRouter.post('/signin', passport.authenticate('register'), async(req, res)=>{
    try{
        if(!req.user){
            //No me devuelve el usuario, no se ha logrado crear. 
            return res.status(400).send({respuesta:'No se ha logrado registrar al usuario', mensaje:'El email ya existe'})
        }

        res.status(200).send({respuesta:'Se ha creado el usuario', mensaje:'Se ha creado el usuario exitosamente'})
    }catch(error){
        res.status(500).send({respuesta:'Error al registrar el usuario', mensaje: error})
    }
})

sessionRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req, res)=>{
    res.status(200).send({respuesta:'Usuario registrado', mensaje: 'Se ha registrado el usuario exitosamente'})
})

sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req, res)=>{
    req.session.user= req.user
    res.status(200).send({respuesta:'Inicio de sesión exitoso', mensaje: 'Se ha inciciado sesión del usuario exitosamente'})
})


//JWT: verifica el token que se envió contenga las mismas contraseñas de encriptación
sessionRouter.get('/JWTTest', passport.authenticate('jwt', {session: false}), (req, res)=>{
    console.log(req)
    res.send(req.user)
})

sessionRouter.get('/current', passportError('jwt'), authorization('user'), (req, res)=> {
    res.send(req.user)
})


sessionRouter.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy(function (err) {
            if (err) {
                console.error('Error al destruir la sesión:', err);
                res.status(500).send({ mensaje: 'Error al cerrar la sesión' });
            } else {
                res.clearCookie('jwtCookie')
                res.status(200).send({ mensaje: 'Sesión cerrada' });
            }
        });
    } else {
        res.status(401).send({ mensaje: 'No se pudo cerrar la sesión' });
    }
});


export default sessionRouter