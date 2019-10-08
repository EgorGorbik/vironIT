const User = require('../Service/serviceUser') ;
const joi = require('joi');

class userController {
    constructor() {
        this.user = new User();
        this.schemaUser = joi.object().keys({
            name: joi.string(),
            surname: joi.string(),
            username: joi.string()
        });
    }

    async getUserWithRace(id) {
        return await this.user.getUserWithRace(id);
    }

     async getUserForLeague(id) {
         return await this.user.getUserForLeague(id);
     }

    async getUserModel() {
        return this.user;
    }

    async getUser(req, res) {
        let user;
        user = await this.user.getTable(req.params.id);
        res.send(user)
    }

    async createUser(req, res) {
        let rezult = '';
                joi.validate(req.body, this.schemaUser, (err, result) => {
                    if (err) {
                        rezult = 'error! Invalid date'
                    } else {
                        rezult = this.user.createTable(req.body.name, req.body.surname, req.body.username);
                    }
                })
        res.send(rezult);
    }

    async updateUser(req, res) {
        let rezult;
                rezult = await joi.validate(req.body, this.schemaUser, (err, result) => {
                    if (err) {
                        return 'error! Invalid date'
                    } else {
                        return this.user.updateTable(req.params.id, req.body.name, req.body.surname, req.body.username);
                    }
                })

        res.send(rezult);
    }

    deleteUser(id, race, league) {
        this.user.deleteUser(id, race, league);
    }
}

module.exports = userController;
