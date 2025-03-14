const { validationResult } = require('express-validator');
const connection = require('../database/connection');
const halson = require('halson');

function agregarCancion(req, res) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.error("Errores detectados:", errores.array());
        return res.status(400).json({ error: errores.array() });
    }

    const { artista, cancion, album, genero } = req.body;

    const consulta = `INSERT INTO Canciones (artista, cancion, album, genero) VALUES (?, ?, ?, ?)`;

    connection.query(consulta, [artista, cancion, album, genero || null], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en el servidor", detalle: err.message });
        }

        const nuevaCancion = halson({
            mensaje: "Canción agregada exitosamente",
            id: results.insertId,
            artista,
            titulo: cancion,
            album,
            genero: genero || 'Desconocido'
        })
        .addLink('self', `/canciones/${results.insertId}`)
        .addLink('editar', `/canciones/${results.insertId}/editar`)
        .addLink('eliminar', `/canciones/${results.insertId}/eliminar`);

        res.json(nuevaCancion);
    });
}

module.exports = { agregarCancion };
