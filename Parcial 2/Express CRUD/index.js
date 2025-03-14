const express = require('express');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');
const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'VariablesDeEntorno/.env') });
const winston = require('winston');

//validacion 
const { checkSchema, validationResult } = require('express-validator');
const { agregarCancion } = require('./usuarioController');

app.use(express.json());

app.post("/cancion",
    checkSchema({
        artista: {
            in: ['body'],
            isString: true,
            notEmpty: {
                errorMessage: "El artista es obligatorio."
            },
            isLength: {
                options: { min: 3 },
                errorMessage: "El nombre del artista debe tener al menos 3 caracteres."
            }
        },
        cancion: {
            in: ['body'],
            isString: true,
            notEmpty: {
                errorMessage: "El nombre de la canción es obligatorio."
            },
            isLength: {
                options: { min: 2 },
                errorMessage: "El nombre de la canción debe tener al menos 2 caracteres."
            }
        },
        album: {
            in: ['body'],
            isString: true,
            notEmpty: {
                errorMessage: "El álbum es obligatorio."
            },
            isLength: {
                options: { min: 3 },
                errorMessage: "El nombre del álbum debe tener al menos 3 caracteres."
            }
        },
        genero: {
            in: ['body'],
            optional: true,
            isString: true,
            errorMessage: "El género debe ser un texto válido."
        }
    }),
    agregarCancion // Llama al controlador después de validar
);

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


