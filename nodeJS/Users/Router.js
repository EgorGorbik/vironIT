const fs = require("fs");
const port = 3000;
const bodyParser = require('body-parser');
const Controller = require('./Controller') ;
function router(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    let controller = new Controller();

    app.get('/:id', (req, res) => {controller.getUser(req, res)})
    app.post('/', function (req, res) {controller.createUser(req, res)});
    app.put('/:id', function (req, res) {controller.updateUser(req, res)})
    app.delete('/:id', function (req, res) {controller.deleteUser(req, res)})

    app.listen(port, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }
        console.log(`server is listening on ${port}`)
    })
}

module.exports = router;
