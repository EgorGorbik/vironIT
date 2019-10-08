const League = require('../Service/serviceLeague') ;
const joi = require('joi');

class leagueController {
    constructor() {
        this.league = new League();
        this.schemaLeague = joi.object().keys({
            title: joi.string(),
            description: joi.string(),
            season: ['autumn', 'spring', 'summer', 'winter'],
            users_id: joi.array().required()
        });
    }

    async getSeasonRace(season) {
        return await this.league.getSeasonRace(season);
    }

    getLeagueModel() {
        return this.league.getLeague();
    }

    async getLeague(req, res) {
        let user;
        user = await this.league.getTable(req.params.id);
        res.send(user)
    }

    async createLeague(req, res) {
        let rezult = '';
        joi.validate(req.body, this.schemaLeague, (err, result) => {
            if (err) {
                rezult = err
            } else {
                rezult = this.league.createTable(req.body.title, req.body.description, req.body.season, req.body.users_id);
            }
        })
        res.send(rezult);
    }

    async updateLeague(req, res) {
        let rezult;
        rezult = await joi.validate(req.body, this.schemaLeague, (err, result) => {
            if (err) {
                return 'error! Invalid date'
            } else {
                return this.league.updateTable(req.params.id, req.body.title, req.body.description, req.body.season, req.body.users_id);
            }
        })
        res.send(rezult);
    }

    deleteLeague(id, race, league) {
        this.league.deleteTable(id, race, league);
    }
}

module.exports = leagueController;
