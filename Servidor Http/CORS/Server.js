
var http = require('http');


let server = http.createServer(function (req, res) {
    if (req.method === 'OPTIONS') {
        // Manejo de preflight request
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // Respuesta para solicitudes normales
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*' 
         // Permitir todas las solicitudes
    });
    res.end('Hello World');
});
server.listen(3000, () => {
    console.log("Servidor HTTP corriendo en puerto 3000")
})
