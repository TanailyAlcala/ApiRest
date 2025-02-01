const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000; // Puerto diferente al del Same-Origin

// Habilitar CORS para cualquier origen
app.use(cors());

app.get('/data', (req, res) => {
    res.json({ mensaje: "Hola desde el servidor con CORS" });
});

app.listen(port, () => {
    console.log(`Servidor con CORS en http://localhost:${port}`);
});
