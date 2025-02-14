const express = require('express');
const cors = require('cors');
const { text } = require('body-parser');
const app = express();
const PORT = 3001;
const xmlparser = require('express-xml-bodyparser');
const multer = require('multer')
const path =require('path')

app.use(cors());


//Middleware de aplicación en Express
app.use('/',(req,res,next)=>{
    console.log("Peticion al server");
    next();
},(req,res,next)=>{
    console.log("2da función middleware");
    next();
});

//Middleware para parsear body de peticiones
app.use(express.json());
app.use(express.text());
app.use(xmlparser()); //Middleware para parsear XML

//Ejercicio
const folder = path.join(__dirname+'/ArchivosRec/');
const upload = multer({dest:folder});
app.use(upload.single('archivo'));

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

//Ejercicio POST XML
app.post('/prefectos', (req, res) => {
    console.log(req.body);
    res.send('Hola mundo');
});

//EJEMPLO POST con Multer
app.post('/prefectos',(req, res)=>{
    console.log(`Se recibio el archivo: ${req.file.originalname}`); 
    console.log(req.body);
    console.log('Se recibio el formulario: ' +JSON.stringify(req.body));
    res.json(req.body);
});

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
