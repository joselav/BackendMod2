import { Schema, model } from "mongoose";

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
    }

})

export const userModel = model('users', userSchema)