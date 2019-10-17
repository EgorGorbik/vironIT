var mongoose = require('../model');
class ServiceRace {
    constructor() {
        var raceSchema = new mongoose.Schema({
            time: Number,
            description: String,
            title: String,
            user_id: String,
            stage_id: String
        });
        this.race = mongoose.model('Race', raceSchema);
    }

    getRace() {
        return this.race;
    }

    async getTable(_id) {
        return await this.race.findOne({_id}) // TODO install Robo3T
    }

    async additionalValidation(time, description, title, user_id, stage_id, operation, stage, league, id) {
        let tempStage;
        try {
            tempStage = await stage.findOne({_id: stage_id});
        } catch (e) {
            return 'гонки по данному id не существует'
        }
        if (tempStage === null) {
            return 'гонки по данному id не существует'
        }
        let leagueID = tempStage.league_id;
        let tempLeague = await league.findOne({_id: leagueID});
        let arrayUserID = tempLeague.users_id;
        if (arrayUserID.indexOf(user_id) !== -1) {
                return true
        } else {
            return 'user не из этой лиги'
        }
    }

    async createTable(time, description, title, user_id, stage_id, stage, league) {
        let resultOfValidation = await this.additionalValidation( time, description, title, user_id, stage_id, 'create', stage, league);
        if (resultOfValidation === true) {
            var user = new this.race({time, description, title, user_id, stage_id});
            user.save();
            return user;
        } else {
            return resultOfValidation
        }
    }

    async updateTable(_id, time, description, title, user_id, stage_id, stage, league) {
        let resultOfValidation = await this.additionalValidation( time, description, title, user_id, stage_id, 'update', stage, league);
        if (resultOfValidation === true) {
            try {
                return this.race.findOneAndUpdate({_id}, {$set: {time, description, title, user_id, stage_id}}, {new: true});
            } catch (e) {
                return e.message
            }
        } else {
            return resultOfValidation
        }
    }

    async deleteTable(_id) {
        try {
            return await this.race.findOneAndDelete({_id});
        } catch (e) {
            return e.message
        }
    }

}

module.exports = ServiceRace;
