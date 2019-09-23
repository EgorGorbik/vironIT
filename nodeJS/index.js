const http = require('http');
const fs = require("fs");
const url = require('url');

const hostname = '127.0.0.1';
const port = 3001;
let text;

const server = http.createServer((req, res) => {
    let file = url.parse(req.url,true).query['file'];
    let name = url.parse(req.url,true).query['name'];
    if(file) {
        try {
            text = fs.readFileSync(file, "utf8");
        } catch (e) {
            text = 'This file does not exist'
        }

    } else if (name) {
        text = `Hello, ${name}`
    } else if (req.url === '/') {
        text = 'Hello world!'
    } else {
        text = '404 Page not found'
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(text);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/?file=index1.txt`);
});
