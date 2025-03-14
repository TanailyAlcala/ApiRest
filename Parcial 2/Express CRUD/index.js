const express = require('express');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'VariablesDeEntorno/.env') });
const winston = require('winston');
const { check, validationResult } = require('express-validator');
const { agregarCancion } = require('./Controller/usuarioController');

const app = express();

// Middleware para parsear JSON antes de las rutas
app.use(express.json());
app.use(express.text());
app.use(xmlparser());
app.use(cors());

const pug = require('pug');

// Middleware de validación para agregar canción
const validarCancion = [
    check('artista')
        .trim()
        .isString().withMessage("El artista debe ser un texto válido.")
        .notEmpty().withMessage("El artista es obligatorio.")
        .isLength({ min: 3 }).withMessage("El nombre del artista debe tener al menos 3 caracteres."),
    
    check('cancion')
        .trim()
        .isString().withMessage("El nombre de la canción debe ser un texto válido.")
        .notEmpty().withMessage("El nombre de la canción es obligatorio.")
        .isLength({ min: 2 }).withMessage("El nombre de la canción debe tener al menos 2 caracteres."),
    
    check('album')
        .trim()
        .isString().withMessage("El álbum debe ser un texto válido.")
        .notEmpty().withMessage("El álbum es obligatorio.")
        .isLength({ min: 3 }).withMessage("El nombre del álbum debe tener al menos 3 caracteres."),
    
    check('genero')
        .optional()
        .trim()
        .isString().withMessage("El género debe ser un texto válido."),

    (req, res, next) => {
        console.log("Middleware de validación ejecutado.");
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            console.error("Errores encontrados:", errores.array());
            return res.status(400).json({ error: errores.array() });
        }
        next();
    }
];

app.post("/cancion", validarCancion, agregarCancion);

// Pug como motor de vista
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/ruta', (req, res, next) => {
    let opciones = {
        titulo: "Título de la plantilla",
        subtitulo: "Subtítulo en la plantilla"
    };
    res.render('plantilla', opciones);
});

// Logger de errores con Winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '/logs/error.log') })
    ]
});

app.use((error, req, res, next) => {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: error.message });
});

let PORT = process.env.PORT || 3001;

const routerCancion = require('./Router/cancionRouter.js');

app.use('/usuarios', routerCancion);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
