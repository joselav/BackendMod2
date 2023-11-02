import { Router } from "express";
import { getMess, postMess } from "../controllers/messages.controller.js";

const messageRouter= Router();

messageRouter.get('/', getMess)

messageRouter.post('/', postMess)


export default messageRouter;