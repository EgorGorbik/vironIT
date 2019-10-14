const Stage = require('../Service/serviceStage') ;
const joi = require('joi');

class leagueController {
    constructor() {
        this.stage = new Stage();
        this.schemaStage = joi.object().keys({
            title: joi.string(),
            description: joi.string(),
            location: joi.string(),
            league_id: joi.string().required()
        });
    }

    getStageModel() {
        return this.stage.getStage();
    }

    async getStage(req, res) {
        let user = await this.stage.getTable(req.params.id);
        res.send(user);
    }

    async createStage(req, res, league) {
        let result = await joi.validate(req.body, this.schemaStage, (err, result) => {
            if (err) {
                return err
            } else {
                return this.stage.createTable(req.body.title, req.body.description, req.body.location, req.body.league_id, league);
            }
        })
        res.send(result);
    }

    async updateStage(req, res, league) {
        let result = await joi.validate(req.body, this.schemaStage, (err, result) => {
            if (err) {
                return 'error! Invalid date'
            } else {
                return this.stage.updateTable(req.params.id, req.body.title, req.body.description, req.body.location, req.body.league_id, league);
            }
        })

        res.send(result);
    }

    async deleteStage(id, race, res) {
        let result = await this.stage.deleteTable(id, race);
        if (result !== null) {
            res.sendStatus(200)
        } else {
            res.send('This stage does not exist')
        }
    }
}

module.exports = leagueController;
