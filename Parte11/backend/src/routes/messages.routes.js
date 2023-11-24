import { Router } from "express";
import { getMess, postMess } from "../controllers/messages.controller.js";

const messageRouter= Router();

messageRouter.get('/', getMess)

messageRouter.post('/', passportError('jwt'), authorization('user'), postMess)


export default messageRouter;