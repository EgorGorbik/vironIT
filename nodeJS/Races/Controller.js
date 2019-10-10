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
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
                res.sendStatus(403)
            } else {
                res.send(user)
            }
        });

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
                let obj = {};
                obj['stage'] = this.stage.getStageModel();
                obj['league'] = this.league.getLeagueModel();
                rezult = await this.race.createRace(req, res, 'create', obj);
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
                let obj = {};
                obj['stage'] = this.stage.getStageModel();
                obj['league'] = this.league.getLeagueModel();
                rezult = await this.race.updateRace(req, res, 'update', obj);
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
