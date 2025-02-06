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


app.get('/',(req, res,next)=>{
    res.sendFile( __dirname+ '/public/index.html');
});
app.post('/',(req, res)=>{
    console.log(req.body)
    res.send('Hello World');
});

app.use((req,res)=>{
    res.status(404); 
    res.send("Error 404");
});

app.listen(PORT,()=>{
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
