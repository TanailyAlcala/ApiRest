require('dotenv').config();
const mysql = require('mysql2');
const halson = require('halson');
const { validationResult } = require('express-validator');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Aabt.lrna7',
    database: process.env.DB_NAME || 'musica'
});

function consultarCancion(req, res, next) {
    let consulta = '';
    let valores = [];

    if (!req.query.id) {
        consulta = 'SELECT * FROM Canciones';
    } else {
        consulta = 'SELECT * FROM Canciones WHERE id = ?';
        valores.push(req.query.id);
    }

    connection.query(consulta, valores, function (err, results) {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor.', detalle: err.message });
        }

        if (results.length > 0) {
            let canciones = results.map(cancion => {
                return halson({
                    id: cancion.id,
                    artista: cancion.artista,
                    titulo: cancion.cancion,
                    album: cancion.album,
                    genero: cancion.genero || 'Desconocido'
                })
                .addLink('self', `/canciones/${cancion.id}`)
                .addLink('editar', `/canciones/${cancion.id}/editar`)
                .addLink('eliminar', `/canciones/${cancion.id}/eliminar`);
            });
            res.json({ canciones });
        } else {
            res.json({ mensaje: 'No se encontraron resultados.' });
        }
    });
}

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


module.exports = { consultarCancion, agregarCancion };
