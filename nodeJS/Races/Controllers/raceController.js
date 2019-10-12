const Race = require('../Service/serviceRace') ;
const joi = require('joi');

class leagueController {
    constructor() {
        this.race = new Race();
        this.schemaRace = joi.object().keys({
            time: joi.number(),
            description: joi.string(),
            title: joi.string(),
            user_id: joi.string().required(),
            stage_id: joi.string().required()
        });
    }

    getRaceModel() {
        return this.race.getRace()
    }

    async getRace(req, res) {
        let user = "";
        user = await this.race.getTable(req.params.id);
        res.send(user)
    }

    async additionalValidation(req, res, operation, stage, league, user) {
        let tempStage;
        try {
            tempStage = await stage.findOne({_id: req.body.stage_id});
        } catch (e) {
            console.log(e);
            return "invalid stage id"
        }
        if(tempStage === null) {
            return "This stage does not exist"
        }
        let leagueID = tempStage.league_id;
        let tempLeague = await league.findOne({_id: leagueID});
        let arrayUserID = tempLeague.users_id;
        if (arrayUserID.indexOf(req.body.user_id) != -1) {
            if(operation === 'create') {
                return await joi.validate(req.body, this.schemaRace, (err, result) => {
                    if (err) {
                        console.log('errrrr')
                        console.log(err)
                        return err
                    } else {
                        let temp = this.race.createTable(req.body.time, req.body.description, req.body.title, req.body.user_id, req.body.stage_id);
                        console.log(temp)
                        return temp;
                    }
                })
                res.send(rezult)
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

    async createRace(req, res, operation, obj) {
        let result = await joi.validate(req.body, this.schemaRace, async (err, result) => {
            if (err) {
                return err.message
            } else {
                return await this.race.createTable(req.body.time, req.body.description, req.body.title, req.body.user_id, req.body.stage_id,
                    obj.stage, obj.league);
            }
        })
        res.send(result)
    }

    async updateRace(req, res, operation, obj) {
        let result = await joi.validate(req.body, this.schemaRace, async (err, result) => {
            if (err) {
                return err.message
            } else {
                return await this.race.updateTable(req.params.id, req.body.time, req.body.description, req.body.title, req.body.user_id, req.body.stage_id,
                    obj.stage, obj.league);
            }
        })
        res.send(result)
    }


    async deleteRace(id, res) {
        let result = await this.race.deleteTable(id);
        if (result === null) {
            res.send('This user does not exist')
            res.sendStatus(200)
        } else {
            res.send(result)
        }
    }
}

module.exports = leagueController;
