const express = require('express');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');
const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'VariablesDeEntorno/.env') });
const winston = require('winston')

const app = express(); 
const pug = require('pug');

//Pug como motor de vista
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/ruta',(req,res,next)=>{
    let opciones ={
        titulo : "Titulo de la plantilla",
        subtitulo : "Subtitulo en la plantilla"
    }
    res.render('plantilla',opciones)
})


//log errores 
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: __dirname+ '/logs/error.log'})
    ]
})

try {
    throw new Error('Somethingwent wrong');
} catch (error){
    logger.error(error.message, {stack: error.stack});
}

//let PORT = process.env.PORT;
let PORT = process.env.PORT || 3001;


const routerCancion = require('./Router/cancionRouter.js');

// Middleware para parsear el body de las peticiones
app.use(express.json());
app.use(express.text());
app.use(xmlparser());
app.use(cors());

app.use('/usuarios', routerCancion);

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});

app.use((error,req,res,next)=>{
    res.status(500).json({error:error.message});
});

app.use((err,rew,res,next)=>{
    logger.error(err.message, {stack: err.stack});
    res.status(500).send({error:err.message})
})


