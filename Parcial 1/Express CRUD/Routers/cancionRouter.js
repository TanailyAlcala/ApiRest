const express = require('express');
const router = express.Router();
const usuarioController = require('../Controller/usuarioController.js');

router.get('/', usuarioController.consultarCancion);
router.post('/', usuarioController.agregarCancion); 

module.exports = router;