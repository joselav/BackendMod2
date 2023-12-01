import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    /*Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. 
    Éste contará con los campos

    Id (autogenerado por mongo)

    code: String debe autogenerarse y ser único

    purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)

    amount: Number, total de la compra.

    purchaser: String, contendrá el correo del usuario asociado al carrito.*/
    code: {
        type: String,
        unique: true,
        required: true,
    },
    purchase_datatime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    }, 
    purchaser: {
        type: String,
        required: true
    }

})

export const ticketModel = model('tickets', ticketSchema);