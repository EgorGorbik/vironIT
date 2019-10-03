const fs = require("fs");
const port = 3000;
const bodyParser = require('body-parser');
const Controller = require('./Controller') ;

function router(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    let controller = new Controller();


    //additionally
    app.get('/getUserRaces/:id', (req, res) => {controller.getUserRaces(req, res)})
    app.get('/getUserLeagues/:id', (req, res) => {controller.getUserLeagues(req, res)})
    app.get('/getSeasonRaces/:season', (req, res) => {controller.getSeasonRaces(req, res)})

    //CRUD
    app.get('/:table/:id', (req, res) => {controller.getInstance(req, res)})
    app.post('/:table', function (req, res) {controller.createInstance(req, res)});
    app.put('/:table/:id', function (req, res) {controller.updateInstance(req, res)})
    app.delete('/:table/:id', function (req, res) {controller.deleteInstance(req, res)})




    app.listen(port, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }
        console.log(`server is listening on ${port}`)
    })
}

module.exports = router;
