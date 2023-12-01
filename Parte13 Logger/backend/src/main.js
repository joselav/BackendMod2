import express from 'express';
import appRouter from './routes/products.routes.js';
import router from './routes/index.routes.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//MAIL:
import nodemailer from 'nodemailer';

///Faker:
import {faker} from '@faker-js/faker'

//passport
import passport from 'passport';
//mi configuración de Passport
import initializePassport from './config/passport.js';

import session from 'express-session';
import 'dotenv/config.js'

//models
import { productsModel } from './models/products.models.js';
import { messageModel } from './models/message.models.js';
import { userModel } from './models/users.models.js';

//MongoDB
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';


//handlebars
import handlebars from 'express-handlebars';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

//socket
import { Server } from 'socket.io';
import { resourceLimits } from 'worker_threads';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

//
const PORT = 8080;
const app =express();

//cors
const whiteList = ['http://localhost:5173/']

const corsOption = {
  origin: function(origin, callback) {
    if(whiteList.indexOf(origin) != 1 || !origin){
      callback(null,true)
    }else { callback( new Error("Acceso denegado")) }
  }
}

const appServer = app.listen(PORT, () => {
  console.log(`Server on localhost:${PORT}`)
})

//Socket
const io = new Server(appServer)


//NODE MAILER:
let transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',

  port: 465,

  secure: true,

  auth: {

      user: 'testjolav@gmail.com',

      pass: process.env.PASSWORD_EMAIL,

      authMethod: 'LOGIN'

  }

})



app.get('/mail', async (req, res) => {

  const resultado = await transporter.sendMail({

      from: 'TEST MAIL testjolav@gmail.com',

      to: 'josefinalavinia05@gmail.com',

      subject: 'Hola, buenas tardes',

      html:

          `

              <div>

                  <h1>Buenas tardes</h1>
                  <p> ya funciona, adiós </p>

              </div>

          `,
      attachments: [{
        filename: '0003.jpeg',
        path: __dirname + '/images/0003.jpeg',
        cid: '0003.jpeg'
      }]
      

  })

  console.log(resultado)

  res.send("Email enviado")

})


//Middleware
app.use(express.json());
app.use(cors(corsOption))
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
          useNewUrlParser: true, //Establezco que la conexion sea mediante URL
          useUnifiedTopology: true //Manego de clusters de manera dinamica
      },
      ttl: 800 //Duracion de la sesion en la BDD en segundos

  }),
  secret: process.env.SESSION_SECRET,
  resave: false, //Fuerzo a que se intente guardar a pesar de no tener modificacion en los datos
  saveUninitialized: false //Fuerzo a guardar la session a pesar de no tener ningun dato
}))
initializePassport () //Inicializo mi estratégia.
app.use(passport.initialize()) //Llamo a Passport para que funcione.
app.use(passport.session()) //Le digo a Passport que meneje las sesiones.


//MONGO
mongoose.connect(process.env.MONGO_URL,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("DB conectada"))
.catch(()=> console.error("Error en conectar DB", error))

//Routes
app.use('/', router);

//FAKER: 
app.get('/mockingproducts', () =>{
  const modelUser = () =>{
    return {
      _id: faker.database.mongodbObjectId(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      age: faker.date.birthdate(),
      email: faker.internet.email() ,
      password: faker.internet.password(),
  
    }
  }

  const createRandomUser = (cantUsers) =>{
    const users = [];

    for(let i = 0; i < cantUsers; i++){
      users.push(modelUser())
    }

    return {usuarios: users};

  }

  console.log(createRandomUser(3))

  const productsFaker = () =>{
    return {
      title:faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      thumbnail:[],
      code: faker.lorem.word(),
      stock: faker.number.int(),
      category:faker.commerce.department(),
    }
  }

  const createProducts = (cantProd) =>{
    const prods= [];

    for(let i = 0; i < cantProd; i++){
      prods.push(productsFaker())
    }

    return{ productos: prods}
  }

  console.log(createProducts(100))
})



/*
 uztl pnzp hvow jqhy
*/

