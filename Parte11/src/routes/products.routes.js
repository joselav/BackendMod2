import { Router } from 'express';
import { getProds, getProdById, postProd, putProd, deleteProd } from '../controllers/products.controller.js';

const appRouter= Router();

appRouter.get('/', getProds)

appRouter.post('/', postProd)

appRouter.get('/:pid', getProdById)

appRouter.put('/:pid', putProd)

appRouter.delete('/:pid', deleteProd)

export default appRouter