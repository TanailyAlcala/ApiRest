const express = require('express');
const router = express.Router();
const usuarioController = require('../Controller/usuarioController.js');
const halson =require('halson');
//const hal = require('hal');

//xxxxx
router.get('/', (req, res) => {
    let opciones = {
        titulo: 'Lista de canciones',
        mensaje: 'Aquí se puede ver la lista de canciones disponibles'
    };
    res.render('index', opciones); // Renderiza "index.pug" dentro de "views"
});

router.get('/', usuarioController.consultarCancion);
router.post('/', usuarioController.agregarCancion); 

module.exports = router;