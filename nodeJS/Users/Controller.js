const fs = require("fs");
const joi = require('joi');
const Service = require('./Service') ;
const mongoService = require('./MongoService') ;
class Controller {
    constructor() {
        this.service = new mongoService();
        this.schema = joi.object().keys({
            name: joi.string().required(),
            //email: joi.string().email().required()
    })
}

   async getUser(req, res) {
        let user = await this.service.getUser(req.params.id);
        res.send(user)
    }

    createUser(req, res) {
        let rezult = '';
        joi.validate(req.body, this.schema, (err, result) => {
            if(err) {
                rezult= 'error! Wrong name'
            } else {
                rezult = this.service.createUser(req.body.name);
            }
        })
        res.send(rezult);
    }

    updateUser(req, res) {
        let rezult = '';
        joi.validate(req.body, this.schema, (err, result) => {
            if(err) {
                rezult= 'error! Wrong name'
            } else {
                rezult = this.service.updateUser(req.params.id, req.body.name);
            }
        })
        res.send(rezult);
    }

    deleteUser(req, res) {
        this.service.deleteUser(req.params.id);
        res.sendStatus(200)
    }

}

module.exports = Controller;
