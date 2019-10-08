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
        let user;
        user = await this.stage.getTable(req.params.id);
        res.send(user)
    }

    async createStage(req, res) {
        let rezult = '';
        joi.validate(req.body, this.schemaStage, (err, result) => {
            if (err) {
                rezult = err
            } else {
                rezult = this.stage.createTable(req.body.title, req.body.description, req.body.location, req.body.league_id);
            }
        })
        res.send(rezult);
    }

    async updateStage(req, res) {
        let rezult;
        rezult = await joi.validate(req.body, this.schemaStage, (err, result) => {
            if (err) {
                return 'error! Invalid date'
            } else {
                return this.stage.updateTable(req.params.id, req.body.title, req.body.description, req.body.location, req.body.league_id);
            }
        })

        res.send(rezult);
    }

    deleteStage(id, race) {
        this.stage.deleteTable(id, race);
    }
}

module.exports = leagueController;
