const User = require('./Controllers/userController') ;
const Race = require('./Controllers/raceController') ;
const League = require('./Controllers/leagueController') ;
const Stage = require('./Controllers/stageController') ;
const jwt = require('jsonwebtoken');

class Controller {
    constructor() {
        this.user = new User();
        this.race = new Race();
        this.league = new League();
        this.stage = new Stage();
        this.getUserRaces = this.getUserRaces.bind(this);
        this.getUserLeagues = this.getUserLeagues.bind(this);
        this.getSeasonRaces = this.getSeasonRaces.bind(this);
        this.getInstance = this.getInstance.bind(this);
        this.createInstance = this.createInstance.bind(this);
        this.updateInstance = this.updateInstance.bind(this);
        this.deleteInstance = this.deleteInstance.bind(this);
    }

    async getUserRaces (req, res) {
        let user = await this.user.getUserWithRace(req.params.id);
        res.send(user)
        /*jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
                res.sendStatus(403)
            } else {
                res.send(user)
            }
        });*/

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
        switch(req.params.table) {
            case 'user':
                this.user.getUser(req, res);
                break;
            case 'race':
                await this.race.getRace(req, res);
                break;
            case 'league':
                await this.league.getLeague(req, res);
                break;
            case 'stage':
                await this.stage.getStage(req, res);
                break;
            default:
                res.send('Not valid parameter')
        }
    }

    async createInstance(req, res) {
        switch (req.params.table) {
            case 'user':
                this.user.createUser(req, res);
                break;
            case 'race':
                let obj = {};
                obj['stage'] = this.stage.getStageModel();
                obj['league'] = this.league.getLeagueModel();
                await this.race.createRace(req, res, 'create', obj);
                break;
            case 'league':
                this.league.createLeague(req, res);
                break;
            case 'stage':
                this.stage.createStage(req, res, this.league.getLeagueModel());
                break;
            default:
                res.send('Not valid parameter')
        }
    }

    async updateInstance(req, res) {
        switch (req.params.table) {
            case 'user':
                await this.user.updateUser(req, res);
                break;
            case 'race':
                let obj = {};
                obj['stage'] = this.stage.getStageModel();
                obj['league'] = this.league.getLeagueModel();
                await this.race.updateRace(req, res, 'update', obj);
                break;
            case 'league':
                await this.league.updateLeague(req, res);
                break;
            case 'stage':
                await this.stage.updateStage(req, res, this.league.getLeagueModel());
                break;
            default:
                res.send('Not valid parameter')
        }
    }

    deleteInstance(req, res) {
        switch(req.params.table) {
            case 'user':
                this.user.deleteUser(res, req.params.id, this.race.getRaceModel(), this.league.getLeagueModel());
                break;
            case 'race':
                this.race.deleteRace(req.params.id, res);
                break;
            case 'league':
                this.league.deleteLeague(res, req.params.id, this.stage.getStageModel(), this.race.getRaceModel());
                break;
            case 'stage':
                this.stage.deleteStage(req.params.id, this.race.getRaceModel(), res);
                break;
            default:
                res.send('Not valid parameter')
        }
    }

}

module.exports = Controller;
