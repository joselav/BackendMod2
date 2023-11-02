import passport from "passport";

//Se crea una función general que maneja las estratégias (loca, GitHub, jwt)

export const passportError = (strategy) =>{
    return async (req, res, next) =>{
        passport.authenticate(strategy, (error, user, info)=>{
            if(error){return next(error)} 
            //Se utiliza next(error) porque dependiendo de que estoy usando (github, jwt), será un error diferente.
            //Esto significa que cada estratégia maneja su error.

            if(!user){
                return res.status(401).send({error: info.messages ? info.messages : info.toString()})
                //Dependiendo de que estratégia se trate, ya enviará el mensaje o deberé pasarlo a objeto/sting
            }

            req.user = user;
            next()
        }) (req, res, next) //Se va a llamar a un middleware, entonces debo llamarlo para que funcione
    }
}

export const authorization = (rol) => {
    return async (req, res, next)=>{
        if(!req.user){
            return res.status(401).send({error: 'Usuario no autorizado'})
        }

        if(req.user.user.rol != rol){
            return res.status(403).send({error: 'Usuario sin los permisos necesarios'})
        }

        next()
    }
}