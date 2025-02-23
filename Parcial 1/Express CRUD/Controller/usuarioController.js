require('dotenv').config();
const mysql = require('mysql2');

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
            res.json({ resultado: results });
        } else {
            res.json({ mensaje: 'No se encontraron resultados.' });
        }
    });
}

function agregarCancion(req, res) {
    const { artista, cancion, album, genero } = req.body;

    if (!artista || !cancion || !album) {
        return res.status(400).json({ error: "Los campos artista, canción y álbum son obligatorios." });
    }

    const consulta = `INSERT INTO Canciones (artista, cancion, album, genero) VALUES (?, ?, ?, ?)`;

    connection.query(consulta, [artista, cancion, album, genero || null], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en el servidor", detalle: err.message });
        }

        res.json({
            mensaje: "Canción agregada exitosamente",
            id_cancion: results.insertId
        });
    });
}

module.exports = { consultarCancion, agregarCancion };
