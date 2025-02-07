const express = require('express');
const cors = require('cors');
const { text } = require('body-parser');
const app = express();
const PORT = 3001;

app.use(cors());


//Middleware de aplicación 
app.use('/',(req,res,next)=>{
    console.log("Peticion al server");
    next();
},(req,res,next)=>{
    console.log("2da función middleware");
    next();
});
//Middleware incorpordado en Express
app.use(express.json());
app.use(express.text());

//Ejercicio thunder GET
app.get('/alumno',(req, res)=>{
    console.log(req.query);
    res.sendFile( __dirname+ '/public/index.html');
});
/*app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});*/

//Ejercicio thunder POST
app.post('/sistemas/:control',(req, res)=>{
    console.log(req.params)
    res.send('Buen día.');
});
/*app.post('/s',(req, res)=>{
    console.log(req.body)
    res.send('Hello World');
});*/

//Ejercicio thunder PATCH
app.patch('/maestros',(req, res)=>{
    console.log(req.body)
    res.send('Hola mundo');
});


app.use((req,res)=>{
    res.status(404); 
    res.send("Error 404");
});

app.listen(PORT,()=>{
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
