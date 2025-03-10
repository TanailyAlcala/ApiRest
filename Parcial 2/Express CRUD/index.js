const express = require('express');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');
const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'VariablesDeEntorno/.env') });

//const reply = require('server/reply.js');


//let PORT = process.env.PORT;
let PORT = process.env.PORT || 3001;


const app = express();
const routerCancion = require('./Router/cancionRouter.js');
//const { status } = require('server/reply.js');

// Middleware para parsear el body de las peticiones
app.use(express.json());
app.use(express.text());
app.use(xmlparser());
app.use(cors());

app.use('/usuarios', routerCancion);

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});

/*app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({
        status=err.status,
        mensaje=err.message,
    })
})*/

app.use((error,req,res,next)=>{
    res.status(500).json({error:error.message});
});
