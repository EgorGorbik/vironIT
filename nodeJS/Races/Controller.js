const User = require('./Controllers/userController') ;
const Race = require('./Controllers/raceController') ;
const League = require('./Controllers/leagueController') ;
const Stage = require('./Controllers/stageController') ;

class Controller {
    constructor() {
        this.user = new User();
        this.race = new Race();
        this.league = new League();
        this.stage = new Stage();
    }

    async getUserRaces (req, res) {
        let user = await this.user.getUserWithRace(req.params.id);
        res.send(user)
    }

    async getUserLeagues (req, res) {
        let user = await this.user.getUserForLeague(req.params.id);
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
                user = await this.user.getUser(req, res);
                break;
            case 'race':
                user = await this.race.getRace(req, res);
                break;
            case 'league':
                user = await this.league.getLeague(req, res);
                break;
            case 'stage':
                user = await this.stage.getStage(req, res);
                break;
        }
        res.send(user)
    }

    async createInstance(req, res) {
        let rezult = '';
        switch (req.params.table) {
            case 'user':
                rezult = this.user.createUser(req, res);
                break;
            case 'race':
                rezult = await this.race.createRace(req, res, 'create', this.stage.getStageModel(), this.league.getLeagueModel(), this.user.getUserModel());
                break;
            case 'league':
                rezult = this.league.createLeague(req, res);
                break;
            case 'stage':
                rezult = this.stage.createStage(req, res);
                break;
        }
        res.send(rezult);
    }

    async updateInstance(req, res) {
        let rezult = '';
        switch (req.params.table) {
            case 'user':
                rezult = await this.user.updateUser(req, res);
            case 'race':
                rezult = await this.race.updateRace(req, res, 'update', this.stage.getStageModel(), this.league.getLeagueModel(), this.user.getUserModel());
                break;
            case 'league':
                rezult = await this.league.updateLeague(req, res);
                break;
            case 'stage':
                rezult = await this.stage.updateStage(req, res);
                break;
        }
        res.send(rezult);
    }

    deleteInstance(req, res) {
        switch(req.params.table) {
            case 'user':
                this.user.deleteUser(req.params.id, this.race.getRace(), this.league.getLeague());
            case 'race':
                this.race.deleteRace(req.params.id);
            case 'league':
                this.league.deleteLeague(req.params.id, this.stage.getStage(), this.race.getRace());
            case 'stage':
                this.stage.deleteStage(req.params.id, this.race.getRace());
        }
        res.sendStatus(200)
    }

}

module.exports = Controller;
