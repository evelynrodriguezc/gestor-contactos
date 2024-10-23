const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const contactoManager = require('./modules/contactoManager')
const PORT = 3000;
const server = http.createServer((req, res) => {
    const{ pathname, query } = url.parse(req.url, true);
    if(pathname === '/' && req.method === 'GET'){
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type' : 'text/plain'});
                return res.end('Error al cargar la página');
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        });
    }else if(pathname === '/contactos' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type' : 'aaplication/json'});
        res.end(JSON.stringify(contactoManager.listarContactos()));
    }else if(pathname === '/contactos' && req.method === 'POST'){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { nombre, telefono } = JSON.parse(body);
            contactoManager.agregarContacto(nombre, telefono);
            res.writeHead(201, {'Content-Type' : 'application/json'});
            return res.end(JSON.stringify(contactoManager.listarContactos()));
        });
    }else if(pathname === '/contactos/buscar' && req.method === 'GET'){
        const nombre = query.nombre;
        const resultados = contactoManager.buscarContacto(nombre);
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(resultados));
    }else{
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.end('Ruta no encontrada');
    }
})
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
})