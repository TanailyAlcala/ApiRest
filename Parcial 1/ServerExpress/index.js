const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.get('/data', (req, res,next) => {
    res.sendFile( __dirname+ '/public/index.htm');
});
app.post('/data', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
