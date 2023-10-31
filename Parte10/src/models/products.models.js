import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    thumbnail: [],
    code: {
        type: String, 
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    category:{
        type: String, 
        required: true
    },
    status:{type: Boolean, default: true},
    
}, {versionKey: false});

productsSchema.plugin(mongoosePaginate)

export const productsModel = model('products', productsSchema);