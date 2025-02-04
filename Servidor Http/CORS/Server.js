
var http = require('http');

let server = http.createServer(function (req,res){
    res.writeHead(200, {'access-control-allow-origin': '*'}); //comentar
    res.end('Hello World');
})

server.listen(3000, () => {
    console.log("Servidor HTTP corriendo en puerto 3001")
})
