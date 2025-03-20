const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

let app=express();
//const app = express();
const PORT = 3001;
app.use(express.json());

app.post('/login', function(req,res,next) {
    var token = jsonwebtoken.sign(req,bodyParser, 'claveSecreta');
    console.log(token);
    res.json((token));
});

app.get('/sistema', verificarToken, function(req,res,next){
    res.json({mensaje:"Acceso concedido a ruta sistema"});
});

app.listen(3001,function(){
    console.log("Servidor express escuando en el puerto 3001");
});

function verificarToken(req,res,next){
    console.log(req.headers.authorization);
    if(typeof(req.headers.authorization)=='undefined0'){
        res.json({Error:"Token no enviado"});
    }else {
        let token =req.headers.authorization.substring(7, req.headers.authorization.length);
        jsonwebtaken.verify(token, 'claveSecreta', function(err,decoded){
            if(err){
                res.json({Error: "Acceso no concedido a rura sistema"});
            }else{
                next();
            }
        })
    }
}