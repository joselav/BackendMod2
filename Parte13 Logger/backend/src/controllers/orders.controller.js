import { cartModel } from "../models/cart.models.js";
import { productsModel } from "../models/products.models.js";
import { ticketModel } from "../models/ticket.models.js";
import { v4 as uuidv4 } from 'uuid';

export const purchaseCart = async (req, res) => {
    const {cid} = req.params
    try{
        const cart= await cartModel.findById(cid)
        const purchasedProducts =[];
        const purchasedFail =[];

        if(!cart){
            return res.status(404).send({respuesta: 'No se ha logrado encontrar el id', mensaje: 'error'})
        }

        for (const item of cart.products){
            const products = await productsModel.findById(item.id_prod);

            if(!products){
                purchasedFail.push(item.id_prod);
                continue;
            }

            if(products.stock >= item.quantity){
                products.stock -= item.quantity;
                await products.save()
                purchasedProducts.push(item);
            }else{
                purchasedFail.push(item.id_prod)
            }
        }

        if(purchasedProducts.length > 0){
            const totalAmount = purchasedProducts.reduce((total, item)=> {
                const product = cart.products.find(p=> p.id_prod.equals(item.id_prod));
                return total + product.quantity * product.id_prod.price;
            }, 0)

            const ticket = await ticketModel.create({
                code: uuidv4(),
                amount: totalAmount,
                purchaser: req.user.email
            })

            cart.products= cart.products.filter(item => !purchasedProducts.includes(item));
            await cart.save();

            return res.status(200).send({respuesta: 'Ticket generado exitosamente', mensaje: ticket})
        }else {
            return res.status(404).send({respuesta: 'Error al generar ticket', mensaje: 'Error'})
        }

    }catch(error){
        console.error(error)
        res.status(500).send({error: 'Error al finalizar compra'})
    }
}