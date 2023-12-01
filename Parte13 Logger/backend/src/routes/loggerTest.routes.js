import { Router } from "express";
import { addLogger } from "../config/logger.js";

const loggerRouter= Router();

loggerRouter.use(addLogger);

loggerRouter.get('/fatal', (req, res)=>{
    req.logger.fatal("fatal"),
    res.send("Hola!")
});

loggerRouter.get('/error', (req, res)=>{
    req.logger.error("error"),
    res.send("Hola!")
});

loggerRouter.get('/warning', (req, res)=>{
    req.logger.warning("warning"),
    res.send("Hola!")
});

loggerRouter.get('/info', (req, res)=>{
    req.logger.info("info"),
    res.send("Hola!")
});

loggerRouter.get('/debug', (req, res)=>{
    req.logger.debug("debug"),
    res.send("Hola!")
});



export default loggerRouter