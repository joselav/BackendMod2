import local from 'passport-local';
import passport from 'passport';
import GithubStrategy from 'passport-github2'
import { createHash, validatePassword } from '../utils/bcrypt.js';
import { userModel } from '../models/users.models.js';

const localStrategy = local.Strategy

const initializePassport = () => {
    //Estrategía de registro:
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done)=>{
            const {name, surname, email, age} = req.body;
            
            try{
                const user = await userModel.findOne({email: email})

                if(user){
                    return done(null, false)
                    //NULL: Que el usuario ya exista no es un error.
                    //False: No se puede realizar el registro porque el usuario ya existe, entonces 
                    //en el caso del registro, el usuario ingresado es inválido (ya existente).
                }

                const passHash = createHash(password) //Hash a la contraseña que se está enviando.

                const userCreated = await userModel.create({
                    name: name, 
                    surname: surname, 
                    email: email, 
                    age: age,
                    password: passHash
                }) // A diferencia de las rutas, se debe aclarar que tipo de dato se guardará. 
                    //Especialmente en el caso de password: passHash, ya que la contraseña debe guardarse encriptada. 

                return done(null, userCreated)
            } catch(error){
                return done(error)
            }
        }
        ));

        passport.use('login', new localStrategy(
            {usernameField:'email'}, async (username, password, done) => {
                try{
                    const user = await userModel.findOne({email: username})

                    if(!user){
                        return done(null, false) //lo mismo, no es error pero no existe el usuario, 
                                                 //no puede inciar sesión.
                    }

                    if (validatePassword(password, user.password)){
                        return done(null, user)

                        //En caso de que el usuario exista, se controla que tanto 
                        //la contraseña que se envió como la encriptada(BDD) sean la misma.
                        //Es decir, que sea la contraseña correcta. 
                    }

                    return done(null, false) //Credenciales no válidas, no puede inciiar sesión. 
                }catch(error){
                    return done(error)
                }
            }

        ))

        //Estrategia con Github:
        passport.use('github', new GithubStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.SECRET_CLIENT,
            callbackURL: process.env.CALLBACK_URL
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(accessToken)
                console.log(refreshToken)
                console.log(profile._json)
                //Se asegura que los datos sean correctos
                const user = await userModel.findOne({ email: profile._json.email })
                //_json se coloca porque la información no estaría enviandose en un formato que yo pueda leer.
                if (user) {
                    done(null, false)
                } else {
                    const userCreated = await userModel.create({
                        name: profile._json.name,
                        surname: ' ',
                        email: profile._json.email,
                        age: 18, //Edad por defecto
                        password: createHash(profile._json.email + profile._json.name)
                       
                    })
                    //hasheo la contraseña de forma que pueda ser siempre un valor único
                    //Aquí se guardan los datos que yo puedo tomar de github.
                    //Por ejemplo, la edad no la puedo tomar de gh, por ese motivo, seteo una por defecto.

                    done(null, userCreated)
                }
    
    
            } catch (error) {
                done(error)
            }
        }))
      

        //Configuración para iniciarlizar la sesión en nuestra base de datos: 
        
        passport.serializeUser((user, done)=> {
            done(null, user._id) //Al tener un ID único por usuario, se inicializa la sesión con
                                //ese número de ID.
                                //En caso de '_id' es porque en MongoDB se guarda de esa manera el id.
        })


        //Configuración para matar(eliminar) la sesión del usuario:

        passport.deserializeUser(async (id, done)=>{
            const user = await userModel.findById(id)
            done(null, user)
        })
}


export default initializePassport