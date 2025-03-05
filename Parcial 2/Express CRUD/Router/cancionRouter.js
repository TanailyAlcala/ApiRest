const express = require('express');
const router = express.Router();
const usuarioController = require('../Controller/usuarioController.js');
const halson =require('halson');
//const hal = require('hal');

router.get('/', usuarioController.consultarCancion);
router.post('/', usuarioController.agregarCancion); 

module.exports = router;