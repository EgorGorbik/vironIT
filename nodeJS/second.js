const http = require('http');
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3001;
let text = fs.readFileSync("index.txt", "utf8");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(text);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
