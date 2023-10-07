import express from 'express';
import appRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import messageRouter from './routes/messages.routes.js';
import sessionRouter from './routes/sessions.routes.js';
import path from 'path';

import session from 'express-session';
import 'dotenv/config'

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

const appServer = app.listen(PORT, () => {
  console.log(`Server on localhost:${PORT}`)
})

//Socket
const io = new Server(appServer)

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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


//MONGO
mongoose.connect(process.env.MONGO_URL,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("DB conectada"))
.catch(()=> console.error("Error en conectar DB", error))

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/static', express.static(__dirname+'/public'));
app.use('/realtimeproducts', express.static(__dirname+'/public'));
app.use('/chat', express.static(__dirname+'/public'));
app.use('/login', express.static(__dirname+'/public'));
app.use('/signin', express.static(__dirname+'/public'));
app.use('/logout', express.static(__dirname+'/public'));



//Routes
app.use('/api/products', appRouter);
app.use('/api/cart', cartRouter)
app.use('/api/messages', messageRouter)
app.use('/api/sessions', sessionRouter)

app.get('/home', async (req, res) => {
  try {
    const prodActive = await productsModel.find({ status: true }).lean();
    const username = req.session.username;
    const userrol = req.session.userrol;
    console.log('Username enviado al cliente:', username, userrol);
    //console.log(prodActive)
    res.render('home', { products: prodActive, username: username, userrol: userrol, styles: 'estilos.css', js: 'home.js' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/chat', (req,res)=>{
  res.render('chat', {styles: 'estilos.css', js: 'chat.js'});
});

app.get('/login', (req,res) =>{
  res.render('login', {styles: 'estilos.css', js: 'login.js'})
})

app.get('/signin', (req,res) =>{
  res.render('signin', {styles: 'estilos.css', js: 'signin.js'})
})

app.get('/realtimeproducts', async (req,res)=>{
  try {
    const prodActive = await productsModel.find({ status: true }).lean();
   // console.log(prodActive)
    res.render('realTimeProducts',{products:prodActive, styles:'estilos.css', js:'realTimeProducts.js'})
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
  
})




io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on('chatMessages', async (data) => {
      const { user, message } = data;

      if (user && message) {
          
          try {
            const userExist = await messageModel.findOne({user});

          if(userExist){
            userExist.messages.push({
              date: new Date(),
              message,
            });
    
            await userExist.save();
            console.log('Mensaje guardado en MongoDB');
          }else { await messageModel.create({ user, message });
          console.log('Mensaje guardado en MongoDB');}
             
          } catch (error) {
              console.error('Error al guardar el mensaje en MongoDB:', error);
          }

         
          io.emit('Message', {
              user,
              date: new Date(),
              message,
          });

      } else {
          console.log('Datos de usuario o mensaje no válidos');
      }
  });

  socket.on("newProduct", async (newProd) => {
    const {title, description, price, thumbnail, code, stock, category} =  newProd
    await productsModel.create({ title, description, price, thumbnail, code, stock, category});
    console.log('Mensaje guardado en MongoDB');

    socket.emit('prod', newProd)
});

  socket.on("newUser", async (user)=> {
   const {name, surname, age, email, password} = user;
   await userModel.create({name, surname, age, email, password});
   console.log('Usuario guardado en BBDD')

   socket.emit("user", user)
  });

});




