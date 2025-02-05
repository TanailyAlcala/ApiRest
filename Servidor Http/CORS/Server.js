
var http = require('http');

let server = http.createServer(function (req,res){
    res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin': '*'}); //comentar
    res.end('Hello World');
})

server.listen(3000, () => {
    console.log("Servidor HTTP corriendo en puerto 3000")
})
