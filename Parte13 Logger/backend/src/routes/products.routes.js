import { Router } from 'express';
import { getProds, getProdById, postProd, putProd, deleteProd } from '../controllers/products.controller.js';
import { passportError, authorization } from "../utils/messagesError.js";

const appRouter= Router();

appRouter.get('/', getProds)

appRouter.post('/', passportError('jwt'), authorization('admin'), postProd)

appRouter.get('/:pid', getProdById)

appRouter.put('/:pid', passportError('jwt'), authorization('admin'), putProd)

appRouter.delete('/:pid', passportError('jwt'), authorization('admin'), deleteProd)

export default appRouter