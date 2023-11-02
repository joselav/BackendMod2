import { Router } from "express";
import { cLogin, signIn, logOut } from "../controllers/session.controller.js";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";

const sessionRouter = Router();


sessionRouter.post('/login', passport.authenticate('login'), cLogin )

sessionRouter.post('/signin', passport.authenticate('register'), signIn)

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


sessionRouter.get('/logout', logOut );


export default sessionRouter