const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

app.get('/',(req, res,next)=>{
    res.sendFile( __dirname+ '/public/index.html');
});
app.post('/',(req, res)=>{
    res.send('Hello World');
});

app.listen(PORT,()=>{
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
