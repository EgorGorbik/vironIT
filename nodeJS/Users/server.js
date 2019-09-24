const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");
const controller = require('./Controller') ;
const port = 3000;

var users = JSON.parse(fs.readFileSync('data.json', 'utf8'));
let service = new controller.Controller(users);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/:id', (req, res) => {
    let user = service.getUser(+req.params.id);
    res.send(user)
})

app.post('/', function (req, res) {
    service.createUser(req.body.name);
    res.send(users);
});

app.put('/:id', (req, res) => {
    service.updateUser(+req.params.id, req.body.name);
    res.send(users)
})

app.delete('/:id', (req, res) => {
    service.deleteUser(+req.params.id);
    res.sendStatus(200)
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
