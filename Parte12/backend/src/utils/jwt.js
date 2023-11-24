import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const generateToken = (user) => {
    const token = jwt.sign({user}, process.env.JWT_SECRET , {expiresIn: '12h'})
    console.log(token)
    return token
}

//generateToken({"_id":"651845068fc704509699348a","name":"Angela","surname":"Perez","age":"20","email":"angela@email.com","password":"$2b$18$/Qbm7GsXoDduFbq7bW2iwOmWGieeXMRaJ/3KmRSq7CU13ky2zVNme","rol":"user"})


export const authToken = (req, res, next) => {
    const authHeader = req.headers.Authorization
    
    if(!authHeader){
        res.status(401).send({error: 'Usuario no autorizado, token no válido'})
    }

    const token = authHeader.split(' ')[1]
    //Obtengo el token y se descarta el 'Bearer'
    // Authotization Bearer {{jwt_token}}
    //     KEY         0  ' '     2

    jwt.sign(token, process.env.JWT_SECRET, (error, credential)=>{
        if(error){
            return res.status(403).send({error: 'Usuario no autorizado'})
        }
    })

    //Usuario Válido
    req.user= credential.user
    next()
}