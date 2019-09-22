const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3002;

const server = http.createServer((req, res) => {
    let name = url.parse(req.url,true).query['name'];
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello ' + name);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/?name=Ivan`);
});

