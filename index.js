const express = require('express');
const app=express();
const port=process.env.PORT||3000;
const senderRoute=require('./routes/send');
const mongoose= require('mongoose');
const winston= require('winston');
require('dotenv').config();
const databaseUri=process.env.URI;

//Format for Logging
const loggerFormat=winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info=>`${info.timestamp}  ${info.message}`)
    )
)
//Creating logger using Winston
const logger = {
    win: winston.createLogger({
        level:'info',
        format:loggerFormat,
        transports:[new winston.transports.File({ filename:'app-info.log'})],
    })
}
app.use("/",senderRoute);
//Connection to mongoDB database
mongoose.connect(databaseUri,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
        .then(res=>{
            logger.win.info('Database has been connected');
            app.listen(port,()=>{
                logger.win.info('server listening ');
            });
        })
        .catch(error=>{
            logger.win.error('Database connection error '+error);
        })
