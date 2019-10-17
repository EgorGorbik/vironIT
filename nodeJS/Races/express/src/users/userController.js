const User = require('./serviceUser') ;
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

    async registerUserToLeague(req, res, league) {
        let rez = await this.user.registerUserToLeague(req, res, league);
        res.send(rez)
    }

    async getUserInfo (req, res) {
        console.log(req.body)
        let user;
        user = await this.user.getTable(req.params.id);
        return user;
    }

    async getUser(req, res) {
        let user;
        user = await this.user.getTable(req.params.id);
        res.send(user)
    }

    async createUser(req, res) {
        let result = joi.validate(req.body, this.schemaUser, (err, result) => {
                    if (err) {
                        return 'error! Invalid date'
                    } else {
                        return this.user.createTable(req.body.name, req.body.surname, req.body.username);
                    }
                })
        res.send(result);
    }

    async updateUser(req, res) {
                let rezult = await joi.validate(req.body, this.schemaUser, (err, result) => {
                    if (err) {
                        return 'error! Invalid date'
                    } else {
                        return this.user.updateTable(req.params.id, req.body.name, req.body.surname, req.body.username);
                    }
                })

        res.send(rezult);
    }

    async deleteUser(res, id, race, league) {
        let result = await this.user.deleteUser(id, race, league);
        if (result !== null) {
            res.sendStatus(200)
        } else {
            res.send('This user does not exist')
        }
    }
}

module.exports = userController;
