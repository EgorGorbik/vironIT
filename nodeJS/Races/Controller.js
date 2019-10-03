const joi = require('joi');
const User = require('./User') ;
const Race = require('./Race') ;
const League = require('./League') ;
const Stage = require('./Stage') ;

class Controller {
    constructor() {
        this.user = new User();
        this.race = new Race();
        this.league = new League();
        this.stage = new Stage();

        this.schemaUser = joi.object().keys({
            name: joi.string(),
            surname: joi.string(),
            username: joi.string()
        });
        this.schemaStage = joi.object().keys({
            title: joi.string(),
            description: joi.string(),
            location: joi.string(),
            league_id: joi.string().required()
        });
        this.schemaRace = joi.object().keys({
            time: joi.number(),
            description: joi.string(),
            title: joi.string(),
            user_id: joi.string().required(),
            stage_id: joi.string().required()
        });
        this.schemaLeague = joi.object().keys({
            title: joi.string(),
            description: joi.string(),
            season: ['autumn', 'spring', 'summer', 'winter'],
            users_id: joi.array().required()
        });
    }

    async getUserRaces (req, res) {
        let user = await this.user.getUserWithRace();
        //user = user.find(x => x._id == req.params.id)
        res.send(user)
    }

    async getUserLeagues (req, res) {
        let user = await this.user.getUserForLeague();
        //user = user.find(x => x._id == req.params.id)
        res.send(user)
    }

    async getSeasonRaces (req, res) {
        let user = await this.league.getSeasonRace(req.params.season);
        res.send(user)
    }

   async getInstance(req, res) {
       let user = "";
        switch(req.params.table) {
            case 'user':
                user = await this.user.getTable(req.params.id);
                break;
            case 'race':
                user = await this.race.getTable(req.params.id);
                break;
            case 'league':
                user = await this.league.getTable(req.params.id);
                break;
            case 'stage':
                user = await this.stage.getTable(req.params.id);
                break;
        }
        res.send(user)
    }

    async additionalValidationRace(req, res, operation) {
        let t = this.stage.getStage();
        let tempStage;
        try {
            tempStage = await t.findOne({_id: req.body.stage_id});
        } catch (e) {
            console.log(e);
            return "invalid stage id"
        }
        console.log(tempStage)
        let leagueID = tempStage.league_id;
        let k = this.league.getLeague();
        let tempLeague = await k.findOne({_id: leagueID});
        console.log(tempLeague);
        let arrayUserID = tempLeague.users_id;
        if (arrayUserID.indexOf(req.body.user_id) != -1) {
            if(operation === 'create') {
                return this.race.createTable(req.body.time, req.body.description, req.body.title, req.body.user_id, req.body.stage_id);
            }
            if(operation === 'update') {
                let k = await this.race.updateTable(req.params.id, req.body.time, req.body.description, req.body.title, req.body.user_id, req.body.stage_id);
                console.log('k');
                console.log(k)
                return k;
            }

        } else {
            console.log('User не из этой лиги!')
            return 'User не из этой лиги!'
        }
    }

    async createInstance(req, res) {
        let rezult = '';
        switch (req.params.table) {
            case 'user':
                joi.validate(req.body, this.schemaUser, (err, result) => {
                    if (err) {
                        rezult = 'error! Invalid date'
                    } else {
                        rezult = this.user.createTable(req.body.name, req.body.surname, req.body.username);
                    }
                })
                break;

            case 'race':
                rezult = await joi.validate(req.body, this.schemaRace, async (err, result) => {
                    if (err) {
                        return err
                    } else {
                        return this.additionalValidationRace(req, res, 'create')
                    }
                })
                break;
            case 'league':
                joi.validate(req.body, this.schemaLeague, (err, result) => {
                    if (err) {
                        rezult = 'error! Invalid date'
                    } else {
                        rezult = this.league.createTable(req.body.title, req.body.description, req.body.season, req.body.users_id);
                    }
                })
                break;
            case 'stage':
                joi.validate(req.body, this.schemaStage, (err, result) => {
                    if (err) {
                        rezult = 'error! Wrong name'
                    } else {
                        rezult = this.stage.createTable(req.body.title, req.body.description, req.body.location, req.body.league_id);
                    }
                })
                break;
        }
        res.send(rezult);
    }

    async updateInstance(req, res) {
        let rezult = '';
        switch (req.params.table) {
            case 'user':
                rezult = await joi.validate(req.body, this.schemaUser, (err, result) => {
                    if (err) {
                        return 'error! Invalid date'
                    } else {
                        return this.user.updateTable(req.params.id, req.body.name, req.body.surname, req.body.username);
                    }
                })
                break;
            case 'race':
                rezult = await joi.validate(req.body, this.schemaRace, async (err, result) => {
                    if (err) {
                        return err
                    } else {
                        let k = await this.additionalValidationRace(req, res, 'update');
                        console.log(k)
                        return k
                    }
                })
                break;
            case 'league':
                rezult = await joi.validate(req.body, this.schemaLeague, (err, result) => {
                    if (err) {
                        return 'error! Invalid date'
                    } else {
                        return this.league.updateTable(req.params.id, req.body.title, req.body.description, req.body.season, req.body.users_id);
                    }
                })
                break;
            case 'stage':
                rezult = await joi.validate(req.body, this.schemaStage, (err, result) => {
                    if (err) {
                        return 'error! Wrong name'
                    } else {
                        return this.stage.updateTable(req.params.id, req.body.title, req.body.description, req.body.location, req.body.league_id);
                    }
                })
                break;
        }
        res.send(rezult);
    }

    deleteInstance(req, res) {
        switch(req.params.table) {
            case 'user':
                this.user.deleteTable(req.params.id, this.race.getRace(), this.league.getLeague());
            case 'race':
                this.race.deleteTable(req.params.id);
            case 'league':
                this.league.deleteTable(req.params.id, this.stage.getStage(), this.race.getRace());
            case 'stage':
                this.stage.deleteTable(req.params.id, this.race.getRace());
        }
        res.sendStatus(200)
    }

}

module.exports = Controller;
