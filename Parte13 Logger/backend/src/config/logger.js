import winston from 'winston';

const customLevelOpt = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2, 
        info:3,
        debug:4
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        debug: 'gray'
    }
};

const logger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: [
        new winston.transports.File({
            filename: './errors.log',
            level: 'fatal',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './loggers.log',
            level: 'warning',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './loggers.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors}),
                winston.format.simple()
            )
        })
    ]
})


export const addLogger = (req,res,next)=> {
    req.logger = logger,
    req.logger.debug(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`),
    next()
}