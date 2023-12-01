import { Router } from "express";
import appRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";
import messageRouter from "./messages.routes.js";
import sessionRouter from "./sessions.routes.js";
import loggerRouter from "./loggerTest.routes.js";

const router = Router();

router.use('/api/products', appRouter);
router.use('/api/cart', cartRouter)
router.use('/api/messages', messageRouter)
router.use('/api/sessions', sessionRouter)
router.use('/loggerTest', loggerRouter)

export default router