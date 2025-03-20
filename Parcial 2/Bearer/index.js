const express = require('express');
const bearer = require('express-bearer-token');

const app = express();
const PORT = 3001;

app.use(bearer());

app.use(function (req, res, next){
    if (req.token === 'tana'){
        next();
    } else {
        res.status(401).send('No puedes pasar!');
    }
});

app.get('/', (req, res)=>{
    res.send("Hola mundo! Puedes pasar...");
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
