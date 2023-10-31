import { Router } from "express";
import { getCart, getCartById, postCart, putCartById, putCartByProdId, deleteCart} from "../controllers/cart.controller.js";



const cartRouter= Router();

cartRouter.get('/', getCart)

cartRouter.get('/:cid', getCartById)

cartRouter.post('/:cid/products/:pid', postCart)

cartRouter.put('/:cid', putCartById)

cartRouter.put('/:cid/products/:pid', putCartByProdId)


cartRouter.delete('/:cid/products/:pid', deleteCart)


export default cartRouter;