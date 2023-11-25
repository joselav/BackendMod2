import { Schema, model } from "mongoose";
import { cartModel } from "./cart.models.js";

const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    surname: {
        type: String, 
        required: true
    }, 
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    rol: {
        type: String, 
        default: 'user'
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref: 'carts'
    } 

})


///Defino que guardo la referencia.
// Genero un Schema que funciona Previo a guardar la información. 

userSchema.pre('save', async function(next){
    try{
        const newCart = await cartModel.create({});
        this.cart= newCart._id
    }catch(error){next(error)}
})
export const userModel = model('users', userSchema)