import { Router } from "express";
import { getCart, getCartById, postCart, putCartById, putCartByProdId, deleteCart} from "../controllers/cart.controller.js";
import { purchaseCart } from "../controllers/orders.controller.js";



const cartRouter= Router();

cartRouter.get('/', getCart)

cartRouter.get('/:cid', getCartById)

cartRouter.get('/:cid/purchase', purchaseCart)

cartRouter.post('/:cid/products/:pid', postCart)

cartRouter.put('/:cid', putCartById)

cartRouter.put('/:cid/products/:pid', putCartByProdId)

cartRouter.delete('/:cid/products/:pid', deleteCart)



export default cartRouter;